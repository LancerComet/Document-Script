import { append } from './expressions/exp.append'
import { create } from './expressions/exp.create'
import { each } from './expressions/exp.each'
import { remove } from './expressions/exp.remove'
import { select } from './expressions/exp.select'
import { style } from './expressions/exp.style'

/**
 * Expressions in document script.
 * @type {Array<string>}
 * @export
 */
export const EXPRESSION_LIST = [
  'append', 'create', 'each', 'remove', 'select', 'style'
]

/**
 * Expression parsing function object.
 * @type {object}
 * @export 
 */
export const expressions = {
  append, create, each, remove, select, style
}
