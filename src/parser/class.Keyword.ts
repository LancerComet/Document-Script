const KEYWORD_LIST = [
  'as', 'to', 'from'
]

export class Keyword {
  type: string = 'keyword'
  value: string

  constructor (value: string) {
    this.value = value
  }
}

export function isKeyword (target: string) : boolean {
  return KEYWORD_LIST.indexOf(target) > -1
}
