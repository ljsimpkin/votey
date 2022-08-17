function Drafting(props) {
  const {game, setIdea, addIdea} = props.state

  return (
    <div className="App">
      <>
      <h1>Drafting</h1>
        {game.ideas.map(idea => <ul key={idea}>{idea}</ul>)}        
            <input
              placeholder="Idea..."
              onChange={(event) => {
                setIdea(event.target.value);
              }}
            />
          <button onClick={addIdea}> Add Idea</button>
      </>
    </div>
  );
}

export default Drafting;