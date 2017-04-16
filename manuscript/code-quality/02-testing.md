# Testing

TODO

* Why
* What's the point/value
* What to test

## Unit Testing

TODO

* What's a unit
* Unit testing tools
* Show how to implement unit tests through `assert` -> how to evolve a testing framework of your own
* Show how to use a unit testing framework + the value it brings
* Developer perspective

## Fuzz Testing

TODO

* Show how to go from units to fuzzing - what's required
* Function level invariants -> outer invariants
* Haskell QuickCheck
* Relation to Design by Contract (mention Babel plugin)

## Integration Testing

TODO

* How separate portions of code operate together
* Higher level view on testing

## Acceptance Testing

TODO

* What's acceptance
* Acceptance testing tools (codecept, headless browsers)
* User perspective

## Mutation Testing

TODO

* Show possible tools
* Testing your tests

## Code Coverage

[Codecov](https://codecov.io/) and [Coveralls](https://coveralls.io/) provide code coverage information and a badge to include in your README. It's a part of improving the quality of your pull requests as they should maintain the current coverage at a minimum and ideally improve it.

T> [shields.io](http://shields.io/) lists a large number of available badges. [NodeICO](https://nodei.co/) provides badges that aggregate package related information.

T> There's a [Codecov extension](https://chrome.google.com/webstore/detail/codecov-extension/keefkhehidemnokodkdkejapdgfjmijf) for Chrome that allows you to see code coverage through GitHub user interface.

## Code Complexity

TODO

* Value, tooling

## Continuous Integration

For testing your project, you can consider solutions, such as [Travis CI](https://travis-ci.org/) or [SauceLabs](https://saucelabs.com/). They can test your project against different environments and browsers. The advantage of doing this is that it allows you to detect regressions. If you accept pull requests to your project, these services can help to keep their quality higher as it forces the authors to maintain their code on a higher level.

## Conclusion

TODO
