import { getTrie } from '@libs/TrieService'
import { TrieNode } from '@libs/TrieService/trieServiceCore'
import { DIRS } from '@static/index'

export class BoardServiceCore {
  board: string[][]
  size: number
  answers: Set<string>

  constructor(board: string[][]) {
    this.board = board
    this.size = board.length
    this.answers = new Set()
  }

  solver(address: number[], wordSoFar: string, pathSoFar: Set<number>, trie: TrieNode) {
    const [row, col] = address
    const letter = this.board[row][col]
    const nextTrie = trie.children[letter]

    if (nextTrie == null) return

    const updatedWord = wordSoFar + letter
    if (nextTrie.end) this.answers.add(updatedWord)

    pathSoFar.add(this.encode(address))

    for (const neighbor of this.getNeighbors(address)) {
      if (!pathSoFar.has(this.encode(neighbor))) {
        this.solver(neighbor, updatedWord, pathSoFar, nextTrie)
      }
    }

    pathSoFar.delete(this.encode(address))
  }

  solveBoard() {
    const dictionary = getTrie().getTrie()

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.solver([i, j], '', new Set(), dictionary)
      }
    }
    return Array.from(this.answers)
  }

  encode(address: number[]) {
    const [row, col] = address
    return this.size * row + col + 1
  }

  getNeighbors(address: number[]) {
    const result = []
    for (const [dx, dy] of DIRS) {
      const x = address[0] + dx
      const y = address[1] + dy
      if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
        result.push([x, y])
      }
    }
    return result
  }
}
