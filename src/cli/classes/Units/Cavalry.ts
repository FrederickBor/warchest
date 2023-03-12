import { AVAILABLE_ACTIONS, AVAILABLE_UNITS } from '../../../consts'
import { Unit } from './Unit'

export class Cavalry extends Unit {
  constructor () {
    super({
      name: 'Cavalry',
      symbol: AVAILABLE_UNITS.Cavalry,
      totalUnitCount: 4,
      movementRange: 1,
      attackRange: 1,
      numberOfAttacks: 1,
      aditionalMovement: {
        triggerAction: AVAILABLE_ACTIONS.MOVE,
        secondaryAction: AVAILABLE_ACTIONS.ATTACK
      }
    })
  }
}
