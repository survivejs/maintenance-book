# Code Formatting

The ideas of linting and formatting code overlap. Linting can capture language usage related issues while formatting can be seen as a more general idea. Consider handling line endings for example. The problem is the same regardless of the file type. On a more specific level, you may want to format source files in a particular way.

## Configuring IDEs and Editors with EditorConfig

[EditorConfig](http://editorconfig.org/) allows you to define indentation style and other whitespace settings for any file type. This way your editor can automatically choose the correct settings, which is especially handy when developers use platforms with different line endings, e.g., Mac and Windows.

Here is a typical config (*.editorconfig*) with separate rules for Markdown, JSON and YAML files:

```ini
root = true

[*]
indent_style = tab
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{json,yml,md}]
indent_style = space
indent_size = 2
```

EditorConfig is supported by popular IDEs and editors through [plugins](http://editorconfig.org/#download).

T> It's possible to force line endings through *.gitattributes* by setting `* text=auto` and `bin/* eol=lf` but EditorConfig has more options.

## Formatting JavaScript and TypeScript with Prettier

[Prettier](https://prettier.io/) is an opinionated JavaScript formatter. It has a limited number of settings and most of the code style rules are built in. Prettier removes any existing formatting from your code and prints its own version which makes code absolutely consistent.

Prettier is smarter than other tools. For example, you can restrict line length whereas tools like ESLint can only yell at you if a line is too long and you would have to reformat the code yourself. If any line exceeds the limit, Prettier reformats the whole code block:

TODO: https://engineering.hexacta.com/why-arent-you-using-prettier-4fe0a77713e8

<!-- textlint-disable -->

```js
foo(wowJs(), suchFunction(), muchParameters(), shouldReformat());
```

After the code goes through Prettier, you'll end up with the code below:

```js
foo(
  wowJs(),
  suchFunction(),
  muchParameters(),
  shouldReformat()
);
```

However, shorter statement would be printed as one line:

```js
foo('coffee', 'croissant', 'toast', 'eggs');
```

<!-- textlint-enable -->

T> Try Prettier in [an interactive playground](https://prettier.io/playground/).

This approach has many benefits:

* Minimal configuration.
* Almost no decisions to make.
* No arguing about particular rules if you’re working in a team.
* No need to learn you project’s code style for contributors.
* No need to fix style issues reported by ESLint.

Prettier has few [options](https://prettier.io/docs/en/options.html) to modify its behavior, like indentation, quotes and semicolons.

It’s a good idea to disable code style rules in your ESLint config and let Prettier deal with the code style. For example, you can use [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) instead of [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base).

W> Commit your code before running this command — it will reformat all your JavaScript files.

T> To make your contributors’ life easier you can set up Prettier to format code before each commit with lint-staged. The idea is covered in the *Linting* chapter.

### Setting Up Prettier

Let’s install Prettier:

```bash
npm install prettier --save-dev
```

Add a script to your *package.json* like this:

```json
{
  "scripts": {
    "format:js": "prettier --write"
  }
}
```

Create a config file, *.prettierrc*:

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

And finally run:

```bash
npm run format:js
```

### Setting Up Prettier as ESLint Plugin

You can also run Prettier as a [ESLint plugin](https://github.com/prettier/eslint-plugin-prettier). This way Prettier formats all files that go through ESLint and you will not need to repeat glob patterns.

Let’s install Prettier and eslint-plugin-prettier, assuming you already have ESLint configured as described in the *Linting* chapter:

```bash
npm install prettier eslint-plugin-prettier --save-dev
```

Update your *.eslintrc* like this:

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error", {
      "printWidth": 100,
      "singleQuote": true,
      "trailingComma": "es5"
    }]
  }
}
```

T> You can also put your Prettier config into a *.prettierrc* file, see an example above.

And finally run:

```bash
npm run lint:js
```

T> You can set up your editor to run `eslint --fix` on save and it will reformat your code every time you save a file.

## Formatting CSS with Stylelint

Stylelint can format your CSS with `--fix` switch, check the *Linting* chapter to know how to set it up.

## Formatting CSS with Prettier

Prettier can format your CSS too, see how to set it up above.

For CSS you’ll need one more script in *package.json*:

```json
{
  "scripts": {
    "format:css": "prettier --write"
  }
}
```

Create a config file, *.prettierrc*:

```json
{
  "printWidth": 100
}
```

And then run it like this:

```bash
npm run format:css
```

TODO: https://github.com/prettier/eslint-config-prettier

## Automating Code Formatting with lint-staged

If you’re not using linter for code formatting, you may want to automatically format your code before each commit with lint-staged. See the *Linting* chapter to learn how to set up lint-staged.

TODO: https://www.slideshare.net/epoberezkin/auditing-development-guidelines-in-github-repositories
TODO: https://www.npmjs.com/package/gh-lint

## Automating Linting with lint-staged

[lint-staged](https://github.com/okonet/lint-staged) runs linters only for changed files before each commit which makes linting mandatory and fast. It uses `pre-commit` Git hook and you can map any file extension to a shell command. You can also configure it to autofix code.

T> lint-staged works with [Flow since v0.48.0](https://github.com/facebook/flow/releases/tag/v0.48.0).

W> You still need to run linters on your CI server: it’s possible to avoid the `pre-commit` hook with `git commit --no-verify` in the GitHub UI.

### Setting Up lint-staged

Let’s install lint-staged and [husky](https://www.npmjs.com/package/husky) to manage Git hooks:

```bash
npm install lint-staged husky --save-dev
```

Update your *package.json* like this:

```json
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "jest --bail --findRelatedTests",
      "prettier --write",
      "git add"
    ],
    "*.scss": [
      "stylefmt",
      "stylelint --syntax scss",
      "git add"
    ]
  }
}
```

This configuration will perform the following steps:

* Every time you commit a *.js* file:

  1. Run ESLint with autofixing on files you are committing.
  2. Run Jest tests related to files you are committing.
  3. Format files you are committing with Prettier. (See the *Code Formatting* chapter for more details.)
  4. Add changes caused by autofixing and reformatting to your commit.

* Every time you commit an *.scss* file:

  1. Format files you are committing with stylefmt.
  2. Run stylelint on files you are committing.
  3. Add changes caused by reformatting to your commit.

## Conclusion

Formatting tools complement linting well. They eliminate one source of confusion and make sure your code is formatted in a consistent manner.

You'll learn about typing in the next chapter.
