interface UnitAttributes {
  name: string
  symbol: string
  totalUnitCount: number
}

export class Unit {
  private readonly name: string
  private readonly symbol: string
  private readonly totalUnitCount: number

  constructor ({ name, symbol, totalUnitCount }: UnitAttributes) {
    this.name = name
    this.symbol = symbol
    this.totalUnitCount = totalUnitCount
  }

  getName (): string {
    return this.name
  }

  getSymbol (): string {
    return this.symbol
  }

  getTotalUnitCount (): number {
    return this.totalUnitCount
  }
}
