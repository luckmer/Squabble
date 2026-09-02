import words from '@json/words.json'
export interface TrieNode {
  children: Record<string, TrieNode>
  end: boolean
}

const trie: TrieNode = { children: {}, end: false }

export class TrieServiceCore {
  buildTrie(): TrieNode {
    for (const w of words) {
      let node = trie
      for (const ch of w) {
        node = node.children[ch] ??= { children: {}, end: false }
      }
      node.end = true
    }
    return trie
  }

  getTrie(): TrieNode {
    return trie
  }
}
