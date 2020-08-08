const userdata = require("../models/bookSchema")

function findbookInfo(req, res, next) {
    
    let bookid = req.body.bookid;
    let userEmail = session.email;
    userdata.find({
        "bookid": bookid,
        "userEmail": userEmail
    }).exec(function (error, data) {

        if (data.length > 0) {

            return res.status(409).send("already exist");
        }
        next();
    });
}



async function registerBookInfo(req, res, ) {

    let bookdetails = req.body;
    bookdetails.userEmail = session.email;
    let books = new userdata(bookdetails);
    console.log(books);
    let response = await books.save();
    res.status(200).send(`book ${response} added`);
    res.end();
}

function getBooks(req, res, next) {

    let bookid = req.params.bookid;
    let email = req.body.email;

    userdata.find({
        "bookid": bookid,
        "userEmail": session.email
    }).exec(function (error, data) {
        if (error) {
            return res.status(500).send("internal server error");
        }
        if (data.length > 0) {
            res.status(200).send(data);
            return;
        } else {
            return res.status(400).send("not found");
        }
    });

}

function updatebookinfo(req, res) {

    let bookdetails = req.body;
    bookdetails.userEmail = session.email;
    console.log(bookdetails);
    userdata.updateOne({
        "userEmail": session.email
    }, bookdetails, function (error, data) {
        if (error) {
            console.log(error);
        }
        res.status(200).send(`books updated on id:${session.email}`);
        res.end();
    });

}

function deleteBookinfo(req, res) {

    let bookid = req.params.bookid;
    userdata.deleteOne({
        "userEmail": session.email,
        "bookid": bookid
    }, function (error, data) {
        if (error) {
            return res.status(404).send("something went wrong");
        }
        return res.status(200).send(`bookid ${bookid} of  id:${session.email} deleted`);
    });

}

module.exports = {
    findbookInfo,
    registerBookInfo,
    updatebookinfo,
    getBooks,
    deleteBookinfo
};