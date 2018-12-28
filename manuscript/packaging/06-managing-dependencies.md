# Managing Dependencies

Keeping dependencies updated is important to have the latest bugfixes and security updates, but it needs a lot of work: once in a while you need to check which packages have new versions and how to migrate, sometimes you have to rewrite parts of your code. Bigger projects may provide [codemods](https://github.com/reactjs/react-codemod) that can perform the required changes for you. Or they can deprecate a feature with a warning message, giving you time to migrate before the feature is completely removed from the package.

## Types of Dependencies

### Global and Local Dependencies

Global dependencies are installed with the `--global` (or `-g`) flag for `npm install`, and usually used for command line tools. Almost the only good use case for global dependencies is generators: tools that generate new projects, like [Create React App](https://github.com/facebookincubator/create-react-app). You run them once to create a new project and forget about them until you need to create another project.

Most of the time, though, you’ll want to use local dependencies and store list of required packages and their versions close to the project — in its _package.json_ — to guarantee that the project will work:

- You could always reproduce the same versions of packages.
- You can run projects that require incompatible versions of packages on the same computer at the same time.
- You can share your project, and other developers could install all required dependencies with a single command.

T> **Lockfiles** go even further and lock the whole dependency tree — all dependencies of dependencies of dependencies. We discuss lockfiles in the _Publishing Packages_ chapter.

### Dependencies and Development Dependencies

Normal dependencies (`dependencies` field in _package.json_) are packages that will be installed when the user runs `npm install packagename`. They are needed to run the package. You should be careful what you add there, because this affects download times for all users of your package, and, for a frontend library, all users of an app that uses your package.

Development dependencies (`devDependencies` field in _package.json_) are dependencies you need to develop the package. For example, packages for building and testing. When you install a package from npm, they won’t be installed, but if you run `npm install` on a project locally, npm will install them.

### Peer Dependencies

Peer dependencies (`peerDependencies` field in _package.json_) are dependencies that are required to use your package but the user should install them separately. They are usually given as version ranges.

The most common use case is plugins, for example a Babel plugins or a React component. You want to let your users decide which version of Babel or React they want to use to avoid installing multiple, and maybe incompatible, versions. That may be especially bad for frontend libraries.

### Other Dependencies

Other types of dependencies are rarely used:

- `bundledDependencies` are the dependencies that are bundled with the package itself.
- `optionalDependencies` are the dependencies that npm will try to install but they aren’t required for the package to work. For example, packages that don’t work on all platforms.

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

- `yarn upgrade-interactive` allows you to choose which dependencies you want to update.
- [npm-upgrade](https://www.npmjs.com/package/npm-upgrade) also shows links to change logs.
- [updtr](https://www.npmjs.com/package/updtr) will try to run your tests for the latest version of each dependency and update your _package.json_ only if they pass.
- [Greenkeeper](https://greenkeeper.io/) will send a pull request for every dependency update so you’ll know when it’s safe to update by the CI results.
- [Renovate](https://www.npmjs.com/package/renovate) is an open source alternative to Greenkeeper. [Read Renovate interview](https://survivejs.com/blog/renovate-interview/) to learn more about the tool.
- [David](https://david-dm.org/) gives you a _README_ badge that will show status of your dependencies.

T> `npm ls` and `npm ls <package name>` allow you to figure out which versions you have installed. `npm ls -g` shows versions of globally installed packages.

## Understanding Version Ranges

Usually version consists of three numbers separated by a dot: `MAJOR.MINOR.PATCH`. Prerelease versions (alpha/beta/rc) may look like 1.2.3-alpha.1 or 1.2.4-beta.1.

Many npm packages follow [SemVer](https://semver.org/), which means that only major version change (like 3.0.0 to 4.0.0) may contain breaking changes, but some projects follow different conventions or no convention at all. Many projects treat 0.x versions as major, so they may have breaking changes, since the project is in active development. Alpha and beta releases may contain breaking changes too. In any case even a patch release may contain a breaking change because of a new bug or a bugfix. You should always carefully read the change log before any upgrade.

Depending on a project you may want to specify [version ranges](https://docs.npmjs.com/misc/semver) differently in _package.json_:

- Caret (`^1.2.3`, npm default) — good for most projects, will catch all updates inside a major version (1.9.3 but not 2.0.0).
- Tilde (`~1.2.3`) — projects that may have breaking changes in minor releases, will catch all updates inside a minor version (1.2.17 but not 1.3.0).
- Exact version (`1.2.3`) — the most strict, only manual updates.
- Range (`>=1.3.0 <2.0.0`) - defines a range of versions. Usually used for peer dependencies.

T> To include prerelease versions, use a pattern such as ^4.0.0-0.

T> By default npm installs packages with a caret, you can change it using `npm config set save-prefix='~'`. Tilde can be a good default that can help you to avoid some issues with dependencies, see more in the _Locking Versions_ section.

T> Check out the [npm semver calculator](https://semver.npmjs.com/) to better understand how version ranges work.

## Locking Versions

Even if you use exact versions in your _package.json_, you may have problems because dependencies of dependencies aren’t locked. A single breaking change in a patch release of some deeply nested dependency may break your build. This is especially hard to debug when it happens on the CI or during the deployment.

Since version 5, npm supports **lockfiles**. `npm install` will write versions of the installed packages to a file, _package-lock.json_. This file should be committed to a project repository. The next time someone runs `npm install`, npm will use the versions specified in this lockfile.

[Yarn](https://yarnpkg.com/), an npm alternative, implemented the idea of lockfiles first but they use incompatible format and _yarn.lock_ file.

T> [Sebastian McKenzie discusses the difference between the lockfile approaches](https://yarnpkg.com/blog/2017/05/31/determinism/). In short, Yarn needs _package.json_ to work while npm doesn’t. In the future we may have [interoperability between two formats](https://www.npmjs.com/package/synp).

W> npm will never publish lockfiles and will not use them when someone installs your package, only when you run `npm install` locally.

## Conclusion

Managing dependencies is a necessary part of package maintenance. Especially having good tests in place helps in the process and makes upgrades less painful. If you make bigger changes, it can be a good idea to publish **pre-release** versions so that the users have a chance to test the upcoming code against their projects.
