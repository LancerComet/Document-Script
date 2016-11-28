/// <reference path="../../index.d.ts" />

/*
 * Expression: append.
 * By LancerComet at 23:58, 2016.11.26.
 * # Carry Your World #
 */

import { Keyword, isKeyword } from '../../parser'
import { Expression, EXPRESSION_LIST, Variable } from '../'
import { NumberLiteral, StringLiteral } from '../../parser'

import { VARIABLE_HASH } from '../../transformer'

import { errorHandler } from '../../utils'

const EXP_NAME = 'append'

/**
 * createExpression: append.
 * This function will be called in parser. 
 * 
 * @example
 *  append myDiv to body
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 * @param {AST} ast
 */
export function createExpression (currentToken: Token, tokens: Array<Token>, ast: AST) {
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

  ast.insertExpression(appendExpression)

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

/**
 * Run append expression.
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

  // Check keyword.
  const toKeyword = expression.arguments.shift()
  if (toKeyword.type !== 'keyword' || toKeyword.value !== 'to') {
      errorHandler.syntaxError('"to" must be followed after "${variableName}" in "append" expression.')
  }

  // Target element variable.
  const targetVariable = expression.arguments.shift().value
  const targetElement: HTMLElement = VARIABLE_HASH[targetVariable].value
  if (targetElement === undefined) errorHandler.undefinedError('${targetVariable} is undefined.')
  if (
    typeof targetElement !== 'object' ||
    (targetElement.nodeName === undefined && targetElement.nodeType === undefined)
  ) errorHandler.typeError(`${variableName} isn't a HTML Element.`)

  // Append to target.
  targetElement.appendChild(srcElement)
}
