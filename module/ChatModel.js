const mongoose = require("mongoose");

const ChatSchema =new mongoose.Schema({
  members: {
    typeof: Array
  },
  timestamps: { 
    type: Boolean,
    default: true
  },
});

const ChetModel=mongoose.model("Chat",ChatSchema)

module.exports=ChetModel
