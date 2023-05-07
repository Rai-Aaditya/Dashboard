// ExpressJS
var express = require('express')
// Dependencies
    ,flash = require('connect-flash')
    ,session = require('express-session')
    ,cookieParser = require('cookie-parser')
// express-toastr
    ,toastr = require('express-toastr');
 
// Initialize ExpressJS
var app = express();
// Dependencies
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
});
app.use(flash());
 
// Load express-toastr
// You can pass an object of default options to toastr(), see example/index.coffee
app.use(toastr());


