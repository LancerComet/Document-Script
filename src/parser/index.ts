/// <reference path="../tokenizer/class.Token.d.ts" />

import { AST } from './class.AST'
import { Keyword, isKeyword } from './class.Keyword'
import { Literal, NumberLiteral, StringLiteral, ExpressionLiteral } from './class.Literal'

import * as expressions from '../expressions'

/**
 * Parser for document script. 
 * 
 * @export
 * @param {Array<Token>} [tokens=[]]
 * @returns {false | AST}
 */
export function parser (tokens: Array<Token> = []) : false | AST {
  if (!tokens.length) { return false }
  const ast = new AST('Expression')

  while (tokens.length > 0) {
    let currentToken = tokens.shift()

    if (currentToken.type === 'word') {
      const tokenValue: string = currentToken.value
      expressions[tokenValue] && expressions[tokenValue].createExpression(currentToken, tokens, ast)
    }
  }

  return ast
}

export {
  AST,
  Keyword, isKeyword,
  Literal, NumberLiteral, StringLiteral, ExpressionLiteral
}
