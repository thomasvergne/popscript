"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
               Tokens
//////////////////////////////////*/
exports.__esModule = true;
exports["default"] = {
    // BASIC
    SPACE: /\s/,
    TABS: /^\s+/,
    DOT: /\./,
    COMMA: /,/,
    L_PAREN: /\(/,
    R_PAREN: /\)/,
    ARGUMENTS: /=>/,
    PROPERTY: /:\w+/,
    INDEX: /<.*?>/,
    CALL: /->\w+/,
    // TYPES
    STRING: /(['"])(.*?)(['"])/,
    INT: /-?\d+/,
    OPTIONAL: /opt/,
    BOOLEAN: /true|false/,
    // KEYWORDS
    CONVERSION: /(int|string)+\s?:/,
    FUNCTION: /fn/,
    IF: /if/,
    ELIF: /elif/,
    ELSE: /else/,
    WHILE: /while/,
    LOOP: /loop/,
    IN: /in/,
    PRINT: /print/,
    RETURN: /return/,
    ADD: /(\+=|=\+)/,
    REMOVE: /(-=|=-)/,
    IMPORT: /import/,
    EXPORT: /export/,
    FROM: /from/,
    ARRAY: /(:=|=:)/,
    JAVASCRIPT: /as (javascript|js)/,
    // OTHER
    THEN: /then/,
    AND: /and|&/,
    WORD: /\w+/,
    SIGNS: /[><=+\-*\/%|]/,
    NOT: /not|!/,
    COMMENT: /--.*/
};
