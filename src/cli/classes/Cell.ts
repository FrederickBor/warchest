interface CellAttributes {
  symbol: string
  controlPoint: boolean
}

export default class Cell {
  private symbol: string
  private controlPoint: boolean
  private empty: boolean

  constructor ({ symbol, controlPoint }: CellAttributes) {
    this.symbol = symbol
    this.controlPoint = controlPoint
    this.empty = true
  }

  isEmpty (): boolean {
    return this.empty
  }

  setOccupied (isEmpty: boolean): void {
    this.empty = isEmpty
  }

  isControlPoint (): boolean {
    return this.controlPoint
  }

  setControlPoint (): void {
    this.symbol = '@'
    this.controlPoint = true
  }

  takeControlPoint (): void {
    if (!this.controlPoint) throw new Error("Can't take control point that isn't a control point")

    // TODO: Add player symbol
    this.symbol = 'W'
  }

  toString (): string {
    return this.symbol
  }
}
