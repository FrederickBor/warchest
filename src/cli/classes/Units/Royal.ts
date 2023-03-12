import { ROYAL_UNIT_SYMBOL } from '../../../consts'
import { Unit } from './Unit'

export class Royal extends Unit {
  constructor () {
    super({ name: 'Royal', symbol: ROYAL_UNIT_SYMBOL, totalUnitCount: 1, movementRange: 0, attackRange: 0, numberOfAttacks: 0 })
  }
}
