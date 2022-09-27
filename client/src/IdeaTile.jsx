function IdeaTile(props) {
  const {idea, game} = props.state

  return (
    <div className="ideaTile">
      <div className="idea">{idea} </div>
      <div className="vote">{game.ideas[idea].length}</div>
    </div>
  );
}

export default IdeaTile;


