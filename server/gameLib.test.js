const lib = require('./gameLib.js');

describe('createGame(gameName)', () => {
  it('returns a game object', () => {
    const expected = {gameName: "newGame", ideas: [], votes: {}, round: 'lobby'}
    const actual = lib.createGame("newGame",[])
    expect(expected).toStrictEqual(actual)
  })
  it('adds a new game to the games object', () => {
    let mockGAMES = []
    lib.createGame("newGame", mockGAMES)

    const expected = [{gameName: "newGame", ideas: [], votes: {}, round: 'lobby'}]
    const actual = mockGAMES

    expect(actual).toHaveLength(1)
    expect(actual).toStrictEqual(expected)
  })
})

describe('getGameState(gameName)', () => {
  it('returns gameState with name and ideas not votes', () => {
    let mockGAMES = []
    lib.createGame("newGame", mockGAMES)

    const expected = {gameName: "newGame", ideas: [], round: "lobby"}
    const actual = lib.getGameState('newGame', mockGAMES)

    expect(expected).toStrictEqual(actual)
  })
})

describe('addIdea(idea, gameName)', () => {
  it('adds a new idea to the gameState', () => {
    let mockGAMES = []
    lib.createGame('newGame', mockGAMES)
    lib.addIdea('awesomeNewIdea', 'newGame', mockGAMES)

    const expected = {gameName: "newGame", ideas: ['awesomeNewIdea'], round: "lobby"}
    const actual = lib.getGameState('newGame', mockGAMES)

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

describe("getResults(gameName) returns and object array of ideas and voteNumberTotal ", () => {


  it('returns object array with ideas and votes in the correct order', () => {

    const mockGAMES = [{
      gameName: 'test',
      ideas: [ 'idea1', 'idea2', 'idea3' ],
      votes: {
        idea1: [ 'jPpQz8wkh8LOv9CpAAAL', 'aw-s_WqozXW-o3T_AAAH' ],
        idea2: [],
        idea3: [ 'I1cUna9MdRVTp3byAAAJ' ]
      },
      round: 'voting'
    }]

    const expected = [ { idea: "idea1", votes: 2 }, { idea: "idea3", votes:1 }, { idea: "idea2", votes: 0 } ]
    const actual = lib.getResults('test', mockGAMES)

    expect(expected).toStrictEqual(actual)
  })
})

// add something to a game before joining a room creates a bug
