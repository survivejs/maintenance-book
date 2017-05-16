# Dependencies

## Keeping Dependencies Up to Date

An important part of maintaining a project is keeping their dependencies up to date. The hard part is to understand which updates won’t break your code and how to migrate to a new version otherwise. Ideally, dependencies have change logs with clear migration instructions and your project has a good test coverage.

Several tools can help you with updates:

* `yarn upgrade-interactive` allows you to choose which dependencies you want to update.
* [npm-upgrade](https://www.npmjs.com/package/npm-upgrade) also shows links to change logs.
* [updtr](https://www.npmjs.com/package/updtr) will try to run your tests for the latest version of each dependency and update your *package.json* only if they pass.
* [Greenkeeper](https://greenkeeper.io/) will send a pull request for every dependency update so you’ll know when it’s safe to update by the CI results.
* [David](https://david-dm.org/) gives you a *README* badge that will show status of your dependencies.

T> `npm ls`, and more specifically `npm ls <package name>`, allow you to figure out which versions you have installed. `npm ls -g` performs a similar lookup against the globally installed packages.

## Conclusion

TODO
