const fs = require('fs')

export default class Tabdown {
    private readonly content : Array<string>;
    private parents : Array<string>;
    private AST     : {root: {}};
    private code    : Array<string>;

    constructor (content) {
        this.content = content.filter(x => x !== '')
        this.AST     = {
            root: {

            }
        }
        this.parents = []
        this.code    = []
    }

    writeObject (array: Array<string>, property: string, value: any) {
        let item = this.AST['root']
        if (array.length > 0) {
            for (const itemt in array) {
                if (parseInt(itemt) + 1 === array.length) item[array[itemt]][property] = value
                item = item[array[itemt]]
            }
        } else {
            item[property] = value
        }
    }

    buildAST (index = 0) {


        const line    = this.content[index],
              ft_line = this.content[index + 1]

        const depth    = line.match(/^\s+/) ? line.match(/^\s+/)[0].length / 2 : 0,
              ft_depth = ft_line ? this.content[index + 1].match(/^\s+/) ? this.content[index + 1].match(/^\s+/)[0].length / 2 : 0 : undefined
        if (line.trimRight().endsWith(':')) {
            this.writeObject(this.parents, line.trim() + '||' + index + '||' + depth, {})
            this.parents.push(line.trim() + '||' + index + '||' + depth)
        } else {
            this.writeObject(this.parents, line.trim() + '||' + index + '||' + depth, '')
        }
        if (ft_depth < depth) {
            this.parents = this.parents.slice(0, ft_depth)
        }
        if (ft_line) {
            this.buildAST(index + 1)
        }

    }

    addBrackets (item) {


        for (const child in item) {
            if (typeof item[child] === 'object') {
                this.code.push(new Array(parseInt(child.split('||')[2])).fill('  ').join('') + child.split('||')[0].slice(0, child.split('||')[0].length - 1) + '{')
                this.addBrackets(item[child])
                this.code.push(new Array(parseInt(child.split('||')[2])).fill('  ').join('') + '}')
            } else {
                this.code.push(new Array(parseInt(child.split('||')[2])).fill('  ').join('') + child.split('||')[0])
                this.addBrackets(item[child])
            }
        }

    }

    tab () {
        this.buildAST(0)
        this.addBrackets(this.AST.root)
        return this.code
    }

}