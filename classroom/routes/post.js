const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.send("GET for users")
});

router.get("/:id",(req,res)=>{
    res.send("get for user id");
})

router.post("/",(req,res)=>{
    res.send("post send for user")
});

router.delete("/:id",(req,res)=>{
    res.send("delete user")
})

module.exports=router;
