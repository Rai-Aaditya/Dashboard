const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const User = require('./roles');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/login');
}


app.get("/", (req, res) => {
    res.render("enter", { message: null });
});

app.get("/loginUser", (req, res) => {
    res.render('loginUser', { message: null });
})
app.get("/loginAdmin", (req, res) => {
    res.render('loginAdmin', { message: null });
})
app.get("/user", (req, res) => {
    res.render("user", { message: null });
});
app.get("/admin", (req, res) => {
    res.render("admin", { message: null });
});
app.post("/login", (req, res) => {
    const role = (req.body.btn1) ? req.body.btn1 : req.body.btn2;
    if (role === 'user') {
        res.render("loginUser", { message: null });
    }
    else {
        res.render("loginAdmin", { message: null });
    }
});

app.post("/userSignup", (req, res) => {
    const body = req.body;
    const name = body.username;
    const emailid = body.email;
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("B4c0/\/", salt, function (err, hash) {
            if (err) {
                console.log(err);
                res.render('loginUser', { message: err });
            }
            const user = new User({ username: name, email: emailid, password: hash });
            user.save()
                .then(() => {
                    console.log('Data Entered Successfully');
                    res.render("user", { message: null });
                })
                .catch((error) => {
                    console.log(err);
                    res.render("loginUser", { message: error });
                })
        });
    });
});
app.post("/adminSignup", (req, res) => {
    const body = req.body;
    const name = body.username;
    const emailid = body.email;
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("B4c0/\/", salt, function (err, hash) {
            if (err) {
                console.log(err);
                res.render('loginAdmin', { message: err });
            }
            const user = new User({ username: name, email: emailid, password: hash });
            user.save()
                .then(() => {
                    console.log('Data Entered Successfully');
                    res.render("admin", { message: null });
                })
                .catch((error) => {
                    console.log(err);
                    res.render("loginAdmin", { message: error });
                })
        });
    });
});

app.post("/adminLogin", async (req, res) => {
    const emailid = req.body.email;
    try {
        const users = await User.find();
        if (users.length === 0) {
            res.render("loginAdmin", { message: "User not found!" });
        } else {
            var flag=false
            users.forEach((user) => {
                if (user.email === emailid) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.render("loginAdmin", { message: err });
                        } else {
                            res.render("admin", { message: result });
                        }
                    });
                    flag=true;
                }
            });
            if(flag===false) res.render("loginAdmin", {message: "User not found!"});
        }
    } catch (error) {
        console.log(error);
        res.render("loginAdmin", { message: "Error occurred while finding user!" });
    }
});





app.post("/userLogin", async (req, res) => {
    const emailid = req.body.email;
    try {
        const users = await User.find();
        if (users.length === 0) {
            res.render("loginUser", { message: "User not found!" });
        } else {
            var flag=false
            users.forEach((user) => {
                if (user.email === emailid) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (err) {
                            console.log(err);
                            res.render("loginUser", { message: err });
                        } else {
                            res.render("user", { message: result });
                        }
                    });
                    flag=true;
                }
            });
            if(flag===false) res.render("loginUser", {message: "User not found!"});
        }
    } catch (error) {
        console.log(error);
        res.render("loginUser", { message: "Error occurred while finding user!" });
    }
});

const port = 3000;
app.listen(port || process.env.PORT , () => console.log("Server started on port 3000"));