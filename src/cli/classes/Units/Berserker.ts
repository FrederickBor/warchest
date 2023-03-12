import { AVAILABLE_UNITS } from '../../../consts'
import { Unit } from './Unit'

export class Berserker extends Unit {
  constructor () {
    super({ name: 'Berserker', symbol: AVAILABLE_UNITS.Berserker, totalUnitCount: 4, movementRange: 1, attackRange: 1, numberOfAttacks: 2 })
  }
}
