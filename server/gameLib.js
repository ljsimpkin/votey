var GAMES = []

function createGame(name, db = GAMES){
  const newGame = {gameName: name, ideas: [], votes: {}, round: 'lobby'}
  db.push(newGame)
  return (newGame)
}

function getGameState(gameName, db = GAMES) {
  try {
    const gameState = db.find(game => game.gameName === gameName)
    return {gameName: gameState.gameName, ideas: gameState.ideas, round: gameState.round}
  }
  catch(error){
    console.error('getGameState failed', error)
  }
}

function addIdea(idea, gameName, db = GAMES) {
  try {
    db.find(game => game.gameName === gameName).ideas.push(idea)
    db.find(game => game.gameName === gameName).votes[idea] = []
  }
  catch(error){
    console.error('addIdea failed', error.message)
  }
}

function addVote(gameName, idea, token){
  const game = GAMES.find(game => game.gameName === gameName)
  // check to see if token has submitted
  if (game.votes[idea].find(tokenElement => tokenElement === token)){
    console.error("Looks like you have already voted");
  } else {
    game.votes[idea].push(token)
  }
}

// Changes the game round from lobby to results
function changeRound(gameName, direction){
  const rounds = ["lobby", "drafting", "voting", "results"]
  const currentRound = GAMES.find(game => game.gameName === gameName).round
  const index = rounds.indexOf(currentRound)

  if ( direction === 'next' && index < rounds.length - 1) {
    GAMES.find(game => game.gameName === gameName).round = rounds[index + 1]
  } else if ( direction === 'back' && index > 0) {
    GAMES.find(game => game.gameName === gameName).round = rounds[index - 1] 
  }
}

// function ascending( a, b ) {
//   if ( Object.values(a)[0] > Object.values(b)[0] ){
//     return -1;
//   }
//   if ( Object.values(a)[0] < Object.values(b)[0] ){
//     return 1;
//   }
//   // if they are the same randomly shuffle them
//   if ( Object.values(a)[0] === Object.values(b)[0] ){
//     return Math.floor(Math.random() * (2 - 0) + 0) ? 1 : -1;
//   }

//   return 0;
// }

function ascending( a, b ) {
  if ( a.votes > b.votes ){
    return -1;
  }
  if ( a.votes < b.votes ){
    return 1;
  }
  // if they are the same randomly shuffle them
  if ( a.votes === b.votes ){
    return Math.floor(Math.random() * (2 - 0) + 0) ? 1 : -1;
  }

  return 0;
}

function getResults(gameName, db = GAMES){
  const game = db.find(game => game.gameName === gameName)
  const keys = Object.keys(game.votes)
  let results = []

  keys.forEach(key => {results.push({idea: key, votes: game.votes[key].length})})
  results.sort(ascending)
  
  return results
}

module.exports = {
  getGameState,
  createGame,
  addIdea,
  addVote,
  changeRound,
  getResults,
  GAMES,
}