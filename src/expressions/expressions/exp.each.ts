/// <reference path="../../index.d.ts" />

/*
 * Expression: each.
 * By LancerComet at 13:21, 2016.11.27.
 * # Carry Your World #
 */

import { Keyword, isKeyword } from '../../parser'
import { Expression, EXPRESSION_LIST, Variable } from '../'
import * as expressions from '../'
import { NumberLiteral, StringLiteral, ExpressionLiteral } from '../../parser'

import { VARIABLE_HASH, TEMP_VARIABLE_HASH } from '../../transformer'

import { errorHandler, uidGen } from '../../utils'

const EXP_NAME = 'each'

/**
 * createExpression: each.
 * This function will be called in parser.
 * 
 * @example
 *  each myDivs style backgroundColor #fff
 *  each myDivs append to body 
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 */
export function createExpression (currentToken: Token, tokens: Array<Token>, ast: AST) {
  const eachExpression = new Expression(EXP_NAME)

  // Let's deal with the first arg.
  // "each" must be followed by a element variable.
  // Element variable should be a string or number, cannot be a keyword or expression.
  const elementsArg = tokens.shift()
  if (!isKeyword(elementsArg.value) && EXPRESSION_LIST.indexOf(elementsArg.value) < 0) {
    eachExpression.insertArg(
      elementsArg.type === 'number'
        ? new NumberLiteral(<number> elementsArg.value)
        : new StringLiteral(<string> elementsArg.value)
    )
  } else {
    errorHandler.typeError('An element variable can not be a keyword or expression.')
  }

  // The second arg.
  // It's an expression.
  const expressionArg = tokens.shift()
  if (EXPRESSION_LIST.indexOf(expressionArg.value) > -1) {
    eachExpression.insertArg(new ExpressionLiteral(expressionArg.value))
  } else {
    errorHandler.throwError(`[Unknown Expression] Sadly I don't know the expression called "${expressionArg.value}". :(`)
  }

  // Rest of two args are not checked in here, just push them to expression.
  // But only number and string literal are allowed.
  const args = [tokens.shift(), tokens.shift()]
  args.forEach(arg => eachExpression.insertArg(
    arg.type === 'number' ? new NumberLiteral(arg.value) : new StringLiteral(arg.value)
  ))

  ast.insertExpression(eachExpression)

}

/**
 * Run each expression.
 * 
 * @export
 * @param {Expression} expression
 */
export function run (expression: Expression) {
  // Get variable name.
  const variableName = expression.arguments.shift().value
  const srcElements: NodeList = VARIABLE_HASH[variableName].value
  if (srcElements === undefined) errorHandler.undefinedError(`${variableName} is undefined.`)
  if (!srcElements.length) return

  // Get expression.
  const expressionArg = expression.arguments.shift()
  if (!expressionArg.value) return
  if (expressionArg.type !== 'expression') {
    errorHandler.typeError('An expression must be followed after each in "each" expression.')    
  }
  
  // Do expression command.
  const nodes = Array.prototype.slice.call(srcElements)
  nodes.forEach(node => {
    // eg:
    // append myDiv to body
    // style myDiv backgroundColor #fff
    const _expression = new Expression(<string> expressionArg.value)

    // First argument: Single element's variable.
    const _tempVarName = variableName + '_' + uidGen()
    const _tempVar = new Variable(_tempVarName, node)
    VARIABLE_HASH[_tempVarName] = _tempVar
    _expression.insertArg(new StringLiteral(_tempVarName))

    // Insert rest of areguments.
    expression.arguments.forEach(arg => _expression.insertArg(arg))

    // Run expression.
    expressions[expressionArg.value] && expressions[expressionArg.value].run(_expression)
  })
}
