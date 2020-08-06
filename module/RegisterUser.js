const express = require("express");
const userdata = require("../models/registerUserSchema");
var session = require('express-session');

function checksession(req, res, next) {
   
    if (session.email) {
        next();
    } else {
        res.status(404).send("log in first");
    }
}

function findUserInfo(req, res, next) {
   
    let useremail = req.body.email;
    userdata.find({
        "email": useremail
    }).exec(function (error, data) {

        if (data.length > 0) {

            return res.status(409).send("already exist");
        }
        next();
    });
}



async function registerUserInfo(req, res, ) {
    
    let userdetails = req.body;
    let user = new userdata(userdetails);
    let response = await user.save();
    res.status(200).send(`user ${response} added`);
    res.end();

}

function loginUser(req, res, next) {
    
    let email = req.body.email;
    let password = req.body.password;

    userdata.find({
        "email": email,
        "password": password
    }).exec(function (error, data) {
        if (error) {
            return res.status(500).send("internal server error");
        }
        if (data.length > 0) {
            session.email = email
            res.status(200).send("log in successfull");
            return;
        } else {
            return res.status(400).send("not found");
        }
    });
}

function updateUserinfo(req, res) {

    let userdetails = req.body;
    userdata.updateOne({
        "email": session.email
    }, userdetails, function (error, data) {
        if (error) {
            console.log(error);
        }
        return res.status(200).send(`user updated on id:${session.email}`);
    });
}

function deleteUserinfo(req, res) {

    userdata.deleteOne({
        "email": session.email
    }, function (error) {
        if (error) {
            return res.status(404).send("something went wrong");
        }
        return res.status(200).send(`user on id:${session.email} deleted`);
    });
}

module.exports = {
    findUserInfo,
    registerUserInfo,
    updateUserinfo,
    loginUser,
    deleteUserinfo,
    checksession
};