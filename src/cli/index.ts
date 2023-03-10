import Board from './classes/Board'

const controlPoints = [
  { x: 'a', y: 2 },
  { x: 'a', y: 6 },
  { x: 'd', y: 1 },
  { x: 'd', y: 3 },
  { x: 'd', y: 6 },
  { x: 'f', y: 2 },
  { x: 'f', y: 5 },
  { x: 'f', y: 7 },
  { x: 'i', y: 2 },
  { x: 'i', y: 6 }
]

interface DrawParameters {
  board: Board
}

function draw ({ board }: DrawParameters): void {
  console.clear()
  console.log(board.toString())
}

function main (): void {
  const board = new Board({ width: 9, height: 9, controlPoints })
  draw({ board })
}

main()
