import { Unit } from '../cli/classes/Units/Unit'
import { AVAILABLE_ACTIONS } from '../consts'

describe('Unit class', () => {
  test('unit should be created correctly', () => {
    const unit = new Unit({
      name: 'Test',
      symbol: 'T',
      totalUnitCount: 9,
      movementRange: 2,
      attackRange: 4,
      numberOfAttacks: 5,
      aditionalMovement: {
        triggerAction: AVAILABLE_ACTIONS.MOVE,
        secondaryAction: AVAILABLE_ACTIONS.ATTACK
      }
    })

    expect(unit.getName()).toEqual('Test')
    expect(unit.getSymbol()).toEqual('T')
    expect(unit.getTotalUnitCount()).toEqual(9)
    expect(unit.getMovementRange()).toEqual(2)
    expect(unit.getAttackRange()).toEqual(4)
    expect(unit.getNumberOfAttacks()).toEqual(5)
    expect(unit.getAditionalMovement()).toEqual({
      triggerAction: AVAILABLE_ACTIONS.MOVE,
      secondaryAction: AVAILABLE_ACTIONS.ATTACK
    })
  })
})
