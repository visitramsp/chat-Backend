const ChatModel=require("../module/ChatModel")

 const createChat= async(req,res)=>{
    const newChat=new ChatModel({
        members:[req.body.senderId,req.body.receiverId]
    })
    try{
        const result=await newChat.save();
        res.status(200).json(result)

    }
    catch(err){
        res.json(err)
    }
}

const userChats=async(req,res)=>{
    try{
        const chat=await ChatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.json(chat)
    }
    catch(err){
        res.json(err)
    }
}

const findChat =async(req,res)=>{
    try{
        const chat =await ChatModel.find({
            members:{$all:[req.params.userId,req.params.senderId]}
        })
        res.json(chat)

    }
    catch(err){
        res.json(err)
    }
}

module.exports={createChat,userChats,findChat}