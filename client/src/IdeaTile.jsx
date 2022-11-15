function IdeaTile(props) {
  const {idea, game} = props.state

  return (
    <div className="ideaTile">
      <div className="idea">{idea[0]} </div>
      <div className="vote">{game.ideas[idea[0]].length}</div>
    </div>
  );
}

export default IdeaTile;


