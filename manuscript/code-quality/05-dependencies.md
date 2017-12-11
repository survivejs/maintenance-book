# Dependency Management

Keeping dependencies updated is important to have the latest bugfixes and security updates, but it needs a lot of work: once in a while you need to check which packages have new versions and how to migrate, sometimes you have to rewrite parts of your code. Bigger projects may provide [codemods](https://github.com/reactjs/react-codemod) that can perform the required changes for you. Or they can deprecate a feature with a warning message, giving you time to migrate before the feature is completely removed from the package.

T> You should use **lockfiles** to manage the versions of your dependencies. Read the _Publishing Packages_ chapter to learn more about the approach.

## Keeping Dependencies Updated

The hard part of updating dependencies is to understand which updates won’t break your code and how to migrate to a new version otherwise. Ideally, dependencies have change logs with clear migration instructions and your project has a good test coverage.

To understand which dependencies can be updated, run `npm outdated`:

```bash
Package                 Current  Wanted  Latest  Location
catalog                   3.0.0   3.1.2   3.1.2  demo-project
eslint-config-airbnb     15.1.0  15.1.0  16.0.0  demo-project
eslint-plugin-jsx-a11y    5.1.1   5.1.1   6.0.2  demo-project
```

The _catalog_ case is the curious one. The project has set it as a development dependency using a version range `"catalog": "^3.0.0",`. According to the output, the project has version 3.0.0 installed while the latest available version is 3.1.2.

Running [npm update](https://docs.npmjs.com/cli/update) would update it to that version but there are no guarantees the new version will work.

The other dependencies would require either a manual change to _package.json_ or using a specific tool such as one listed below:

* `yarn upgrade-interactive` allows you to choose which dependencies you want to update.
* [npm-upgrade](https://www.npmjs.com/package/npm-upgrade) also shows links to change logs.
* [updtr](https://www.npmjs.com/package/updtr) will try to run your tests for the latest version of each dependency and update your _package.json_ only if they pass.
* [Greenkeeper](https://greenkeeper.io/) will send a pull request for every dependency update so you’ll know when it’s safe to update by the CI results.
* [Renovate](https://www.npmjs.com/package/renovate) is an open source alternative to Greenkeeper. [Read Renovate interview](https://survivejs.com/blog/renovate-interview/) to learn more about the tool.
* [David](https://david-dm.org/) gives you a _README_ badge that will show status of your dependencies.

T> `npm ls` and `npm ls <package name>` allow you to figure out which versions you have installed. `npm ls -g` shows versions of globally installed packages.

## Understanding Version Ranges

Usually version consists of three numbers separated by a dot: `MAJOR.MINOR.PATCH`. Prerelease versions (alpha/beta/rc) may look like 1.2.3-alpha.1 or 1.2.4-beta.1.

Many npm packages follow [SemVer](https://semver.org/), which means that only major version change (like 3.0.0 to 4.0.0) may contain breaking changes, but some projects follow different conventions or no convention at all. Many projects treat 0.x versions as major, so they may have breaking changes, since the project is in active development. Alpha and beta releases may contain breaking changes too. In any case even a patch release may contain a breaking change because of a new bug or a bugfix. You should always carefully read the change log before any upgrade.

Depending on a project you may want to specify [version ranges](https://docs.npmjs.com/misc/semver) differently in _package.json_:

* Caret (`^1.2.3`, npm default) — good for most projects, will catch all updates inside a major version (1.9.3 but not 2.0.0).
* Tilda (`~1.2.3`) — projects that may have breaking changes in minor releases, will catch all updates inside a minor version (1.2.17 but not 1.3.0).
* Exact version (`1.2.3`) — the most strict, only manual updates.

T> Check out the [npm semver calculator](https://semver.npmjs.com/) to better understand how version ranges work.

## Conclusion

Managing dependencies is a necessary part of package maintenance. Especially having good tests in place helps in the process and makes upgrades less painful. If you make bigger changes, it can be a good idea to publish **pre-release** versions so that the users have a chance to test the upcoming code against their projects.

T> There’s more to code quality than the topics covered in this part. Books like Code Complete by Steve McConnell and Clean Code by Robert Martin give further insight to the topic.
