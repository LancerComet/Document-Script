/// <reference path="../../index.d.ts" />

import { isKeyword } from '../../parser'
import { EXPRESSION_LIST } from '../'

import { errorHandler } from '../../utils'

const EXP_NAME = 'append'

/**
 * Expression: append.
 * This function will be called in parser. 
 * 
 * @example
 *  append myDiv to body
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 */
export function append (currentToken: Token, tokens: Array<Token>) {
  const expression = new Expression(EXP_NAME)
  const currentExpressionArg = tokens.shift()

  // "append" must be followed by a element variable.
  // This element variable should be a string or number.
  // Cannot be a keyword or expression.
  const argType = currentExpressionArg.type
  const argValue = currentExpressionArg.value
  if (!isKeyword(argValue) && EXPRESSION_LIST.indexOf(argValue) < 0) {
    expression.insertArg(argType === 'number'
      ? new NumberLiteral(<number> argValue)
      : new StringLiteral(<string> argValue)
    )
  } else {
    errorHandler.typeError('append can\'t be followed by a keyword or expression.')
  }
}
