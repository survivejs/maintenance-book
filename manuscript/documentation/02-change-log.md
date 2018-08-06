# Change Logs

Change log is an essential part of an open source project: it tells the user what was changed in a new version, about new features and breaking changes, and how to migrate to a new version.

## Why Not Commit Log

Many projects don’t have change logs and ask users to read the commit log. But commit logs often don’t work well as change logs. Consider this commit log:

```bash
* Refactor: Replace Markdown links with the Link component instead of the styles
* Docs: Clarify logging in Node API
* Docs: Correct the `static` modifier note
* Docs: Explain behavior for code blocks w/o language tag
* Docs: Fix invalid prop type warning
* Fix: Fix validation error for uglifyjs-webpack-plugin
* Docs: Add credits for logo designers
```

Only one commit out of seven is relevant for the package user: last but one that fixes a bug, all the rest are documentation updates and code changes that don’t affect the public API.

## What Is a Good Change Log

A good change log should answer these questions:

* what’s new;
* are there any breaking changes;
* how to migrate to the new version.

It shouldn’t contain anything that doesn’t affect the public API, like refactoring or development dependencies updates.

For example, a change log for a group of commits above may look like this:

```bash
Fix an error caused by a newer version of uglifyjs-webpack-plugin with a breaking change.
```

T> [Keep a CHANGELOG](https://keepachangelog.com/) discusses good change logs in in greater detail.

T> You can partially automate change log generation as discussed in [an article](http://blog.sapegin.me/all/semantic-release) and the _Automation_ chapter.

T> You can provide codemods to help users migrate their code bases to a new version automatically as discussed in [an interview](https://survivejs.com/blog/codemod-interview/).

## Conclusion

Change logs make upgrades easier for your users because they know exactly what will break in their app with a new version of your packages, and how they can avoid it.
