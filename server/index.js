const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const gameLib = require('./gameLib.js');
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
  // console.log(`user ${socket.id} connected`)

  // updates all client gameStates
  function sendClientsGame(gameName){
    const gameData = gameLib.getGameState(gameName)
    io.to(gameName).emit("receive_client_game", gameData);
  }

  // sends client error when game can't be found
  function sendClientError(message){
    io.to(socket.id).emit("receive_error_message", message);
  }

  // Creates a new game with a random 4 digit gameName
    socket.on("create_game", () => {
      const gameCode = gameLib.generateGameCode(3)
      const game = gameLib.createGame(gameCode, socket.id)
      socket.join(gameCode);
      sendClientsGame(gameCode)
    });

  // Join a room, create a game, and then update everyones game
  socket.on("join_room", (gameCode) => {
    const game = gameLib.getGameState(gameCode)
    if (game){
      socket.join(gameCode);
      sendClientsGame(gameCode)
    } else {
      sendClientError('error game not found')
    }
    
  });

  // Change game round next and backwards
  socket.on("change_round", (data) => {
    const {gameName, direction} = data
    gameLib.changeRound(gameName, direction)
    sendClientsGame(gameName)
  })

  // Adds an idea to the client's game
  socket.on("add_idea", (data) => {
    const {idea, room} = data
    gameLib.addIdea(idea, room, socket.id)
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