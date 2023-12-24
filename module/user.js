const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Name is Require"]
    },
    email:{
        type:String,
        require:[true,"Email is Require"]
    },
    password:{
        type:String,
        require:[true,"Email is Require"]
    },
    email:{
        type:String,
        require:[true,"Email is Require"]
    },
    about:String,
    profileUrl:String,
})

const User=mongoose.model("user",UserSchema)
module.exports=User