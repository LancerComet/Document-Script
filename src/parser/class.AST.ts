/// <reference path="../index.d.ts" />

/**
 * Abstract Syntax Tree.
 * 
 * @export
 * @class AST
 */
export class AST {
  /**
   * The type of this ast.
   * It just a marker or a name to indicate itself.
   * 
   * @type {string}
   * @memberOf AST
   */
  type: string

  /**
   * Where contains all expressions in this ast.
   * 
   * @type {Array<Expression>}
   * @memberOf AST
   */
  body: Array<Expression>

  /**
   * Creates an instance of AST.
   * 
   * @param {string} [type='']
   * @param {Array<Expression>} [body=[]]
   * 
   * @memberOf AST
   */
  constructor (type = '', body: Array<Expression> = []) {
    this.type = type
    this.body = body
  }

  /**
   * Insert an expression to this ast.
   * 
   * @param {Expression} expression
   * 
   * @memberOf AST
   */
  insertExpression (expression: Expression) {
    this.body.push(expression)
  }
}
