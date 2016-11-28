/// <reference path="../index.d.ts" />

import { VARIABLE_HASH } from './tf.variable-hash'
import * as expressions from '../expressions'

export function transformer (ast: AST) {
  ast.body.forEach(expression => {
    expressions[expression.name] && expressions[expression.name].run(expression)
  })
}

export { VARIABLE_HASH }