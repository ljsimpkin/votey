function IdeaTile(props) {
  const {idea, game} = props.state

  return (
    <div claddName="ideaTile">
      {idea} {game.ideas[idea].length}
      {/* <div className="idea">{idea}</div> 
      <div className="vote">{game.ideas[idea].length}</div> */}
    </div>
  
  );
}

export default IdeaTile;


