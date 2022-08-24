var GAMES = []

function createGame(name, socketId, db = GAMES){
  const newGame = {gameName: name, ideas: {}, round: 'lobby'}
  db.push(newGame)
  return (newGame)
}

// get game state and return null if game does not exist
function getGameState(gameName, db = GAMES) {
  try {
    const gameState = db.find(game => game.gameName === gameName)
    if (gameState) {
      return {gameName: gameState.gameName, ideas: gameState.ideas, round: gameState.round}
    }
    return null
  }
  catch(error){
    console.error('getGameState failed', error)
  }
}

// add idea and userid to game
function addIdea(idea, gameName, socketId, db = GAMES) {
  try {
    const game = db.find(game => game.gameName === gameName)
    db.find(game => game.gameName === gameName).ideas[idea] = [socketId]
  }
  catch(error){
    console.error('addIdea failed', error.message)
  }
}

// add vote adds a vote or if already voted toggles vote off
function addVote(gameName, idea, token, db = GAMES){
  const game = db.find(game => game.gameName === gameName)
  const indexOfId = game.ideas[idea].indexOf(token)
  if (indexOfId >= 0){
    game.ideas[idea].splice(indexOfId,1)
  } else {
    game.ideas[idea].push(token)
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

module.exports = {
  getGameState,
  createGame,
  addIdea,
  addVote,
  changeRound,
  generateGameCode,
}

// utils

// create a alpha numeric game code of length
function generateGameCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

// use thiis utils function with results.sort(ascending) to sort the votes
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