const lib = require('./gameLib.js');

describe('createGame(gameName)', () => {
  it('returns a game object', () => {
    const expected = {gameName: "newGame", ideas: {}, users: {socketId:"notReady"}, round: 'lobby'}
    const actual = lib.createGame("newGame", "socketId",[])
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
  it('returns null if game is not found', () => {
    let mockGAMES = []

    const expected = null
    const received = lib.getGameState('noGame', mockGAMES)

    expect(received).toStrictEqual(expected)
  })
})

describe('addIdea(idea, gameName)', () => {
  it('adds a new idea to the gameState', () => {
    let mockGAMES = [{gameName: "newGame", ideas: {}, round: "lobby"}]
    lib.addIdea('awesomeNewIdea', 'newGame', 'socketId', mockGAMES)

    const expected = {gameName: "newGame", ideas: {'awesomeNewIdea' : ['socketId']}, round: "lobby"}
    const actual = lib.getGameState('newGame', mockGAMES)

    expect(expected).toStrictEqual(actual)
  })
  it.todo('does not add the exact same idea')
  it.todo('handles empty idea string')
  it.todo('handles multiple calls at once')
})

describe('addVote(gameName, idea, token)', () => {
  it('adds a new vote to gameState', () => {
    let mockGAMES = [{gameName: 'newGame', ideas: {idea1: ['id1', 'id2', 'id3']}}]
    lib.addVote('newGame', 'idea1', 'id4', mockGAMES)

    const expected = {idea1: ['id1', 'id2', 'id3', 'id4']}
    const result = mockGAMES[0].ideas
    
    expect(expected).toStrictEqual(result)
  })
  it('toggles a vote thats added thereby only adding one vote per user', () => {
    let mockGAMES = [{gameName: 'newGame', ideas: {idea1: ['id1', 'id2', 'id3']}}]
    lib.addVote('newGame', 'idea1', 'id4', mockGAMES)
    lib.addVote('newGame', 'idea1', 'id4', mockGAMES)

    const expected = {idea1: ['id1', 'id2', 'id3']}
    const result = mockGAMES[0].ideas
    
    expect(expected).toStrictEqual(result)
  })
  it.todo('throws an error when recieved new idea')
  it.todo('does not allow a user to vote on their own idea')
})

// add something to a game before joining a room creates a bug
