/*
 * Tokenizer for document script.
 * By LancerComet at 21:02, 2016.11.26.
 * 
 * # Carry Your World #
 * ---
 * 
 * There are two type of tokens in document script so far:
 * NumberToken, WordToken.
 */

import { Token, NumberToken, WordToken } from './class.Token'

/**
 * Tokenizer for document script.
 * 
 * @export
 * @param {string} code
 * @returns {Array<Token>}
 */
export function tokenizer (code: string) : Array<Token> {
  return code.split(/\s+/)
    .filter(words => words.length > 0)
    .map((words: string | number) => isNaN(parseInt(<string> words, 0)) 
      ? new WordToken(<string> words)
      : new NumberToken(<number> words)
    )
}

export { Token, NumberToken, WordToken }