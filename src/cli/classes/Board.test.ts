import Board from './Board'

const EMPTY_BOARD_9X9 =
`    0  1  2  3  4  5  6  7  8
    -------------------------
a|  ·  ·  ·  ·  ·  ·  ·  ·  ·
b|  ·  ·  ·  ·  ·  ·  ·  ·  ·
c|  ·  ·  ·  ·  ·  ·  ·  ·  ·
d|  ·  ·  ·  ·  ·  ·  ·  ·  ·
e|  ·  ·  ·  ·  ·  ·  ·  ·  ·
f|  ·  ·  ·  ·  ·  ·  ·  ·  ·
g|  ·  ·  ·  ·  ·  ·  ·  ·  ·
h|  ·  ·  ·  ·  ·  ·  ·  ·  ·
i|  ·  ·  ·  ·  ·  ·  ·  ·  ·`

const INITIAL_BOARD_9X9 =
`    0  1  2  3  4  5  6  7  8
    -------------------------
a|  ·  ·  @  ·  ·  ·  @  ·  ·
b|  ·  ·  ·  ·  ·  ·  ·  ·  ·
c|  ·  ·  ·  ·  ·  ·  ·  ·  ·
d|  ·  @  ·  @  ·  ·  @  ·  ·
e|  ·  ·  ·  ·  ·  ·  ·  ·  ·
f|  ·  ·  @  ·  ·  @  ·  @  ·
g|  ·  ·  ·  ·  ·  ·  ·  ·  ·
h|  ·  ·  ·  ·  ·  ·  ·  ·  ·
i|  ·  ·  @  ·  ·  ·  @  ·  ·`

const controlPoints = [
  { x: 'a', y: 2 },
  { x: 'a', y: 6 },
  { x: 'd', y: 1 },
  { x: 'd', y: 3 },
  { x: 'd', y: 6 },
  { x: 'f', y: 2 },
  { x: 'f', y: 5 },
  { x: 'f', y: 7 },
  { x: 'i', y: 2 },
  { x: 'i', y: 6 }
]

describe('Board class', () => {
  test('creates a board with the correct dimensions', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.getWidth()).toBe(9)
    expect(board.getHeight()).toBe(9)
  })

  test('throws an error if the board width is too small', () => {
    expect(() => new Board({ width: 3, height: 5, controlPoints })).toThrow()
  })

  test('throws an error if the board height is too small', () => {
    expect(() => new Board({ width: 5, height: 3, controlPoints })).toThrow()
  })

  test('throws an error if the board width is too large', () => {
    expect(() => new Board({ width: 11, height: 5, controlPoints })).toThrow()
  })

  test('throws an error if the board height is too large', () => {
    expect(() => new Board({ width: 5, height: 11, controlPoints })).toThrow()
  })

  test('gets the correct value from position', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.getPosition({ x: 'a', y: 0 }).toString()).toBe('·')
  })

  test('throws an error when trying to take a position that is not a control point', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(() => { board.getPosition({ x: 'a', y: 0 }).takeControlPoint() }).toThrow()
  })

  test('returns the correct string representation of the empty board', () => {
    const board = new Board({ width: 9, height: 9, controlPoints: [] })
    expect(board.toString()).toBe(EMPTY_BOARD_9X9)
  })

  test('returns the correct string representation of the board', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.toString()).toBe(INITIAL_BOARD_9X9)
  })

  test('verifies that one position is empty', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.getPosition({ x: 'a', y: 0 }).isEmpty()).toBeTruthy()
  })

  test('verifies that a control point is empty', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.getPosition({ x: 'a', y: 2 })).toBeTruthy()
  })

  test('verifies that one position is a control point', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.getPosition({ x: 'a', y: 2 }).isControlPoint()).toBeTruthy()
  })

  test('verifies that one position is not a control point', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.getPosition({ x: 'a', y: 0 }).isControlPoint()).toBeFalsy()
  })

  // TODO: Place a unit over the control point and check that the control point is taken from the unit owner
  test.skip('sets the correct value when a control point has been taken from a player', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    board.getPosition({ x: 'a', y: 2 }).takeControlPoint()
    expect(board.getPosition({ x: 'a', y: 2 }).toString()).toBe('W')
  })

  // TODO: Place a unit over a position and check that it is occupied
  test.skip('verifies that one position is ocuppied', () => {
    const board = new Board({ width: 9, height: 9, controlPoints })
    expect(board.getPosition({ x: 'a', y: 2 }).isEmpty).toBeFalsy()
  })
})
