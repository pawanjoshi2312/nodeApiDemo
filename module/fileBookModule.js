const fs = require("fs");
const path = require("path");
const fileUserModule = require("./fileUserModule");
const filepath = path.join(__dirname, '..', 'Data/bookData.json');
var userBookArray = [];

readBookData();

function readBookData() {
    fs.readFile(filepath, 'utf-8', function (error, data) {
        if (error) throw error;
        userBookArray = JSON.parse(data);
    });
}

function writeBookData(data) {
    fs.writeFile(filepath, JSON.stringify(data), function (error) {
        if (error) throw error;
    });

}

function checkUserBookExist(req, res, next) {
    let bookid = req.params.bookid;
    let userid = req.params.userid;

    var userbookExists = userBookArray.findIndex(item => item.bookid == bookid && item.id == userid);

    if (userbookExists > -1) {
        return res.status(409).send("user/book already exists");
    }
    next();
}


function checkUserBookPresence(req, res, next) {
    let bookid = req.params.bookid;
    let userid = req.params.userid;
    var userbookExists = userBookArray.findIndex(item => item.bookid == bookid && item.id == userid);

    if (userbookExists == -1) {
        return res.status(404).send("user/book not found");
    }
    next();
}

function getIndex(userid, bookid) {
    return userBookArray.findIndex(item => item.bookid == bookid && item.id == userid);
}

function getUserBookData(req, res, next) {
    let userid = req.params.userid;
    var filteredbookdata = userBookArray.filter(book => book.id === userid)
    return res.status(200).send(filteredbookdata);
}

function addUserBook(req, res, next) {
    let userid = req.params.userid;
    let bookid = req.params.bookid;
    let bookdata = req.body;
    bookdata.id = userid;
    bookdata.bookid = bookid;
    userBookArray.push(bookdata);
    writeBookData(userBookArray);
    res.status(200).send("data saved");

}

function updateUserBook(req, res, next) {
    let userid = req.params.userid;
    let bookid = req.params.bookid;
    let bookdata = req.body;
    bookdata.id = userid;
    bookdata.bookid = bookid;
    userBookArray[getIndex(userid, bookid)] = bookdata;
    writeBookData(userBookArray);
    res.status(200).send("book updated");
}

function deleteUserBook(req, res, next) {
    let userid = req.params.userid;
    let bookid = req.params.bookid;
    userBookArray.splice(getIndex(userid, bookid), 1);
    writeBookData(userBookArray);
    res.status(200).send("book deleted");
}

module.exports = {
    getUserBookData,
    addUserBook,
    checkUserBookExist,
    checkUserBookPresence,
    updateUserBook,
    deleteUserBook
};