/// <reference path="../../index.d.ts" />

/*
 * Expression: append.
 * By LancerComet at 0:04, 2016.11.27.
 * # Carry Your World #
 */

import { Keyword, isKeyword } from '../../parser'
import { Expression, EXPRESSION_LIST } from '../'
import { NumberLiteral, StringLiteral } from '../../parser'

import { errorHandler } from '../../utils'

const EXP_NAME = 'create'

/**
 * Expression: create.
 * This function will be called in parser. 
 * 
 * @example
 *  create div as myDiv
 *  create canvas as myCanvas
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 * @param {AST} ast 
 */
export function create (currentToken: Token, tokens: Array<Token>, ast: AST) {
  const createExpression = new Expression(EXP_NAME)

  // Let's deal with the first arg.
  // The first arg is a HTML tag name.
  // A tag name can be anything expect number.
  const tagNameArg = tokens.shift()
  tagNameArg.type === 'word'
    ? createExpression.insertArg(new StringLiteral(tagNameArg.value))
    : errorHandler.typeError('A HTML tag name can\'t be a number.')

  // The second.
  // The second argument must be the keyword "as".
  const asArg = tokens.shift()
  asArg.value === 'as'
    ? createExpression.insertArg(new Keyword(asArg.value))
    : errorHandler.typeError(`A keyword "as" must be provided after HTML tag name in "${EXP_NAME}" expression.`)

  // Last one.
  // The element variable, can be anything expect keyword and Expression.
  const elementVariableArg = tokens.shift()
  if (!isKeyword(elementVariableArg.value) && EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
    createExpression.insertArg(
      elementVariableArg.type === 'number'
        ? new NumberLiteral(<number> elementVariableArg.value)
        : new StringLiteral(<string> elementVariableArg.value)
    )
  } else {
    errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`)
  }

  ast.insertExpression(createExpression)
  
  // EOF.
}
