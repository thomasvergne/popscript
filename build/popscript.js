!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n){e.exports=require("fs")},function(e,n,t){"use strict";n.__esModule=!0;var r=t(2);t(0).readFile("./index.ps","UTF-8",(function(e,n){if(e)throw e;new r.default(n.split(/\r?\n/g).join("\n")).transpile()}))},function(e,n,t){"use strict";n.__esModule=!0;var r=t(3),o=t(5),u=function(){function e(e){this.variables={},this.functions=[],r.Tokenizer.addTokenSet(o.default),this.content=e.split(/\n/g)}return e.prototype.transpile=function(){var e=[];for(var n in this.content)if(this.content.hasOwnProperty(n)){var t=this.content[n],o=r.Tokenizer.tokenize(t),u=[],i=[];for(var s in o)if(o.hasOwnProperty(s)){var a=o[s],c=a.value,f=a.token;if(!f)return console.log("Can't understand this keyword \""+c+'" at line',n);switch(f){case"STRING":case"INT":i.push(c);break;case"COMMENT":i.push("//"+c.trim().slice(2));break;case"WORD":void 0!==this.variables[c]?(i.push(c),u.push("VARIABLE::USE")):(i.push("var "+c),this.variables[c]="",u.push("VARIABLE::DECLARATION")),c;break;case"SIGNS":"="===c&&u.filter((function(e){return["VARIABLE::USE","VARIABLE::DECLARATION"].includes(e)})).length>0&&i.push("=")}}e.push(i.join("")),i=[],u=[]}},e}();n.default=u},function(e,n,t){"use strict";n.__esModule=!0,n.Tokenizer=void 0;var r=t(4),o=function(){function e(){}return e.addTokenSet=function(e){for(var n in e)this.tokens[n]=e[n]},e.tokenize=function(e){return r.scanner(e,this)},e.tokens={},e.customOut={},e.ignore={},e.functions={},e}();n.Tokenizer=o},function(e,n,t){"use strict";function r(e,n,t){var r={token:e,value:n};return e in t.customOut&&(r.customOut=t.customOut[e]),r}function o(e,n,t){return null!==e&&(e.index<n.startToken||e.index===n.startToken&&e[0].length>n.endToken)&&(n.startToken=e.index,n.tokenValue=e[0],n.endToken=e[0].length,n.currToken=t),n}function u(e,n){var t={endToken:0,startToken:Number.MAX_SAFE_INTEGER,tokenValue:"",currToken:""};for(var r in e){if(e.hasOwnProperty(r))t=o(n.match(e[r]),t,r)}return t}n.__esModule=!0,n.scanner=void 0,n.scanner=function(e,n){for(var t=n.tokens,o=[];e;){var i=u(t,e),s=i.endToken,a=i.startToken,c=i.tokenValue,f=i.currToken;0!==a&&(c=e.substring(0,a),f=n.errTok,s=a),n.ignore[f]||o.push(r(f,c,n)),f in n.functions&&n.functions[f](),e=e.substring(s)}return o}},function(e,n,t){"use strict";n.__esModule=!0,n.default={SPACE:/\s/,TABS:/^\s+/,DOT:/\./,COMMA:/,/,L_PAREN:/\(/,R_PAREN:/\)/,ARGUMENTS:/=>/,PROPERTY:/:/,INDEX:/<.*?>/,STRING:/(['"])(.*?)(['"])/,INT:/-?\d+/,OPTIONAL:/opt/,BOOLEAN:/true|false/,FUNCTION:/fn/,IF:/if/,ELIF:/elif/,ELSE:/else/,WHILE:/while/,LOOP:/loop/,AS:/as/,PRINT:/print/,RETURN:/return/,ADD:/(\+=|=\+)/,REMOVE:/(-=|=-)/,WORD:/\w+/,SIGNS:/[><=+\-*\/%|]/,NOT:/not|!/,AND:/and|&/,COMMENT:/--.*/}}]);