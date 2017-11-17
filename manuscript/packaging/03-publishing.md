# Publishing Packages

Publishing npm packages is only a `npm publish` away. Assuming the package name is still available and everything goes fine, you should have something out there! After this, you can install your package through `npm install` or `npm i`.

Most of the community follows a specific versioning convention which you should understand. It comes with its downsides but given that the majority use and understand it, it's worth covering.

## Understanding SemVer

Most popular packages out there follow SemVer. Roughly, SemVer states that you should not break backward compatibility, given [certain rules](http://semver.org/) are met:

1. The MAJOR version increments when incompatible API changes are made.
2. The MINOR version increments when backwards-compatible features are added.
3. The PATCH version increments when backwards-compatible bugs are fixed.

The rules are different for `0.x` versions. There the rule is `0.<MAJOR>.<MINOR>`. For packages considered stable and suitable for public usage (`1.0.0` and above), the rule is `<MAJOR>.<MINOR>.<PATCH>`. For example, if the current version of a package is `0.1.4` and a breaking change is performed, it should bump to `0.2.0`.

Given SemVer can be tricky to manage, [ComVer](https://github.com/staltz/comver) exists as a backwards compatible alternative. ComVer can be described as a binary decision `<not compatible>.<compatible>`.

T> You can understand SemVer much better by studying [the online tool](http://semver.npmjs.com/) and how it behaves.

T> Not all version number systems are created equal. Sometimes people prefer to use their own and go against the mainstream. [Sentimental versioning by Dominic Tarr](http://sentimentalversioning.org/) discusses this phenomenon.

## Increasing a Version

To increase the version of your packages, you need to invoke one of these commands:

* `npm version <x.y.z>` - Define version yourself.
* `npm version <major|minor|patch>` - Let npm bump the version for you using SemVer.
* `npm version <premajor|preminor|prepatch|prerelease>` - Same as previous expect this time it generates `-<prerelease number>` suffix. Example: `v2.1.2-2`.

Invoking any of these updates _package.json_ and creates a version commit to git automatically. If you execute `npm publish` after doing this, you should have a new version out there.

{pagebreak}

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

1. `npm version 0.5.0-alpha1` - Update _package.json_ as discussed earlier.
2. `npm publish --tag alpha` - Publish the package under _alpha_ tag.

To consume the test version, your users have to use `npm install <your package name>@alpha`.

T> [npm link](https://docs.npmjs.com/cli/link) allows you to link a package as a globally available symbolic link. Node resolves to the linked version unless local `node_modules` exists. Use `npm unlink` or `npm unlink <package>` to remove the link.

## Version Ranges

npm supports multiple version ranges as listed below:

* `~` - Tilde matches only patch versions. For example, `~1.2` would be equal to `1.2.x`.
* `^` - Caret is the default you get using `--save` or `--save-dev`. It matches minor versions, and this means `^0.2.0` would be equal to `0.2.x`.
* `*` - Asterisk matches major releases, and it's the most dangerous of the ranges. Using this recklessly can easily break your project in the future.
* `>= 1.3.0 < 2.0.0` - Ranges between versions come in handy with `peerDependencies`.

You can set the default range using `npm config set save-prefix='^'` in case you prefer something else than caret. Alternately, you can modify _~/.npmrc_ directly. Especially defaulting to tilde can be a good idea that can help you to avoid trouble with dependencies, although it doesn't remove potential problems entirely. That's where shrinkwrapping comes in.

## Locking Versions

Using version ranges can feel dangerous as it doesn't take much to break an application. A single change in the wrong place is enough. Since npm 5, npm has provided support for **lockfiles**. When `npm install` is run, it writes a file, _package-lock.json_. The file should be committed to a project repository and it contains the versions of the installed packages.

The next time someone runs `npm install`, npm will use the versions specified in this lockfile. The point is to provide predictable environment as sometimes a package might break by not following the aforementioned SemVer rules correctly.

[Yarn](https://yarnpkg.com/), an npm alternative, implemented the idea of lockfiles first. It provides certain functionality, such as workspaces, not found in npm and continues to improve over npm.

T> [Sebastian McKenzie discusses the difference between the lockfile approaches](https://yarnpkg.com/blog/2017/05/31/determinism/). In short, Yarn needs _package.json_ to work while npm doesn't. Future interoperability is unclear.

## Deprecating, Unpublishing, and Renaming Packages

It's possible that your package reaches the end of its life. Another package could replace it, or it can become obsolete. For this purpose, npm provides [npm deprecate](https://docs.npmjs.com/cli/deprecate) command. You can state `npm deprecate foo@"< 0.4.0" "Use bar package instead"`.

You can deprecate a range or a whole package by skipping the range. Given mistakes happen, you can undeprecate a package by providing an empty message.

Deprecation can be handy if you have to rename a package. You can publish the package under a new name and let the users know of the new name in your deprecation message.

There is a heavier duty option in the form of [npm unpublish](https://docs.npmjs.com/cli/unpublish). Using `npm unpublish` you can pull a package out of the registry. Given this can be potentially dangerous and break the code for a lot of people, it has been [restricted to versions that are less than 24 hours old](http://blog.npmjs.org/post/141905368000/changes-to-npms-unpublish-policy). Most likely you don't need the feature at all, but it's nice to know it exists.

## Sharing Authorship

As packages evolve, you likely want to start developing with others. You could become the new maintainer of a project, or pass the torch to someone else. These things happen as packages evolve.

npm provides certain commands for these purposes. It's all behind [npm owner](https://docs.npmjs.com/cli/owner) namespace. More specifically, there are `npm owner ls <package name>`, `npm owner add <user> <package name>` and `npm owner rm <user> <package name>`. That's about it.

## Conclusion

When publishing npm packages, you should take care to follow SemVer carefully. Consider ComVer as it's a simpler backwards compatible alternative. Use tooling to your advantage to avoid regressions and to keep your user base happy.

You'll learn how to build npm packages in the next chapter.
