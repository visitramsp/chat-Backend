const mongoose=require("mongoose")

const connectionDb=()=>{
    mongoose.connect("mongodb+srv://vabhi7029:vabhi7029@cluster0.shnage3.mongodb.net/",{

    }).then(()=>{
        console.log("server started...");
    }).catch((err)=>{
        console.log("Error",err);
    })
}

module.exports=connectionDb

