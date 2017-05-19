# Typing

A function interface is a contract. Depending on the system, it gives you guarantees. In JavaScript there are no guarantees by default and you can pass anything to a function. This may lead to a runtime error, though, given it's an interpreted language. In a stricter system passing invalid values would be forbidden on a type level.

## The Value of Typing

A loose typing system, such as the one included in JavaScript, doesn't get in your way. This is also the problem. Once you understand better what you want, it makes sense to provide type information. Modeling types and data structures is an important part of programming as they help to model domain understanding.

Loose typing comes with the following problems:

* It allows runtime errors to exist. If you pass a value of wrong type, it can lead to unexpected results and crash the entire system.
* Even if you knew the expected type, communicating it would be difficult. You can perform a type check on language level but the problem with this is that it's difficult to use the type information in tooling then.
* Types can be annotated within comments but then you would lose code level checks without compiling the comments to actual checks.

Certain languages allow **type hints** as a compromise. If you know a type, add it to the code. The language uses this information when available. One side benefit of stating types this way is that then the interpreter can use these guarantees to speed up execution. The type information can be used for **property based testing** and documentation.

Flow type checker is an example of a solution that builds on top of JavaScript while providing stronger typing semantics for it. TypeScript is an entire language that comes with a typing approach of its own.

## TypeScript

TODO

## Flow

TODO

## Conclusion

TODO

You'll learn about testing in the next chapter.
