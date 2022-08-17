import { v4 as uuid } from 'uuid';

function Results(props) {
  const {results, getResults} = props.state

  return (
    <>
      <h1>Results</h1>
      <button onClick={()=>{getResults()}}>get results</button>
      {results.map(result => <ul key={uuid()}>{result.idea} {result.votes}</ul>)}        
    </>
  );
}

export default Results;