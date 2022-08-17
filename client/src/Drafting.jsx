// for generating unique keys
import { v4 as uuid } from 'uuid';

function Drafting(props) {
  const {game, setIdea, addIdea} = props.state

  return (
      <>
        <h1>Drafting</h1>
        {game.ideas.map(idea => <ul key={uuid()}>{idea}</ul>)}        
            <input
              placeholder="Idea..."
              onChange={(event) => {
                setIdea(event.target.value);
              }}
            />
          <button onClick={addIdea}> Add Idea</button>
      </>
  );
}

export default Drafting;