class Expression {
    constructor(exp) {
        this.data = exp
    }

    doOperation(a, op, b) {
        switch (op) {
            case '+':
                return a+b
            case '*':
                return a*b
            case '/':
                return a/b
            case '-':
                return a-b
        }
    }

    parse(level) {
        if (!level) level = 0
        else level++
        const expregex = /\(?(.+)\)?(\+|\*|\/|\-)\(?(.+)\)?/g
        let res = expregex.exec(this.data)
        if (!res) {
            let h = this.data.replace('(','').replace(')','')
            let a = parseFloat(h)
            if (isNaN(a)) {
                throw new Error('Illegal character! L'+level)
            }
            return a
        }
        let operation = res[2]
        let arg1 = new Expression(res[1]).parse(level)
        let arg2 = new Expression(res[3]).parse(level)
        return this.doOperation(arg1, operation, arg2)
    }
}

module.exports = Expression