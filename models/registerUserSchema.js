const mongoose=require("mongoose");

const userinfoschema=new mongoose.Schema({

    username:String,
    email:String,
    password:String

});

const registerdata=mongoose.model("registerUser",userinfoschema);
module.exports=registerdata;