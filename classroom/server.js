const express=require('express');
const app=express();
const users=require("./routes/user.js")
const posts=require("./routes/post.js");
const session=require("express-session");
const flash=require("connect-flash")
const path=require("path")

app.set("view engine","ejs");
app.set("view",path.join(__dirname,"views"));

app.use(session({secret:"avanishji" , resave:false,saveUninitialized:true}));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name ="anonymous" }=req.body;
    req.session.name=name;
    req.flash("success","user register succesfull")
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
  res.render("page.ejs",{name:req.session.name});
})

app.listen(3000,(req,res)=>{
    console.log("server is running on 3000 port ")
})