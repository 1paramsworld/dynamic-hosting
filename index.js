const express=require("express");
const app=express();
const {MongoClient}=require("mongodb");
const path=require("path")
const templatepath=path.join(__dirname,"/templates")
app.set("view engine","hbs")
var session = require('express-session')
app.set("views",templatepath)

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));
  
  
const homeauth=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        res.redirect("/")
    }
}

app.get("/",(req,res)=>{
    // const url = "mongodb+srv://param270604:4vDMjO08tXJpItFh@users.qzwkmmp.mongodb.net/?retryWrites=true&w=majority"; // Use environment variable for MongoDB connection URL
    // const dbName = "users";

    // const client=new MongoClient(url);
    // client.connect().then(()=>{
    //     const dbName=client.db("colors");
    //     const collection=dbName.collection("dark");
    //     return collection.findOne({name:"black"})
    // }).then((data)=>{
    //     console.log(data)
    // })
    res.render("home")
    console.log("hey")

})

app.get("/images",homeauth,(req,res)=>{
    res.render("images")
})

app.post("/showimage",(req,res)=>{
    const url="https://foodish-api.com/images/burger/";

    fetch(url).then(()=>{
        console.log("data fetched")
    }).then(()=>{
        res.render("images",{{}})
    })
    
})

app.listen(3000)
