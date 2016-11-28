export function throwError (message: string) {
  throw new Error(message)
}

export function typeError (message: string) {
  throwError(`[TypeError] ` + message)
}

export function syntaxError (message: string) {
  throwError('[Syntax Error] ' + message)
}

export function undefinedError (message: string) {
  throwError('[Undefined] ' + message)
}
