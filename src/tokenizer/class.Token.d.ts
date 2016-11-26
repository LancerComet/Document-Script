/**
 * Token.
 * 
 * @class Token
 */
declare class Token {
  type: string
  value: any
}

/**
 * NumberToken.
 * 
 * @class NumberToken
 * @extends {Token}
 */
declare class NumberToken extends Token {
  type: string

  /**
   * Creates an instance of NumberToken.
   * 
   * @param {number} value
   * 
   * @memberOf NumberToken
   */
  constructor (value: number)
}

/**
 * WordToken.
 * 
 * @class WordToken
 * @extends {Token}
 */
declare class WordToken extends Token {
  type: string
  
  /**
   * Creates an instance of WordToken.
   * 
   * @param {string} value
   * 
   * @memberOf WordToken
   */
  constructor (value: string)  
}
