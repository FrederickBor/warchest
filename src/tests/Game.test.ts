import Game from '../cli/classes/Game'
import Player from '../cli/classes/Player'
import { BOARDS } from '../consts'

describe('Game class', () => {
  test('verify if the game is created correctly', () => {
    const playerOne = new Player({ name: 'Player 1', faction: { name: 'Wolf', symbol: 'W' }, leftControlMarkers: 3 })
    const playerTwo = new Player({ name: 'Player 2', faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: 3 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const game = new Game({ playerOne, playerTwo, boardSettings: BOARDS['5X5'] })
    expect(playerOne.getPlayerUnits().length).toBeGreaterThan(0)
    expect(playerTwo.getPlayerUnits().length).toBeGreaterThan(0)
  })
})
