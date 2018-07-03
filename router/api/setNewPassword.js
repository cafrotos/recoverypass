const router = require('express').Router();

router.use('/set-new-password', (req, res, next) => {
    let secret = req.get('secret');
    //validtion secret to changepass
    next()
})