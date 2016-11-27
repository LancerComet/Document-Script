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
var parser_1 = require('../../parser');
var _1 = require('../');
var utils_1 = require('../../utils');
var EXP_NAME = 'append';
function append(currentToken, tokens, ast) {
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
exports.append = append;
function elementExec(elementArg, appendExpression, type) {
    if (!parser_1.isKeyword(elementArg.value) && _1.EXPRESSION_LIST.indexOf(elementArg.value) < 0) {
        appendExpression.insertArg(elementArg.type === 'number'
            ? new NumberLiteral(elementArg.value)
            : new StringLiteral(elementArg.value));
    }
    else {
        utils_1.errorHandler.typeError("You can't use a keyword or expression as the name of " + type + " element when calling \"append\".");
    }
}

},{"../":8,"../../parser":12,"../../utils":16}],3:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var utils_1 = require('../../utils');
var EXP_NAME = 'create';
function create(currentToken, tokens, ast) {
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
exports.create = create;

},{"../":8,"../../parser":12,"../../utils":16}],4:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var utils_1 = require('../../utils');
var EXP_NAME = 'each';
function each(currentToken, tokens) {
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
exports.each = each;

},{"../":8,"../../parser":12,"../../utils":16}],5:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var utils_1 = require('../../utils');
var EXP_NAME = 'remove';
function remove(currentToken, tokens, ast) {
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
exports.remove = remove;

},{"../":8,"../../parser":12,"../../utils":16}],6:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var utils_1 = require('../../utils');
var EXP_NAME = 'select';
function select(currentToken, tokens, ast) {
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
exports.select = select;

},{"../":8,"../../parser":12,"../../utils":16}],7:[function(require,module,exports){
"use strict";
var parser_1 = require('../../parser');
var _1 = require('../');
var parser_2 = require('../../parser');
var utils_1 = require('../../utils');
var EXP_NAME = 'style';
function style(currentToken, tokens, ast) {
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
exports.style = style;

},{"../":8,"../../parser":12,"../../utils":16}],8:[function(require,module,exports){
"use strict";
var exp_append_1 = require('./expressions/exp.append');
var exp_create_1 = require('./expressions/exp.create');
var exp_each_1 = require('./expressions/exp.each');
var exp_remove_1 = require('./expressions/exp.remove');
var exp_select_1 = require('./expressions/exp.select');
var exp_style_1 = require('./expressions/exp.style');
var class_Expression_1 = require('./class.Expression');
exports.Expression = class_Expression_1.Expression;
exports.EXPRESSION_LIST = [
    'append', 'create', 'each', 'remove', 'select', 'style'
];
exports.expressions = {
    append: exp_append_1.append, create: exp_create_1.create, each: exp_each_1.each, remove: exp_remove_1.remove, select: exp_select_1.select, style: exp_style_1.style
};

},{"./class.Expression":1,"./expressions/exp.append":2,"./expressions/exp.create":3,"./expressions/exp.each":4,"./expressions/exp.remove":5,"./expressions/exp.select":6,"./expressions/exp.style":7}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
var expressions_1 = require('../expressions');
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
            expressions_1.expressions[tokenValue] && expressions_1.expressions[tokenValue](currentToken, tokens, ast);
        }
    }
    return ast;
}
exports.parser = parser;

},{"../expressions":8,"./class.AST":9,"./class.Keyword":10,"./class.Literal":11}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./class.Token":13}],15:[function(require,module,exports){
"use strict";
var VARIABLE_HASH = {};
function transformer(ast) {
}
exports.transformer = transformer;

},{}],16:[function(require,module,exports){
"use strict";
var errorHandler = require('./util.throw-error');
exports.errorHandler = errorHandler;

},{"./util.throw-error":17}],17:[function(require,module,exports){
"use strict";
function throwError(message) {
    throw new Error(message);
}
exports.throwError = throwError;
function typeError(message) {
    throwError("[TypeError] " + message);
}
exports.typeError = typeError;

},{}],18:[function(require,module,exports){
"use strict";
var tokenizer_1 = require('../src/tokenizer');
var parser_1 = require('../src/parser');
var transformer_1 = require('../src/transformer');
window.tokenizer = tokenizer_1.tokenizer;
window.parser = parser_1.parser;
window.transformer = transformer_1.transformer;

},{"../src/parser":12,"../src/tokenizer":14,"../src/transformer":15}]},{},[18]);
