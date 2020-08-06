const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    bookid:String,
    userEmail:String
});

const bookDetails=mongoose.model("bookdetails",bookSchema);

module.exports=bookDetails;