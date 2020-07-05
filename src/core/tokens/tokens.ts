/*//////////////////////////////////
         POPSCRIPT LANGUAGE
               Tokens
//////////////////////////////////*/

export default {

    // BASIC

    SPACE       : /\s/                    , // Match any spaces
    TABS        : /^\s+/                  , // Match start tabs
    DOT         : /\./                    , // Match any dots
    COMMA       : /,/                     , // Match any comma
    L_PAREN     : /\(/                    , // Match any left parenthesis
    R_PAREN     : /\)/                    , // Match any right parenthesis
    COLON       : /:/                     , // Match colon char 
    CALL        : /=>/                    , // Match arguments start like fn test => coucou
    MODULE      : /->/                    , // Match module call keyword
    PROCESS     : /process/               , // Match process keyword

    // TYPES

    STRING      : /(['"])(.*?)(['"])/     , // Match any strings
    INT         : /-?\d+/                 , // Match any digits
    OPTIONAL    : /opt/                   , // Match optional type
    BOOLEAN     : /true|false/            , // Match boolean
    TYPES       : /string|int|array|any/  , // Match types

    // KEYWORDS

    CONVERSION  : /(int|str)+\s?:/        , // Match type conversion
    FUNCTION    : /fn/                    , // Match function keyword
    PROTOTYPE   : /prop/                  , // Match property keyword
    ALIASE      : /aliase/                , // Match aliase keyword
    MULTIPLES   : /mul/                   , // Match spread arguments

    IF          : /if/                    , // Match if condition
    ELIF        : /elif/                  , // Match else if condition
    ELSE        : /else/                  , // Match else condition

    WHILE       : /while/                 , // Match while keyword
    LOOP        : /loop/                  , // Match loop keyword
    AS          : /as/                    , // Match "as" in loop keyword

    RETURN      : /return/                , // Match return keyword
    SELF        : /self/                  , // Match self keyword

    IMPORT      : /import/                , // Match import keyword


    // OTHER

    AFTER       : /then|and/              , // Match after keyword
    ARGUMENT    : /&/                     , // Match argument
    WORD        : /\w+/                   , // Match any words
    SIGNS       : /[><=+\-*\/%|]/         , // Match any sign
    NOT         : /not|!/                 , // Match not keyword
    COMMENT     : /;.*/                   , // Match comments

}