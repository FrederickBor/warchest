import Board from '../cli/classes/Board'
import Player from '../cli/classes/Player'
import { Knight } from '../cli/classes/Units/Knight'
import { Mercenary } from '../cli/classes/Units/Mercenary'
import { BOARDS, CROW_FACTION_SYMBOL, WOLF_FACTION_SYMBOL } from '../consts'

describe('Board class', () => {
  test('verify if the board is created correctly', () => {
    const board = new Board(BOARDS['5X5'])
    expect(board.getWidth()).toEqual(5)
    expect(board.getHeight()).toEqual(5)

    BOARDS['5X5'].neutralLocations.forEach(({ x, y, assignedTo }) => {
      const cell = board.getCell(x, y)
      expect(cell.isNeutralLocation()).toEqual(true)
      expect(cell.getControllerSymbol()).toEqual(assignedTo)
    })
  })

  test('throw error if board is created with width or height less than 5', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const board = new Board({ width: 4, height: 4, neutralLocations: [] })
    }).toThrowError('Board must have a width and height of at least 5')
  })

  test('throw error if board is created with width or height greater than 10', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const board = new Board({ width: 11, height: 11, neutralLocations: [] })
    }).toThrowError('Board must have a width and height of at most 10')
  })

  test('verify that placeUnit method works correctly', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }] })
    const player = new Player({ name: 'Player 1', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    const unit = new Mercenary()
    board.placeUnit('a', 1, unit, player)
    expect(board.getCell('a', 1).getUnit()).toEqual(unit)
  })

  test('throws error when placing the same unit twice', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }] })
    const player = new Player({ name: 'Player 1', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    const unit1 = new Mercenary()
    const unit2 = new Mercenary()
    board.placeUnit('a', 1, unit1, player)
    expect(() => { board.placeUnit('a', 2, unit2, player) }).toThrowError('Unit is already on the board')
  })

  test('throws error when placing a unit far from a controled zone', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }] })
    const player = new Player({ name: 'Player 1', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    const unit = new Mercenary()
    expect(() => { board.placeUnit('a', 0, unit, player) }).toThrowError('Unit must be placed next to a controlled zone')
  })

  test('verify that unit can attack', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }, { x: 'b', y: 2, assignedTo: WOLF_FACTION_SYMBOL }] })
    const playerOne = new Player({ name: 'Player 1', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    const playerTwo = new Player({ name: 'Player 2', faction: { name: 'Wolf', symbol: 'W' }, leftControlMarkers: 3 })
    const unitP1 = new Mercenary()
    const unitP2 = new Knight()
    board.placeUnit('a', 1, unitP1, playerOne)
    board.placeUnit('b', 1, unitP2, playerTwo)
    expect(board.getCell('a', 1).getUnit()).toEqual(unitP1)
    expect(board.getCell('b', 1).getUnit()).toEqual(unitP2)
    board.attackUnit('a', 1, 'b', 1)
    expect(board.getCell('b', 1).getUnit()).toEqual(undefined)
  })

  test('verify that a given position is a control zone', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }, { x: 'b', y: 2, assignedTo: WOLF_FACTION_SYMBOL }] })
    expect(board.isControlZone('a', 2)).toEqual(true)
    expect(board.isControlZone('b', 2)).toEqual(true)
    expect(board.isControlZone('c', 2)).toEqual(false)
    expect(() => { board.isControlZone('a', 11) }).toThrowError('Cell doesn\'t exist')
  })

  test('verify move unit', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }, { x: 'b', y: 2, assignedTo: WOLF_FACTION_SYMBOL }] })
    const playerOne = new Player({ name: 'Player 1', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    const playerTwo = new Player({ name: 'Player 2', faction: { name: 'Wolf', symbol: 'W' }, leftControlMarkers: 3 })
    const unitP1 = new Mercenary()
    const unitP2 = new Knight()
    board.placeUnit('a', 1, unitP1, playerOne)
    board.placeUnit('b', 1, unitP2, playerTwo)
    expect(board.getCell('a', 1).getUnit()).toEqual(unitP1)
    expect(board.getCell('b', 1).getUnit()).toEqual(unitP2)
    board.moveUnit('a', 1, 'a', 2)
    expect(board.getCell('a', 1).getUnit()).toEqual(undefined)
    expect(board.getCell('a', 2).getUnit()).toEqual(unitP1)
  })

  test('verify that a zone can be controlled', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }] })
    const playerOne = new Player({ name: 'Player 1', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    const unitP1 = new Mercenary()
    board.placeUnit('a', 1, unitP1, playerOne)
    expect(board.getCell('a', 1).getUnit()).toEqual(unitP1)
    board.moveUnit('a', 1, 'a', 2)
    expect(board.getCell('a', 1).getUnit()).toEqual(undefined)
    expect(board.getCell('a', 2).getUnit()).toEqual(unitP1)
    board.controlZone('a', 2, playerOne)
    expect(board.getCell('a', 2).getControllerSymbol()).toEqual(playerOne.getFaction().symbol)
  })

  test('verify that can get the correct unit from a position', () => {
    const board = new Board({ width: 5, height: 5, neutralLocations: [{ x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL }] })
    const playerOne = new Player({ name: 'Player 1', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    const unitP1 = new Mercenary()
    board.placeUnit('a', 1, unitP1, playerOne)
    expect(board.getUnitOnPosition('a', 1)).toEqual(unitP1)
  })
})
