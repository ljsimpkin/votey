var GAMES = []

function resetGAMES(){
  GAMES = [] 
}

function createGame(name){
  const newGame = {gameName: name, ideas: [], votes: {}, round: 'drafting'}
  GAMES.push(newGame)
  return (newGame)
}

function getGameState(gameName) {
  try {
    const gameState = GAMES.find(game => game.gameName === gameName)
    return {gameName: gameState.gameName, ideas: gameState.ideas}
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

module.exports = {
  getGameState,
  createGame,
  resetGAMES,
  addIdea,
  addVote,
  GAMES,
}