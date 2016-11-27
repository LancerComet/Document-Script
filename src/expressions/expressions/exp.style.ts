/// <reference path="../../index.d.ts" />

/*
 * Expression: Style.
 * By LancerComet at 14:48, 2016.11.27.
 * # Carry Your World #
 */
import { isKeyword } from '../../parser'
import { EXPRESSION_LIST } from '../'
import { NumberLiteral, StringLiteral } from '../../parser'

import { errorHandler } from '../../utils'

const EXP_NAME = 'style'

/**
 * Expression: style.
 * This function will be called in parser. 
 * 
 * @example
 *  style myDiv backgroundColor #fff
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 */
export function style (currentToken: Token, tokens: Array<Token>) {
  const styleExpression = new Expression(EXP_NAME)

  // Let's deal with the first arg.
  // The first arg is a element variable, can be anything expect keyword and expression.
  const elementVariableArg = tokens.shift()
  if (!isKeyword(elementVariableArg.value) && EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
    styleExpression.insertArg(
      elementVariableArg.type === 'number'
        ? new NumberLiteral(<number> elementVariableArg.value)
        : new StringLiteral(<string> elementVariableArg.value)
    )
  } else {
    errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`)
  }

  // The second is a CSS style properity, basiclly it's a string.
  const stylePropArg = tokens.shift()
  stylePropArg.type === 'word'
    ? styleExpression.insertArg(new StringLiteral(stylePropArg.value))
    : errorHandler.typeError('A css style properity must be a string.')

  // The last one can be anything.
  const styleValueArg = tokens.shift()
  styleExpression.insertArg(new StringLiteral(styleValueArg.value))

  // EOF.
}
