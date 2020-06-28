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
    PROPERTY: /:(\w|\d)+/,
    CALL: /(\w|\d)+->\w+/,
    // TYPES
    STRING: /(['"])(.*?)(['"])/,
    INT: /-?\d+/,
    OPTIONAL: /opt/,
    BOOLEAN: /true|false/,
    // KEYWORDS
    CONVERSION: /(int|str)+\s?:/,
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
    JAVASCRIPT: /as (javascript|js)/,
    // OTHER
    THEN: /then/,
    ARGUMENT: /&/,
    AND: /and/,
    WORD: /\w+/,
    SIGNS: /[><=+\-*\/%|]/,
    NOT: /not|!/,
    COMMENT: /;.*/
};
