const userdata = require("../models/userSchema");
const express = require("express");

function checkuserExist(req,res,next){
   let userid=req.params.id;
   const users= userdata.findById(userid).exec(function(error,data){
      if(data===null){
          return res.status(404).send("not found");
      }
     next();
   });
}

function findUsers(req,res,next){
    
    let query=req.query;
    userdata.find(query).exec(function(error,data){
        if(error){
           return res.status(500).send("internal server error");
        }
        
        if(data===null){
            return res.status(404).send("not found");
        }
        next();
    })
}

function getUserDetails(req, res, next) {
    let query=req.query.query;
    let sort=req.query.sort;
    query=JSON.parse(query);
    let limitvalue=parseInt(req.query.limit);
    if(req.query.age<0){
        req.query.age=(Math.abs(req.query.age)).toString();
    }
    userdata.find(query).limit(limitvalue).sort(sort).exec(function (error, data) {
        if (error) throw error;
        return res.status(200).send(data);
    });
}


async function addUserDetails(req, res, next) {
    let userdetails = req.body;
    let user = new userdata(userdetails);
    let response = await user.save();
    res.status(200).send(`user ${response} added`);
    res.end();


}

function updateUserDetails(req, res, next) {
    let userdetails = req.body;
    let userid = req.params.id;
    userdata.findByIdAndUpdate(userid, userdetails, function (error, data) {
        if (error) {
            console.log(error);
        }
        return res.status(200).send(`user updated on id:${userid}`);
    });
    
}

function patchupdateUserDetails(req, res, next) {
    let userdetails = req.body;
    let userid = req.params.id;
    userdata.findByIdAndUpdate(userid, {
        $set: userdetails
    }, function (error) {
        if (error) {
            console.log(error);
        }
        return res.status(200).send(`user updated on id:${userid}`);
    });
    
}
 
function deleteUserDetails(req, res, next) {
    let userid = req.params.id;
    userdata.findByIdAndDelete(userid,function(error){
        if(error){
            return res.status(404).send("something went wrong");
        }
        return res.status(200).send(`user on id:${userid} deleted`);
    });
}
module.exports = {
    getUserDetails,
    addUserDetails,
    updateUserDetails,
    patchupdateUserDetails,
    deleteUserDetails,
    checkuserExist,findUsers
}