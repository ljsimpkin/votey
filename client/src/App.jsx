import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

import Menu from "./Menu"
import Drafting from "./Drafting"
import Voting from "./Voting"
import Results from "./Results"

const socket = io.connect("https://votal.herokuapp.com:18895");
// const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Game States
  const [game, setGame] = useState({gameName: "", ideas: [], phase: ""})
  const [idea, setIdea] = useState()
  const [results, setResults] = useState([])

  // Render a new idea when 
  useEffect(() => {
    socket.on("receive_client_game", (gameReceived) => {
      setGame(gameReceived)
    });
    socket.on("receive_results", (resultsReceived) => {
      setResults(resultsReceived)
    });
  }, [socket]);

  // Join an existing game and then update the game
  function joinRoom(){
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

  // Add an idea to the game
  function addIdea(){
    socket.emit("add_idea", {room, idea});
  }

  // changes the game round forward or back
  function changeRound(direction){
    socket.emit('change_round', {gameName: game.gameName, direction: direction})
  }

  function vote(idea){
    socket.emit("add_vote", {gameName: game.gameName, idea: idea})
  }

  function getResults(){
    socket.emit("get_results", game.gameName)
  }

  return (
    <div className="App">

      {!game.gameName && <Menu state={{setRoom, joinRoom}}/>}
      {game.round === "lobby" && <h1>Lobby</h1>}
      {game.round === "drafting" && <Drafting state={{game, setIdea, addIdea}}/>}
      {game.round === "voting" && <Voting state={{game, vote}}/>}
      {game.round === "results" && <Results state={{results, getResults}}/>}

      {game.gameName && 
        <>
          <button onClick={()=>{changeRound("back")}}>Back</button>
          <button onClick={()=>{changeRound("next")}}>Next</button>
        </>
      }

    </div>
  );
}

export default App;