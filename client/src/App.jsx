import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

import Menu from "./Menu"
import Lobby from "./Lobby";
import Drafting from "./Drafting"

const IS_PROD = process.env.NODE_ENV === "production";
const URL = IS_PROD ? "https://votal.herokuapp.com" : "http://localhost:3001";
const socket = io.connect(URL, { transports : ['websocket'] });
console.log('SOCKET URL ===', URL)

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Game States
  const [game, setGame] = useState({})
  const [idea, setIdea] = useState()
  const [results, setResults] = useState([])

  // Render a new idea when 
  useEffect(() => {
    socket.on("receive_client_game", (gameReceived) => {
      setGame(gameReceived)
      setRoom(gameReceived.gameName)
    });
    socket.on("receive_error_message", (message) => {
      alert(message)
    })
  }, [socket]);

  // Join an existing game and then update the game
  function joinRoom(){
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

  // Creates a new game with a random 4 letter code
  function createGame(){
    socket.emit("create_game")
  }

  // Add an idea to the game
  function addIdea(){
    socket.emit("add_idea", {room, idea});
  }

  // changes the game round forward or back
  function changeRound(direction){
    socket.emit('change_round', {gameName: game.gameName, direction: direction})
  }

  // casts your vote!
  function vote(idea){
    socket.emit("add_vote", {gameName: game.gameName, idea: idea})
  }
  
  // Changes the colour of the tile indicating if person has voted or not
  function hasVoted(idea){
    return(game.ideas[idea].find(id => id === socket.id) || 0)
  }

  return (
    <div className="App">
      {!game.gameName && <Menu state={{setRoom, joinRoom, createGame}}/>}
      {game.round === "lobby" && <Lobby state={{changeRound, game}} />}
      {game.round === "drafting" && <Drafting state={{game, setIdea, addIdea, vote, hasVoted, changeRound}}/>}
    
      {/* <button onClick={()=>{changeRound("back")}}>Back</button>
      <button onClick={()=>{changeRound("next")}}>Next</button> */}
    </div>
  );
}

export default App;

