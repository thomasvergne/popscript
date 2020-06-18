!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("fs")},function(e,t,n){"use strict";t.__esModule=!0;var r=n(2);n(0).readFile("./index.ps","UTF-8",(function(e,t){if(e)throw e;new r.default(t.split(/\r?\n/g).join("\n")).transpile()}))},function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0;var parser_1=__webpack_require__(3),tokens_1=__webpack_require__(5),tabdown_1=__webpack_require__(6),Transpiler=function(){function Transpiler(e){this.variables={},this.functions=[],parser_1.Tokenizer.addTokenSet(tokens_1.default),this.content=e.split(/\n/g)}return Transpiler.prototype.transpile=function(){var code=[],_loop_1=function(e){if(this_1.content.hasOwnProperty(e)){var t=this_1.content[e],n=parser_1.Tokenizer.tokenize(t),r=[],s=[],i=void 0;for(var u in n)if(n.hasOwnProperty(u)){var o=n[u],a=o.value,c=o.token;switch(c){case"PRINT":r.push(c),s.push("console.log(");break;case"SPACE":r.includes("PRINT")||r.includes("VARIABLE")?0===n.slice(parseInt(u)-1).filter((function(e){return"SPACE"!==e.token})).filter((function(e){return["PRINT","SIGNS"].includes(e.token)})).length?s.push(", "):"SIGNS"===n.slice(parseInt(u)-1).filter((function(e){return"SPACE"!==e.token}))[0].token&&n.slice(parseInt(u)+1).filter((function(e){return"SPACE"===e.token})).length>0&&(s.push("["),r.push("ARRAY"),this_1.variables[s[0].replace("var ","")]="array"):r.includes("ARGUMENTS")?"ARGUMENTS"!==n.slice(parseInt(u)-1).filter((function(e){return"SPACE"!==e.token}))[0].token&&n.slice(parseInt(u)).filter((function(e){return"SPACE"!==e.token})).length>0&&s.push(", "):s.push(" ");break;case"STRING":var l=a.match(/::\w+::?/g);if(l){for(var p=0,h=l;p<h.length;p++){var f=h[p],d=f.slice(2,f.length-2);if(!Array.from(Object.keys(this_1.variables)).includes(d))throw'VARIABLE CALLED "'+d+'" DOES NOT EXISTS!';a=a.replace(f,"${"+d+"}")}s.push(a.replace(/"/g,"`"))}else s.push(a);r.includes("VARIABLE")&&(this_1.variables[i]="string"),["JOIN","SPLIT"].includes(r[r.length-1])&&s.push(")");break;case"JOIN":case"SPLIT":s.push("."+a.toLowerCase()+"("),r.push(c);break;case"WORD":Array.from(Object.keys(this_1.variables)).includes(a)?s.push(a):0===parseInt(u)?this_1.functions.includes(a)?(s.push(a),r.push("FUNCTION_CALL")):(s.push("var "+a),this_1.variables[a]="",r.push("VARIABLE"),i=a):"FUNCTION"===r[r.length-1]?(s.push(a),this_1.functions.push(a)):r.includes("ARGUMENTS")?(s.push(a),this_1.variables[a]="",0===n.slice(parseInt(u)+1).filter((function(e){return"SPACE"!==e.token})).length&&s.push("):")):s.push(a);break;case"SIGNS":s.push(a);break;case"ADD":if(!(k=n.slice(0,parseInt(u)).filter((function(e){return"SPACE"!==e.token})).reverse()[0]))break;i=k.value,"string"===this_1.variables[i]?s.push("+="):"array"===this_1.variables[i]?(s.push(".push("),r.push("ADD")):"number"===this_1.variables[i]&&s.push("+=");break;case"REMOVE":var k;if(!(k=n.slice(0,parseInt(u)).filter((function(e){return"SPACE"!==e.token})).reverse()[0]))break;i=k.value,"string"===this_1.variables[i]?(s.push("= "+i+".replace("),r.push("REMOVE")):"array"===this_1.variables[i]?(s.push("= "+i+".filter(x => x !== "),r.push("REMOVE")):"number"===this_1.variables[i]&&s.push("-=");break;case"INDEX":"WORD"===n.slice(0,parseInt(u)).filter((function(e){return"SPACE"!==e.token})).pop().token&&"INT"===n.slice(parseInt(u)).filter((function(e){return"SPACE"!==e.token}))[0].token?"array"===this_1.variables[n.slice(0,parseInt(u)).filter((function(e){return"SPACE"!==e.token})).pop().value]&&(s.push("["),r.push("INDEX")):(["WORD","STRING"].includes(n.slice(0,parseInt(u)-1).filter((function(e){return"SPACE"!==e.token}))[n.slice(0,parseInt(u)-1).filter((function(e){return"SPACE"!==e.token})).length-1].token)||["WORD","STRING"].includes(n.slice(0,parseInt(u)).filter((function(e){return"SPACE"!==e.token}))[n.slice(0,parseInt(u)).filter((function(e){return"SPACE"!==e.token})).length-1].token))&&s.push(".");break;case"INT":s.push(a),r.filter((function(e){return"INDEX"===e})).map((function(e){return s.push("]")}));break;case"L_PAREN":r.includes("VARIABLE")?(s.push("["),r.push("ARRAY")):"FUNCTION_CALL"===r[r.length-1]&&s.push("(");break;case"R_PAREN":r.includes("VARIABLE")?s.push("]"):"FUNCTION_CALL"===r[r.length-1]&&s.push(")");break;case"FUNCTION":s.push("function"),r.push("FUNCTION");break;case"ARGUMENTS":"FUNCTION"===r[r.length-1]&&(s.push("("),r.push(c));break;case"TABS":s.push(a)}}for(var _ in r)r.hasOwnProperty(_)&&(r.includes("ARRAY")&&s.push("]"),r.includes("VARIABLE")||r.includes("FUNCTION")||r.includes("FUNCTION_CALL")||r.includes("JOIN")||r.includes("SPLIT")||(r.includes("ADD")||r.includes("REMOVE")?"string"===this_1.variables[i]?s.push(', "")'):"array"===this_1.variables[i]&&s.push(")"):s.push(")")),r.splice(Number(_),1));code.push(s.join("")),s=[]}},this_1=this;for(var index in this.content)_loop_1(index);eval(new tabdown_1.default(code).tab().join("\n"))},Transpiler}();exports.default=Transpiler},function(e,t,n){"use strict";t.__esModule=!0,t.Tokenizer=void 0;var r=n(4),s=function(){function e(){}return e.addTokenSet=function(e){for(var t in e)this.tokens[t]=e[t]},e.tokenize=function(e){return r.scanner(e,this)},e.tokens={},e.customOut={},e.ignore={},e.functions={},e}();t.Tokenizer=s},function(e,t,n){"use strict";function r(e,t,n){var r={token:e,value:t};return e in n.customOut&&(r.customOut=n.customOut[e]),r}function s(e,t,n){return null!==e&&(e.index<t.startToken||e.index===t.startToken&&e[0].length>t.endToken)&&(t.startToken=e.index,t.tokenValue=e[0],t.endToken=e[0].length,t.currToken=n),t}function i(e,t){var n={endToken:0,startToken:Number.MAX_SAFE_INTEGER,tokenValue:"",currToken:""};for(var r in e){if(e.hasOwnProperty(r))n=s(t.match(e[r]),n,r)}return n}t.__esModule=!0,t.scanner=void 0,t.scanner=function(e,t){for(var n=t.tokens,s=[];e;){var u=i(n,e),o=u.endToken,a=u.startToken,c=u.tokenValue,l=u.currToken;0!==a&&(c=e.substring(0,a),l=t.errTok,o=a),t.ignore[l]||s.push(r(l,c,t)),l in t.functions&&t.functions[l](),e=e.substring(o)}return s}},function(e,t,n){"use strict";t.__esModule=!0,t.default={SPACE:/\s/,TABS:/^\s+/,DOT:/\./,COMMA:/,/,L_PAREN:/\(/,R_PAREN:/\)/,ARGUMENTS:/=>/,INDEX:/:/,STRING:/(['"])(.*?)(['"])/,INT:/-?\d+/,TYPE:/int|str|list/,OPTIONAL:/optional/,BOOLEAN:/true|false/,FUNCTION:/fn/,IF:/if/,ELIF:/elif/,ELSE:/else/,PRINT:/print/,RETURN:/return/,JOIN:/join/,SPLIT:/split/,ADD:/\+=/,REMOVE:/-=/,WORD:/\w+/,SIGNS:/[><=+\-*\/%|]/,NOT:/not|!/,AND:/and|&/,COMMENT:/--.*/}},function(e,t,n){"use strict";t.__esModule=!0;n(0);var r=function(){function e(e){this.content=e.filter((function(e){return""!==e})),this.AST={root:{}},this.parents=[],this.code=[]}return e.prototype.writeObject=function(e,t,n){var r=this.AST.root;if(e.length>0)for(var s in e)e.hasOwnProperty(s)&&(parseInt(s)+1===e.length&&(r[e[s]][t]=n),r=r[e[s]]);else r[t]=n},e.prototype.buildAST=function(e){void 0===e&&(e=0);var t=this.content[e],n=this.content[e+1],r=t.match(/^\s+/)?t.match(/^\s+/)[0].length/2:0,s=n?this.content[e+1].match(/^\s+/)?this.content[e+1].match(/^\s+/)[0].length/2:0:void 0;t.trimRight().endsWith(":")?(this.writeObject(this.parents,t.trim()+"||"+e+"||"+r,{}),this.parents.push(t.trim()+"||"+e+"||"+r)):this.writeObject(this.parents,t.trim()+"||"+e+"||"+r,""),s<r&&(this.parents=this.parents.slice(0,s)),n&&this.buildAST(e+1)},e.prototype.addBrackets=function(e){for(var t in e)e.hasOwnProperty(t)&&("object"==typeof e[t]?(this.code.push(new Array(parseInt(t.split("||")[2])).fill("  ").join("")+t.split("||")[0].slice(0,t.split("||")[0].length-1)+"{"),this.addBrackets(e[t]),this.code.push(new Array(parseInt(t.split("||")[2])).fill("  ").join("")+"}")):(this.code.push(new Array(parseInt(t.split("||")[2])).fill("  ").join("")+t.split("||")[0]),this.addBrackets(e[t])))},e.prototype.tab=function(){return this.buildAST(0),this.addBrackets(this.AST.root),this.code},e}();t.default=r}]);