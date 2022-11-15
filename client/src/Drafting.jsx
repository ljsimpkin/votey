// for generating unique keys
import { v4 as uuid } from 'uuid';
import IdeaTile from './IdeaTile';

function Drafting(props) {
  const {game, setIdea, addIdea, vote, hasVoted, changeRound} = props.state

  function compare( a, b ) {
    if ( a[1].length > b[1].length ){
      return -1;
    }
    if ( a[1].length < b[1].length ){
      return 1;
    }
    return 0;
  }

  var items = Object.keys(game.ideas).map(function(key) {
    return [key, game.ideas[key]];
  });

  items.sort(compare);

  return (
      <>
      <button onClick={()=>{changeRound("back")}}>QR CODE</button>
      <div>
        <h1 className="gameTitle">Select and Submit</h1>
        <div className="tiles">
          {items.map(idea =>
            <button onClick={() => { vote(idea[0]) }} className={ hasVoted(idea[0]) ? "tile hasVoted" : "tile"} key={uuid()}>
                <IdeaTile state={{ idea, game }}/>
            </button>
          )}
        </div>
      </div>
            
      <form className='messageBox' onSubmit={addIdea}>
        <input id="messageBox" className='ideaTextBox'
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