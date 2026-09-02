import { TrieServiceCore } from './trieServiceCore'

let _trie: TrieServiceCore | undefined

export const getTrie = (): TrieServiceCore => {
  if (_trie) {
    return _trie
  }

  _trie = new TrieServiceCore()

  _trie.buildTrie()
  return _trie
}
