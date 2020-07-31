var express = require('express');
var router = express.Router();
var usermodule = require("../module/UserModule");
var bookmodule = require("../module/BookModule");
var fileusermodule = require("../module/fileUserModule");
var userbookModule = require('../module/fileBookModule');


//----------------------------------user--------------------------------
router.get('/', usermodule.getUser);
router.post('/:id',usermodule.checkUserExist,usermodule.addUser);
router.put('/:id',usermodule.checkUserpresence ,usermodule.updateUser);
router.delete('/:id',usermodule.checkUserpresence ,usermodule.deleteUser);




//--------------------------book-----------------------------
router.get("/:id/books", bookmodule.getBooks);
router.post("/:id/books/:bookid",bookmodule.checkUserBookExist ,bookmodule.addBooks);
router.put("/:id/books/:bookid",bookmodule.checkUserBookPresence, bookmodule.updateBooks);
router.delete("/:id/books/:bookid",bookmodule.checkUserBookPresence,bookmodule.deleteBook);
module.exports = router;

//-----------------------------file users---------------

router.get("/file",fileusermodule.getUserData);
router.post("/file/:userid",fileusermodule.checkfileUserExist,fileusermodule.addUserData);
router.put("/file/:userid",fileusermodule.checkfileUserPresence,fileusermodule.updateUserData);
router.delete("/file/:userid",fileusermodule.checkfileUserPresence,fileusermodule.deleteUserData);

//--------------------------------file books--------------
router.get("/file/book/:userid",userbookModule.getUserBookData);
router.post("/file/book/:userid/:bookid",userbookModule.checkUserBookExist,userbookModule.addUserBook);
router.put("/file/book/:userid/:bookid",userbookModule.checkUserBookPresence,userbookModule.updateUserBook);
router.delete("/file/book/:userid/:bookid",userbookModule.checkUserBookPresence,userbookModule.deleteUserBook);
