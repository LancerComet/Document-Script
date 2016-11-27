/*
 * Expression: append.
 * By LancerComet at 23:58, 2016.11.26.
 * # Carry Your World #
 */

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
  const appendExpression = new Expression(EXP_NAME)

  // Let's deal with the first arg.
  // "append" must be followed by a element variable, a keyword and a element variable again.
  // Element variable should be a string or number, cannot be a keyword or expression.
  // Keyword is a keyword.
  const srcElementArg = tokens.shift()
  elementExec(srcElementArg, appendExpression, 'source')

  // Then Keyword.
  const keywordArg = tokens.shift()
  keywordArg.value === 'to'
    ? appendExpression.insertArg(new Keyword(keywordArg.value))
    : errorHandler.typeError('A keyword must be followed after srouce element when using "append".')

  // Target element at last.
  const targetElementArg = tokens.shift()
  elementExec(targetElementArg, appendExpression, 'target')

  // Done! :)
}


/**
 * Code for dealing with element argument token.
 * 
 * @param {Token} elementArg
 * @param {Expression} appendExpression
 * @param {string} type
 */
function elementExec (elementArg: Token, appendExpression: Expression, type: string) {
  if (!isKeyword(elementArg.value) && EXPRESSION_LIST.indexOf(elementArg.value) < 0) {
    appendExpression.insertArg(
      elementArg.type === 'number'
        ? new NumberLiteral(<number> elementArg.value)
        : new StringLiteral(<string> elementArg.value)
    )
  } else {
    errorHandler.typeError(`You can't use a keyword or expression as the name of ${type} element when calling "append".`)
  }
}
