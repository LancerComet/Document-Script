/**
 * Class: Keyword. 
 * 
 * @export
 * @class Keyword
 */
declare class Keyword {
  /**
   * Type indicator, always be "keyword".
   * 
   * @type {string}
   * @memberOf Keyword
   */
  type: string

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
  constructor (value: string)
}
