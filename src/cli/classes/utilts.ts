export function shuffleArray (array: any[]): any[] {
  return array.sort((a, b) => 0.5 - Math.random())
}
