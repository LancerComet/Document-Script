/// <reference path="../../index.d.ts" />

/*
 * Expression: Remove.
 * By LancerComet at 15:06, 2016.11.27.
 * # Carry Your World #
 */

import { Keyword, isKeyword } from '../../parser'
import { Expression, EXPRESSION_LIST, Variable } from '../'
import { NumberLiteral, StringLiteral } from '../../parser'

import { VARIABLE_HASH } from '../../transformer'

import { errorHandler } from '../../utils'

const EXP_NAME = 'remove'

/**
 * createExpression: remove.
 * This function will be called in parser.
 * 
 * @example
 *  remove myDiv
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 * @param {AST} ast
 */
export function createExpression (currentToken: Token, tokens: Array<Token>, ast: AST) {
  const removeExpression = new Expression(EXP_NAME)

  // Only one argument.
  // This argument must be a element variable, can be anything expect keyword and expression.
  const elementVariableArg = tokens.shift()
  if (!isKeyword(elementVariableArg.value) && EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
    removeExpression.insertArg(
      elementVariableArg.type === 'number'
        ? new NumberLiteral(<number> elementVariableArg.value)
        : new StringLiteral(<string> elementVariableArg.value)
    )
  } else {
    errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`)
  }

  ast.insertExpression(removeExpression)
}

/**
 * Run remove expression.
 * 
 * @export
 * @param {Expression} expression
 */
export function run (expression: Expression) {
  // Get variable name.
  const variableName = expression.arguments.shift().value
  const srcElement: HTMLElement = VARIABLE_HASH[variableName].value
  if (srcElement === undefined) errorHandler.undefinedError(`${variableName} is undefined.`)
  if (
    typeof srcElement !== 'object' ||
    (srcElement.nodeName === undefined && srcElement.nodeType === undefined)
  ) errorHandler.typeError(`${variableName} isn't a HTML Element.`)

  // Remove srcElement.
  const parentElement = srcElement.parentElement
  parentElement.removeChild(srcElement)
}
