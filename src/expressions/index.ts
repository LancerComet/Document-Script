import * as append from './expressions/exp.append'
import * as create from './expressions/exp.create'
import * as each from './expressions/exp.each'
import * as remove from './expressions/exp.remove'
import * as select from './expressions/exp.select'
import * as style from './expressions/exp.style'

import { Expression } from './class.Expression'
import { Variable } from './class.Variable'

/**
 * Expressions in document script.
 * @type {Array<string>}
 * @export
 */
export const EXPRESSION_LIST = [
  'append', 'create', 'each', 'remove', 'select', 'style'
]

export {
  append, create, each, remove, select, style,
  Expression,
  Variable
}
