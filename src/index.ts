/*
 *  Document Script By LancerComet at 21:01, 2016.11.26.
 *  # Carry Your World #
 */

import { tokenizer } from './tokenizer'
import { parser } from './parser'
import { transformer } from './transformer'

export function documentScript () {
  const codeNodes = Array.prototype.slice.call(document.querySelectorAll('script[lang=DocumentScript]'))
  codeNodes.forEach(node => {
    const code = node.textContent.trim()
    transformer(<AST> parser(tokenizer(code)))
  })
}
