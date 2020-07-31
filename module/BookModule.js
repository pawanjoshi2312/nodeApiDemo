const userBooks = [];
const usermodule = require("./UserModule");

function checkUserBookExist(req,res,next) {
    let bookid=req.params.bookid;
    let userid=req.params.id;
    var userbookExists= userBooks.findIndex(item => item.bookId == bookid&& item.userId==userid);
    console.log(userbookExists);
    if(userbookExists>-1){
        return res.status(409).send("already exists");
    }
    next();
}

function checkUserBookPresence(req,res,next){
    let bookid=req.params.bookid;
    let userid=req.params.id;
    var userbookExists= userBooks.findIndex(item => item.bookId == bookid&& item.userId==userid);
    if(userbookExists==-1){
        return res.status(404).send("user/book not found");
    }
    next();
}       

function getIndex(userid,bookid){
    return userBooks.findIndex(item=>item.bookId==bookid && item.userId==userid);
}

function getBooks(req, res, next) {
    var userid = req.params.id;
    var filteredbookdata = userBooks.filter(book => book.userId === userid) 
    res.status(200).send(filteredbookdata);
    res.end();
}

function addBooks(req, res, next) {
    var userid = req.params.id;
    var bookid = req.params.bookid;
    var bookdata = req.body;
    bookdata.userId = userid;
    bookdata.bookId = bookid;

    userBooks.push(bookdata);
    res.status(200).send("book added successfully");

}

function updateBooks(req, res, next) {
    let bookid = req.params.bookid;
    let userid=req.params.id;
    const bookdata = req.body;
    delete userBooks.bookId;

    bookdata.userId = userid;
    bookdata.bookId = bookid;
    userBooks[getIndex(userid,bookid)] = bookdata;
    res.status(200).send("data updated");
    res.end();
}

function deleteBook(req, res, next) {
    let bookid = req.params.bookid;
    let userid=req.params.id;
    userBooks.splice(getIndex(userid,bookid), 1);
    res.status(200).send("book deleted")
    res.end();
}
module.exports = {
    getBooks,
    addBooks,
    updateBooks,
    deleteBook,
    checkUserBookExist,
    checkUserBookPresence
}