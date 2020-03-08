const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// 创建连接
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"116492",
    database:"teacherinfo"
})
db.connect( (err) => {
    if(err) throw err;
    console.log('连接成功');
})


// 查询单条内容/:id
app.post("/wx", (req, res) => {
    let sql = `SELECT * FROM userinfo WHERE signature = '${req.body.signature}'`;
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.json(result)
        }
    })
})

//home
app.get("/", (req, res) => {
    let sql = "select * from userinfo";
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.json(result)
            // console.log(res);
        }
    })
})

// 插入数据
app.get("/addpost2",(req,res) => {
    let post = {title:"post two",body:"weasth"};
    let sql = "INSERT INTO posts SET ?";
    db.query(sql,post,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send("post2 added....")
        }
    })
})

// 查询内容
app.get("/getposts",(req,res) => {
    let sql = "SELECT * FROM posts";
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            // res.send("查询成功")
            res.json(result)
        }
    })
})

// 更新内容
app.get("/updatepost/:id",(req,res) => {
    let newTitle = "update title";
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(`update ${req.params.id} success....`)
        }
    })
})

// 删除内容
app.get("/deletepost/:id",(req,res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send("删除成功.....")
        }
    })
})

app.listen(3000, () => {
    console.log("服务器开启在3000端口....");
})