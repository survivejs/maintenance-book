# Typing

A function interface is a contract and depending on the system, it gives you guarantees. JavaScript doesn't give any guarantees by default and you can pass anything to a function. Doing this may lead to a runtime error and crash your application. In a stricter system it would be more difficult, or even impossible, to do this.

## The Value of Typing

A loose typing system, such as the one included in JavaScript, doesn't get in your way. But what if you know the types and want to communicate them? You could include rough checks by programming them but this cannot match proper type systems and tooling cannot use the information in any meaningful manner.

Certain languages allow **type hints** as a compromise. If you know a type, add it to the code. The language uses this information when available. One side benefit of stating types this way is that then the interpreter can use these guarantees to speed up execution. The type information can be used for **property based testing** and documentation.

## Flow

![Flow](images/flow.png)

[Flow type checker by Facebook](https://flow.org/) is an example of a solution that builds on top of JavaScript while providing stronger typing semantics for it.  To give you an example, consider the following `add` function that has been annotated using Flow:

<!-- textlint-disable -->

```javascript
function add(x: number, y: number): number {
  return x + y;
}
```

<!-- textlint-enable -->

The definition states that `add` should receive two numbers and return one as a result. This is the way it's typically done in statically typed languages. Now we can benefit from the same idea in JavaScript.

Flow relies on a static type checker that has to be installed separately. As you run the tool, it will evaluate your code and provide recommendations. To ease development, [babel-plugin-typecheck](https://www.npmjs.com/package/babel-plugin-typecheck) allows you to evaluate Flow types during runtime.

T> [babel-plugin-flow-react-proptypes](https://www.npmjs.com/package/babel-plugin-flow-react-proptypes) allows you to generate `propTypes` based on Flow definitions. It brings the two ideas together.

T> [flow-coverage-report](https://www.npmjs.com/package/flow-coverage-report) allows you to track the Flow typing status of your system.

T> See [Try Flow](https://tryflow.org/) for more concrete examples.

## TypeScript

![TypeScript](images/typescript.png)

TypeScript by Microsoft is an entire language that comes with a typing approach of its own. It can be considered a superset of JavaScript and it has been adopted especially by the Angular community.

TypeScript compiler can detect a variety of type related problems. This doesn't mean code won't crash runtime but at least you'll detect type related mismatches early. A large part of TypeScript's value has to do with the way it has been integrated to popular editors.

The Flow example above works even in TypeScript. Even though there are similarities like this, the approaches differ and provide different sets of functionality. [The Flow and TypeScript comparison by Bazyli Brzóska](https://github.com/niieani/typescript-vs-flowtype) highlights these differences.

T> See [TypeScript playground](https://www.typescriptlang.org/play/index.html) for more concrete examples.

## Type Definitions

To get value of these systems, you have to use **type definitions** with existing packages. [flow-typed](https://github.com/flowtype/flow-typed) provides them for Flow whereas [DefinitelyTyped](http://definitelytyped.org/) achieves the same for TypeScript.

These third-party type definitions complement the actual packages and allow you to capture type errors related to them. It can be sensible to implement a package using either solution and then compile to JavaScript and a type definition file.

If you are using TypeScript, you have to set `"typings": "dist/library.d.ts"` in *package.json* for TypeScript environment to find the file in question.

## Conclusion

It can be a good idea for a package author to consider using a type system as it allows stricter contracts. This in turn is a nice for the consumers as they will capture potential type related errors earlier.

You'll learn about testing in the next chapter.
