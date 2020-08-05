const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    title:String,
    author:String
});

const bookDetails=mongoose.model("bookdetails",bookschema);

module.exports=bookDetails;