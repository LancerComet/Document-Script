/**
 * Abstract Syntax Tree.
 * 
 * @class AST
 */
declare class AST {
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
  constructor (type, body: Array<Expression>)

  /**
   * Insert an expression to this ast.
   * 
   * @param {Expression} expression
   * 
   * @memberOf AST
   */
  insertExpression (expression: Expression)
}
