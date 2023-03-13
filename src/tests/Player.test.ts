import Game from '../cli/classes/Game'
import Player from '../cli/classes/Player'
import { BOARDS } from '../consts'

describe('Player class', () => {
  let playerOne: Player
  let playerTwo: Player
  let game: Game
  let currentPlayer: Player

  beforeEach(() => {
    playerOne = new Player({ name: 'Player 1', faction: { name: 'Wolf', symbol: 'W' }, leftControlMarkers: 3 })
    playerTwo = new Player({ name: 'Player 2', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    game = new Game({ playerOne, playerTwo, boardSettings: BOARDS['5X5'] })
    currentPlayer = game.getCurrentPlayer()
  })

  test('creates a new player and check the constructor assigns the correct values', () => {
    const player = new Player({ name: 'Player 1', faction: { name: 'Wolf', symbol: 'W' }, leftControlMarkers: 3 })
    expect(player.getName()).toBe('Player 1')
    expect(player.getFaction().name).toEqual('Wolf')
    expect(player.getFaction().symbol).toEqual('W')
    expect(player.getLeftControlMarkers()).toEqual(3)
  })

  test('verify that the draw from bag method give the player 3 units', () => {
    playerOne.drawFromBag()
    playerTwo.drawFromBag()
    expect(playerOne.getHand().length).toEqual(3)
    expect(playerTwo.getHand().length).toEqual(3)
  })

  test('verify that the player can discard a unit', () => {
    currentPlayer.drawFromBag()
    const unitToDiscard = currentPlayer.getHand()[0]
    currentPlayer.discardUnit(unitToDiscard)
    expect(currentPlayer.getHand().length).toEqual(2)
    expect(currentPlayer.getDiscardPile().length).toEqual(1)
  })

  test('verify that the player can play a unit', () => {
    currentPlayer.drawFromBag()
    const unitToPlay = currentPlayer.getHand()[0]
    if (currentPlayer.getFaction().symbol === 'W') {
      game.placeUnitOnBoard('e', 1, unitToPlay)
    } else {
      game.placeUnitOnBoard('a', 1, unitToPlay)
    }
    expect(currentPlayer.getHand().length).toEqual(2)
  })

  test('verify that player can forfeit the game', () => {
    currentPlayer.forfeitGame()
    expect(currentPlayer.hasForfeited()).toEqual(true)
  })

  test('verify that the player has 2 types of units', () => {
    expect(currentPlayer.getPlayerUnits().length).toEqual(2)
  })

  test('verify that the player have a non-empty initail unit supply', () => {
    expect(currentPlayer.getUnitSupply().length).toBeGreaterThan(0)
  })

  test('verify that the control marker updates correctly', () => {
    currentPlayer.setLeftControlMarkers(1)
    expect(currentPlayer.getLeftControlMarkers()).toEqual(1)
  })

  test('verify that the player can win by setting all their markers', () => {
    currentPlayer.setLeftControlMarkers(0)
    expect(game.hasWinner()).not.toEqual(null)
  })

  test('verify that the player can recruit a unit', () => {
    currentPlayer.drawFromBag()
    const unitToRecruit = currentPlayer.getPlayerUnits()[0]
    const unitSupplyCount = currentPlayer.getUnitSupply().length
    currentPlayer.recruitUnit(unitToRecruit)
    expect(currentPlayer.getUnitSupply().length).toEqual(unitSupplyCount - 1)
  })

  test('verify that the bag is refilled with the discard pile', () => {
    currentPlayer.drawFromBag()
    currentPlayer.getHand().forEach((unit) => {
      currentPlayer.discardUnit(unit)
    })
    currentPlayer.drawFromBag()
    currentPlayer.getHand().forEach((unit) => {
      currentPlayer.discardUnit(unit)
    })
    currentPlayer.drawFromBag()
    expect(currentPlayer.getDiscardPile().length).toEqual(0)
  })

  test('Player toString method returns a string', () => {
    const playerString = currentPlayer.toString()
    expect(typeof playerString).toEqual('string')
  })
})
