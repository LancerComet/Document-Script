/**
 * Class: Variable.
 * 
 * @class Variable
 */
declare class Variable {
  /**
   * Name of this variable.
   * 
   * @type {string|number}
   * @memberOf Variable
   */
  name: string | number

  /**
   * Value belongs to this variable.
   * 
   * @type {*}
   * @memberOf Variable
   */
  value: any

  /**
   * Creates an instance of Variable.
   * 
   * @param {string|number} name
   * @param {*} value
   * 
   * @memberOf Variable
   */
  constructor (name: string | number, value: any)
}
