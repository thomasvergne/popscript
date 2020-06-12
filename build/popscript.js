!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";t.__esModule=!0,new(n(1).default)('test = "world"\nprint "hello ::test::!"\nprint "hello" test').transpile()},function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0;var parser_1=__webpack_require__(2),tokens_1=__webpack_require__(4),Transpiler=function(){function Transpiler(e){this.variables={},parser_1.Tokenizer.addTokenSet(tokens_1.default),this.content=e.split(/\n/g)}return Transpiler.prototype.transpile=function(){var code=[];for(var index in this.content){var line=this.content[index],tokens=parser_1.Tokenizer.tokenize(line),context=[],built=[];for(var item_token in tokens){var item=tokens[item_token],value=item.value,token=item.token;switch(token){case"PRINT":context.push(token),built.push("console.log(");break;case"SPACE":context.includes("PRINT")&&"PRINT"!==tokens.slice(parseInt(item_token)-1).filter((function(e){return"SPACE"!==e.token}))[0].token&&built.push(", ");break;case"STRING":var match=value.match(/::\w+::?/g);if(match){for(var _i=0,match_1=match;_i<match_1.length;_i++){var occurrence=match_1[_i],variable_name=occurrence.slice(2,occurrence.length-2);if(!Array.from(Object.keys(this.variables)).includes(variable_name))throw'VARIABLE CALLED "'+variable_name+'" DOES NOT EXISTS!';value=value.replace(occurrence,"${"+variable_name+"}")}built.push(value.replace(/"/g,"`"))}else built.push(value);break;case"WORD":Array.from(Object.keys(this.variables)).includes(value)?built.push(value):0===parseInt(item_token)&&(built.push("var "+value),this.variables[value]="");break;case"SIGNS":built.push(value)}}for(var context_item in context)context.splice(Number(context_item),1),built.push(")");console.log(built.join("")),code.push(built.join("")),built=[]}eval(code.join("\n"))},Transpiler}();exports.default=Transpiler},function(e,t,n){"use strict";t.__esModule=!0,t.Tokenizer=void 0;var r=n(3),o=function(){function e(){}return e.addTokenSet=function(e){for(var t in e)this.tokens[t]=e[t]},e.tokenize=function(e){return r.scanner(e,this)},e.tokens={},e.customOut={},e.ignore={},e.functions={},e}();t.Tokenizer=o},function(e,t,n){"use strict";function r(e,t,n){var r={token:e,value:t};return e in n.customOut&&(r.customOut=n.customOut[e]),r}function o(e,t,n){return null!==e&&(e.index<t.startToken||e.index===t.startToken&&e[0].length>t.endToken)&&(t.startToken=e.index,t.tokenValue=e[0],t.endToken=e[0].length,t.currToken=n),t}function i(e,t){var n={endToken:0,startToken:Number.MAX_SAFE_INTEGER,tokenValue:"",currToken:""};for(var r in e){n=o(t.match(e[r]),n,r)}return n}t.__esModule=!0,t.scanner=void 0,t.scanner=function(e,t){for(var n=t.tokens,o=[];e;){var u=i(n,e),a=u.endToken,s=u.startToken,l=u.tokenValue,c=u.currToken;0!==s&&(l=e.substring(0,s),c=t.errTok,a=s),t.ignore[c]||o.push(r(c,l,t)),c in t.functions&&t.functions[c](),e=e.substring(a)}return o}},function(e,t,n){"use strict";t.__esModule=!0,t.default={SPACE:/\s/,PROPERTY:/:\w+/,TABS:/^\s+/,COLON:/:/,DOT:/\./,COMMA:/,/,L_PAREN:/\(/,R_PAREN:/\)/,ARGUMENTS:/=>/,STRING:/(['"])(.*?)(['"])/,INT:/-?\d+/,ARRAY_START:/:-/,ARRAY_END:/-:/,TYPE:/int|str|list/,OPTIONAL:/optional/,BOOLEAN:/true|false/,FUNCTION:/fn/,IF:/if/,ELIF:/elif/,ELSE:/else/,PRINT:/print/,RETURN:/return/,WORD:/\w+/,SIGNS:/[><=+\-*\/%|]/,NOT:/not|!/,AND:/and|&/,COMMENT:/--.*/}}]);