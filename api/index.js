'use strict';

// Node.js web application framework (API)
const express = require('express');
const morgan = require('morgan'); // Used by express, it is a logger : generate logs for every request
const bodyParser = require ('body-parser'); // Used by express, body-parser extract the entire body portion of an incoming request stream and exposes it on req.body

// Elegant mongodb object modeling for node.js
const mongoose = require('mongoose');

// Passport is authentication middleware for Node.js,  it can be used in to any Express-based web application
const passport = require("passport");

const session = require("express-session")

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
const cookieParser = require("cookie-parser");

const PORT = 3000;
const HOST = '0.0.0.0';

// refers to db service of docker-compose, port 27017 (default port)
mongoose.connect('mongodb://db:27017/asset', {useMongoClient : true});

const app = express();
const router = require('./services/router');


app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/api', router);

// app.use(session({secret: "hjdfbqbhjhzpmmqezesvnuihnhjuih"}))
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(cookieParser());

app.listen(PORT, HOST, function(){
    console.log(`Running on http://${HOST}:${PORT}`);
});

