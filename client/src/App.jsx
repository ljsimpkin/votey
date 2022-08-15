import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  // Game States
  const [game, setGame] = useState({gameName: "", ideas: [], phase: ""})
  const [idea, setIdea] = useState()

  function updateGame(){
    socket.emit("send_client_game", {room});
    socket.on("receive_client_game", (gameReceived) => {
      setGame(gameReceived)
    });
  }

  function nextPhase(){
    socket.emit("update_nextPhase", game.gameName)
    updateGame()
  }

  function changePhase(isForward){
    socket.emit("update_phase", {gameName: game.gameName, isForward: isForward})
    updateGame()
  }

  function addIdea(){
    socket.emit("add_idea", {room, idea});
  }

  useEffect(() => {
    socket.on("receive_ideas", (gameReceived) => {
      setGame(gameReceived)
    });
  }, [socket]);

  // Tutorial functions
  function joinRoom(){
    if (room !== "") {
      socket.emit("join_room", room);
      updateGame()
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      {!game.gameName && 
        <>
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
        </>
      }
      {game.gameName && <h3>Room: {room}</h3>}

      {game.round === "drafting" && 
        <div>
         {game.ideas.map(idea => <ul key={idea}>{idea}</ul>)}

         {/* <button onClick={updateGame}> Refresh ideas</button> */}

          <input
            placeholder="Idea..."
            onChange={(event) => {
              setIdea(event.target.value);
            }}
          />
         <button onClick={addIdea}> Add Idea</button>
        </div>
      }
      {game.round === "lobby" && <h1>Lobby</h1>}
      {game.round === "drafting" && <h1>drafting</h1>}
      {game.round === "voting" && <h1>Voting</h1>}
      {game.round === "results" && <h1>results</h1>}

      <button onClick={()=>{changePhase(false)}}>Previous</button>
      <button onClick={nextPhase}>Next</button>
    </div>
  );
}

export default App;