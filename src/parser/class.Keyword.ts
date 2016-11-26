const KEYWORD_LIST = [
  'as', 'to', 'from'
]

/**
 * Class: Keyword. 
 * 
 * @export
 * @class Keyword
 */
export class Keyword {
  /**
   * Type indicator, always be "keyword".
   * 
   * @type {string}
   * @memberOf Keyword
   */
  type: string = 'keyword'

  /**
   * The keyword value. 
   * 
   * @type {string}
   * @example "to", "from", "as".
   * @memberOf Keyword
   */
  value: string

  /**
   * Creates an instance of Keyword.
   * 
   * @param {string} value
   * 
   * @memberOf Keyword
   */
  constructor (value: string) {
    this.value = value
  }
}

/**
 * Check it is a keyword or not.
 * 
 * @export
 * @param {string} target
 * @returns {boolean}
 */
export function isKeyword (target: string) : boolean {
  return KEYWORD_LIST.indexOf(target) > -1
}
