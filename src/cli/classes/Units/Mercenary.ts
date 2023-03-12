import { AVAILABLE_UNITS } from '../../../consts'
import { Unit } from './Unit'

export class Mercenary extends Unit {
  constructor () {
    super({
      name: 'Mercenary',
      symbol: AVAILABLE_UNITS.Mercenary,
      totalUnitCount: 5,
      movementRange: 1,
      attackRange: 1,
      numberOfAttacks: 1
    })
  }
}
