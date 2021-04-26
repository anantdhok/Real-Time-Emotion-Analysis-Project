const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
require("dotenv").config();

// Application
const app = express(),
  port = process.env.PORT || 5000,
  server = http.createServer(app),
  io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

// Initialize
server.listen(port, () => {
  console.log(`Server is running on ${port}.`);
})

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully."));

// Routes
const apiRouter = require("./routes/api");
const authRoutes = require("./routes/auth");
const commRouter = require("./routes/comm");
const userRouter = require("./routes/user");
app.use("/api/", apiRouter);
app.use("/api/auth", authRoutes);
app.use("/api/community", commRouter);
app.use("/api/user", userRouter);

io.on("connection", (socket) => {
  let room = "";
  // sending to all clients in the room (channel) except sender
  socket.on("message", (message) => socket.broadcast.to(room).emit("message", message));

  socket.on("find", () => {
    const url = socket.request.headers.referer.split("/");
    room = url[url.length - 1];
    const sr = io.sockets.adapter.rooms[room];
    if (sr === undefined) {
      // no room with such name is found so create it
      socket.join(room);
      socket.emit("create");
    } else if (sr.length === 1) socket.emit("join");
    else socket.emit("full", room);
    // max two clients
  });

  socket.on("auth", (data) => {
    data.sid = socket.id;
    // sending to all clients in the room (channel) except sender
    socket.broadcast.to(room).emit("approve", data);
  });

  socket.on("accept", (id) => {
    io.sockets.connected[id].join(room);
    // sending to all clients in 'game' room(channel), include sender
    io.in(room).emit("bridge");
  });

  socket.on("reject", () => socket.emit("full"));

  socket.on("leave", () => {
    // sending to all clients in the room (channel) except sender
    socket.broadcast.to(room).emit("hangup");
    socket.leave(room);
  });
});
