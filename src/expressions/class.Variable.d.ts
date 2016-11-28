/**
 * Class: Variable.
 * 
 * @export
 * @class Variable
 */
declare class Variable {
  /**
   * Name of this variable.
   * 
   * @type {string}
   * @memberOf Variable
   */
  name: string

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
   * @param {string} name
   * @param {*} value
   * 
   * @memberOf Variable
   */
  constructor (name: string, value: any)
}
