var GAMES = []

function resetGAMES(){
  GAMES = [] 
}

function createGame(name){
  const newGame = {gameName: name, ideas: [], votes: {}, round: 'lobby'}
  GAMES.push(newGame)
  return (newGame)
}

function getGameState(gameName) {
  try {
    const gameState = GAMES.find(game => game.gameName === gameName)
    return {gameName: gameState.gameName, ideas: gameState.ideas, round: gameState.round}
  }
  catch(error){
    console.error('getGameState failed', error)
  }
}

function addIdea(idea, gameName) {
  try {
    GAMES.find(game => game.gameName === gameName).ideas.push(idea)
    GAMES.find(game => game.gameName === gameName).votes[idea] = []
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

module.exports = {
  getGameState,
  createGame,
  resetGAMES,
  addIdea,
  addVote,
  changeRound,
  GAMES,
}