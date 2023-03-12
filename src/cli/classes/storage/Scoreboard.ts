import * as fs from 'fs'
import path from 'path'

export interface ScoreboardItem {
  playerName: string
  victories: number
  date: string
}

export default class Scoreboard {
  private readonly databasePath: string

  constructor (databasePath?: string) {
    this.databasePath = databasePath ?? path.join(__dirname, 'database.json')
  }

  getScoreboard (): ScoreboardItem[] {
    const data = fs.readFileSync(this.databasePath, 'utf8')
    return JSON.parse(data)
  }

  saveRecord (scoreboard: ScoreboardItem): void {
    const currentScoreboard = this.getScoreboard()

    const scoreToUpdate = currentScoreboard.find((item: ScoreboardItem) => item.playerName === scoreboard.playerName)
    if (scoreToUpdate) {
      scoreToUpdate.victories += 1
      scoreToUpdate.date = scoreboard.date
    } else {
      currentScoreboard.push(scoreboard)
    }

    currentScoreboard.sort((a, b) => {
      const [stringDateA, stringHourA] = a.date.split(' ')
      const [stringDateB, stringHourB] = b.date.split(' ')
      const dateAParts = stringDateA.split('-')
      const dateBParts = stringDateB.split('-')
      const hourAParts = stringHourA.split(':')
      const hourBParts = stringHourB.split(':')

      // Note: months in JavaScript are 0-indexed,
      // so we need to subtract 1 from the month value
      const dateA = new Date(+dateAParts[2], +dateAParts[1] - 1, +dateAParts[0], +hourAParts[0], +hourAParts[1], +hourAParts[2])
      const dateB = new Date(+dateBParts[2], +dateBParts[1] - 1, +dateBParts[0], +hourBParts[0], +hourBParts[1], +hourBParts[2])
      return dateA.getTime() - dateB.getTime()
    })

    fs.writeFileSync(this.databasePath, JSON.stringify(currentScoreboard))
  }
}
