# Publishing Packages

Publishing npm packages is only a `npm publish` away. Given that the package name is still available and everything goes fine, you should have something out there! After this, you can install your package through `npm install` or `npm i`.

Most of the community follows a specific versioning convention which you should understand. It comes with its downsides but given the majority use and understand it, it's worth covering.

## Understanding SemVer

Most popular packages out there comply with SemVer. Roughly, SemVer states that you should not break backward compatibility, given [certain rules](http://semver.org/) are met:

1. The MAJOR version increments when incompatible API changes are made.
2. The MINOR version increments when backwards-compatible features are added.
3. The PATCH version increments when backwards-compatible bugs are fixed.

The rules are different for `0.x` versions. There the rule is `0.<MAJOR>.<MINOR>`. For packages considered stable and suitable for public usage (`1.0.0` and above), the rule is `<MAJOR>.<MINOR>.<PATCH>`. For example, if the current version of a package is `0.1.4` and a breaking change is performed, it should bump to `0.2.0`.

Given SemVer can be tricky to manage, [ComVer](https://github.com/staltz/comver) exists as a backwards compatible alternative. ComVer can be described as a binary decision `<not compatible>.<compatible>`.

T> You can understand SemVer much better by studying [the online tool](http://semver.npmjs.com/) and how it behaves.

## Increasing a Version

To increase the version of your packages, you need to invoke one of these commands:

* `npm version <x.y.z>` - Define version yourself.
* `npm version <major|minor|patch>` - Let npm bump the version for you based on SemVer.
* `npm version <premajor|preminor|prepatch|prerelease>` - Same as previous expect this time it generates `-<prerelease number>` suffix. Example: `v2.1.2-2`.

Invoking any of these updates *package.json* and creates a version commit to git automatically. If you execute `npm publish` after doing this, you should have a new version out there.

T> [dont-break](https://www.npmjs.com/package/dont-break) allows you to run the unit tests of dependent projects against your current code to see if it breaks anything. Sometimes it's possible to overlook a use case that is not a part of the public API even and break a dependency. *dont-break* helps with that particular problem.

## Automating Releases

To make it easier to comply with SemVer, [next-ver](https://www.npmjs.com/package/next-ver) can compute the next version you should use and update it for you. [commitizen](https://www.npmjs.com/package/commitizen) goes further and allows change log generation and automated releases.

Both these tools rely on commit message annotations. On small projects, you can have `fix` or `feat` prefix at your commit titles (e.g., `fix - Allow doodad to work with zero`). You can also communicate the context using `chore(docs)` kind of style to document which part of the project was touched.

This metadata lets the tooling to figure out the types of the changes you made. It can help even with change log generation and allow automated releases over manual ones. Annotating your commits well is a good practice in any case as it makes it easier to debug your code later.

Consider using [semantic-release](https://www.npmjs.com/package/semantic-release) if you prefer a more structured approach. It can take pain out of the release process while automating a part of it. For instance, it can detect possible breaking changes and generate change logs.

## Publishing a Pre-Release Version

Sometimes, you want to publish something preliminary to test. Tag your release as below:

* v0.5.0-alpha1
* v0.5.0-beta1
* v0.5.0-beta2
* v0.5.0-rc1
* v0.5.0-rc2
* v0.5.0

The initial alpha release allows the users to try out the upcoming functionality and provide feedback. The beta releases can be considered more stable.

The release candidates (RC) are close to an actual release and don't introduce any new functionality. They are all about refining the release till it's suitable for general consumption.

The workflow has two steps:

1. `npm version 0.5.0-alpha1` - Update *package.json* as discussed earlier.
2. `npm publish --tag alpha` - Publish the package under *alpha* tag.

To consume the test version, your users have to use `npm install <your package name>@alpha`.

T> [npm link](https://docs.npmjs.com/cli/link) allows you to link a package as a globally available symbolic link. Node resolves to the linked version unless local `node_modules` exists. Use `npm unlink` or `npm unlink <package>` to remove the link.

## Version Ranges

npm supports multiple version ranges as listed below:

* `~` - Tilde matches only patch versions. For example, `~1.2` would be equal to `1.2.x`.
* `^` - Caret is the default you get using `--save` or `--save-dev`. It matches minor versions, and this means `^0.2.0` would be equal to `0.2.x`.
* `*` - Asterisk matches major releases, and it's the most dangerous of the ranges. Using this recklessly can easily break your project in the future.
* `>= 1.3.0 < 2.0.0` - Ranges between versions come in handy with `peerDependencies`.

You can set the default range using `npm config set save-prefix='^'` in case you prefer something else than caret. Alternately, you can modify *~/.npmrc* directly. Especially defaulting to tilde can be a good idea that can help you to avoid trouble with dependencies, although it doesn't remove potential problems entirely. That's where shrinkwrapping comes in.

## Shrinkwrapping Versions

Using version ranges can feel dangerous as it doesn't take much to break an application. A single change in the wrong place is enough. [npm shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) allows you to fix your dependency versions and have stricter control over the versions you are using in a production environment. Most importantly it fixes the dependencies of your dependencies avoiding accidental breakage due to version changes and SemVer.

[lockdown](https://www.npmjs.com/package/lockdown) goes further and gives guarantees about dependency content, not version alone. [shrinkpack](https://www.npmjs.com/package/shrinkpack) is another complementary option.

[Yarn](https://yarnpkg.com/), an npm alternative, goes a step further as it introduces the idea of a *lockfile*. Yarn is worth a look, as it fixes certain shortcomings of npm. Yarn has value for package authors as well as it keeps maintenance easier given you can guarantee certain versions of dependencies are being used.

## Keeping Dependencies Up to Date

An important part of maintaining a project is keeping their dependencies up to date. How to do this depends a lot of on the maturity of your project. Ideally, you have an excellent set of tests covering the functionality to avoid problems with updates. Consider the following approaches:

* You can update all dependencies at once and hope for the best. Tools, such as [npm-check-updates](https://www.npmjs.com/package/npm-check-updates), [npm-check](https://www.npmjs.com/package/npm-check), [npm-upgrade](https://www.npmjs.com/package/npm-upgrade), or [updtr](https://www.npmjs.com/package/updtr), can do this for you.
* Install the newest version of a specific dependency, e.g., `npm install lodash@* --save` as a more controlled approach.
* Patch version information by hand by modifying *package.json* directly.

It's important to remember that your dependencies can introduce backward incompatible changes. Remember how SemVer works and study the release notes of dependencies. They don't exist always, so you have to go through the project commit history.

T> `npm ls`, and more specifically `npm ls <package name>`, allow you to figure out which versions you have installed. `npm ls -g` performs a similar lookup against the globally installed packages.

## Tracking Dependencies

Certain services can help you to keep track of your dependencies:

* [David](https://david-dm.org/)
* [versioneye](https://www.versioneye.com/)
* [Gemnasium](https://gemnasium.com)

These services provide badges you can integrate into your project *README.md*, and they email you about important changes. They can also point out possible security issues that have been fixed.

For testing your project, you can consider solutions, such as [Travis CI](https://travis-ci.org/) or [SauceLabs](https://saucelabs.com/). They can test your project against different environments and browsers. The advantage of doing this is that it allows you to detect regressions. If you accept pull requests to your project, these services can help to keep their quality higher as it forces the authors to maintain their code on a higher level.

[Codecov](https://codecov.io/) and [Coveralls](https://coveralls.io/) provide code coverage information and a badge to include in your README. It's a part of improving the quality of your pull requests as they should maintain the current coverage at a minimum and ideally improve it.

T> [shields.io](http://shields.io/) lists a large number of available badges. [NodeICO](https://nodei.co/) provides badges that aggregate package related information.

T> There's a [Codecov extension](https://chrome.google.com/webstore/detail/codecov-extension/keefkhehidemnokodkdkejapdgfjmijf) for Chrome that allows you to see code coverage through GitHub user interface.

## Conclusion

When publishing npm packages, you should take care to follow SemVer carefully. Consider ComVer as it's a simpler backwards compatible alternative. Use tooling to your advantage to avoid regressions and to keep your user base happy.

You'll learn how to manage monorepos in the next chapter.
