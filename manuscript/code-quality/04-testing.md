# Testing

Tests can be seen as a runnable specification that describes truths about the implementation. Automated testing is a form of risk management and reduces risks related to the project. Manual testing is the other end of the spectrum. It's also the most labor intensive and brittle option.

## What to Verify with Testing?

Testing can be used to verify at least the following aspects:

* Do parts of the system work in isolation?
* Do parts of the system work together?
* Does the system perform well enough?
* Does the old API of the system still work for the consumers?
* Do the tests cover the system well?
* What is the quality of the tests?
* Does the system solve user problems?

You can test both quantitative and qualitative aspects. Qualitative testing is harder as it requires a comparison point, but without tracking quality, such as performance, it's difficult to reach it. If you track how the system is being used and capture **analytics**, you can tell how the users experience the system.

## Develop the Right System the Right Way

In addition to verifying that a system has been developed right, you can assert that you are building the right system if you capture enough data. A technically correct system may not be correct from the user point of view and vice versa. The same challenge exists in developer facing tools and libraries.

Popular projects put a lot of effort into the façade encountered by their users. This has led to techniques such as **defensive coding**. A good API should fail fast instead of swallowing errors while giving descriptive messages. Projects may go as far as to provide **codemods** which allow users to upgrade from older APIs to newer by running them.

## How Much to Test?

Regardless of how much you test, manual testing may still be required, especially if you target multiple platforms. But it's a good goal to minimize the amount of it and even try to eliminate it.

No matter how much you test, problems may still slip through. For this reason, it's good to remember that you get what you measure. If you want performance, you should test against performance. If you want to avoid regressions against downstream projects, you should test against them before publishing changes.

Tests come with a cost. Test code is the code you have to maintain in addition to the implementation. Having more tests isn't necessarily better. It's good to put conscious effort into maintaining good tests. Fortunately, tests allow refactoring and sometimes finding better ways to implement the desired features can simplify both the implementation and tests.

## How to Test Old Projects Without Tests?

When it comes to older projects that have poor **test coverage**, tests can be used for exploration. **Explorative testing** allows you to learn how the code works by testing it. Instead of running the code and examining it, you can write tests to assert your knowledge. As you gain confidence with the way the code works, you are more willing to make changes to it as the risk of breakage becomes smaller.

Specific techniques, such as **snapshot testing** or **approval testing**, allow you to capture the old state of an application or a library and test against it. Having a snapshot of the state is a good starting point as then you have something instead of nothing. Capturing this state is often cheap, and the techniques can be complemented with more specific ones. They provide a baseline for more sophisticated testing.

## Types of Testing

Each type of testing provides specific insight to the project. The following sections cover the most common techniques.

### Unit Testing

**Unit testing** asserts specific truths about code. Each unit should verify the single truth. You can get started by using Node [assert](https://nodejs.org/api/assert.html). Specialized assertion libraries have more functionality and better output but `assert` is a good starting point.

To have something to test, define a module:

**add.js**

```javascript
const add = (a, b) => a + b;

module.exports = add;
```

To test the code, set up a file that exercises the functionality:

**add.test.js**

```javascript
const assert = require('assert');
const add = require('./add');

assert(add(1, 1) === 2);
```

If you run `node ./add.test.js`, you shouldn't see any output. Try breaking the test or the code to get an assertion error. A good test runner is able to pick up the wanted tests and run them like this. [globbing](https://www.npmjs.com/package/glob) is another way.

People have written a lot of good test runners and frameworks, so you don't have to do this work yourself. Particularly [Jest](https://www.npmjs.com/package/jest), [Mocha](https://www.npmjs.com/package/mocha), and [tape](https://www.npmjs.com/package/tape) are decent  starting points.

It's good to understand that unit tests cover functionality from the developer perspective. These small assertions can be used to define a low-level API. **Test Driven Development** allows you to shape the implementation as you figure out a proper specification for your API.

### Property Based Testing

**Property based testing** asserts specific **invariants** about code. A sorting algorithm should return items sorted in a specific order for example. When invariants like this are known, it's possible to generate tests against it. Property-based testing can find issues unit testing could miss, but the invariants can be problematic to find.

To continue the previous example, a property-based test could be used to show that `add` is a **commutative** operation. Commutativity means that swapping the parameters should still yield the same result so that the result of `a + b` should equal `b + a`. The idea can be modeled behind an API like this:

**add.property.test.js**

```javascript
const assert = require('assert');
const add = require('./add');

// Test an invariant once
testProperty(
  [generateNumber, generateNumber], // Test against numbers
  (a, b) => assert(add(a, b) === add(b, a)) // Commutativity
);

function testProperty(generators, invariant) {
  return invariant.apply(null, generators.map(g => g.call()));
}

function generateNumber() {
  return Math.random() * Number.MAX_VALUE;
}
```

If you run the test, it should pass given `add` should be a commutative operation. The same idea can be applied to more complicated scenarios. There are a few improvements that could be made:

* Instead of running a single test, it would be possible to run `testProperty` many times with different values. You could model this as `testProperties(<property>, timesToRun)`.
* Now it generates random values without allowing the user to set the seed value. This is a limitation of JavaScript API. To keep the tests reproducible, it would be a good idea to replace `Math.random` with an alternative that allows you to control the seed.
* `testProperty` and `generateNumber` should be pushed elsewhere. Given there are existing implementations for both in npm, the custom code could be replaced entirely.
* If the `add` function contained type information, it would be possible to extract that and then map the types to generators. Doing this would keep the test code slightly neater if you have multiple tests as then you would have to define the mapping between types and generators in one place while individual tests could skip the definition problem.

Good property testing tools like [JSVerify](https://jsverify.github.io/) or [testcheck-js](http://leebyron.com/testcheck-js/) are able to shrink a failure to a specific case so you can fix it. The biggest benefit of the technique it can help to discover boundary cases to repair.

### Integration Testing

**Integration testing** asserts that separate modules work together. You can use the same ideas as above here except this time around the scope of the system under test is larger.

### Acceptance Testing

**Acceptance testing** looks at testing from the user perspective. It answers the question does the user interface configured in a certain way lead to the expected result. Tools like [CodeceptJS](http://codecept.io/) or [Intern](https://theintern.github.io/) provide a high-level syntax that allows you to model user behaviors against the browser.

?> Selenium?

### Regression Testing

**Regression testing** makes sure the software works still the same way as before without breaking anything.
 Regressions can exist on multiple levels, and regression testing complements the techniques discussed earlier.

 **Approval testing** is a specific technique that allows you to develop regression tests against an existing system. The idea is to store existing system state first as **snapshots** and then use this data for testing that behavior doesn't change while the implementation is being refactored.

**Visual regression testing** allows you to capture the user interface as an image and then compare it to a prior state to see if it has changed too much. If it has, then the failing test has to be validated by a developer to make sure the result is still acceptable. Semi-automation like this is valuable especially if you have to develop against a broad range of development targets. In the past, especially web browsers have been notorious for subtle breakage.

Regression testing applies on API level as well. An API that has worked in the past should work the same unless the API contract changed and a new major version was released. Even in this case it may be a good idea to provide a deprecation path for users so they can update their software to the new API. In addition to explicit instructions or deprecation messages through the API, this can be achieved using codemods.

T> [dont-break](https://www.npmjs.com/package/dont-break) is a good example of a package meant for testing your project against downstream (dependent) projects.

### Performance Testing

Given you get what you measure, **performance testing** is valuable for projects that care about speed. Packages like [k6](https://k6.io/), [Benchmark.js](https://benchmarkjs.com/) and [matcha](https://www.npmjs.com/package/matcha) can be helpful here. You can benchmark your implementation against competing libraries or an older version of yours.

Ideally, you should store the old results somewhere and keep the runtime environment the same across separate runs. If the environment varies between runs, benchmarking results aren't comparable. Assuming you are using a conventional **Continuous Integration** (CI) server without storing the performance data somewhere in between and cannot control the environment, you can run both the older and the current version of the system during the same run to detect performance regressions.

Performance testing also yields insight into different environments, and you can test against different versions of Node for example. The same point is true for other forms of testing. If possible, run tests on a CI environment to capture more information.

### Mutation Testing

**Mutation testing** allows you to test your tests. The idea is to introduce mutations into the code under test and see if the tests still pass. Tools like [Stryker](https://stryker-mutator.github.io/) enable the technique for JavaScript.

### Package Testing

To make sure your npm package paths (`main`, `module`, i.e.) work, you can validate your package through [pkg-ok](https://www.npmjs.com/package/pkg-ok).

?> Cover other package testing tools here.

### Code Coverage

**Code coverage** tells you how much of the code is covered by tests. The technique can reveal parts of the code that aren't being tested. Those parts have unspecified behavior and as a result may contain issues. Code coverage doesn't tell anything about the quality of the tests, but it can be used to discover places to test.

To measure code coverage, you have to instrument the code first. You can find [Istanbul](https://www.npmjs.com/package/istanbul) integration for many test frameworks and Jest includes it by default. [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) comes in handy if you are using Babel.

[Codecov](https://codecov.io/) and [Coveralls](https://coveralls.io/) hook into the coverage data and provide a badge to include in your README. They collect coverage for every pull request and post a comment explaining how a pull request would affect project coverage as you should maintain the current coverage at a minimum and ideally improve it.

T> There's a [Codecov extension](https://chrome.google.com/webstore/detail/codecov-extension/keefkhehidemnokodkdkejapdgfjmijf) for Chrome that allows you to see code coverage through GitHub user interface.

### Code Complexity

As code evolves, it tends to become more complex. Dependencies form and the code will likely end up with hot spots that are fault prone. Understanding where those spots exist allows you to put your effort where it matters. The same idea applies to performance optimization. If you know what portion of your code contributes most to performance, you know it's worth optimizing.

Tools like [complexity-report](https://www.npmjs.com/package/complexity-report), [plato](https://www.npmjs.com/package/plato), and [jscomplex](https://www.npmjs.com/package/jscomplex) give this type of output.

### Design by Contract

[Design by Contract](http://wiki.c2.com/?DesignByContract) is a technique that allows you to push invariants, preconditions, and postconditions close to the implementation. The idea can be implemented on code level, but you can also extend the language to support the idea as [babel-plugin-contracts](https://www.npmjs.com/package/babel-plugin-contracts) does.

## Conclusion

Testing is a complex topic that is worth understanding. Testing isn't necessarily about developing faster but rather developing in a sustainable manner. Tests show their value especially when multiple people work on the same project. They support the development process and allow the team to move faster while avoiding breakage. And even if breakage happens, good practices improve the process to avoid the problems in the future.

The biggest question is what sort of tests to write and when. It's good to remember testing is a form of risk management. Especially when prototyping, tests won't provide their maximum value since at this stage you are prepared to throw the code away. But if you are developing long term, the absence of tests begins to be felt as new requirements appear and the implementation has to evolve to fit the new needs.

You'll learn about dependency management in the next chapter.

T> [An Overview of JavaScript Testing in 2017](https://medium.com/powtoon-engineering/a-complete-guide-to-testing-javascript-in-2017-a217b4cd5a2a) lists current testing tools using a similar categorization.

T> [JavaScript test automation list](https://github.com/atinfo/awesome-test-automation/blob/master/javascript-test-automation.md) is another good source for tools.
