import { AVAILABLE_UNITS } from '../../../consts'
import { Unit } from './Unit'

export class Knight extends Unit {
  constructor () {
    super({ name: 'Knight', symbol: AVAILABLE_UNITS.Knight, totalUnitCount: 5, movementRange: 1, attackRange: 1, numberOfAttacks: 1 })
  }
}
