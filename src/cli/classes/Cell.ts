import { type Unit } from './Units/Unit'

interface CellAttributes {
  symbol: string
  controlPoint: boolean
}

export default class Cell {
  private symbol: string
  private controlPoint: boolean
  private unit: Unit | null

  constructor ({ symbol, controlPoint }: CellAttributes) {
    this.symbol = symbol
    this.controlPoint = controlPoint
    this.unit = null
  }

  isEmpty (): boolean {
    return this.unit === null
  }

  setUnit ({ unit }: { unit: Unit }): void {
    this.unit = unit
  }

  unsetUnit (): void {
    this.unit = null
  }

  isNeutralLocation (): boolean {
    return this.controlPoint
  }

  setNeutralLocation ({ symbol }: { symbol: string }): void {
    this.symbol = symbol
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
