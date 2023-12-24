const express=require("express")
const { createChat, userChats, findChat } = require("../controller/ChatController")
const router=express.Router()

router.post("/",createChat)
router.post("/:userId",userChats)
router.post("/find/:firstId/:second/:secondId",findChat)


module.exports=router