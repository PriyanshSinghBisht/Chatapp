const users  = require("../users");

const authMiddleware = (socket, next)=> {
      const user = socket.handshake.auth.user;
      
      if(users.has(user) || user===""){
        return next(new Error("socket auth error"));
      }
      next();
}

module.exports = authMiddleware