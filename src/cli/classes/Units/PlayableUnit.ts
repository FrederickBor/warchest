import { Unit } from './Unit'

interface UnitAttributes {
  name: string
  symbol: string
  totalUnitCount: number
}

export abstract class PlayableUnit extends Unit {
  constructor ({ name, symbol, totalUnitCount }: UnitAttributes) {
    super({ name, symbol, totalUnitCount })
  }

  abstract attack (): void
  abstract move (): void
}
