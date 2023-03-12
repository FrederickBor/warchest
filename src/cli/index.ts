import { BOARDS, AVAILABLE_ACTIONS, AVAILABLE_ACTIONS_DESCRIPTION, ROYAL_UNIT_SYMBOL } from '../consts'

import { confirm, intro, outro, select, text } from '@clack/prompts'
import colors from 'picocolors'

import Game, { type ActionReturn } from './classes/Game'
import Player from './classes/Player'
import Scoreboard, { type ScoreboardItem } from './classes/storage/Scoreboard'

async function placeAction (game: Game): Promise<void> {
  const position = await text({
    message: colors.cyan('Please select a position to place your unit:'),
    placeholder: 'e.g. a,0',
    validate: (value) => {
      if (!value.match(/^[a-i],[0-9]$/)) {
        return 'Please enter a valid position'
      }
    }
  })

  const currentPlayer = game.getCurrentPlayer()
  const unitSymbol = await select({
    message: colors.cyan(`Please select a unit to place at [${position as string}]:`),
    options: currentPlayer.getHand().filter((unit) => unit.getSymbol() !== ROYAL_UNIT_SYMBOL).map((unit) => ({
      label: `[${unit.getSymbol()}] · ${unit.getName()}`,
      value: unit.getSymbol()
    }))
  })

  const unitToPlace = currentPlayer.getUnitFromHand(unitSymbol as string)

  const [row, col] = (position as string).split(',')
  game.placeUnitOnBoard(row, parseInt(col), unitToPlace)
}

async function takeInitiative (game: Game): Promise<void> {
  const player = game.getCurrentPlayer()

  const discardedSymbol: string | symbol = await select({
    message: colors.cyan('Please select a unit to discard:'),
    options: player.getHand().map((unit) => ({
      label: `[${unit.getSymbol()}] · ${unit.getName()}`,
      value: unit.getSymbol()
    }))
  })

  if (typeof discardedSymbol === 'string') {
    game.setInitiative(discardedSymbol)
  }
}

async function recruitAction (game: Game): Promise<void> {
  const player = game.getCurrentPlayer()

  const discardedSymbol: string | symbol = await select({
    message: colors.cyan('Please select a unit to discard:'),
    options: player.getHand().map((unit) => ({
      label: `[${unit.getSymbol()}] · ${unit.getName()}`,
      value: unit.getSymbol()
    }))
  })

  let recruitedUnit = discardedSymbol
  if (typeof discardedSymbol === 'string' && discardedSymbol === ROYAL_UNIT_SYMBOL) {
    recruitedUnit = await select({
      message: colors.cyan('Please select a unit to recruit:'),
      options: player.getUnitSupply().map((unit) => ({
        label: `[${unit.getSymbol()}] · ${unit.getName()}`,
        value: unit.getSymbol()
      }))
    })
  }

  if (typeof discardedSymbol === 'string' && typeof recruitedUnit === 'string') {
    game.recruitUnit(discardedSymbol, recruitedUnit)
  }
}

async function moveAction (game: Game, isTrigered?: boolean, row?: string, col?: number): Promise<void> {
  let startPosition: string | symbol = ''
  if (!row || !col) {
    startPosition = await text({
      message: colors.cyan('Please indicate the position of the unit you want to move:'),
      placeholder: 'e.g. a,0',
      validate: (value) => {
        if (!value.match(/^[a-i],[0-9]$/)) {
          return 'Please enter a valid position'
        }
      }
    })
  } else {
    startPosition = `${row},${col}`
  }

  const endPosition = await text({
    message: colors.cyan('Please indicate the position you want to move the unit:'),
    placeholder: 'e.g. a,0',
    validate: (value) => {
      if (!value.match(/^[a-i],[0-9]$/)) {
        return 'Please enter a valid position'
      }
    }
  })

  const [startRow, startCol] = (startPosition as string).split(',')
  const [endRow, endCol] = (endPosition as string).split(',')
  const aditionalMovement = game.moveUnit(startRow, parseInt(startCol), endRow, parseInt(endCol))

  await applySecondaryAction(game, isTrigered, aditionalMovement)
}

async function applySecondaryAction (game: Game, isTrigered?: boolean, aditionalMovement?: ActionReturn): Promise<void> {
  if (!isTrigered && aditionalMovement) {
    printGame(game)

    const confirmAction = await confirm({
      message: colors.cyan(`You can perform ${AVAILABLE_ACTIONS_DESCRIPTION[aditionalMovement.action].value} with this unit, do you want to do it?`)
    })

    if (typeof confirmAction === 'boolean' && confirmAction) {
      await selectAction(game, AVAILABLE_ACTIONS_DESCRIPTION[aditionalMovement.action].value, true, aditionalMovement.row, aditionalMovement.col)
    }
  }
}

async function attackAction (game: Game, isTrigered?: boolean, row?: string, col?: number): Promise<void> {
  let attackerPosition: string | symbol = ''
  if (!row || !col) {
    attackerPosition = await text({
      message: colors.cyan('Please indicate the position of the unit you want to attack with:'),
      placeholder: 'e.g. a,0',
      validate: (value) => {
        if (!value.match(/^[a-i],[0-9]$/)) {
          return 'Please enter a valid position'
        }
      }
    })
  } else {
    attackerPosition = `${row},${col}`
  }

  const attackedPosition = await text({
    message: colors.cyan('Please indicate the position of the unit you want to attack:'),
    placeholder: 'e.g. a,0',
    validate: (value) => {
      if (!value.match(/^[a-i],[0-9]$/)) {
        return 'Please enter a valid position'
      }
    }
  })

  const [attackerRow, attackerCol] = (attackerPosition as string).split(',')
  const [attackedRow, attackedCol] = (attackedPosition as string).split(',')
  const aditionalMovement = game.attackUnit(attackerRow, parseInt(attackerCol), attackedRow, parseInt(attackedCol), !isTrigered)

  await applySecondaryAction(game, isTrigered, aditionalMovement)
}

async function controlAction (game: Game): Promise<void> {
  const position = await text({
    message: colors.cyan('Please indicate the position of the unit over a control zone:'),
    placeholder: 'e.g. a,0',
    validate: (value) => {
      if (!value.match(/^[a-i],[0-9]$/)) {
        return 'Please enter a valid position'
      }
    }
  })

  const player = game.getCurrentPlayer()

  const discardedSymbol: string | symbol = await select({
    message: colors.cyan('Please select a unit to discard:'),
    options: player.getHand().map((unit) => ({
      label: `[${unit.getSymbol()}] · ${unit.getName()}`,
      value: unit.getSymbol()
    }))
  })

  const [row, col] = (position as string).split(',')

  if (typeof discardedSymbol === 'string') {
    game.controlZone(row, parseInt(col), discardedSymbol)
  }
}

async function forfeitAction (game: Game): Promise<void> {
  game.forfeitGame()
}

async function selectAction (game: Game, action: string, isTrigered?: boolean, row?: string, col?: number): Promise<void> {
  switch (action) {
    case AVAILABLE_ACTIONS_DESCRIPTION[AVAILABLE_ACTIONS.PLACE].value:
      await placeAction(game)
      break

    case AVAILABLE_ACTIONS_DESCRIPTION[AVAILABLE_ACTIONS.INITIATIVE].value:
      await takeInitiative(game)
      break

    case AVAILABLE_ACTIONS_DESCRIPTION[AVAILABLE_ACTIONS.RECRUIT].value:
      await recruitAction(game)
      break

    case AVAILABLE_ACTIONS_DESCRIPTION[AVAILABLE_ACTIONS.MOVE].value:
      await moveAction(game, isTrigered, row, col)
      break

    case AVAILABLE_ACTIONS_DESCRIPTION[AVAILABLE_ACTIONS.ATTACK].value:
      await attackAction(game, isTrigered, row, col)
      break

    case AVAILABLE_ACTIONS_DESCRIPTION[AVAILABLE_ACTIONS.CONTROL].value:
      await controlAction(game)
      break

    case AVAILABLE_ACTIONS_DESCRIPTION[AVAILABLE_ACTIONS.FORFEIT].value:
      await forfeitAction(game)
      break
    default:
      break
  }
}

function printGame (game: Game): void {
  console.clear()
  const gameTitle = `${colors.inverse(colors.white(' Warchest-Lite '))}`
  console.log(gameTitle)
  console.log(game.toString())
}

async function main (): Promise<void> {
  const scoreboard = new Scoreboard()
  intro(colors.inverse(colors.white(' Welcome to Warchest-Lite ')))
  const selectedBoard = BOARDS['5X5']

  console.log(colors.inverse(' GAME SCOREBOARD '))
  scoreboard.getScoreboard().forEach((score) => {
    console.log(colors.inverse(`${score.playerName} · ${score.victories} · ${score.date}`))
  })

  const confirmPlay = await confirm({
    message: colors.cyan('Do you want to play?')
  })

  if (typeof confirmPlay === 'boolean' && !confirmPlay) {
    return
  }

  // NOTE: This is commented as I couldn't generate all the needed
  // units to play on this board size, if discommented, it will ask
  // the user to select the board size between 5x5 and 9x9 but the
  // game will only have a small amount of units to play with.

  // const boardSelection = await select({
  //   message: colors.cyan('Please select the board size:'),
  //   options: Object.entries(BOARDS).map(([key, value]) => ({
  //     label: `[ ${key} ]`,
  //     value
  //   }))
  // })

  // if (typeof boardSelection === 'object') {
  //   selectedBoard = boardSelection as typeof BOARDS['5X5']
  // }

  const playerOneName = await text({
    message: colors.cyan('Please enter the name of the first player (Wolf Faction):'),
    placeholder: 'e.g. Player 1',
    validate: (value) => {
      if (value.length < 3) {
        return 'Please enter a name with at least 3 characters'
      }
    }
  })

  const playerTwoName = await text({
    message: colors.cyan('Please enter the name of the second player (Crow Faction):'),
    placeholder: 'e.g. Player 2',
    validate: (value) => {
      if (value.length < 3) {
        return 'Please enter a name with at least 3 characters'
      }
    }
  })

  const playerOne = new Player({ name: playerOneName as string, faction: { name: 'Wolf', symbol: 'W' }, leftControlMarkers: selectedBoard.leftControlMarkers })
  const playerTwo = new Player({ name: playerTwoName as string, faction: { name: 'Crow', symbol: 'C' }, leftControlMarkers: selectedBoard.leftControlMarkers })
  const game = new Game({ playerOne, playerTwo, boardSettings: selectedBoard })
  playerOne.drawFromBag()
  playerTwo.drawFromBag()
  let error: string | null = null
  let winner: Player | null = null
  let endRound = false

  while (!winner) {
    printGame(game)

    if (error) {
      console.log(colors.inverse(colors.red(` ${error} `)))
      error = null
    }

    const selectedAction = await select({
      message: colors.cyan('Please select an action to perform:'),
      options: Object.values(AVAILABLE_ACTIONS_DESCRIPTION).map(({ description, value }) => ({
        label: `${value.padEnd(10, ' ')} · ${description}`,
        value
      }))
    })

    try {
      await selectAction(game, selectedAction as string)
    } catch (e: any) {
      error = e.message
    }

    winner = game.hasWinner()
    if (game.getCurrentPlayer().getHand().length === 0) {
      game.getCurrentPlayer().drawFromBag()
      if (endRound) {
        game.setCurrentPlayerToInitiative()
      } else {
        game.toggleCurrentPlayer()
      }
      endRound = !endRound
    }
  }

  let scoreboardItem: ScoreboardItem
  if (winner !== null) {
    console.log(`The winner is: ${winner.getName()}`)
    const date = new Date()
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
    scoreboardItem = {
      playerName: winner?.getName(),
      victories: 1,
      date: formattedDate
    }
    scoreboard.saveRecord(scoreboardItem)
  }

  outro(colors.inverse(colors.white(' THANKS FOR PLAYING ')))
}

main().catch(console.error)
