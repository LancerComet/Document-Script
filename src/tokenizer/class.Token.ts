/**
 * Token.
 * 
 * @export 
 * @class Token
 */
export class Token {
  type: string
  value: any

  /**
   * Creates an instance of Token.
   * 
   * @param {string} [type='']
   * @param {*} value
   * 
   * @memberOf Token
   */
  constructor (type: string = '', value: any) {
    this.type = type
    this.value = value
  }
}

/**
 * NumberToken.
 * 
 * @export
 * @class NumberToken
 * @extends {Token}
 */
export class NumberToken extends Token {
  
  /**
   * Creates an instance of NumberToken.
   * 
   * @param {number} value
   * 
   * @memberOf NumberToken
   */
  constructor (value: number) {
    super('number', value)
  }
}

/**
 * WordToken.
 * 
 * @export
 * @class WordToken
 * @extends {Token}
 */
export class WordToken extends Token {
  
  /**
   * Creates an instance of WordToken.
   * 
   * @param {string} value
   * 
   * @memberOf WordToken
   */
  constructor (value: string) {
    super('word', value)
  }
}
