# Dependencies

TODO: Updating (greenkeeper.io, npm-upgrade)

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

## How to Avoid Breaking Dependent Projects

https://www.npmjs.com/package/dont-break

## Conclusion

TODO
