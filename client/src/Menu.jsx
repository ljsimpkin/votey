function Menu(props) {
  const {setRoom, joinRoom} = props.state

  return (
    <div className="Menu">

        <h1 className="menuTitle">Votey</h1>
        <h2 className="menuSubTitle">A party game voting app</h2>
        
        <div className="gameCodeTextBoxDiv">
          <input
              className="gameCodeTextBox"
              placeholder="Game code"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
        </div>

        <button className="buttons joinButton" onClick={joinRoom}>Join</button>
        
        <div className="createButtonDiv">
          <button className="buttons" >Create</button>
        </div>
        

        <h3 className="footerMessage">Made enthusiastically 
by Liam Simpkin 🔨</h3>

    </div>
  );
}

export default Menu;