const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const gameLib = require('./gameLib.js');
const { Socket } = require("dgram");
const port = process.env.PORT || 3001

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: ["http://127.0.0.1:5173", "https://ljsimpkin.github.io/votey"],
    origin: "https://ljsimpkin.github.io/votey",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // updates all client gameStates
  function sendClientsGame(gameName){
    const gameData = gameLib.getGameState(gameName)
    io.to(gameName).emit("receive_client_game", gameData);
  }

  // Join a room,  create a game, and then update everyones game
  socket.on("join_room", (gameName) => {
    socket.join(gameName);
    gameLib.createGame(gameName)
    sendClientsGame(gameName)
  });

  // Change game round next and backwards
  socket.on("change_round", (data) => {
    const {gameName, direction} = data
    gameLib.changeRound(gameName, direction)
    sendClientsGame(gameName)
  })

  // Adds an idea to the client's game
  socket.on("add_idea", (data) => {
    gameLib.addIdea(data.idea, data.room)
    const game = gameLib.getGameState(data.room)
    sendClientsGame(data.room)
  });

  // Adds Client vote for an idea
  socket.on("add_vote", (data) => {
    const {gameName, idea} = data
    gameLib.addVote(gameName, idea, socket.id)
  })

  socket.on("get_results", (gameName) => {
    const results = gameLib.getResults(gameName)
    io.to(gameName).emit("receive_results", results);
  })

  
});

server.listen(port, () => {
  console.log("SERVER IS RUNNING");
});