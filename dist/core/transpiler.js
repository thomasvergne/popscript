"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
             Transpiler
//////////////////////////////////*/
exports.__esModule = true;
var parser_1 = require("./parser");
var tokens_1 = require("./tokens/tokens");
var Transpiler = /** @class */ (function () {
    function Transpiler(content) {
        this.variables = {};
        this.functions = [];
        parser_1.Tokenizer.addTokenSet(tokens_1["default"]);
        this.content = content.split(/\n/g);
    }
    Transpiler.prototype.transpile = function () {
        var code = [];
        for (var index in this.content) {
            if (this.content.hasOwnProperty(index)) {
                var line = this.content[index];
                var tokens = parser_1.Tokenizer.tokenize(line);
                var context = [], built = [], var_name = '';
                for (var item_token in tokens) {
                    if (tokens.hasOwnProperty(item_token)) {
                        var item = tokens[item_token], value = item.value, token = item.token;
                        if (!token)
                            return console.log('Can\'t understand this keyword "' + value + '" at line', index);
                        switch (token) {
                            case 'STRING':
                            case 'INT': {
                                built.push(value);
                                if (context.filter(function (x) { return ['VARIABLE::USE', 'VARIABLE::DECLARATION'].includes(x); }).length > 0 &&
                                    this.variables[var_name] !== 'array') {
                                    this.variables[var_name] = token.toLowerCase();
                                }
                                break;
                            }
                            case 'COMMENT': {
                                built.push('//' + value.trim().slice(2));
                                break;
                            }
                            case 'WORD': {
                                if (this.variables[value] !== undefined) {
                                    built.push(value);
                                    context.push('VARIABLE::USE');
                                }
                                else {
                                    built.push("var " + value);
                                    this.variables[value] = '';
                                    context.push('VARIABLE::DECLARATION');
                                }
                                var_name = value;
                                break;
                            }
                            case 'SIGNS': {
                                if (value === '=') {
                                    if (context.filter(function (x) { return ['VARIABLE::USE', 'VARIABLE::DECLARATION'].includes(x); }).length > 0) {
                                        built.push('=');
                                    }
                                }
                                else {
                                    built.push(value);
                                }
                                break;
                            }
                            case 'L_PAREN':
                            case 'R_PAREN': {
                                if (context.filter(function (x) { return ['VARIABLE::USE', 'VARIABLE::DECLARATION'].includes(x); }).length > 0) {
                                    if (token === 'L_PAREN')
                                        built.push('[');
                                    else if (token === 'R_PAREN')
                                        built.push(']');
                                    this.variables[var_name] = 'array';
                                }
                                break;
                            }
                            case 'COMMA': {
                                built.push(value);
                                break;
                            }
                            case 'ADD': {
                                switch (this.variables[var_name]) {
                                    case 'string':
                                    case 'int': {
                                        built.push('+=');
                                        break;
                                    }
                                    case 'array': {
                                        built.push('.push(');
                                        context.push('ARRAY::PUSH');
                                        break;
                                    }
                                }
                                break;
                            }
                            case 'REMOVE': {
                                switch (this.variables[var_name]) {
                                    case 'int': {
                                        built.push('-=');
                                        break;
                                    }
                                    case 'string': {
                                        built.push(' = ' + var_name + '.replace(');
                                        context.push('STRING::REMOVE');
                                        break;
                                    }
                                    case 'array': {
                                        built.push('.filter(x => x !== ');
                                        context.push('ARRAY::REMOVE');
                                        break;
                                    }
                                }
                                break;
                            }
                            case 'AND': {
                                if (context.includes('STRING::REMOVE')) {
                                    built.push(', ""), ');
                                    context.splice(context.findIndex(function (x) { return x === 'STRING::REMOVE'; }), 1);
                                }
                                else if (context.includes('ARRAY::REMOVE')) {
                                    built.push('), ');
                                    context.splice(context.findIndex(function (x) { return x === 'ARRAY::REMOVE'; }), 1);
                                }
                                break;
                            }
                        }
                    }
                }
                code.push(built.join(''));
                built = [];
                context = [];
            }
        }
        console.log(code);
    };
    return Transpiler;
}());
exports["default"] = Transpiler;
