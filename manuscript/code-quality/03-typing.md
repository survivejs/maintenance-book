# Typing

A function interface is a contract and depending on the system, it gives you guarantees. JavaScript doesn't give any guarantees by default and you can pass anything to a function. Doing this may lead to a runtime error and crash your application. In a stricter system it would be more difficult, or even impossible, to do this.

## The Value of Typing

A loose typing system, such as the one included in JavaScript, doesn't get in your way. But what if you know the types and want to communicate them? You could include rough checks by programming them but this cannot match proper type systems and tooling cannot use the information in any meaningful manner.

Once you can communicate types on language level, you will get at least the following benefits:

* If you know a type, you can communicate it using the language itself.
* If the type information is available, then the editors can use it for features like auto-completion and refactoring functionality.
* The available type information can be used for techniques such as **property based testing** and documentation.
* In an interpreted language, the interpreter can use the information to speed up execution of code.

## Flow

![Flow](images/flow.png)

[Flow type checker by Facebook](https://flow.org/) is an example of a solution that builds on top of JavaScript. To give you an example, consider the following `add` function that has been annotated using Flow:

<!-- textlint-disable -->

```javascript
// @flow
function add(x: number, y: number): number {
  return x + y;
}
```

<!-- textlint-enable -->

The definition states that `add` should receive two numbers and return one as a result. This is the way it's usually done in statically typed languages.

Flow relies on a static type checker that has to be installed separately. As you run the tool, it will evaluate your code and provide recommendations. To ease development, [babel-plugin-typecheck](https://www.npmjs.com/package/babel-plugin-typecheck) allows you to evaluate Flow types during runtime.

T> [babel-plugin-flow-react-proptypes](https://www.npmjs.com/package/babel-plugin-flow-react-proptypes) allows you to generate `propTypes` based on Flow definitions. It brings the two ideas together.

T> [flow-coverage-report](https://www.npmjs.com/package/flow-coverage-report) allows you to track the Flow typing coverage of your system. The idea is similar as for **test coverage**.

T> See [Try Flow](https://tryflow.org/) for more concrete examples.

## TypeScript

![TypeScript](images/typescript.png)

TypeScript by Microsoft is an entire language that comes with a typing approach of its own. It's a superset of JavaScript and it has been adopted especially by the AngularJS community.

The Flow example above works even in TypeScript. Even though there are similarities like this, the approaches differ and provide different sets of functionality. [The Flow and TypeScript comparison by Bazyli Brzóska](https://github.com/niieani/typescript-vs-flowtype) highlights these differences.

T> See [TypeScript playground](https://www.typescriptlang.org/play/index.html) for more concrete examples.

## The Benefits of Flow and TypeScriipt

Both Flow and TypeScript compiler can detect a variety of type related problems. This doesn't mean code won't crash runtime but at least you'll detect type related mismatches early. A large part of TypeScript's value has to do with the way it has been integrated to popular editors. The same applies to Flow in a more limited extent.

## Type Definitions

To get value of these systems, you have to use **type definitions** with existing packages. [flow-typed](https://github.com/flowtype/flow-typed) provides them for Flow whereas [DefinitelyTyped](http://definitelytyped.org/) achieves the same for TypeScript.

These third-party type definitions complement the actual packages and allow you to capture type errors related to them. It can be sensible to implement a package using either solution and then compile to JavaScript and a type definition file.

T> [ReasonML](https://reasonml.github.io/) implements a bridge between the language and JavaScript using a programmable type definition. The approach goes further than the static definitions provided by Flow and TypeScript.

### Generating Type Definitions

If you are using TypeScript to author your packages, TypeScript compiler will write file ending in *d.ts*. The file contains the type definitions. It's advisable to set `"typings": "dist/library.d.ts"` in *package.json* although TypeScript related tooling will look for the file through convention. The same type definition can be used for DefinitelyTyped.

T> [TypeScript documentation covers related details in further detail](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html).

Flow provides `flow gen-flow-files <input file> > <output file>` that achieves closely the same. It accepts a source file to process and emits the extracted type definition. These definitions could then be submitted to *flow-typed*.

T> [Patrick Stapfer has written an article that covers Flow specifics in greater detail](https://medium.com/netscape/shipping-flowtype-definitions-in-npm-packages-c987917efb65).

## Conclusion

It can be a good idea for a package author to consider using a type system as it allows stricter contracts. This in turn is a nice for the consumers as they will capture potential type related errors earlier.

You'll learn about testing in the next chapter.
