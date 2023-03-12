import { CONTROL_POINT_SYMBOL } from '../../consts'
import type Player from './Player'
import { type Unit } from './Units/Unit'

interface CellAttributes {
  symbol: string
  controlPoint: boolean
}

export default class Cell {
  private symbol: string
  private controlPoint: boolean
  private unit?: Unit
  private controllerSymbol?: string

  constructor ({ symbol, controlPoint }: CellAttributes) {
    this.symbol = symbol
    this.controlPoint = controlPoint
  }

  isEmpty (): boolean {
    return this.unit === null
  }

  getUnit (): Unit | undefined {
    return this.unit
  }

  setUnit (unit: Unit): void {
    this.unit = unit
  }

  unsetUnit (): void {
    this.unit = undefined
  }

  isNeutralLocation (): boolean {
    return this.controlPoint
  }

  setNeutralLocation (controllerSymbol?: string): void {
    this.symbol = CONTROL_POINT_SYMBOL
    this.controllerSymbol = controllerSymbol
    this.controlPoint = true
  }

  takeControlPoint (player: Player): void {
    this.controllerSymbol = player.getFaction().symbol
  }

  getControllerSymbol (): string | undefined {
    return this.controllerSymbol
  }

  toString (): string {
    return this.unit
      ? this.unit.getSymbol()
      : this.controllerSymbol
        ? this.controllerSymbol
        : this.symbol
  }
}
