const cors = require('cors');

const authMiddleware = require('./middlewares/auth.middleware.js');
const users  = require("./users.js");
const express = require('express');
const app = express();
const server = require('node:http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
    origin: "*"
  }
  });

app.use(cors());
io.use( authMiddleware );

function handleConnect(socket){
  const name =socket.handshake.auth.user;
 users.add(name)
 console.log("socket "+socket.id+" connected");
  console.log("total sockets:", users) 
 
  socket.join(name)
  io.to(name).emit("initUsers", Array.from(users)) ;
 
 io.emit("activeUsers", Array.from(users)) ;
  socket.broadcast.emit("newUserAdded", name);
}
const handleDisconnect = (socket)=>{
console.log("socket "+socket.id+" disconnected");
     users.delete(socket.handshake.auth.user)
     console.log("total sockets:", users.size)
 io.emit("activeUsers", Array.from(users)) ;
    socket.leave(socket.handshake.auth.user)
}

io.on("connection", (socket)=>{
  handleConnect(socket);
  socket.on("disconnect",
        ()=> handleDisconnect(socket)); //handleDisconnect
  socket.on("send_message", ({from,To,message,Time})=>{
    console.log("message",from,To,message)
     socket.to(To).emit("recieve_message", {from,To,message,Time});
  })
})

 app.get('/', (req,res) =>{
     res.json('server is live');
 })
 
 server.listen(3000, console.log(`server is listenning on PORT http://localhost:3000`));
