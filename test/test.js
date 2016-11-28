(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Expression = (function () {
    function Expression(name) {
        this.type = 'CallExpression';
        this.arguments = [];
        this.name = name;
    }
    Expression.prototype.insertArg = function (argument) {
        this.arguments.push(argument);
    };
    return Expression;
}());
exports.Expression = Expression;

},{}],2:[function(require,module,exports){
"use strict";
var Variable = (function () {
    function Variable(name, value) {
        this.name = name;
        this.value = value;
    }
    return Variable;
}());
exports.Variable = Variable;

},{}],3:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var transformer_1 = require('../../transformer');
var utils_1 = require('../../utils');
var EXP_NAME = 'append';
function createExpression(currentToken, tokens, ast) {
    var appendExpression = new _1.Expression(EXP_NAME);
    var srcElementArg = tokens.shift();
    elementExec(srcElementArg, appendExpression, 'source');
    var keywordArg = tokens.shift();
    keywordArg.value === 'to'
        ? appendExpression.insertArg(new parser_1.Keyword(keywordArg.value))
        : utils_1.errorHandler.typeError('A keyword must be followed after srouce element when using "append".');
    var targetElementArg = tokens.shift();
    elementExec(targetElementArg, appendExpression, 'target');
    ast.insertExpression(appendExpression);
}
exports.createExpression = createExpression;
function elementExec(elementArg, appendExpression, type) {
    if (!parser_1.isKeyword(elementArg.value) && _1.EXPRESSION_LIST.indexOf(elementArg.value) < 0) {
        appendExpression.insertArg(elementArg.type === 'number'
            ? new parser_2.NumberLiteral(elementArg.value)
            : new parser_2.StringLiteral(elementArg.value));
    }
    else {
        utils_1.errorHandler.typeError("You can't use a keyword or expression as the name of " + type + " element when calling \"append\".");
    }
}
function run(expression) {
    var variableName = expression.arguments.shift().value;
    var srcElement = transformer_1.VARIABLE_HASH[variableName].value;
    if (srcElement === undefined)
        utils_1.errorHandler.undefinedError(variableName + " is undefined.");
    if (typeof srcElement !== 'object' ||
        (srcElement.nodeName === undefined && srcElement.nodeType === undefined))
        utils_1.errorHandler.typeError(variableName + " isn't a HTML Element.");
    var toKeyword = expression.arguments.shift();
    if (toKeyword.type !== 'keyword' || toKeyword.value !== 'to') {
        utils_1.errorHandler.syntaxError('"to" must be followed after "${variableName}" in "append" expression.');
    }
    var targetVariable = expression.arguments.shift().value;
    var targetElement = transformer_1.VARIABLE_HASH[targetVariable].value;
    if (targetElement === undefined)
        utils_1.errorHandler.undefinedError('${targetVariable} is undefined.');
    if (typeof targetElement !== 'object' ||
        (targetElement.nodeName === undefined && targetElement.nodeType === undefined))
        utils_1.errorHandler.typeError(variableName + " isn't a HTML Element.");
    targetElement.appendChild(srcElement);
}
exports.run = run;

},{"../":9,"../../parser":13,"../../transformer":16,"../../utils":18}],4:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var transformer_1 = require('../../transformer');
var utils_1 = require('../../utils');
var EXP_NAME = 'create';
function createExpression(currentToken, tokens, ast) {
    var createExpression = new _1.Expression(EXP_NAME);
    var tagNameArg = tokens.shift();
    tagNameArg.type === 'word'
        ? createExpression.insertArg(new parser_2.StringLiteral(tagNameArg.value))
        : utils_1.errorHandler.typeError('A HTML tag name can\'t be a number.');
    var asArg = tokens.shift();
    asArg.value === 'as'
        ? createExpression.insertArg(new parser_1.Keyword(asArg.value))
        : utils_1.errorHandler.typeError("A keyword \"as\" must be provided after HTML tag name in \"" + EXP_NAME + "\" expression.");
    var elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        createExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError("You can't use a keyword or expression as a variable when calling \"" + EXP_NAME + "\".");
    }
    ast.insertExpression(createExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    var tagName = expression.arguments.shift();
    if (tagName.type !== 'StringLiteral' || typeof tagName.value !== 'string') {
        utils_1.errorHandler.typeError('You must use a string as your tag name.');
    }
    var asKeyword = expression.arguments.shift();
    if (asKeyword.type !== 'keyword' || asKeyword.value !== 'as') {
        utils_1.errorHandler.syntaxError('"as" must be followed after "${tagName}" in "create" expression.');
    }
    var variableName = expression.arguments.shift().value;
    var variableValue = document.createElement(tagName.value);
    transformer_1.VARIABLE_HASH[variableName] = new _1.Variable(variableName, variableValue);
}
exports.run = run;

},{"../":9,"../../parser":13,"../../transformer":16,"../../utils":18}],5:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var utils_1 = require('../../utils');
var EXP_NAME = 'each';
function createExpression(currentToken, tokens) {
    var eachExpression = new _1.Expression(EXP_NAME);
    var elementsArg = tokens.shift();
    if (!parser_1.isKeyword(elementsArg.value) && _1.EXPRESSION_LIST.indexOf(elementsArg.value) < 0) {
        eachExpression.insertArg(elementsArg.type === 'number'
            ? new parser_2.NumberLiteral(elementsArg.value)
            : new parser_2.StringLiteral(elementsArg.value));
    }
    else {
        utils_1.errorHandler.typeError('An element variable can not be a keyword or expression.');
    }
    var expressionArg = tokens.shift();
    if (_1.EXPRESSION_LIST.indexOf(expressionArg.value) > -1) {
        eachExpression.insertArg(new parser_2.ExpressionLiteral(expressionArg.value));
    }
    else {
        utils_1.errorHandler.throwError("[Unknown Expression] Sadly I don't know the expression called \"" + expressionArg.value + "\". :(");
    }
    var args = [tokens.shift(), tokens.shift()];
    args.forEach(function (arg) { return eachExpression.insertArg(arg.type === 'number' ? new parser_2.NumberLiteral(arg.value) : new parser_2.StringLiteral(arg.value)); });
}
exports.createExpression = createExpression;
function run() {
}
exports.run = run;

},{"../":9,"../../parser":13,"../../utils":18}],6:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var transformer_1 = require('../../transformer');
var utils_1 = require('../../utils');
var EXP_NAME = 'remove';
function createExpression(currentToken, tokens, ast) {
    var removeExpression = new _1.Expression(EXP_NAME);
    var elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        removeExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError("You can't use a keyword or expression as a variable when calling \"" + EXP_NAME + "\".");
    }
    ast.insertExpression(removeExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    var variableName = expression.arguments.shift().value;
    var srcElement = transformer_1.VARIABLE_HASH[variableName].value;
    if (srcElement === undefined)
        utils_1.errorHandler.undefinedError(variableName + " is undefined.");
    if (typeof srcElement !== 'object' ||
        (srcElement.nodeName === undefined && srcElement.nodeType === undefined))
        utils_1.errorHandler.typeError(variableName + " isn't a HTML Element.");
    var parentElement = srcElement.parentElement;
    parentElement.removeChild(srcElement);
}
exports.run = run;

},{"../":9,"../../parser":13,"../../transformer":16,"../../utils":18}],7:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var transformer_1 = require('../../transformer');
var utils_1 = require('../../utils');
var EXP_NAME = 'select';
function createExpression(currentToken, tokens, ast) {
    var selectExpression = new _1.Expression(EXP_NAME);
    var selectorArg = tokens.shift();
    selectExpression.insertArg(new parser_2.StringLiteral(selectorArg.value.toString()));
    var asArg = tokens.shift();
    asArg.value === 'as'
        ? selectExpression.insertArg(new parser_1.Keyword(asArg.value))
        : utils_1.errorHandler.typeError("A keyword \"as\" must be provided after HTML tag name in \"" + EXP_NAME + "\" expression.");
    var elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        selectExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError("You can't use a keyword or expression as a variable when calling \"" + EXP_NAME + "\".");
    }
    ast.insertExpression(selectExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    var selector = expression.arguments.shift();
    if (selector.type !== 'StringLiteral' || typeof selector.value !== 'string') {
        utils_1.errorHandler.typeError('You must use a string as your selector.');
    }
    var selectedElement = null;
    var _selected = document.querySelectorAll(selector.value);
    if (_selected.length === 1) {
        selectedElement = _selected[0];
    }
    else if (_selected.length > 1) {
        selectedElement = _selected;
    }
    var asKeyword = expression.arguments.shift();
    if (asKeyword.type !== 'keyword' || asKeyword.value !== 'as') {
        utils_1.errorHandler.syntaxError('"as" must be followed after "${tagName}" in "create" expression.');
    }
    var variableName = expression.arguments.shift().value;
    var variableValue = selectedElement;
    transformer_1.VARIABLE_HASH[variableName] = new _1.Variable(variableName, variableValue);
}
exports.run = run;

},{"../":9,"../../parser":13,"../../transformer":16,"../../utils":18}],8:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var transformer_1 = require('../../transformer');
var utils_1 = require('../../utils');
var EXP_NAME = 'style';
function createExpression(currentToken, tokens, ast) {
    var styleExpression = new _1.Expression(EXP_NAME);
    var elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        styleExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError("You can't use a keyword or expression as a variable when calling \"" + EXP_NAME + "\".");
    }
    var stylePropArg = tokens.shift();
    stylePropArg.type === 'word'
        ? styleExpression.insertArg(new parser_2.StringLiteral(stylePropArg.value))
        : utils_1.errorHandler.typeError('A css style properity must be a string.');
    var styleValueArg = tokens.shift();
    styleExpression.insertArg(new parser_2.StringLiteral(styleValueArg.value));
    ast.insertExpression(styleExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    var variableName = expression.arguments.shift().value;
    var srcElement = transformer_1.VARIABLE_HASH[variableName].value;
    if (srcElement === undefined)
        utils_1.errorHandler.undefinedError(variableName + " is undefined.");
    if (typeof srcElement !== 'object' ||
        (srcElement.nodeName === undefined && srcElement.nodeType === undefined))
        utils_1.errorHandler.typeError(variableName + " isn't a HTML Element.");
    var cssProperityName = expression.arguments.shift();
    var _cssPropVal = cssProperityName.value;
    if (cssProperityName.type !== 'StringLiteral' || typeof _cssPropVal !== 'string') {
        utils_1.errorHandler.typeError("CSS properity is string-typed. \"" + _cssPropVal + "\" is not a string.");
    }
    var cssProperityValue = expression.arguments.shift().value;
    srcElement.style[_cssPropVal] = cssProperityValue;
}
exports.run = run;

},{"../":9,"../../parser":13,"../../transformer":16,"../../utils":18}],9:[function(require,module,exports){
"use strict";
var append = require('./expressions/exp.append');
exports.append = append;
var create = require('./expressions/exp.create');
exports.create = create;
var each = require('./expressions/exp.each');
exports.each = each;
var remove = require('./expressions/exp.remove');
exports.remove = remove;
var select = require('./expressions/exp.select');
exports.select = select;
var style = require('./expressions/exp.style');
exports.style = style;
var class_Expression_1 = require('./class.Expression');
exports.Expression = class_Expression_1.Expression;
var class_Variable_1 = require('./class.Variable');
exports.Variable = class_Variable_1.Variable;
exports.EXPRESSION_LIST = [
    'append', 'create', 'each', 'remove', 'select', 'style'
];

},{"./class.Expression":1,"./class.Variable":2,"./expressions/exp.append":3,"./expressions/exp.create":4,"./expressions/exp.each":5,"./expressions/exp.remove":6,"./expressions/exp.select":7,"./expressions/exp.style":8}],10:[function(require,module,exports){
"use strict";
var AST = (function () {
    function AST(type, body) {
        if (type === void 0) { type = ''; }
        if (body === void 0) { body = []; }
        this.type = type;
        this.body = body;
    }
    AST.prototype.insertExpression = function (expression) {
        this.body.push(expression);
    };
    return AST;
}());
exports.AST = AST;

},{}],11:[function(require,module,exports){
"use strict";
var KEYWORD_LIST = [
    'as', 'to', 'from'
];
var Keyword = (function () {
    function Keyword(value) {
        this.type = 'keyword';
        this.value = value;
    }
    return Keyword;
}());
exports.Keyword = Keyword;
function isKeyword(target) {
    return KEYWORD_LIST.indexOf(target) > -1;
}
exports.isKeyword = isKeyword;

},{}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Literal = (function () {
    function Literal(type, value) {
        this.type = type;
        this.value = value;
    }
    return Literal;
}());
exports.Literal = Literal;
var NumberLiteral = (function (_super) {
    __extends(NumberLiteral, _super);
    function NumberLiteral(value) {
        _super.call(this, 'NumberLiteral', value);
    }
    return NumberLiteral;
}(Literal));
exports.NumberLiteral = NumberLiteral;
var StringLiteral = (function (_super) {
    __extends(StringLiteral, _super);
    function StringLiteral(value) {
        _super.call(this, 'StringLiteral', value);
    }
    return StringLiteral;
}(Literal));
exports.StringLiteral = StringLiteral;
var ExpressionLiteral = (function (_super) {
    __extends(ExpressionLiteral, _super);
    function ExpressionLiteral(value) {
        _super.call(this, 'expression', value);
    }
    return ExpressionLiteral;
}(Literal));
exports.ExpressionLiteral = ExpressionLiteral;

},{}],13:[function(require,module,exports){
"use strict";
var class_AST_1 = require('./class.AST');
exports.AST = class_AST_1.AST;
var class_Keyword_1 = require('./class.Keyword');
exports.Keyword = class_Keyword_1.Keyword;
exports.isKeyword = class_Keyword_1.isKeyword;
var class_Literal_1 = require('./class.Literal');
exports.Literal = class_Literal_1.Literal;
exports.NumberLiteral = class_Literal_1.NumberLiteral;
exports.StringLiteral = class_Literal_1.StringLiteral;
exports.ExpressionLiteral = class_Literal_1.ExpressionLiteral;
var expressions = require('../expressions');
function parser(tokens) {
    if (tokens === void 0) { tokens = []; }
    if (!tokens.length) {
        return false;
    }
    var ast = new class_AST_1.AST('Expression');
    while (tokens.length > 0) {
        var currentToken = tokens.shift();
        if (currentToken.type === 'word') {
            var tokenValue = currentToken.value;
            expressions[tokenValue] && expressions[tokenValue].createExpression(currentToken, tokens, ast);
        }
    }
    return ast;
}
exports.parser = parser;

},{"../expressions":9,"./class.AST":10,"./class.Keyword":11,"./class.Literal":12}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token = (function () {
    function Token(type, value) {
        if (type === void 0) { type = ''; }
        this.type = type;
        this.value = value;
    }
    return Token;
}());
exports.Token = Token;
var NumberToken = (function (_super) {
    __extends(NumberToken, _super);
    function NumberToken(value) {
        _super.call(this, 'number', value);
    }
    return NumberToken;
}(Token));
exports.NumberToken = NumberToken;
var WordToken = (function (_super) {
    __extends(WordToken, _super);
    function WordToken(value) {
        _super.call(this, 'word', value);
    }
    return WordToken;
}(Token));
exports.WordToken = WordToken;

},{}],15:[function(require,module,exports){
"use strict";
var class_Token_1 = require('./class.Token');
exports.Token = class_Token_1.Token;
exports.NumberToken = class_Token_1.NumberToken;
exports.WordToken = class_Token_1.WordToken;
function tokenizer(code) {
    return code.split(/\s+/)
        .filter(function (words) { return words.length > 0; })
        .map(function (words) { return isNaN(parseInt(words, 0))
        ? new class_Token_1.WordToken(words)
        : new class_Token_1.NumberToken(words); });
}
exports.tokenizer = tokenizer;

},{"./class.Token":14}],16:[function(require,module,exports){
"use strict";
var tf_variable_hash_1 = require('./tf.variable-hash');
exports.VARIABLE_HASH = tf_variable_hash_1.VARIABLE_HASH;
var expressions = require('../expressions');
function transformer(ast) {
    ast.body.forEach(function (expression) {
        expressions[expression.name] && expressions[expression.name].run(expression);
    });
}
exports.transformer = transformer;
window.VARIABLE_HASH = tf_variable_hash_1.VARIABLE_HASH;

},{"../expressions":9,"./tf.variable-hash":17}],17:[function(require,module,exports){
"use strict";
exports.VARIABLE_HASH = {};

},{}],18:[function(require,module,exports){
"use strict";
var errorHandler = require('./util.throw-error');
exports.errorHandler = errorHandler;

},{"./util.throw-error":19}],19:[function(require,module,exports){
"use strict";
function throwError(message) {
    throw new Error(message);
}
exports.throwError = throwError;
function typeError(message) {
    throwError("[TypeError] " + message);
}
exports.typeError = typeError;
function syntaxError(message) {
    throwError('[Syntax Error] ' + message);
}
exports.syntaxError = syntaxError;
function undefinedError(message) {
    throwError('[Undefined] ' + message);
}
exports.undefinedError = undefinedError;

},{}],20:[function(require,module,exports){
"use strict";
var tokenizer_1 = require('../src/tokenizer');
var parser_1 = require('../src/parser');
var transformer_1 = require('../src/transformer');
window.tokenizer = tokenizer_1.tokenizer;
window.parser = parser_1.parser;
window.transformer = transformer_1.transformer;

},{"../src/parser":13,"../src/tokenizer":15,"../src/transformer":16}]},{},[20]);
