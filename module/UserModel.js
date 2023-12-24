const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    require: true,
    unique: true,
    max: 50,
  },
  isAvataImage: {
    type: Boolean,
    default: true,
  },
  avatarImage:{
    type:String,
    default:true
  }
});

const UserModel=mongoose.model("Users",UsersSchema)
module.exports=UserModel
