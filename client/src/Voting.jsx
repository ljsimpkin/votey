// for generating unique keys
import { v4 as uuid } from 'uuid';

function Voting(props) {
  const {game, vote} = props.state

  return (
    <>
      <h1>Voting</h1>
      {game.ideas.map(idea => <button onClick={()=>{vote(idea)}} key={uuid()}>{idea}</button>)} 
    </>
  );
}

export default Voting;