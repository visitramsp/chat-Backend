const express = require("express");
var cors = require("cors");
const connectionDb = require("./db");
const router = require("./routes/userRoute");
const socket = require("socket.io");
const app = express();
const port = process.env.PORT || 7080;
const chatRoute = require("./routes/ChatRoute");
const ChatUserRoute = require("./routes/ChatUserRoute");
const userMessageRoute = require("./routes/MessageRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", router);
app.use("/", chatRoute);
app.use("/user/api", ChatUserRoute);
app.use("/api/message", userMessageRoute);

const server = app.listen(port, () => {
  console.log(port, "Server Start Successfully...");
  connectionDb();
});

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     Credential: true,
//   },
// });

// global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });
//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.io);
//     if (sendUserSocket) {
//       socket.io(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
