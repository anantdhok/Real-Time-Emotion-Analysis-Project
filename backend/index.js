const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
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
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Database
mongoose
  .connect(process.env.DATABASE, {
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
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    console.log(data.signalData);
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
