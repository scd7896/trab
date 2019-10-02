const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(()=>{
    const server = express()
    
    server.use(express.json())
    server.use(express.urlencoded({extended: true}))
    
    
    server.get('/trablepages/:where', (req,res)=>{
        return app.render(req, res, '/trablepages',{where: req.params.where})
    })
    server.get('/notice/:noticeid', (req, res)=>{
        
        return app.render(req,res,'/notice', {noticeid : req.params.noticeid, headers : req.headers})
    })
    server.get('/postcontent/:postid',(req,res)=>{
        return app.render(req,res, '/postcontent', {postid: req.params.postid})
    })
    server.get('/configdata/:configid', (req,res)=>{
        return app.render(req,res,'/configdata', {configid : req.params.configid})
    })
    server.get('/targetseller/:sellerid',(req,res)=>{
        return app.render(req, res, '/targetseller', {sellerid : req.params.sellerid})
    })
    server.get('/targetseller/postcontent/:postid',(req,res)=>{
        return app.render(req, res, '/postcontent', {postid : req.params.postid})
    })
    server.get('/matching/:postid', (req,res)=>{
        return app.render(req,res, '/matching', {postid : req.params.postid})
    })
    server.get('/reqetc/:id', (req, res)=>{
        return app.render(req,res, '/reqetc', {id: req.params.id})
    })
    server.get('*',(req, res)=>{
        return handle(req,res);
    })
    server.listen(8082,()=>{
        console.log('프론트 서버는 8081')
    })
})