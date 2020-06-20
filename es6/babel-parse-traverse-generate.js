const ast = require("@babel/parser").parse("function square(n) {\n" +
    "  return n * n;\n" +
    "}", {
    // parse in strict mode and allow module declarations
    sourceType: "module",

    plugins: [
    ]
});

console.log(ast.program.body)
const {default: traverse}= require('@babel/traverse')
traverse(ast, {
    enter(path) {
        if (path.isIdentifier({ name: "square" })) {
            path.node.name = "x";
        }
    }
});
console.log(ast.program.body)

const {default: generate}= require('@babel/generator')

console.log(generate(ast))
