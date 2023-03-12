export const WOLF_FACTION_SYMBOL = 'W'
export const CROW_FACTION_SYMBOL = 'C'
export const EMPTY_CELL_SYMBOL = '·'
export const CONTROL_POINT_SYMBOL = '@'

const BOARD_9X9 = {
  width: 9,
  height: 9,
  leftControlMarkers: 4,
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

const BOARD_5X5 = {
  width: 5,
  height: 5,
  leftControlMarkers: 3,
  neutralLocations: [
    { x: 'a', y: 2, assignedTo: CROW_FACTION_SYMBOL },
    { x: 'b', y: 0 },
    { x: 'c', y: 0 },
    { x: 'c', y: 4 },
    { x: 'd', y: 4 },
    { x: 'e', y: 2, assignedTo: WOLF_FACTION_SYMBOL }
  ]
}

export const BOARDS = {
  '5X5': BOARD_5X5,
  '9X9': BOARD_9X9
}

export enum AVAILABLE_ACTIONS {
  PLACE,
  INITIATIVE,
  RECRUIT,
  MOVE,
  ATTACK,
  CONTROL,
  FORFEIT
}

export const AVAILABLE_ACTIONS_DESCRIPTION = {
  // PLACEMENT ACTIONS
  [AVAILABLE_ACTIONS.PLACE]: {
    description: 'Place a unit on the board',
    value: 'PLACE'
  },
  // DISCARD COIN FACEDOWN ACTIONS
  [AVAILABLE_ACTIONS.INITIATIVE]: {
    description: 'Take the initiative for next turn',
    value: 'INITIATIVE'
  },
  [AVAILABLE_ACTIONS.RECRUIT]: {
    description: 'Recruit a unit from the supply',
    value: 'RECRUIT'
  },
  // DISCARD COIN FACEUP ACTIONS
  [AVAILABLE_ACTIONS.MOVE]: {
    description: 'Move a unit on the board',
    value: 'MOVE'
  },
  [AVAILABLE_ACTIONS.ATTACK]: {
    description: 'Attack a unit on the board',
    value: 'ATTACK'
  },
  [AVAILABLE_ACTIONS.CONTROL]: {
    description: 'Control a neutral location',
    value: 'CONTROL'
  },
  // OTHER ACTIONS
  [AVAILABLE_ACTIONS.FORFEIT]: {
    description: 'Forfeit the game',
    value: 'FORFEIT'
  }
}

export enum AVAILABLE_UNITS {
  Knight = 'K',
  Berserker = 'B',
  Cavalry = 'Y',
  Mercenary = 'M'
}

export const ROYAL_UNIT_SYMBOL = 'R'
