interface FactionAttributes {
  name: string
  symbol: string
  controlTokens: number
}

export default class Faction {
  private readonly name: string
  private readonly symbol: string
  private readonly controlTokens: number

  constructor ({ name, symbol, controlTokens }: FactionAttributes) {
    this.name = name
    this.symbol = symbol
    this.controlTokens = controlTokens
  }

  getName (): string {
    return this.name
  }

  getSymbol (): string {
    return this.symbol
  }

  getcontrolTokens (): number {
    return this.controlTokens
  }
}
