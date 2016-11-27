import { tokenizer } from '../src/tokenizer'
import { parser } from '../src/parser'
import { transformer } from '../src/transformer'

(<any>window).tokenizer = tokenizer;
(<any>window).parser = parser;
(<any>window).transformer = transformer;
