/**
 * Class: Variable.
 * 
 * @export
 * @class Variable
 */
export class Variable {
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
   * @param {string} name
   * @param {*} value
   * 
   * @memberOf Variable
   */
  constructor (name: string | number, value: any) {
    this.name = name
    this.value = value
  }
}
