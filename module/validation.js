const userdata = require("../models/registerUserSchema");
const validemail = require("email-validator");

const jwt = require('jsonwebtoken');

const validatingUserData = (req, res, next) => {
    if (!(req.body.username && req.body.email && req.body.password)) {

        return res.status(400).send("Invalid data");

    }
    if (!(validemail.validate(req.body.email))) {
        return res.status(400).send("Invalid email");
    } else {
        next()
    }
}

const validatingloginData = (req, res, next) => {
    console.log("inside validation");
    if (!(req.body.email && req.body.password)) {
        res.send(400, {
            message: "Please enter an valid email & password for login"
        });

    }
    console.log(req.body.email);
    if (!(validemail.validate(req.body.email))) {
        return res.status(400).send("Invalid email");
    } else {
        next()
    }
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).send("Unauthorized")
    };
    jwt.verify(token, 'optimusprime', (error, user) => {
        if (error) {
            return res.status(403).send({
                message: error
            })
        }
        next();
    });
}


module.exports = {
    validatingUserData,
    validatingloginData,
    authenticateToken,
}