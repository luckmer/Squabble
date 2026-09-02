export class GridServiceCore {
  LETTER_WEIGHTS = {
    a: 8,
    b: 2,
    c: 3,
    d: 4,
    e: 12,
    f: 2,
    g: 2,
    h: 6,
    i: 7,
    j: 1,
    k: 1,
    l: 4,
    m: 2,
    n: 7,
    o: 8,
    p: 2,
    q: 1,
    r: 6,
    s: 6,
    t: 9,
    u: 3,
    v: 1,
    w: 2,
    x: 1,
    y: 2,
    z: 1,
  }

  weightedRandomLetter = () => {
    const TOTAL_WEIGHT = Object.values(this.LETTER_WEIGHTS).reduce((a, b) => a + b, 0)
    let r = Math.random() * TOTAL_WEIGHT

    for (const [letter, weight] of Object.entries(this.LETTER_WEIGHTS)) {
      if (r < weight) return letter
      r -= weight
    }
    return ''
  }

  generateRandomGrid = (size: number) => {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => this.weightedRandomLetter().toUpperCase()),
    )
  }

  getBoard(size: number) {
    const grid = this.generateRandomGrid(size)
    const board = grid.map((row) => row.map((c) => c.toLowerCase()))

    return board
  }
}
