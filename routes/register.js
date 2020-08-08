const express=require('express');
const router=express.Router();
const registerusermodule=require("../module/RegisterUser");
const registerbookmodule=require("../module/Registerbooks");
const validationmodule=require("../module/validation")

//----------------s--user-------------------------------------
router.post("/user/login",validationmodule.validatingloginData,registerusermodule.loginUser);
router.post("/user/registration",registerusermodule.findUserInfo,validationmodule.validatingUserData,registerusermodule.passwordHashing,registerusermodule.registerUserInfo);
router.put("/user/updateuser",validationmodule.authenticateToken,registerusermodule.checksession,registerusermodule.passwordHashing,registerusermodule.updateUserinfo);
router.delete("/user/deleteuser",validationmodule.authenticateToken,registerusermodule.checksession,registerusermodule.deleteUserinfo);

//---------------------book-----------------------------------
router.get("/bookinfo/:bookid",registerusermodule.checksession,registerbookmodule.getBooks);
router.post("/bookinfo",registerusermodule.checksession,registerbookmodule.findbookInfo,registerbookmodule.registerBookInfo);
router.put("/bookinfo",registerusermodule.checksession,registerbookmodule.updatebookinfo);
router.delete("/bookinfo/:bookid",registerusermodule.checksession,registerbookmodule.deleteBookinfo);
module.exports=router;