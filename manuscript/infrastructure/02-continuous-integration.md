# Continuous Integration

Continuous integration (CI) services will run your tests in several environments: different operating systems, browsers or Node versions. It’s would be complicated to setup on your local machine. Usually CI checks every commit to your master or development branch as well as on each pull request — CI will prevent merge or deploy if there are any errors. It’s a common practice to run long processes on CI: integration tests, code coverage reports, etc. Some projects even publish new release automatically on CI.

[Travis CI](https://travis-ci.org/) (Linux and macOS) is the most popular service, some projects use [AppVeyor](https://www.appveyor.com/) (Windows) or [CircleCI](https://circleci.com/) (Linux, macOS, and Android). There are also specialized services like [BrowserStack](https://www.browserstack.com/) and [SauceLabs](https://saucelabs.com/) for testing your code in different browsers. All services are free for open source projects.

T> Read more about release automation in the _Semantic Release_ section.

TODO: CI vs. CD (Continuous Deployment)

TODO: https://developers.google.com/web/updates/2017/04/headless-chrome

## Setting up Travis CI

Create a config file, `.travis.yml`:

```yaml
language: node_js
cache:
  directories:
    - node_modules
node_js:
  - 4
  - 6
  - 8
  - 9
```

This will run your tests (`npm test` is the default command for Node) in four versions of Node on Linux.

Now you need to enable the repository in your Travis CI profile, and the next push to your repository will run the CI build.

Travis CI has [many other options](https://docs.travis-ci.com/user/customizing-the-build/). For example, to upload code coverage report to Codecov, add a few more lines to your config:

```yaml
script:
  - 'npm run test:coverage'
after_success:
  - 'bash <(curl -s https://codecov.io/bash)'
```

T> Read move about code coverage in the _Code Coverage_ section.

T> [Use Mrm](https://github.com/sapegin/mrm-tasks/tree/master/packages/mrm-task-travis) to add Travis CI to your project with a single command.

T> Here a [short comparison](https://hackernoon.com/continuous-integration-circleci-vs-travis-ci-vs-jenkins-41a1c2bd95f5) of Travis CI and CircleCI.

## Conclusion

Continuous integration will help you to be sure that your project works in all supported environments, and will prevent you from publishing a new version with a regression.
