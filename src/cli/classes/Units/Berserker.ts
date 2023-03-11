import { PlayableUnit } from './PlayableUnit'

export class Berserker extends PlayableUnit {
  constructor () {
    super({ name: 'Berserker', symbol: 'B', totalUnitCount: 4 })
  }

  attack (): void {
    throw new Error('Method not implemented.')
  }

  move (): void {
    throw new Error('Method not implemented.')
  }
}
