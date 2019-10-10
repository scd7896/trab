const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const path = require('path')
const connection = require('../mysqlConect')()
const {awsusers} = require('../../awskeys')
const app = express.Router()
const s3 = new AWS.S3({
    accessKeyId : awsusers.access,
    secretAccessKey : awsusers.secret,
    Bucket : 'trabtest'
})

app.use(express.json())

const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket : 'trabtest',
        acl : 'public-read',
        key(req, file, cb){
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDay();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            const dateString = ''+year+month+day+hour+minute+second
            cb(null, `post/${dateString}${path.basename(file.originalname)}`)
        }
    }),
    limits : {fileSize : 20 * 1024 * 1024}
})

/* 이미지 등록 하는 api */
app.post('/image', upload.single('image'), (req,res)=>{
    res.send(req.file.location)
})

/* 판매자 등록 id로 자세하기 보는 api */
app.get('/sellerconfig/:id', (req, res)=>{
    const sql = `select * from TraBCore_sellerconfigure
        where user_primary_id = ${req.params.id}`
    connection.query(sql, [], (err,rows,fileds)=>{
        
        if(err){
            res.status(500).send('조회실패')
            return
        }
        if(rows.length !== 0){
            res.status(204).send('심사중입니다 기다려주세요')
            return
        }else{
            res.status(200).send('해도됨')
        }
    })
})

/* 판매자 신청 api */
app.post('/sellerconfig', upload.single('image'), (req,res)=>{
    const profileImg = req.file.location;
    const bank_num = req.body.bank_num
    const countries = req.body.countries
    const intro = req.body.intro
    const user = req.body.user
    const test_content = req.body.test_content
    
    
    const sql  = `
    insert into TraBCore_sellerconfigure
    value(null, ${user},'${profileImg}','${bank_num}','${countries}','${intro}','${test_content}', 0 )
    `
    connection.query(sql, [], (err, rows, filed)=>{
        if(err){
            res.status(501).send('업로딩 실패')
            return
        }
        res.status(200).send('업로드 성공')
    })
})

/* 게시물 등록 api */
app.post('/trabpost', upload.single('image'), (req,res)=>{
    const profileImg = req.file.location;
    const title = req.body.post_title
    const city_id = req.body.city_id
    const user_id = req.body.user_id
    const content = req.body.post_content
    const sql  = `insert into TraBCore_trablepost
    values(null, '${title}', '${profileImg}', now(), ${city_id}, null, ${user_id}, false, null, '${content}')`
    
    
    connection.query(sql, [], (err, rows, filed)=>{
        if(err){
    
            res.status(501).send(err)
            return
        }
        res.status(200).send('업로드 성공')
    })
})

/* 포스트 게시물 상새내용 가져오기 */
app.get('/trable/:postid', (req,res)=>{
    const postid = req.params.postid
    const sql = `
    select postcontent, (select seller_profile_image
        from TraBCore_seller
        where user_primary_id = (select seller_id
                                from TraBCore_trablepost
                                where id = ${postid})) seller_image,
        (select user_name
        from TraBCore_usertable
        where id = (select seller_id
                    from TraBCore_trablepost
                    where id = ${postid})) seller_name,
        (select city_name
        from TraBCore_cityid
        where id = (select city_id
                    from TraBCore_trablepost
                    where id = ${postid})) city_name, trable_post_title, trable_post_configday
    from TraBCore_trablepost
    where id = ${postid};
    `
    connection.query(sql,[], (err, rows, fields)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.status(200).send(rows)
    })
})

/* 도시 리스트 가져오기 api */
app.get('/city', (req, res)=>{
    const sql = 'select id, city_name from TraBCore_cityid'
    connection.query(sql, [], (err, rows, field)=>{
        if(err){
            res.status(500).send(err)
            return
        }
        res.status(200).send(rows)
    })
})

/* 확인된 포스트 가져오는 api */
app.get('/trabpost/config/true', (req, res)=>{
    const sql = `
    select posts.id, image, user_name, title
from (select id, trable_post_image image, seller_id, trable_post_title title
from TraBCore_trablepost
where trable_post_configday is not null
order by id desc
limit 0, 4) posts join TraBCore_usertable users on posts.seller_id = users.id;
    `
    connection.query(sql, [], (err,rows,fileds)=>{
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.send(rows)

    })
})

/* 메인화면에 처음에 뿌려주는 seller들 불러오는 api */
app.get('/seller/config/true', (req,res)=>{
    const sql = `
    select sell.id, user_name, image, title
    from (select id,user_primary_id user_id, seller_profile_image image, seller_info title 
    from TraBCore_seller
    order by id desc
    limit 0, 4) sell join TraBCore_usertable us on sell.user_id = us.id;
    `
    connection.query(sql, [], (err,rows)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.send(rows)
    })
})

/* 설계자 더보기 눌렀을때 작동 하는 api */
app.get('/seller/config/true/:sellerid', (req,res)=>{
    const sql = `
    select sell.id, user_name, image, title
    from (select id,user_primary_id user_id, seller_profile_image image, seller_info title 
    from TraBCore_seller
    where id < ${req.params.sellerid}
    order by id desc
    limit 0, 4) sell join TraBCore_usertable us on sell.user_id = us.id;
    `
    connection.query(sql, [], (err,rows)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.send(rows)

    })
})

/* postid로 seller정보 가져오는 api */
app.get('/post/to/sellerdata/:postid', (req, res)=>{
    const sql = `
    select id, user_name , (select seller_profile_image
        from TraBCore_seller
        where user_primary_id = (select seller_id
                                from TraBCore_trablepost
                                where id = ${req.params.postid})) image,
        (select seller_info
        from TraBCore_seller
        where user_primary_id = (select seller_id
                                from TraBCore_trablepost
                                where id = ${req.params.postid})) intro
    from TraBCore_usertable
    where id = (select seller_id
        from TraBCore_trablepost
        where id = ${req.params.postid}) 
    `
    connection.query(sql, [], (err, rows)=>{
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send(rows[0])
    })
})

/* 매칭리스트 추가하는 api */
app.post('/directmatching', (req, res)=>{
    const sql = `
        insert into TraBCore_directmatching 
        values(null, ${req.body.seller_id}, ${req.body.request_user}, '${req.body.etc}');
    `
    
    connection.query(sql, [], (err, rows)=>{
        if(err){
            
            res.status(500).send('디비에러')
            return;
        }
        res.status(200).send('업로딩 성공')
    })
})

/* 공지사항 쓰기 */
app.post('/addnotice', upload.single('image'), (req,res)=>{
    const profileImg = req.file.location;
    const noticeTitle = req.body.notice_title;
    const noticeContents = req.body.notice_contents;

    const sql = `
        insert into TraBCore_notice values(null, '${noticeTitle}', '${noticeContents}' , '${profileImg}',now())
    `
    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러');
            return;
        }
        res.status(200).send('업로딩 성공')
    })
})

/* 공지사항 리스트 전부 가져오기 */
app.get('/addnotice', (req, res)=>{
    const sql = `
        SELECT id, notice_title, notice_image, notice_createat FROM trab.TraBCore_notice order by id desc;
    `
    connection.query(sql, [], (err,rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러');
            return;
        }
        res.status(200).send(rows)
    })
})

/* 공지사항 내부 컨텐츠 내용 가져오기 */
app.get('/notice/contents/:id', (req, res)=>{
    const noticeId = req.params.id
    const sql = `
        SELECT notice_conetent
        FROM trab.TraBCore_notice
        where id = ${noticeId};
    `
    connection.query(sql, [], (err,rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.status(200).send(rows[0])
    })
})

/* 마스터 페이지에서 공지사항 삭제  */
app.delete('/notice/:id', (req, res)=>{
    const noticeId = req.params.id
    const sql = `
    delete FROM trab.TraBCore_notice
    where id = ${noticeId};
    `
    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send('삭제성공')
    })
})
 
/* 국가 추가 api */
app.post('/country', upload.single('image'),(req, res)=>{
    const profileImg = req.file.location;
    const sql = `insert into TraBCore_country values(null, '${req.body.country_name}','${profileImg}' );`

    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send('추가성공')
    })
})

/* 국가 가져오는 api */
app.get('/countries' , (req, res)=>{
    const sql = 'SELECT * FROM trab.TraBCore_country;'
    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.status(200).send(rows);
    })
})

/* 국가 삭제 api */
app.delete('/country/:id' , (req, res)=>{
    const sql = `
        delete from TraBCore_country
        where id = ${req.params.id};
    `
    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.status(200).send('삭제완료')
    })
})

/* 도시정보 국가이름과 가져오기 */
app.get('/cities', (req, res)=>{
    const sql =`
        SELECT city.id id, city_name, city_image, country_name
        FROM trab.TraBCore_cityid city join TraBCore_country contry 
        on city.country_id = contry.id;
    `
    connection.query(sql, [], (err,rows, fields)=>{
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send(rows)
    })
})

/* 도시 추가 하기 */
app.post('/add/city', upload.single('image'),(req, res)=>{
    const profileImg = req.file.location;
    const sql = `
    insert into TraBCore_cityid values(null, '${req.body.city_name}', '${profileImg}', ${req.body.country_id})
    `
    connection.query(sql, [], (err, rows, fields)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.status(200).send('추가성공')
    })
})

/* 도시 삭제하는 api */
app.delete('/delete/city/:id', (req, res)=>{
    const sql = `
        delete FROM trab.TraBCore_cityid
        where id = ${req.params.id};
    `
    connection.query(sql, [], (err, rows, fiedls)=>{
        if(err){
            res.status(500).send('디비에러')
            
            return;
        }
        res.status(200).send('삭제성공');

    })
})

/* 광고 추가하는 api */
app.post('/ad', upload.single('image'), (req, res)=>{
    const sql = `
    `
    connection.query(sql, [], (err,rows,fileds)=>{
        if(err){
            console.log(err)
            res.status(500).send('추가실패');
            return;
        }
        res.status(200).send('추가성공')
        return;
    })
})
module.exports = app

