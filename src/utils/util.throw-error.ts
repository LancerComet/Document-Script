export function throwError (message: string) {
  throw new Error(message)
}

export function typeError (message) {
  throwError(`[TypeError] ` + message)
}
