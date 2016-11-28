/// <reference path="../../index.d.ts" />

/*
 * Expression: Select.
 * By LancerComet at 14:22, 2016.11.27.
 * # Carry Your World #
 */

import { Keyword, isKeyword } from '../../parser'
import { Expression, EXPRESSION_LIST, Variable } from '../'
import { NumberLiteral, StringLiteral } from '../../parser'

import { VARIABLE_HASH } from '../../transformer'

import { errorHandler } from '../../utils'

const EXP_NAME = 'select'

/**
 * createExpression: select.
 * This function will be called in parser. 
 * 
 * @example
 *  select #my-div as myDiv
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 * @param {AST} ast
 */
export function createExpression (currentToken: Token, tokens: Array<Token>, ast: AST) {
const selectExpression = new Expression(EXP_NAME)

  // Let's deal with the first arg.
  // The first arg is a element selector.
  // A selector can be anything, and will be converted to string-type.
  const selectorArg = tokens.shift()
  selectExpression.insertArg(new StringLiteral(selectorArg.value.toString()))

  // The second.
  // The second argument must be the keyword "as".
  const asArg = tokens.shift()
  asArg.value === 'as'
    ? selectExpression.insertArg(new Keyword(asArg.value))
    : errorHandler.typeError(`A keyword "as" must be provided after HTML tag name in "${EXP_NAME}" expression.`)

  // Last one.
  // The element variable, can be anything expect keyword and Expression.
  const elementVariableArg = tokens.shift()
  if (!isKeyword(elementVariableArg.value) && EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
    selectExpression.insertArg(
      elementVariableArg.type === 'number'
        ? new NumberLiteral(<number> elementVariableArg.value)
        : new StringLiteral(<string> elementVariableArg.value)
    )
  } else {
    errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`)
  }

  ast.insertExpression(selectExpression)

  // EOF.
}

/**
 * Run select expression.
 * 
 * @export
 * @param {Expression} expression
 */
export function run (expression: Expression) {
  // Get selector.
  const selector = expression.arguments.shift()
  if (selector.type !== 'StringLiteral' || typeof selector.value !== 'string') {
    errorHandler.typeError('You must use a string as your selector.')
  }

  // Select target elements.
  var selectedElement: Element | null | NodeListOf<Element> = null
  var _selected = document.querySelectorAll(<string> selector.value)
  if (_selected.length === 1) {
    selectedElement = _selected[0]
  } else if (_selected.length > 1) {
    selectedElement = _selected
  }

  // Check keyword as.
  const asKeyword = expression.arguments.shift()
  if (asKeyword.type !== 'keyword' || asKeyword.value !== 'as') {
    errorHandler.syntaxError('"as" must be followed after "${tagName}" in "create" expression.')
  }

  // Set variable.
  const variableName = expression.arguments.shift().value
  const variableValue = selectedElement
  VARIABLE_HASH[variableName] = new Variable(variableName, variableValue)
}
