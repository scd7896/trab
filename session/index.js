const express = require('express')
const app = express();
const bcrypt = require('bcrypt-nodejs')

const cors = require('cors')
const jwt = require('jsonwebtoken')

const connection = require('./mysqlConect')();
const postApi = require('./route/post')
const masterPageApi = require('./route/masterpages')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use('/api/post', postApi)
app.use('/api/master', masterPageApi)
app.get('/', (req,res)=>{
    res.send('호스팅완료~')
})
app.post('/api/signup', (req, res)=>{
    
    const id = req.body.userId
    const password = req.body.password.trim()
    const sql = `select user_id 
                from TraBCore_usertable 
                where user_id = '${id}'`
    console.log(req.body.userId)
    
    connection.query (sql, [], (err, rows)=>{
    
        if(rows.length !== 0){
            res.status(401).send('이미 그 아이디가 있습니다')
            return;
        }
        if(err){
            res.send(err)
            return;
        }
        
        const hashedPassword=bcrypt.hashSync(password)
            
        
        const sql = `insert into TraBCore_usertable 
        values(null, '${id}', '${hashedPassword}', '${req.body.userTel}', 
        '${req.body.userBirthday}',
        ${req.body.userMMS}, '${req.body.questionAnswer}', 
        '${req.body.question}',9000,'${req.body.userName}');
        `
        
        connection.query(sql,[], (err, rows)=>{
            if(err){
                res.status(401).send('회원가입실패했습니다')
                return
            }
            res.send('회원가입성공').status(200)
        })
    })
})
app.get('/api/login',(req,res)=>{
    const decoded = jwt.verify(req.headers['authorization'], 'secret')
    const sql = `select * from TraBCore_usertable where user_id = ${decoded.id}`
    connection.query(sql, [], (err, rows)=>{
        if(err){
            res.status(401).send('유저정보 못가져옴')
            return
        }
        res.json(rows[0])
    })
})
app.post('/api/login', (req, res)=>{
    const sql = `select tet.id id, user_id, user_name, user_rank_name, user_password, user_name
    from (select *
        from TraBCore_usertable
        where user_id = '${req.body.userId}') tet join TraBCore_userrank rnk on tet.user_rank_id = rnk.id 
  `
    const password = req.body.userPassword.trim()
    
    connection.query(sql, [], (err, rows)=>{
        if(!rows[0]){
            res.status(207).send('그런 아이디 없습니다')
            return
        }
        if(err){
            console.log(err)
        }
        const test = bcrypt.compareSync(password,rows[0].user_password)
        
        if(test){
            console.log(rows)
            const userdata = {
                id : rows[0].id,
                userId : rows[0].user_id,
                userRank : rows[0].user_rank_name,
                userName : rows[0].user_name
            }
            
            let token = jwt.sign(userdata, 'secret', {
                expiresIn : 1440
            })
            res.status(201).send(token)
        }
        else{
            res.status(208).send('비밀번호가 다릅니다')
        }
    })
})


app.listen(9170 , () => console.log("서버 진행중 9170"));

