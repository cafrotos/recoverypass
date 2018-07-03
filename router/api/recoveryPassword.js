let router = require('express').Router();
let Errors = require('http-errors');
let db = require('../../models');
let op = require('sequelize').Op;
let eventEmitter = require('../../src/lib/EvenEmiter');
let constant = require('../../src/Listener/constant');
let User

router.get('/recovery-password', (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: "OK"
    })
})

router.post('/recovery-password', (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;

    let events = eventEmitter.getInstance();

    db.users.findOne({
        where: {
            [op.or]: [{username: username}, {email: email}]
        }
    }).then(info => {
        if(!info){
            let err = new Errors(400, "Username is not validable.");
            next(err);
        }

        //events.emit(constant.GET_USER, info.dataValues);
        res.status(200).json({
            status: 200,
            message: 'Response is accessed',
            username: info.dataValues.username,
            email: info.dataValues.email
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
})