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

  public isEmpty (): boolean {
    return this.unit === null
  }

  public getUnit (): Unit | undefined {
    return this.unit
  }

  public setUnit (unit: Unit): void {
    this.unit = unit
  }

  public unsetUnit (): void {
    this.unit = undefined
  }

  public isNeutralLocation (): boolean {
    return this.controlPoint
  }

  public setNeutralLocation (controllerSymbol?: string): void {
    this.symbol = CONTROL_POINT_SYMBOL
    this.controllerSymbol = controllerSymbol
    this.controlPoint = true
  }

  public takeControlPoint (player: Player): void {
    this.controllerSymbol = player.getFaction().symbol
  }

  public getControllerSymbol (): string | undefined {
    return this.controllerSymbol
  }

  public toString (): string {
    return this.unit
      ? this.unit.getSymbol()
      : this.controllerSymbol
        ? this.controllerSymbol
        : this.symbol
  }
}
