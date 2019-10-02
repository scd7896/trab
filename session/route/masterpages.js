const express = require('express')
const connection = require('../mysqlConect')()
app = express.Router()

/* 판매자 등록 게시판 가져오는 api */
app.get('/sellerconfig',(req,res)=>{
    const sql = `
    select cf.id, user_primary_id userId, seller_profile_image sellerImage, seller_bank_num bankNum, seller_countrylist countryList,
	    seller_intro intro,seller_config config, user_name
    from TraBCore_sellerconfigure cf join TraBCore_usertable ut on cf.user_primary_id = ut.id
    `
    connection.query(sql, [], (err, rows,fields)=>{
        if(err){
            res.status(400).send('데이터베이스접속실패')
            return
        }
        res.status(200).send(rows)
        return 
    })
})

/* 판매자 등록 게시물 삭제 api */
app.delete('/sellerconfig/:id', (req,res)=>{
    const sql = `
        delete 
        from TraBCore_sellerconfigure
        where id = ${req.params.id}
    `
    connection.query(sql, [], (err,rows,fileds)=>{
        if(err){
            res.status(500).send('디비 접속 불가')
            return
        }
        res.status(200).send('삭제완료')
    })
})

/* 판매자 등록 게시물 상세내용 가져오는 api */
app.get('/sellerconfig/:id', (req,res)=>{
    const sql = `
        select seller_testcontent contents, seller_countrylist countryList
        from TraBCore_sellerconfigure
        where id = ${req.params.id}
    `
    connection.query(sql, [], (err,rows,fileds)=>{
        if(err){
            res.status(500).send('디비 접속 불가')
            return
        }
        res.status(200).send(rows[0])
    })
})

/* 판매자신청 승인 api */
app.get('/sellerconfigconfirm/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    if(id ===NaN){
        res.status(401).send('숫자가아닌데???')
    }
    const sql = `
        update TraBCore_usertable set user_rank_id = 1100 where id = (
            select user_primary_id
            from TraBCore_sellerconfigure
            where id = ${id}
        );`
    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            console.log(err)
            res.status(500).send('디비작동안됨')
            return
        }
        const sql2 = `insert into TraBCore_seller values(null, 
            (select seller_bank_num 
            from TraBCore_sellerconfigure
            where id = ${id}), 
            (select seller_profile_image
            from TraBCore_sellerconfigure
            where id = ${id}),false,
            (select user_primary_id
            from TraBCore_sellerconfigure
            where id = ${id}),
            (select seller_intro
            from TraBCore_sellerconfigure
            where id = ${id}));`
        connection.query(sql2, [], (err,rows, fileds)=>{
            if(err){
                res.status(500).send('중간에에러남')
                return
            }
            res.status(200).send('저장완료')
        })
    })
})

/* 여행계획표 신청 api */
app.get('/trabpost/config/need', (req, res)=>{
    const sql = `
        select tp.id, trable_post_title title, trable_post_image image, user_name name, trable_post_upedatedAt created
        from (select *
                from TraBCore_trablepost
                where trable_post_configday is null) tp join TraBCore_usertable ut
            on tp.seller_id = ut.id;
    `
    connection.query(sql, [], (err, rows, fileds)=>{
        
        if(err){
            res.status(500).send('디비에러임')
        }
        res.status(200).send(rows)
    })
})

/* 여행계획 신청 승인 api */
app.put('/postconfig/:postid', (req, res)=>{
    const sql = `update TraBCore_trablepost 
    set trable_post_configday = now()
    where id = ${req.params.postid}`
    connection.query(sql, [], (err, rows, fields)=>{
        if(err){
            res.status(500).send('디비에러')
            return;
        }
        res.status(200).send('승인완료')

    })
})
/* 판매자 아이디로 판매자 프로필 이미지,이름 가져오는 api */
app.get('/seller/data/:sellerid', (req, res)=>{
    const sql = `
    select image, user_name
    from (select seller_profile_image image, user_primary_id
        from TraBCore_seller
        where id = ${req.params.sellerid}) bb join TraBCore_usertable tv on bb.user_primary_id = tv.id;
    `
    connection.query(sql, [], (err, rows)=>{
        
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send(rows[0])
    })
})

/* 판매자 아이디로 판매자 등록 게시물 리스트 가져오는 api */
app.get('/seller/posts/:sellerid', (req, res)=>{
    const sql = `
    select id, trable_post_image image, trable_post_title title, 
	(select user_name
		from TraBCore_usertable
		where id = (select user_primary_id
					from TraBCore_seller
                    where id = ${req.params.sellerid})) user_name
        from TraBCore_trablepost
        where seller_id = ( select user_primary_id 
					from TraBCore_seller
					where id = ${req.params.sellerid})
    `
    connection.query(sql, [], (err, rows)=>{
        
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send(rows)
    })
})

/* 매칭데이터 긁어오는 api */
app.get('/matching/datas', (req, res)=>{
    const sql = `
    SELECT dm.id,seller_name, seller_tel, req_name, req_tel, bank_num
    FROM TraBCore_directmatching dm join 
                (select id, user_name seller_name, user_tel seller_tel
                    from TraBCore_usertable) sel 
        on dm.seller_id = sel.id 
        join (select id, user_name req_name, user_tel req_tel
                from TraBCore_usertable) req on dm.user_primary_id = req.id
        join (select user_primary_id, seller_bank_num bank_num
            from TraBCore_seller) se on se.user_primary_id = dm.seller_id
    order by dm.id desc;  
    `
    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send(rows)
    })
})

/* 해당 매칭 데이터 삭제하는 api */
app.delete('/matching/data/:id', (req, res)=>{
    const sql = `
        delete from TraBCore_directmatching
        where id = ${req.params.id} ;
    `

    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            res.status(500).send("디비에러")
            return;
        }
        res.status(200).send('삭제됨')
    })
})


/* 매칭데이터 세부내용 긁어오는 api */
app.get('/matching/data/:id',(req, res)=>{
    const sql = `
    select etc
    from TraBCore_directmatching
    where id = ${req.params.id} ;
    `
    connection.query(sql, [], (err, rows, fileds)=>{
        if(err){
            res.status(500).send('디비에러')
            return
        }
        res.status(200).send(rows[0])
    })
})
module.exports = app;