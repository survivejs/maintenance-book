# Dependency Management

While writing projects, dependency management tends to be a common issue. Sometimes keeping up with the dependencies means you have to rewrite code. Bigger projects may provide **codemods** that can perform the required changes for you. They can also rely on deprecation patterns that tell you to rewrite certain pieces code before removing the functionality entirely.

T> You should use **lockfiles** to manage the versions of your dependencies. Read the *Publishing Packages* chapter to learn more about the approach.

## Keeping Dependencies Up to Date

An important part of maintaining a project is keeping their dependencies up to date. The hard part is to understand which updates won’t break your code and how to migrate to a new version otherwise. Ideally, dependencies have change logs with clear migration instructions and your project has a good test coverage as that will help in the process.

To understand which dependencies can be updated, run `npm outdated --depth=0`. You should get a result along this:

```bash
Package              Current Wanted Latest Location
catalog                3.0.0  3.1.2  3.1.2 react-component-boilerplate
eslint-config-airbnb  15.1.0 15.1.0 16.0.0 react-component-boilerplate
eslint-plugin-jsx-a11y 5.1.1  5.1.1  6.0.2 react-component-boilerplate
```

The *catalog* case is the curious one. The project has set it as a development dependency using a version range `"catalog": "^3.0.0",`. According to the output, the project has version 3.0.0 installed while the latest available version is 3.1.2.

Running [npm update](https://docs.npmjs.com/cli/update) would update it to that version but there are no guarantees the new version will work given SemVer is only a verbal contract. A package can still break functionality and you should not update package versions blindly!

The other dependencies would require either a manual change to *package.json* or using a specific tool such as one listed below:

* `yarn upgrade-interactive` allows you to choose which dependencies you want to update.
* [npm-upgrade](https://www.npmjs.com/package/npm-upgrade) also shows links to change logs.
* [updtr](https://www.npmjs.com/package/updtr) will try to run your tests for the latest version of each dependency and update your *package.json* only if they pass.
* [Greenkeeper](https://greenkeeper.io/) will send a pull request for every dependency update so you’ll know when it’s safe to update by the CI results.
* [Renovate](https://www.npmjs.com/package/renovate) is an open source alternative to Greenkeeper. [Read Renovate interview](https://survivejs.com/blog/renovate-interview/) to learn more about the tool.
* [David](https://david-dm.org/) gives you a *README* badge that will show status of your dependencies.

T> `npm ls`, and more specifically `npm ls <package name>`, allow you to figure out which versions you have installed. `npm ls -g` performs a similar lookup against the globally installed packages.

## Conclusion

Managing dependencies is a necessary part of package maintenance. Especially having good tests in place helps in the process and makes upgrades less painful. If you make bigger changes, it can be a good idea to publish **pre-release** versions so that the users have a chance to test the upcoming code against their projects.

T> There's more to code quality than the topics covered in this part. Books like Code Complete by Steve McConnell and Clean Code by Robert Martin give further insight to the topic.
