export const WOLF_FACTION_SYMBOL = 'W'
export const CROW_FACTION_SYMBOL = 'C'
export const EMPTY_CELL_SYMBOL = '·'
export const CONTROL_POINT_SYMBOL = '@'

export const BOARD_9X9 = {
  width: 9,
  height: 9,
  neutralLocations: [
    { x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL },
    { x: 'a', y: 6, assignedTo: CROW_FACTION_SYMBOL },
    { x: 'd', y: 1 },
    { x: 'd', y: 3 },
    { x: 'd', y: 6 },
    { x: 'f', y: 2 },
    { x: 'f', y: 5 },
    { x: 'f', y: 7 },
    { x: 'i', y: 2, assignedTo: WOLF_FACTION_SYMBOL },
    { x: 'i', y: 6, assignedTo: WOLF_FACTION_SYMBOL }
  ]
}

export const BOARD_5X5 = {
  width: 5,
  height: 5,
  neutralLocations: [
    { x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL },
    { x: 'b', y: 0 },
    { x: 'c', y: 0 },
    { x: 'c', y: 4 },
    { x: 'd', y: 4 },
    { x: 'e', y: 2, assignedTo: WOLF_FACTION_SYMBOL }
  ]
}

export enum AVAILABLE_UNITS {
  Knight,
  Berserker,
  Cavalry,
  Mercenary
}

export const AVAILABLE_ACTIONS = {
  // PLACEMENT ACTIONS
  PLACE: {
    description: 'Place a unit on the board'
  },
  // DISCARD COIN FACEDOWN ACTIONS
  INITIATIVE: {
    description: 'Take the initiative for next turn'
  },
  RECRUIT: {
    description: 'Recruit a unit from the supply'
  },
  // DISCARD COIN FACEUP ACTIONS
  MOVE: {
    description: 'Move a unit on the board'
  },
  ATTACK: {
    description: 'Attack a unit on the board'
  },
  CONTROL: {
    description: 'Control a neutral location'
  },
  // OTHER ACTIONS
  FORFEIT: {
    description: 'Forfeit the game'
  }
}
