import { AVAILABLE_UNITS } from '../../consts'
import { Berserker } from './Units/Berserker'
import { Cavalry } from './Units/Cavalry'
import { Knight } from './Units/Knight'
import { Mercenary } from './Units/Mercenary'
import { Royal } from './Units/Royal'
import { type Unit } from './Units/Unit'
import { shuffleArray } from './utilts'

interface Faction {
  name: string
  symbol: string
}

interface PlayerAttributes {
  name: string
  faction: Faction
  controlMarkers: number
}

interface UnitType {
  unit: Unit
  quantity: number
}

const UNIT_INFO: Record<AVAILABLE_UNITS, UnitType> = {
  [AVAILABLE_UNITS.Knight]: {
    unit: new Knight(),
    quantity: 2
  },
  [AVAILABLE_UNITS.Mercenary]: {
    unit: new Mercenary(),
    quantity: 2
  },
  [AVAILABLE_UNITS.Cavalry]: {
    unit: new Cavalry(),
    quantity: 2
  },
  [AVAILABLE_UNITS.Berserker]: {
    unit: new Berserker(),
    quantity: 2
  }
}

export default class Player {
  private readonly name: string
  private readonly faction: Faction
  private readonly hand: Unit[]
  private readonly unitSupply: Unit[]
  private discardPile: Unit[]
  private controlMarkers: number
  private bag: Unit[]

  constructor ({ name, faction, controlMarkers }: PlayerAttributes) {
    this.name = name
    this.faction = faction
    this.hand = []
    this.unitSupply = []
    this.discardPile = []
    this.controlMarkers = controlMarkers
    this.bag = []
  }

  public getName (): string {
    return this.name
  }

  public getFaction (): Faction {
    return this.faction
  }

  public getHand (): Unit[] {
    return this.hand
  }

  public getUnitSupply (): Unit[] {
    return this.unitSupply
  }

  public getDiscardPile (): Unit[] {
    return this.discardPile
  }

  public getControlMarkers (): number {
    return this.controlMarkers
  }

  public setControlMarkers (controlMarkers: number): void {
    this.controlMarkers = controlMarkers
  }

  public initialUnitAssignation (units: AVAILABLE_UNITS[]): void {
    units.forEach((unit: AVAILABLE_UNITS) => {
      this.createUnits(unit)
    })

    this.sendUnitsToBag([new Royal()])
  }

  public takeUnitFromBag (): Unit | undefined {
    return this.bag.pop()
  }

  public countBagUnits (): number {
    return this.bag.length
  }

  public discardUnit (): void {
    throw new Error('Method not implemented.')
  }

  public drawFromBag (): void {
    const handLenght = this.hand.length
    if (handLenght < 3) {
      const neededUnits = 3 - handLenght
      if (this.countBagUnits() < neededUnits) {
        this.sendUnitsToBag(this.discardPile)
        this.discardPile = []
      }

      let i = 0
      while (i < neededUnits && this.countBagUnits()) {
        const unit = this.takeUnitFromBag()
        if (unit) {
          this.hand.push(unit)
        }
        i += 1
      }
    }
  }

  private sendUnitsToBag (units: Unit[]): void {
    this.bag.push(...units)
    this.bag = shuffleArray(this.bag)
  }

  private createUnits (unit: AVAILABLE_UNITS): void {
    console.log(unit)
    console.log(UNIT_INFO[unit])
    const { unit: newUnit, quantity } = UNIT_INFO[unit]
    const units: Unit[] = Array.from({ length: quantity }, () => newUnit)
    this.bag.push(...units)
    const count = newUnit.getTotalUnitCount()
    for (let i = 0; i < count - quantity; i++) {
      this.unitSupply.push(newUnit)
    }
  }
}
