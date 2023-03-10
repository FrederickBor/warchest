import type Faction from './Faction'

interface PlayerAttributes {
  name: string
  faction: Faction
}

export default class Player {
  private readonly name: string
  readonly faction: Faction

  constructor ({ name, faction }: PlayerAttributes) {
    this.name = name
    this.faction = faction
  }

  getName (): string {
    return this.name
  }

  getFaction (): Faction {
    return this.faction
  }
}
