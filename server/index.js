const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const gameLib = require('./gameLib.js');
const { Socket } = require("dgram");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (gameName) => {
    socket.join(gameName);
    gameLib.createGame(gameName)
  });

  socket.on("add_idea", (data) => {
    gameLib.addIdea(data.idea, data.room)
    const game = gameLib.getGameState(data.room)
    io.to(data.room).emit("receive_ideas", game);
  });

  socket.on("send_client_game", (data) => {
    const gameData = gameLib.getGameState(data.room)
    io.to(socket.id).emit("receive_client_game", gameData);
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});