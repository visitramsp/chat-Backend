const mongoose=require("mongoose")

const userChatSchema=new mongoose.Schema(
    // {
    //     message:{
    //         text:{
    //             type:String,
    //             require:true,
    //         },
    //     },
    //     users:Array,
    //     sender:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User",
    //         require:true,
    //     },
    // },
    // {
    //     timestamps:true,
    // }

    {
        message: {
          text: { type: String, required: true },
        },
        users: Array,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
      {
        timestamps: true,
      }
)

const UserChatSchemaModel=mongoose.model("UseruserChatSchema",userChatSchema)
module.exports=UserChatSchemaModel