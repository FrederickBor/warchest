import { PlayableUnit } from './PlayableUnit'

export class Mercenary extends PlayableUnit {
  constructor () {
    super({ name: 'Mercenary', symbol: 'M', totalUnitCount: 5 })
  }

  attack (): void {
    throw new Error('Method not implemented.')
  }

  move (): void {
    throw new Error('Method not implemented.')
  }

  tactic (): void {
    throw new Error('Method not implemented.')
  }
}
