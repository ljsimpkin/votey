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
  it('removes only the users vote', () => {
    let mockGAMES = [{gameName: 'newGame', ideas: {idea1: ['id1', 'id2', 'id3']}}]
    lib.addVote('newGame', 'idea1', 'id1', mockGAMES)

    const expected = {idea1: ['id2', 'id3']}
    const received = mockGAMES[0].ideas
    expect(received).toStrictEqual(expected)
  })
  it.only('returns ideas ordered by highest number of votes', () => {
    let mockGAMES = [{gameName: 'newGame', ideas: {idea1: ['id1', 'id2'], idea2: ['id1', 'id2', 'id3'], idea3: ['id1']}}]
    lib.addVote('newGame', 'idea1', 'id1', mockGAMES)

    const expected = {idea2: ['id1', 'id2', 'id3'], idea1: ['id1', 'id2'], idea3: ['id1']}
    const received = mockGAMES[0].ideas
    console.log(received)
    expect(received).toStrictEqual(expected)
  })
  it.todo('does not add undefined')
})

describe('sortObj(ideas) sorts by number of votes', () => {
  it.only('returns sorted object of votes', () => {
    let object = {idea1: ['id1', 'id2'], idea2: ['id1', 'id2', 'id3'], idea3: ['id1']}

    const expected = {idea2: ['id1', 'id2', 'id3'], idea1: ['id1', 'id2'], idea3: ['id1']}
    const received = lib.sortObject(object)
    expect(received).toStrictEqual(expected)
  })
} )
