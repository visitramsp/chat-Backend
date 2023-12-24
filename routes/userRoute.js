const express = require("express");
const User = require("../module/user");
const router = express.Router();

router.get("/user", async (req, res) => {
  const allUser = await User.find({});
  try {
    return res.json({
      message: "User Get Success Fully..",
      data: allUser,
      response_code: 201,
    });
  } catch (err) {
    return res.json({
      message: "Invalid User..",
      data: allUser,
      response_code: 201,
    });
  }
});

router.post("/user", async (req, res) => {
  const getAll = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    about: req.body.about,
    profileUrl: req.body.profileUrl,
  });

  console.log(req.body, "user");
  try {
    getAll.save();
    return res.json({
      message: "user Created Successfully...",
      data: getAll,
      response_code: 200,
    });
  } catch (err) {
    return res.json({
      message: "Invalid User Register Data...",
      data: getAll,
      response_code: 404,
    });
  }
});

router.put("/user", async (req, res) => {
  return res.json({
    message: "user update..",
  });
});



// Find By User And Delete

router.post("/user/delete", async (req, res) => {
  try {
    const userId = req.query.id;
    
    const delUser=await User.findByIdAndDelete({_id:userId})


    if (!userId) {
      throw new Error("Please provide a user ID in the query parameters");
    }
    return res.json({
      message: `User Delete Success Fully`,
      response_code:201,
      del:delUser,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});



//  user login api 

router.post("/login",async (req,res)=>{
    const {email,password}=await req.body
    const emailUser= await User.findOne({email:email})
    const passwordUser= await User.findOne({password:password})

    // console.log(passwordUser);
    try{
      if(emailUser.email===email && passwordUser.password===password){
        return res.json({
            message:"User Find Success Fully..",
            status:true,
            response_code:200,
        })
      }
      else{
        return res.json({
          message:"User Email And Password Wrong..",
          status:true,
          response_code:201,
      })
      }
    }
    catch(err){
        return res.json({
            message:"Invalid User Email And Password...",
            status:false,
            response_code:202
        })
    }


})



module.exports = router;
