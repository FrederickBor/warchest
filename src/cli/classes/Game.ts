import { AVAILABLE_UNITS } from '../../consts'
import Board, { type BoardParameters } from './Board'
import type Player from './Player'
import { shuffleArray } from './utilts'

interface GameAttributes {
  playerOne: Player
  playerTwo: Player
  boardSettings: BoardParameters
}

export default class Game {
  private readonly playerOne: Player
  private readonly playerTwo: Player
  private initiative: Player
  private readonly board: Board

  constructor ({ playerOne, playerTwo, boardSettings }: GameAttributes) {
    this.playerOne = playerOne
    this.playerTwo = playerTwo
    this.board = this.createBoard(boardSettings)
    this.initiative = Math.floor(Math.random() * 2) === 0 ? playerOne : playerTwo

    this.assignUnitsToPlayers()
  }

  public assignUnitsToPlayers (): void {
    let availableUnits = [
      AVAILABLE_UNITS.Berserker,
      AVAILABLE_UNITS.Mercenary,
      AVAILABLE_UNITS.Knight,
      AVAILABLE_UNITS.Cavalry
    ]
    availableUnits = shuffleArray(availableUnits)

    if (this.initiative === this.playerOne) {
      this.playerTwo.initialUnitAssignation(availableUnits.slice(0, 2))
      this.playerOne.initialUnitAssignation(availableUnits.slice(2, 4))
    } else {
      this.playerTwo.initialUnitAssignation(availableUnits.slice(0, 2))
      this.playerOne.initialUnitAssignation(availableUnits.slice(2, 4))
    }
  }

  public recruitUnit (): void {
    throw new Error('Method not implemented.')
  }

  public moveUnit (): void {
    throw new Error('Method not implemented.')
  }

  public attackUnit (): void {
    throw new Error('Method not implemented.')
  }

  public canMoveUnit (): boolean {
    throw new Error('Method not implemented.')
  }

  public useTactic (): void {
    throw new Error('Method not implemented.')
  }

  public placeUnittOnBoard (): void {
    throw new Error('Method not implemented.')
  }

  public hasWinner (): Player | null {
    throw new Error('Method not implemented.')
  }

  public controlZone (): void {
    throw new Error('Method not implemented.')
  }

  public getInitiative (): Player {
    return this.initiative
  }

  public setInitiative (player: Player): void {
    this.initiative = player
  }

  private createBoard (boardSettings: BoardParameters): Board {
    return new Board(boardSettings)
  }

  private deleteUnit (): void {
    throw new Error('Method not implemented.')
  }
}
