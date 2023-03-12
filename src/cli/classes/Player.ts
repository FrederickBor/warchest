import { AVAILABLE_UNITS } from '../../consts'
import { Berserker } from './Units/Berserker'
import { Cavalry } from './Units/Cavalry'
import { Knight } from './Units/Knight'
import { Mercenary } from './Units/Mercenary'
import { Royal } from './Units/Royal'
import { type Unit } from './Units/Unit'
import { shuffleArray } from './utilts'
import colors from 'picocolors'

interface Faction {
  name: string
  symbol: string
}

type Count = Record<string, number>

interface PlayerAttributes {
  name: string
  faction: Faction
  leftControlMarkers: number
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
  private leftControlMarkers: number
  private bag: Unit[]
  private playerUnits: AVAILABLE_UNITS[]
  private forfeit: boolean

  constructor ({ name, faction, leftControlMarkers }: PlayerAttributes) {
    this.name = name
    this.faction = faction
    this.hand = []
    this.unitSupply = []
    this.discardPile = []
    this.leftControlMarkers = leftControlMarkers
    this.bag = []
    this.playerUnits = []
    this.forfeit = false
  }

  public getPlayerUnits (): AVAILABLE_UNITS[] {
    return this.playerUnits
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

  public getLeftControlMarkers (): number {
    return this.leftControlMarkers
  }

  public setLeftControlMarkers (leftControlMarkers: number): void {
    this.leftControlMarkers = leftControlMarkers
  }

  public hasForfeited (): boolean {
    return this.forfeit
  }

  public forfeitGame (): void {
    this.forfeit = true
  }

  public initialUnitAssignation (units: AVAILABLE_UNITS[]): void {
    this.playerUnits = units

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

  public getUnitFromHand (symbol: string): Unit {
    return this.getUnitFrom(symbol, this.hand, 'Unit not found in hand')
  }

  public getUnitFromSupply (symbol: string): Unit {
    return this.getUnitFrom(symbol, this.unitSupply, 'Unit not found in supply')
  }

  public discardUnit (unit: Unit): void {
    this.moveUnitFromTo(unit, this.hand, this.discardPile, 'Unit not found in hand')
  }

  public recruitUnit (unit: string): void {
    const unitToRecruit = this.getUnitFromSupply(unit)
    this.moveUnitFromTo(unitToRecruit, this.unitSupply, this.bag, 'Unit not found in suppply')
  }

  public hasUnitsToPlay (): boolean {
    return !!this.hand.length || !!this.unitSupply.length || !!this.countBagUnits() || !!this.discardPile.length
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

  public toString (): string {
    const separator = '='.repeat(10)
    let playerString = `${separator} ${colors.cyan(this.faction.name.toUpperCase())} ${separator} \n`
    playerString += colors.green(`PLAYER NAME: ${this.name} \n`)
    playerString += `Hand: ${this.hand.map((unit) => unit.getName()).join(', ')} \n`
    playerString += `Unit supply: ${this.unitSupplyString()} \n`
    playerString += `Discard pile:\n${this.discardPile.map((unit) => unit.getName()).join(', ')} \n`
    playerString += `Control tokens: ${this.leftControlMarkers} \n`

    return playerString
  }

  private unitSupplyString (): string {
    const unitCount: Count = this.unitSupply.reduce((acc: Count, unit) => {
      if (!acc[unit.getName()]) {
        acc[unit.getName()] = 1
      } else {
        acc[unit.getName()]++
      }
      return acc
    }, {})

    return Object.entries(unitCount).map(([unitName, count]) => `${unitName} = ${count}`).join(', ')
  }

  private moveUnitFromTo (unit: Unit, from: Unit[], to: Unit[], error: string): void {
    const index = from.findIndex((fromUnit) => fromUnit.getSymbol() === unit.getSymbol())
    if (index !== -1) {
      const removedUnit = from.splice(index, 1)
      to.push(...removedUnit)
    } else {
      throw new Error(error)
    }
  }

  private sendUnitsToBag (units: Unit[]): void {
    this.bag.push(...units)
    this.bag = shuffleArray(this.bag)
  }

  private createUnits (unit: AVAILABLE_UNITS): void {
    const { unit: newUnit, quantity } = UNIT_INFO[unit]
    const units: Unit[] = Array.from({ length: quantity }, () => newUnit)
    this.bag.push(...units)
    const count = newUnit.getTotalUnitCount()
    for (let i = 0; i < count - quantity; i++) {
      this.unitSupply.push(newUnit)
    }
  }

  private getUnitFrom (symbol: string, array: Unit[], error: string): Unit {
    const unit = array.find((unit) => unit.getSymbol() === symbol)

    if (!unit) {
      throw new Error(error)
    }

    return unit
  }
}
