import { PlayableUnit } from './PlayableUnit'

export class Knight extends PlayableUnit {
  constructor () {
    super({ name: 'Knight', symbol: 'K', totalUnitCount: 5 })
  }

  attack (): void {
    throw new Error('Method not implemented.')
  }

  move (): void {
    throw new Error('Method not implemented.')
  }
}
