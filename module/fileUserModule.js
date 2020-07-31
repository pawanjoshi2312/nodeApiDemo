const fs=require("fs");
const path=require("path");
var userfilepath=path.join(__dirname,'..','data/userData.json');
var userdataArray=[];
var userlastid=0;

readUserDatafile();

function readUserDatafile(){
    fs.readFile(userfilepath,'utf-8',function(error,data){
        if(error){
           return console.error(error);
        }
    userdataArray=JSON.parse(data);
    })
}

function writeUserDatafile(data){
    fs.writeFile(userfilepath,JSON.stringify(data),function(error){
        if(error){
            return res.status(404).send("not found");
        }
    });
}
function checkfileUserExist(req,res,next) {
    let id=req.params.userid;
    var userExists= userdataArray.findIndex(item => item.id == id);
    
    if(userExists>-1){
        return res.status(409).send("already exists");
    }
    next();
}

function checkfileUserPresence(req,res,next){
    let id=req.params.userid;
    var userExists= userdataArray.findIndex(item => item.id == id);
    
    if(userExists==-1){
        return res.status(404).send("not found");
    }
    next();
}

function getIndex(id){
    return userdataArray.findIndex(item=>item.id==id);
}

function getUserData(req,res,next){
     return res.status(200).send(userdataArray);
}
  
function addUserData(req,res,next){
    let userid=req.params.userid;
    let userdata=req.body;
    var lastuserid=Number.parseInt(userdataArray[(userdataArray.length-1)].id) || 0;
    userdata.id=(lastuserid+1).toString();
    userdataArray.push(userdata);
    writeUserDatafile(userdataArray);
    res.status(200).send("data saved");
    
}

function updateUserData(req,res,next){
    console.log("start");
    let userid=req.params.userid;
    let userdata=req.body;
    userdata.id=userid;
    userdataArray[getIndex(userid)]=userdata;
    writeUserDatafile(userdataArray);
    res.status(200).send("user updated");

}

function deleteUserData(req,res,next){
    let userid=req.params.userid;
    console.log("start");
    userdataArray.splice(getIndex(userid),1);
    writeUserDatafile(userdataArray);
    res.status(200).send("user deleted");

}
module.exports={getUserData,addUserData,checkfileUserExist,updateUserData,checkfileUserPresence,deleteUserData}