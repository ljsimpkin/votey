// for generating unique keys
import { v4 as uuid } from 'uuid';
import IdeaTile from './IdeaTile';

function Drafting(props) {
  const {game, setIdea, addIdea, vote, hasVoted, changeRound} = props.state
  const ideas = Object.keys(game.ideas)

  return (
      <>
      <button onClick={()=>{changeRound("back")}}>Back</button>
      <div>
        <h1 className="gameTitle">Select and Submit</h1>
        <div className="tiles">
          {ideas.map(idea =>
            <button onClick={() => { vote(idea) }} className={ hasVoted(idea) ? "tile hasVoted" : "tile"} key={uuid()}>
                <IdeaTile state={{idea, game}}/>
            </button>
          )}
        </div>
      </div>
            
      <form className='messageBox' onSubmit={addIdea}>
        <input className='ideaTextBox'
          placeholder="Enter your awesome idea here..."
          onChange={(event) => {
            setIdea(event.target.value);
          }}
        />
        <button type="submit" className="submitIdea" >💡</button>
      </form>
      </>
  );
}

export default Drafting;