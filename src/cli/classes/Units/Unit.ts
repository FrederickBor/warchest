import { type AVAILABLE_ACTIONS } from '../../../consts'

export interface AditionalMovement {
  triggerAction: AVAILABLE_ACTIONS
  secondaryAction: AVAILABLE_ACTIONS
}

export interface UnitAttributes {
  name: string
  symbol: string
  totalUnitCount: number
  movementRange: number
  attackRange: number
  numberOfAttacks: number
  aditionalMovement?: AditionalMovement
}

export class Unit {
  private readonly name: string
  private readonly symbol: string
  private readonly totalUnitCount: number
  private readonly movementRange: number
  private readonly attackRange: number
  private readonly numberOfAttacks: number
  private readonly aditionalMovement?: AditionalMovement

  constructor ({ name, symbol, totalUnitCount, movementRange, attackRange, numberOfAttacks, aditionalMovement }: UnitAttributes) {
    this.name = name
    this.symbol = symbol
    this.totalUnitCount = totalUnitCount
    this.movementRange = movementRange
    this.attackRange = attackRange
    this.numberOfAttacks = numberOfAttacks
    this.aditionalMovement = aditionalMovement
  }

  public getName (): string {
    return this.name
  }

  public getSymbol (): string {
    return this.symbol
  }

  public getTotalUnitCount (): number {
    return this.totalUnitCount
  }

  public getMovementRange (): number {
    return this.movementRange
  }

  public getAttackRange (): number {
    return this.attackRange
  }

  public getNumberOfAttacks (): number {
    return this.numberOfAttacks
  }

  public getAditionalMovement (): AditionalMovement | undefined {
    return this.aditionalMovement
  }
}
