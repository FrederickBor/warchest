import { CONTROL_POINT_SYMBOL, EMPTY_CELL_SYMBOL } from '../../consts'
import Cell from './Cell'

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
      let symbol = CONTROL_POINT_SYMBOL
      if (assignedTo !== undefined) {
        symbol = assignedTo
      }
      cell.setNeutralLocation({ symbol })
    })
  }

  getWidth (): number {
    return this.width
  }

  getHeight (): number {
    return this.height
  }

  getCell ({ x, y }: { x: string, y: number }): Cell {
    const xIndex = x.charCodeAt(0) - 97
    return this.board[xIndex][y]
  }

  /**
   * Converts the current board to a string.
   * @returns {string} The board as a string.
   */
  toString (): string {
    const columnNumbers = Array.from(Array(this.width).keys())
    const rowNumbers = Array.from(Array(this.height).keys())
    let board = ' '.padEnd(4) + columnNumbers.join('  ')
    board += '\n'
    board += ' '.padEnd(4) + '-'.padEnd(this.width + (this.width - 1) * 2, '-')
    board += '\n'
    board += rowNumbers.map((rowNumber) => `${String.fromCharCode(rowNumber + 97)}|  ${this.board[rowNumber].join('  ')}`).join('\n')
    return board
  }
}
