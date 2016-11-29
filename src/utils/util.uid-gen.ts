/**
 * Generate an unique string.
 * 
 * @export
 * @returns
 */
export function uidGen () {
  return (Math.floor(Math.random() * 10000) * Date.now()).toString(16)
}
