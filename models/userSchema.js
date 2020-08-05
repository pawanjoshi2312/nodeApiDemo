const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
        name: String,
        age:Number
});

const userDetails=mongoose.model("userdetails",userSchema);

module.exports=userDetails;