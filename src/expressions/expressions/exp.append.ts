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
  const srcElementArg = tokens.shift()

  // Let's deal with the first arg.
  // "append" must be followed by a element variable, a keyword and a element variable again.
  // Element variable should be a string or number, cannot be a keyword or expression.
  // Keyword is a keyword.
  if (!isKeyword(srcElementArg.value) && EXPRESSION_LIST.indexOf(srcElementArg.value) < 0) {
    appendExpression.insertArg(
      srcElementArg.type === 'number'
        ? new NumberLiteral(<number> srcElementArg.value)
        : new StringLiteral(<string> srcElementArg.value)
    )
  } else {
    errorHandler.typeError('You can\'t use a keyword or expression as the name of source element when calling "append".')
  }

  // Keyword.
  const keywordArg = tokens.shift()
  isKeyword(keywordArg.value)
    ? appendExpression.insertArg(new Keyword(keywordArg.value))
    : errorHandler.typeError('A keyword must be followed after srouce element when using "append".')

  // Target element.
  const targetElementArg = tokens.shift()
  if (!isKeyword(targetElementArg.value) && EXPRESSION_LIST.indexOf(srcElementArg.value) < 0) {
    appendExpression.insertArg(
      targetElementArg.type === 'number'
        ? new NumberLiteral(<number> targetElementArg.value)
        : new StringLiteral(<string> targetElementArg.value)
    )
  } else {
    errorHandler.typeError('You can\'t use a keyword or expression as the name of target element when calling "append".')    
  }

}
