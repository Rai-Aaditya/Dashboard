const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/login');
}



app.get("/", (req, res)=>{
    res.render("enter");
});

app.get("/loginUser", (req, res)=>{
    res.render('loginUser');
})
app.get("/loginAdmin", (req, res)=>{
    res.render('loginAdmin');
})
app.get("/user", (req, res)=>{
    res.render("user");
});
app.get("/admin", (req, res)=>{
    res.render("admin");
});
app.post("/login", (req, res)=>{
    const role = (req.body.btn1)?req.body.btn1:req.body.btn2;
    if(role==='user'){
        res.render("user");
    }
    else{
        res.render("admin");
    }
});

app.post("adminSignup", (req, res)=>{

})
app.listen(3000, ()=> console.log("Server started on port 3000"));