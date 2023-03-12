import { AVAILABLE_ACTIONS, AVAILABLE_UNITS, ROYAL_UNIT_SYMBOL } from '../../consts'
import Board, { type BoardParameters } from './Board'
import type Player from './Player'
import { type Unit } from './Units/Unit'
import { shuffleArray } from './utils'

interface GameAttributes {
  playerOne: Player
  playerTwo: Player
  boardSettings: BoardParameters
}

export interface ActionReturn {
  row: string
  col: number
  action: AVAILABLE_ACTIONS
}

export default class Game {
  private readonly playerOne: Player
  private readonly playerTwo: Player
  private initiative: Player
  private currentPlayer: Player
  private readonly board: Board

  constructor ({ playerOne, playerTwo, boardSettings }: GameAttributes) {
    this.playerOne = playerOne
    this.playerTwo = playerTwo
    this.board = this.createBoard(boardSettings)
    this.initiative = Math.floor(Math.random() * 2) === 0 ? playerOne : playerTwo
    this.currentPlayer = this.initiative

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

  public recruitUnit (discardedUnitSymbol: string, recruitedUnitSymbol: string): void {
    if (discardedUnitSymbol !== ROYAL_UNIT_SYMBOL && discardedUnitSymbol !== recruitedUnitSymbol) {
      throw new Error('You can only recruit a unit of the same type as the one you discard')
    }

    const discardedUnit = this.currentPlayer.getUnitFromHand(discardedUnitSymbol)
    this.currentPlayer.discardUnit(discardedUnit)
    this.currentPlayer.recruitUnit(recruitedUnitSymbol)
  }

  public moveUnit (rowStart: string, colStart: number, rowEnd: string, colEnd: number): ActionReturn | undefined {
    const unitOnPosition = this.board.getUnitOnPosition(rowStart, colStart)
    const playerUnits = this.currentPlayer.getPlayerUnits()

    if (!playerUnits.includes(unitOnPosition.getSymbol() as AVAILABLE_UNITS)) {
      throw new Error('You can only move your units')
    }

    this.board.moveUnit(rowStart, colStart, rowEnd, colEnd)
    try {
      this.currentPlayer.discardUnit(unitOnPosition)
    } catch (e: any) {
      this.board.moveUnit(rowEnd, colEnd, rowStart, colStart)
      throw new Error(e)
    }

    const aditionalMovement = unitOnPosition.getAditionalMovement()
    if (aditionalMovement?.triggerAction === AVAILABLE_ACTIONS.MOVE) {
      return {
        row: rowEnd,
        col: colEnd,
        action: aditionalMovement.secondaryAction
      }
    }

    return undefined
  }

  public attackUnit (attackerRow: string, attackerCol: number, attackedRow: string, attackedCol: number, hasToDiscard: boolean = true): ActionReturn | undefined {
    const attackerUnit = this.board.getUnitOnPosition(attackerRow, attackerCol)
    const attackedUnit = this.board.getUnitOnPosition(attackedRow, attackedCol)
    const playerUnits = this.currentPlayer.getPlayerUnits()
    if (playerUnits.includes(attackerUnit.getSymbol() as AVAILABLE_UNITS) &&
      !playerUnits.includes(attackedUnit.getSymbol() as AVAILABLE_UNITS)) {
      const attackedCell = this.board.getCell(attackedRow, attackedCol)
      const validCells = this.board.getPossibleCells(attackerRow, attackerCol, attackerUnit.getAttackRange())

      if (!validCells.includes(attackedCell)) {
        throw new Error('Unit cannot attack that cell')
      }

      if (hasToDiscard) {
        this.currentPlayer.discardUnit(attackerUnit)
      }
      this.board.attackUnit(attackerRow, attackerCol, attackedRow, attackedCol)
    } else {
      throw new Error('You can only attack enemy units')
    }

    const aditionalMovement = attackerUnit.getAditionalMovement()
    if (aditionalMovement?.triggerAction === AVAILABLE_ACTIONS.ATTACK) {
      return {
        row: attackerRow,
        col: attackerCol,
        action: aditionalMovement.secondaryAction
      }
    }

    return undefined
  }

  // It is supposed that user can't place a unit if doesn't have any control zone
  // The option is removed from the menu if the user doesn't have any control zone
  public placeUnitOnBoard (row: string, col: number, unit: Unit): void {
    this.board.placeUnit(row, col, unit, this.currentPlayer)
    this.currentPlayer.discardUnit(unit)
  }

  public hasWinner (): Player | null {
    if (!this.currentPlayer.getLeftControlMarkers() ||
      (!this.getOpponent().hasUnitsToPlay() && !this.board.hasUnitsPlaced(this.getOpponent()))) {
      return this.currentPlayer
    } else if (this.currentPlayer.hasForfeited()) {
      return this.getOpponent()
    }

    return null
  }

  public controlZone (row: string, col: number, symbol: string): void {
    if (this.board.isControlZone(row, col, this.currentPlayer)) {
      const cell = this.board.getCell(row, col)
      if (cell.getControllerSymbol() === this.currentPlayer.getFaction().symbol) {
        throw new Error('You already control this zone')
      }

      const opponent = this.getOpponent()
      const unitToDiscard = this.currentPlayer.getUnitFromHand(symbol)
      this.currentPlayer.discardUnit(unitToDiscard)

      if (cell.getControllerSymbol() === opponent.getFaction().symbol) {
        opponent.setLeftControlMarkers(opponent.getLeftControlMarkers() + 1)
      }

      this.board.controlZone(row, col, this.currentPlayer)
      this.currentPlayer.setLeftControlMarkers(this.currentPlayer.getLeftControlMarkers() - 1)
    } else {
      throw new Error('You can only control a neutral zone')
    }
  }

  public getInitiative (): Player {
    return this.initiative
  }

  public setInitiative (symbol: string): void {
    const unitToDiscard = this.currentPlayer.getUnitFromHand(symbol)
    this.currentPlayer.discardUnit(unitToDiscard)
    this.initiative = this.currentPlayer
  }

  public getCurrentPlayer (): Player {
    return this.currentPlayer
  }

  public toggleCurrentPlayer (): void {
    this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne
  }

  public toString (): string {
    let gameString = `${this.board.toString()}\n`
    gameString += `${'='.repeat(26)}\n`
    gameString += `${this.initiative.getName().toUpperCase()} HAS THE INITIATIVE\n`
    gameString += this.currentPlayer.toString()
    return gameString
  }

  public forfeitGame (): void {
    this.currentPlayer.forfeitGame()
  }

  public setCurrentPlayerToInitiative (): void {
    this.currentPlayer = this.initiative
  }

  private createBoard (boardSettings: BoardParameters): Board {
    return new Board(boardSettings)
  }

  private getOpponent (): Player {
    return this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne
  }
}
