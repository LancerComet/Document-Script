/// <reference path="./class.Keyword.d.ts" />


import { Literal } from './class.Literal'

/**
 * Expression of document script.
 * 
 * @export
 * @class Expression
 */
export class Expression {
  type: string = 'CallExpression'

  /**
   * The name of this expression.
   * 
   * @type {string}
   * @example 
   *  "select", "style", "create".
   * @memberOf Expression
   */
  name: string

  /**
   * Arguments of this expression.
   * 
   * @type {(Array<Literal | Keyword>)} 
   * @memberOf Expression
   */
  arguments: Array<Literal | Keyword> = []
  
  /**
   * Creates an instance of Expression.
   * 
   * @param {string} name
   * 
   * @memberOf Expression
   */
  constructor (name: string) {
    this.name = name
  }

  /**
   * Insert an new argument into this expression.
   * 
   * @param {(Literal | Keyword)} argument
   * 
   * @memberOf Expression
   */
  insertArg (argument: Literal | Keyword) {
    this.arguments.push(argument)
  }
}
