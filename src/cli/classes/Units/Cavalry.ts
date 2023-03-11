import { PlayableUnit } from './PlayableUnit'

export class Cavalry extends PlayableUnit {
  constructor () {
    super({ name: 'Cavalry', symbol: 'Y', totalUnitCount: 4 })
  }

  attack (): void {
    throw new Error('Method not implemented.')
  }

  move (): void {
    throw new Error('Method not implemented.')
  }
}
