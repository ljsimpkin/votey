function Menu(props) {
  const {setRoom, joinRoom} = props.state

  return (
    <div className="App">
      <>
        <h1>Create or join a game</h1>

        <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
      </>
    </div>
  );
}

export default Menu;