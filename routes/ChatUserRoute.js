const {Login, Registers,uploadImage,userList, userFind} = require("../controller/UserController")

const multer=require("multer")
const router=require("express").Router()
const path=require("path")
const { userFindById } = require("../controller/ChatController")


router.post("/login",Login)
router.post("/register",Registers)


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });   
  
  const upload = multer({ storage: storage });
  
router.post("/upload",upload.single('image'),uploadImage)
router.post("/user",userList)
router.get("/user/userId",userFind)





module.exports=router