'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3123;
const bodyParser = require('body-parser');
const redis = require('redis');

let client = redis.createClient();
client.on('connect', () => {
    console.log('Connected in redis ...');
})

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/change-password', (req, res, next) => {
    let secret = req.get('secret');
    console.log(req);
    console.log(secret);
    if(!secret) next({status: 404, message: "Không vào được"})
    next();
})

app.use('/', require('./router/ChangePassword'));

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        err: {}
    })
})

app.listen(port, console.log('Runing in port:' + port));