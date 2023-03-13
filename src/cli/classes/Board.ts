import { EMPTY_CELL_SYMBOL } from '../../consts'
import Cell from './Cell'
import type Player from './Player'
import { type Unit } from './Units/Unit'

export interface BoardParameters {
  width: number
  height: number
  neutralLocations: Array<{ x: string, y: number, assignedTo?: string }>
}

/**
 * This class is responsible for everything related to the board.
 * It is responsible for creating the board, and for printing it.
 * It also has a method to get a cell from the board by its coordinates.
 * @class Board
 * @param {number} width - The width of the board.
 * @param {number} height - The height of the board.
 * @param {Array<{ x: string, y: number }>} neutralLocations - The control points of the board.
 */
export default class Board {
  private readonly width: number
  private readonly height: number

  private readonly board: Cell[][]
  private unitsOnBoard: Unit[]

  constructor ({ width, height, neutralLocations }: BoardParameters) {
    if (width < 5 || height < 5) {
      throw new Error('Board must have a width and height of at least 5')
    }

    if (width > 10 || height > 10) {
      throw new Error('Board must have a width and height of at most 10')
    }

    this.width = width
    this.height = height
    this.board = []
    this.unitsOnBoard = []

    for (let i = 0; i < height; i++) {
      this.board[i] = []
      for (let j = 0; j < width; j++) {
        const symbol = EMPTY_CELL_SYMBOL
        const controlPoint = false

        this.board[i][j] = new Cell({ symbol, controlPoint })
      }
    }

    neutralLocations.forEach(({ x, y, assignedTo }) => {
      const xIndex = x.charCodeAt(0) - 97
      const cell = this.board[xIndex][y]
      cell.setNeutralLocation(assignedTo)
    })
  }

  public getWidth (): number {
    return this.width
  }

  public getHeight (): number {
    return this.height
  }

  public getCell (x: string, y: number): Cell {
    const xIndex = x.charCodeAt(0) - 97
    return this.board[xIndex][y]
  }

  public attackUnit (attackerRow: string, attackerCol: number, attackedRow: string, attackedCol: number): void {
    const attackedCell = this.getCell(attackedRow, attackedCol)

    const attackedUnit = attackedCell.getUnit()
    attackedCell.unsetUnit()
    this.unitsOnBoard = this.unitsOnBoard.filter((unit) => unit !== attackedUnit)
  }

  public placeUnit (x: string, y: number, unit: Unit, player: Player): void {
    const xIndex = x.charCodeAt(0) - 97
    const validCells = this.getPossibleCells(x, y, 1)
    const factionMark = player.getFaction().symbol

    if (this.unitsOnBoard.find((unitOnBoard) => unitOnBoard.getSymbol() === unit.getSymbol())) {
      throw new Error('Unit is already on the board')
    }

    if (validCells.find((cell) => cell.getControllerSymbol() === factionMark)) {
      this.board[xIndex][y].setUnit(unit)
      this.unitsOnBoard.push(unit)
    } else {
      throw new Error('Unit must be placed next to a controlled zone')
    }
  }

  public isControlZone (row: string, col: number): boolean {
    const xIndex = row.charCodeAt(0) - 97

    if (this.isNotValidCell(xIndex, col)) {
      throw new Error("Cell doesn't exist")
    }

    const cell = this.board[xIndex][col]
    return cell.isNeutralLocation()
  }

  public controlZone (row: string, col: number, player: Player): void {
    const xIndex = row.charCodeAt(0) - 97
    const cell = this.board[xIndex][col]
    cell.takeControlPoint(player)
  }

  public getUnitOnPosition (row: string, col: number): Unit {
    const xIndex = row.charCodeAt(0) - 97

    if (this.isNotValidCell(xIndex, col)) {
      throw new Error("Cell doesn't exist")
    }

    const cell = this.board[xIndex][col]
    const unit = cell.getUnit()

    if (!unit) {
      throw new Error('There is no unit on this position')
    }

    return unit
  }

  public moveUnit (rowStart: string, colStart: number, rowEnd: string, colEnd: number): void {
    const xIndexStart = rowStart.charCodeAt(0) - 97
    const xIndexEnd = rowEnd.charCodeAt(0) - 97

    if (this.isNotValidCell(xIndexEnd, colEnd)) {
      throw new Error("Cell doesn't exist")
    }

    const unit = this.getUnitOnPosition(rowStart, colStart)
    const initialCell = this.board[xIndexStart][colStart]
    const finalCell = this.board[xIndexEnd][colEnd]

    const validCells = this.getPossibleCells(rowStart, colStart, unit.getMovementRange())

    if (validCells.includes(finalCell) && !finalCell.getUnit()) {
      initialCell.unsetUnit()
      finalCell.setUnit(unit)
    } else {
      throw new Error('Unit cannot move to this position')
    }
  }

  public hasUnitsPlaced (player: Player): boolean {
    const playerUnits = player.getPlayerUnits()

    return this.unitsOnBoard.some((unit) => playerUnits.find((playerUnit) => playerUnit === unit.getSymbol()))
  }

  /**
   * Converts the current board to a string.
   * @returns {string} The board as a string.
   */
  public toString (): string {
    const columnNumbers = Array.from(Array(this.width).keys())
    const rowNumbers = Array.from(Array(this.height).keys())
    let board = ' '.padEnd(4) + columnNumbers.join('  ')
    board += '\n'
    board += ' '.padEnd(4) + '-'.padEnd(this.width + (this.width - 1) * 2, '-')
    board += '\n'
    board += rowNumbers.map((rowNumber) => `${String.fromCharCode(rowNumber + 97)}|  ${this.board[rowNumber].join('  ')}`).join('\n')
    return board
  }

  public getPossibleCells (row: string, col: number, range: number): Cell[] {
    const xIndex = row.charCodeAt(0) - 97

    if (this.isNotValidCell(xIndex, col)) {
      throw new Error("Cell doesn't exist")
    }

    const cells = []
    for (let i = 1; i <= range; i++) {
      if (!this.isNotValidCell(xIndex + range, col)) {
        cells.push(this.board[xIndex + range][col])
      }
      if (!this.isNotValidCell(xIndex - range, col)) {
        cells.push(this.board[xIndex - range][col])
      }
      if (!this.isNotValidCell(xIndex, col + range)) {
        cells.push(this.board[xIndex][col + range])
      }
      if (!this.isNotValidCell(xIndex, col - range)) {
        cells.push(this.board[xIndex][col - range])
      }
    }

    return cells
  }

  private isNotValidCell (row: number, col: number): boolean {
    return row < 0 || row > this.width - 1 || col < 0 || col > this.height - 1
  }
}
