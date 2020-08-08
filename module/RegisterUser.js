const userdata = require("../models/registerUserSchema");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltround = 10;

function checksession(req, res, next) {

    if (req.session.email) {
        next();
    } else {
        return res.status(404).send("log in first");
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

function passwordHashing(req,res,next){
    console.log("in passwordHashing");
    bcrypt.hash(req.body.password, saltround, function (error, hash) {

        if (error) return res.status(400).send({
            message: error
        });
        req.body.password=hash;
       
        next();
    });
}

function registerUserInfo(req, res) {

        let userdetails = req.body;
        console.log(userdetails);
        var user = new userdata(userdetails);
        user.save(function (error, response) {
            if (error) {
                return res.status(422).send({
                    message: error
                });
            }
            res.status(200).send(`user ${response} added`);
            res.end();
        
    });
}

function loginUser(req, res, next) {

    let email = req.body.email;
    let password = req.body.password;
    let privatekey="optimusprime";
   
    userdata.findOne({
        "email": email
    }).exec(async function (error, data) {
            if (error) {
                return res.status(500).send("internal server error");
            }
           
            if (data) {
                var dbpassword = data.password;
                var compairedpassword= await bcrypt.compare(password, dbpassword);
                console.log("compair",compairedpassword);
                if (compairedpassword) {
                    req.session.email = email;
                    var token=jwt.sign({"email":email,"password":password},privatekey,{expiresIn:"120s"});
                    req.session.save();
                    console.log(req.headers['authorization']=token);

                    return res.status(200).send("log in successfull");
                }
                else{
                    return res.status(401).send("invalid password");
                }
            }
            else{
                return res.status(404).send("not found");
            }
    });
}


function updateUserinfo(req, res) {

        let userdetails = req.body;
        
        console.log(req.body.password);
        userdata.updateOne({
            "email": req.session.email
        }, userdetails, function (error, data) {
            if (error) {
                console.log(error);
            }
            return res.status(200).send(`user updated on id:${req.session.email}`);
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
    checksession,
    passwordHashing

};