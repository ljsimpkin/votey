const lib = require('./gameLib.js');

beforeEach(() => {
});

describe('createGame(gameName)', () => {
  it('returns a game object with game name string and ideas array', () => {
    const expected = {gameName: "newGame", ideas: [], votes: {}, round: 'drafting'}
    const actual = lib.createGame("newGame")
    expect(expected).toStrictEqual(actual)
  })
  it('adds a new game to the games object', () => {
    lib.createGame("newGame")
    console.log('newgames called Liam?', lib.GAMES)

    const expected = [{gameName: "newGame", ideas: [], votes: {}, round: 'drafting'}]
    const actual = lib.GAMES

    expect(actual).toHaveLength(1)
    expect(actual).toStrictEqual(expected)
  })
})

describe('getGameState(gameName)', () => {
  it('returns gameState with name and ideas not votes', () => {
    lib.createGame("newGame")
    const expected = {gameName: "newGame", ideas: []}
    const actual = lib.getGameState('newGame')
    expect(expected).toStrictEqual(actual)
  })
})

describe('addIdea(idea, gameName)', () => {
  it('adds a new idea to the gameState', () => {
    lib.createGame('newGame')
    lib.addIdea('awesomeNewIdea', 'newGame')

    const expected = {gameName: "newGame", ideas: ['awesomeNewIdea']}
    const actual = lib.getGameState('newGame')

    expect(expected).toStrictEqual(actual)
  })
  it.todo('does not add the exact same idea')
  it.todo('handles empty idea string')
  it.todo('handles multiple calls at once')
})

describe('addVote(gameName, idea, token)', () => {
  it('adds a new vote to gameState', () => {
    lib.createGame('newGame')
    lib.addIdea('idea1','newGame')
    lib.addVote('newGame', 'idea1', 'token1')

    const expected = {idea1 : ['token1']}
    const actual = lib.GAMES[0].votes
    
    expect(expected).toStrictEqual(actual)
  })
  it('only adds one vote per user', () => {
    lib.createGame('newGame')
    lib.addIdea('idea1','newGame')
    lib.addVote('newGame', 'idea1', 'token1')
    lib.addVote('newGame', 'idea1', 'token1')

    const expected = {idea1 : ['token1']}
    const actual = lib.GAMES[0].votes

    expect(expected).toStrictEqual(actual)
  })
  it.todo('throws an error when recieved new idea')
  it.todo('does not allow a user to vote on their own idea')
})

describe('generateGameName()', ()=> {
  it.todo('returns a random 4 character string')
})

describe('hasPermission(gameName, token)', () => {
  it.todo('validates token has permission to play game')
})