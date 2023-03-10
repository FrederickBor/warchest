import { CONTROL_POINT_SYMBOL, EMPTY_CELL_SYMBOL } from '../../consts'
import Cell from './Cell'

interface BoardParameters {
  width: number
  height: number
  controlPoints: Array<{ x: string, y: number }>
}

export default class Board {
  private readonly width: number
  private readonly height: number

  private readonly board: Cell[][]

  constructor ({ width, height, controlPoints }: BoardParameters) {
    if (width < 4 || height < 4) {
      throw new Error('Board must have a width and height of at least 4')
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
        let symbol = EMPTY_CELL_SYMBOL
        let controlPoint = false

        if (controlPoints.some(({ x, y }) => x === String.fromCharCode(97 + i) && y === j)) {
          symbol = CONTROL_POINT_SYMBOL
          controlPoint = true
        }

        this.board[i][j] = new Cell({ symbol, controlPoint })
      }
    }
  }

  getWidth (): number {
    return this.width
  }

  getHeight (): number {
    return this.height
  }

  getPosition ({ x, y }: { x: string, y: number }): Cell {
    const xIndex = x.charCodeAt(0) - 97
    return this.board[xIndex][y]
  }

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
