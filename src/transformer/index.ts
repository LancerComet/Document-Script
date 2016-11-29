/// <reference path="../index.d.ts" />

import { VARIABLE_HASH, TEMP_VARIABLE_HASH } from './tf.variable-hash'
import * as expressions from '../expressions'

export function transformer (ast: AST | false) {
  if (!ast) return
  ast.body.forEach(expression => {
    expressions[expression.name] && expressions[expression.name].run(expression)
  })
}

export { VARIABLE_HASH, TEMP_VARIABLE_HASH }
