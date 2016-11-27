/**
 * Literal.
 * 
 * @class Literal
 */
declare class Literal {
  /**
   * Type of this literal object.
   * 
   * @type {string}
   * @memberOf Literal
   */
  type: string

  /**
   * Value of this literal object. 
   * 
   * @type {(number | string)}
   * @memberOf Literal
   */
  value: number | string
}

/**
 * NumberLiteral.
 * The literal that is number-typed.
 * 
 * @class NumberLiteral
 * @extends {Literal}
 */
declare class NumberLiteral extends Literal {
  type: string

  /**
   * Creates an instance of NumberLiteral.
   * 
   * @param {number} value
   * 
   * @memberOf NumberLiteral
   */
  constructor (value: number)
}

/**
 * StringLiteral.
 * The literal that is string-typed.
 * 
 * @class StringLiteral
 * @extends {Literal}
 */
declare class StringLiteral extends Literal {
  type: string

  
  /**
   * Creates an instance of StringLiteral.
   * 
   * @param {string} value
   * 
   * @memberOf StringLiteral
   */
  constructor (value: string)  
}

/**
 * ExpressionLiteral.
 * This is a expression that is stored as the literal. 
 * 
 * @export
 * @class ExpressionLiteral
 * @extends {Literal}
 */
declare class ExpressionLiteral extends Literal {
  
  /**
   * Creates an instance of ExpressionLiteral.
   * 
   * @param {string} value
   * 
   * @memberOf ExpressionLiteral
   */
  constructor (value: string) 
}