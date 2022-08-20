const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const gameLib = require('./gameLib.js');
// const { Socket } = require("dgram");
const PORT = process.env.PORT || 3001

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log('connection')

  // updates all client gameStates
  function sendClientsGame(gameName){
    const gameData = gameLib.getGameState(gameName)
    io.to(gameName).emit("receive_client_game", gameData);
  }

  function sendClientError(message){
    io.to(socket.id).emit("receive_error_message", message);
  }

  // Join a room,  create a game, and then update everyones game
  socket.on("join_room", (gameCode) => {
    const game = gameLib.getGameState(gameCode)
    if (game){
      socket.join(gameCode);
      gameLib.createGame(gameCode)
      sendClientsGame(gameCode)
    }
    sendClientError('error game not found')
  });

  // Creates a new game with a random 4 digit gameName
  socket.on("create_game", () => {
    const gameCode = gameLib.generateGameCode(4)
    gameLib.createGame(gameCode)
    socket.join(gameCode);
    sendClientsGame(gameCode)
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

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});