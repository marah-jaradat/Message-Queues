"use strict";

// import { io } from "socket.io-client";
const io = require("socket.io-client");

const socket = io("http://localhost:3000");
const userSocket = io("http://localhost:3000/user", {
  auth: { token: "test" },
});

socket.on("connect", () => {
  dconsole.log(`"You connected with: ${socket.id}`);

  socket.emit("send-message", (message, room));
  socket.on("recieved", (message) => {
    console.log(message);
  });
  socket.emit("join-room", (room, message) => {
    console.log(message);
  });
});

socket.on("recieved", (message) => {
  console.log(message);
});

userSocket.on("newError", (error) => {
  console.log(error);
});

let count = 0;
setInterval(() => {
  socket.volatile.emit("ping", count++);
}, 1000);

// socket.on("connect", (hi) => {
//   //   displayMessage(`You connected with id: ${socket.id}`);
//   socket.on("send-message", (value) => {
//     console.log(value);
//   });

//     console.log("process.argv>>>>", process.argv);
//   const value2 = process.argv.pop();
//     console.log(value2);
//   socket.emit("recieved-msg", value2);
//     console.log(value2);
// });
