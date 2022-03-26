"use strict";

// const io = require("socket.io")(3000);
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080", "http://admin.socket.io"],
  },
});

const userIo = io.of("/user");

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getusernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(newError);
  }
});

userIo.on("connection", (socket) => {
  console.log("connected to user namespace" + socket.username);
});

function getusernameFromToken(token) {
  return token;
}

io.on("connection", (socket) => {
  console.log("connected" + socket.id);
  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("recieved", message);
    } else {
      socket.to(room).emit("recieved", message);
    }
    // console.log(message);
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined${room}`);
  });
  socket.on("ping", (n) => console.log(n));
});

instrument(io, { auth: false });

// io.on("connection", (socket) => {
//   //   console.log(socket.id);
//   const value = process.argv.pop();
//   socket.emit("send-message", value);
//     console.log(value);
//   socket.on("recieve-msg", (value2) => {
//     console.log(value2);
//   });
// });

// console.log("process.argv>>>>", process.argv);

// socket.emit("new-msg", value);
