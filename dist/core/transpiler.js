"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
             Transpiler
//////////////////////////////////*/
exports.__esModule = true;
var parser_1 = require("./parser");
var tokens_1 = require("./tokens/tokens");
var tabdown_1 = require("./tabdown");
var code = [];
var specs = {
    currents: {
        variable: '',
        prototype: '',
        "function": '',
        count_args: 0
    },
    variables: {},
    functions: {},
    prototypes: {}
};
var Transpiler = /** @class */ (function () {
    function Transpiler(file_content) {
        this.content = [];
        parser_1.Tokenizer.addTokenSet(tokens_1["default"]);
        this.content = file_content.split(/\n/g).filter(function (x) { return x.trim().length > 0; });
    }
    Transpiler.prototype.transpile = function () {
        for (var index in this.content) {
            if (this.content.hasOwnProperty(index)) {
                var line = this.content[index], tokens = parser_1.Tokenizer.tokenize(line), context = [], built = [];
                var _loop_1 = function (token_index) {
                    if (tokens.hasOwnProperty(token_index)) {
                        var item = tokens[token_index], value = item.value, token = item.token;
                        switch (token) {
                            case 'PROTOTYPE': {
                                built.push('.prototype');
                                context.push('PROTOTYPE::DECLARE');
                                break;
                            }
                            case 'WORD': {
                                if (context.slice(-1)[0] === 'PROTOTYPE::INFORMATIONS') {
                                    built.push(value);
                                    specs.prototypes[value] = {};
                                    specs.currents.prototype = value;
                                    context.push('PROTOTYPE::TYPE');
                                }
                                else if (context.slice(-1)[0] === 'PROTOTYPE::TYPE') {
                                    built.unshift(value);
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).filter(function (x) { return x.token === 'CALL'; }).length === 0) {
                                        built.push(' = function ():');
                                    }
                                }
                                else if (context.slice(-1)[0] === 'PROTOTYPE::ARGUMENTS') {
                                    if (!specs.prototypes[specs.currents.prototype].arguments)
                                        specs.prototypes[specs.currents.prototype].arguments = {};
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0) {
                                        built.push(value + ', ');
                                    }
                                    else {
                                        built.push(value + '):');
                                    }
                                    specs.prototypes[specs.currents.prototype].arguments[value] = '';
                                    specs.variables[value] = '';
                                }
                                else if (context.slice(-1)[0] === 'PROTOTYPE::FUNCTION') {
                                    built.push(' = ' + value);
                                }
                                else if (context.slice(-1)[0] === 'PROTOTYPE::CALL::ARGUMENTS') {
                                    built.push(value);
                                    ++specs.currents.count_args;
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0) {
                                        built.push(', ');
                                    }
                                    else {
                                        built.push(')');
                                    }
                                }
                                else if (context.slice(-1)[0] === 'ALIASE::DECLARE') {
                                    built.push('.');
                                    built.push(value);
                                    specs.prototypes[value] = {};
                                    specs.currents.prototype = value;
                                    context.push('ALIASE::PROTOTYPE');
                                }
                                else if (context.slice(-1)[0] === 'ALIASE::PROTOTYPE') {
                                    var type = specs.prototypes[value].type;
                                    if (type === 'string')
                                        built.unshift('String');
                                    else if (type === 'array')
                                        built.unshift('Array');
                                    else if (type === 'int')
                                        built.unshift('Number');
                                    else if (type === 'any')
                                        built.unshift('Object');
                                    built.push(' = ' + value);
                                    specs.prototypes[specs.currents.prototype] = specs.prototypes[value];
                                }
                                else if (context.slice(-1)[0] === 'FUNCTION::ARGUMENTS') {
                                    if (!specs.functions[specs.currents["function"]].arguments)
                                        specs.functions[specs.currents["function"]].arguments = {};
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0) {
                                        built.push(value + ', ');
                                    }
                                    else {
                                        built.push(value + '):');
                                    }
                                    specs.functions[specs.currents["function"]].arguments[value] = '';
                                    specs.variables[value] = '';
                                }
                                else if (specs.functions[value] !== undefined) {
                                    built.push(value);
                                    var match_1 = tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS', 'CALL'].includes(x.token); });
                                    match_1.filter(function (x, index) { return x.token === 'AFTER' ? match_1 = match_1.slice(0, index) : match_1; });
                                    if (specs.functions[value].arguments) {
                                        if (Object.values(specs.functions[value].arguments).length === match_1.length) {
                                            built.push('(');
                                            context.push('FUNCTION::ARGUMENTS');
                                        }
                                        else if (specs.functions[value].infinite) {
                                            built.push('(');
                                            context.push('FUNCTION::ARGUMENTS');
                                        }
                                    }
                                    else {
                                        built.push('()');
                                    }
                                }
                                else if (context.slice(-1)[0] === 'MODULE::CALL') {
                                    built.push(value);
                                    context.push('MODULE::ARGUMENTS');
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).filter(function (x) { return x.token === 'CALL'; }).length === 0) {
                                        built.push('()');
                                    }
                                }
                                else if (specs.variables[value] !== undefined) {
                                    built.push(value);
                                    context.push('VARIABLE::USE');
                                    if (context.includes('LOOP::LOOPED_ITEM')) {
                                        if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0 && tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); })[0].token !== 'AFTER') {
                                            built.push(', ');
                                        }
                                        else {
                                            built.push('):');
                                        }
                                    }
                                }
                                else if (specs.prototypes[value] !== undefined) {
                                    built.push('.' + value);
                                    context.push('PROTOTYPE::CALL');
                                    specs.currents.prototype = value;
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).filter(function (x) { return x.token === 'CALL'; }).length === 0) {
                                        built.push('()');
                                    }
                                }
                                else if (context.slice(-1)[0] === 'FUNCTION::DECLARE') {
                                    context.push('FUNCTION::NAME');
                                    built.push(value);
                                    specs.functions[value] = {};
                                    specs.currents["function"] = value;
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).filter(function (x) { return x.token === 'CALL'; }).length === 0) {
                                        built.push('():');
                                    }
                                }
                                else {
                                    built.push("var " + value + " ");
                                    specs.variables[value] = '';
                                    specs.currents.variable = value;
                                    context.push('VARIABLE::DECLARE');
                                }
                                break;
                            }
                            case 'CALL': {
                                if (context.slice(-1)[0] === 'PROTOTYPE::DECLARE') {
                                    built.push('.');
                                    context.push('PROTOTYPE::INFORMATIONS');
                                }
                                else if (context.slice(-1)[0] === 'PROTOTYPE::TYPE') {
                                    if (specs.functions[tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).filter(function (x) { return x.token === 'WORD'; })[0].value]) {
                                        context.push('PROTOTYPE::FUNCTION');
                                    }
                                    else {
                                        built.push(' = function (');
                                        context.push('PROTOTYPE::ARGUMENTS');
                                    }
                                }
                                else if (context.slice(-1)[0] === 'PROTOTYPE::CALL') {
                                    built.push('(');
                                    context.push('PROTOTYPE::CALL::ARGUMENTS');
                                }
                                else if (context.slice(-1)[0] === 'FUNCTION::NAME') {
                                    built.push('(');
                                    context.push('FUNCTION::ARGUMENTS');
                                }
                                else if (context.slice(-1)[0] === 'MODULE::ARGUMENTS') {
                                    built.push('(');
                                }
                                break;
                            }
                            case 'ALIASE': {
                                built.push('.prototype');
                                context.push('ALIASE::DECLARE');
                                break;
                            }
                            case 'PROCESS': {
                                built.push(value);
                                break;
                            }
                            case 'MODULE': {
                                built.push('.');
                                context.push('MODULE::CALL');
                                break;
                            }
                            case 'STRING':
                            case 'INT': {
                                if (context.slice(-1)[0] === 'PROTOTYPE::CALL::ARGUMENTS') {
                                    built.push(value);
                                    specs.prototypes[specs.currents.prototype].arguments[Object.keys(specs.prototypes[specs.currents.prototype].arguments)[specs.currents.count_args]] = 'string';
                                    ++specs.currents.count_args;
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0) {
                                        built.push(', ');
                                    }
                                    else if (specs.currents.count_args === Object.values(specs.prototypes[specs.currents.prototype].arguments).length) {
                                        built.push(')');
                                    }
                                    else {
                                        built.push(')');
                                    }
                                }
                                else if (context.includes('IMPORT::DECLARE')) {
                                    // Module
                                }
                                else if (context.slice(-1)[0] === 'VARIABLE::DECLARE') {
                                    specs.variables[specs.currents.variable] = 'string';
                                    built.push(value);
                                }
                                else if (context.slice(-1)[0] === 'FUNCTION::ARGUMENTS') {
                                    built.push(value);
                                    ++specs.currents.count_args;
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0 && tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); })[0].token !== 'AFTER') {
                                        built.push(', ');
                                    }
                                    else {
                                        built.push(')');
                                    }
                                }
                                else if (context.includes('MODULE::ARGUMENTS')) {
                                    built.push(value);
                                    ++specs.currents.count_args;
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0 && tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); })[0].token !== 'AFTER') {
                                        built.push(', ');
                                    }
                                    else {
                                        built.push(')');
                                    }
                                }
                                else {
                                    if (token === 'INT')
                                        built.push('(' + value + ')');
                                    else
                                        built.push(value);
                                    var prototype_name = tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['TABS', 'SPACE', 'CALL'].includes(x.token); });
                                    if (prototype_name && prototype_name[0] && prototype_name[0].token === 'WORD') {
                                        if (specs.prototypes[prototype_name[0].value]) {
                                            var type = specs.prototypes[prototype_name[0].value].type;
                                            if (type !== 'any') {
                                                if (type !== token.toLowerCase()) {
                                                    throw new Error('Property type is ' + type + ' and value is ' + token.toLowerCase() + '!');
                                                }
                                            }
                                        }
                                        else {
                                            throw new Error('Property ' + prototype_name[0].value + 'does not exists!');
                                        }
                                    }
                                    else if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return x.token === 'CALL'; }).filter(function (x) { return !['TABS', 'SPACE'].includes(x.token); }).length > 0) {
                                        throw new Error('No properties were specified!');
                                    }
                                }
                                break;
                            }
                            case 'AFTER': {
                                context.push('AFTER::USE');
                                built.push(';');
                                break;
                            }
                            case 'MULTIPLES': {
                                built.push('...');
                                if (specs.functions[specs.currents["function"]]) {
                                    specs.functions[specs.currents["function"]].infinite = true;
                                }
                                break;
                            }
                            case 'SELF': {
                                built.push('this');
                                if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).length > 0 && tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); })[0].token !== 'AFTER') {
                                    built.push(', ');
                                }
                                else {
                                    built.push(')');
                                }
                                break;
                            }
                            case 'TYPES': {
                                if (context.slice(-1)[0] === 'PROTOTYPE::TYPE') {
                                    if (value === 'string')
                                        built.unshift('String');
                                    else if (value === 'array')
                                        built.unshift('Array');
                                    else if (value === 'int')
                                        built.unshift('Number');
                                    else if (value === 'any')
                                        built.unshift('Object');
                                    specs.prototypes[specs.currents.prototype].type = value;
                                    if (tokens.slice(parseInt(token_index) + 1).filter(function (x) { return !['SPACE', 'TABS'].includes(x.token); }).filter(function (x) { return x.token === 'CALL'; }).length === 0) {
                                        built.push(' = function ():');
                                    }
                                }
                                break;
                            }
                            case 'LOOP': {
                                built.push('for(');
                                context.push('LOOP::START');
                                break;
                            }
                            case 'IMPORT': {
                                context.push('IMPORT::DECLARE');
                                break;
                            }
                            case 'IN': {
                                built.push('of ');
                                context.push('LOOP::LOOPED_ITEM');
                                break;
                            }
                            case 'FUNCTION': {
                                context.push('FUNCTION::DECLARE');
                                built.push('function ');
                                break;
                            }
                            case 'SIGNS': {
                                built.push(value);
                                break;
                            }
                            case 'SPACE': {
                                break;
                            }
                            case 'TABS': {
                                if (parseInt(token_index) === 0) {
                                    built.push(value);
                                }
                                break;
                            }
                        }
                    }
                };
                for (var token_index in tokens) {
                    _loop_1(token_index);
                }
                context = [];
                code.push(built.join(''));
            }
        }
        return new tabdown_1["default"](code).tab().join('\n');
    };
    return Transpiler;
}());
exports["default"] = Transpiler;
