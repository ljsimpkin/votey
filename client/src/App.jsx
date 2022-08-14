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
  const [game, setGame] = useState({gameName: "", ideas: ["test init", "test init 2"]})
  const [idea, setIdea] = useState()

  function updateGame(){
    socket.emit("send_client_game", {room});
    socket.on("receive_client_game", (gameReceived) => {
      setGame(gameReceived)
    });
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

      <div>
        {game.ideas.map(idea => <ul>{idea}</ul>)}

        <button onClick={updateGame}> Refresh ideas</button>

        <input
        placeholder="Idea..."
        onChange={(event) => {
          setIdea(event.target.value);
        }}
        />
        <button onClick={addIdea}> Add Idea</button>
      </div>

      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;