const express=require('express');
const router=express.Router();
const registerusermodule=require("../module/RegisterUser");
const registerbookmodule=require("../module/Registerbooks");

//------------------user-------------------------------------
router.get("/userinfo",registerusermodule.loginUser);
router.post("/userinfo",registerusermodule.findUserInfo,registerusermodule.registerUserInfo);
router.put("/userinfo",registerusermodule.checksession,registerusermodule.updateUserinfo);
router.delete("/userinfo",registerusermodule.checksession,registerusermodule.deleteUserinfo);

//---------------------book-----------------------------------
router.get("/bookinfo/:bookid",registerusermodule.checksession,registerbookmodule.getBooks);
router.post("/bookinfo",registerusermodule.checksession,registerbookmodule.findbookInfo,registerbookmodule.registerBookInfo);
router.put("/bookinfo",registerusermodule.checksession,registerbookmodule.updatebookinfo);
router.delete("/bookinfo/:bookid",registerusermodule.checksession,registerbookmodule.deleteBookinfo);
module.exports=router;