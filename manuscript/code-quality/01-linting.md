# Linting and Code Formatting

Developers read code more often then they write it: sometimes you spend hours to find where to make a one line fix. That’s why consistent code style is important. Ideally code in a project should look like it was written by a single developer. It makes code reading simpler because you know how things are done and how they look in a project.

## Why to Lint

Good code style can save you from a bug one day. Consider this code:

```js
if (mealType === BREAKFAST)
  drinkCoffee();
  eatCroissant();
```

Can you see the issue? `eatCroissant();` gets evaluated with any `mealType` value.

Many popular JavaScript code styles require curly braces around all blocks and consistent indentation for this reason. Doing this forces you to write the correct code:

```js
if (mealType === BREAKFAST) {
  drinkCoffee();
  eatCroissant();
}
```

You can enforce code style in your project or even autoformat code with linters and code formatting tools. Linting can also capture mistakes in your code before you even try run it. Code style is subjective. Automation can reduce pointless discussions and improve team productivity. It also simplifies switching between different projects and reduces time to ramp up on a new project.

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

## Linting JavaScript with ESLint

[ESLint](http://eslint.org/) is a popular linter for JavaScript. It’s primarily used to capture language related issues but can be used to enforce code style and good practices. It can fix many issues automatically, especially code style. You can write your own rules to ensure code consistency across your team or organization.

JavaScript doesn’t have an official coding style but the community maintains a few. Especially [Airbnb](https://github.com/airbnb/javascript) and [Standard](http://standardjs.com/) are popular: Airbnb is detailed and pragmatic, Standard is a bit controversial because it doesn’t use semicolons. Both use two spaces for indentation.

ESLint is unopinionated and doesn’t have any rules by default so you should enable them manually or use a config like [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base), that implements Airbnb style guide.

All ES6 features are supported by default, [babel-eslint](https://www.npmjs.com/package/babel-eslint) adds support for newer ECMAScript features and Flow. ESLint is supported by JetBrains’ IDEs and has plugins for other popular editors.

ESLint has many plugins, for example:

* [eslint-plugin-compat](https://www.npmjs.com/package/eslint-plugin-compat) — checks browser compatibility using `browserslist` file, [caniuse](http://caniuse.com/) and [@kangax’s compat](http://kangax.github.io/compat-table/es6/) table.
* [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) — validates ES6 import/export syntax, prevents misspelling of file paths.
* [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) — best practices for React, JSX code style.
* [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security) — finds potential security issues in Node code.

### Setting up ESLint

Let’s install ESLint with the Airbnb config:

```bash
npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import
```

Update your *package.json* like this:

```json
{
  "scripts": {
    "lint:js": "eslint . --cache --fix"
  }
}
```

Create a config file, *.eslintrc*:

```json
{
  "extends": "airbnb-base"
}
```

And finally run:

```bash
npm run lint:js
```

You may need to tweak your *.eslintrc* according to your project needs:

```json
{
  "extends": "airbnb-base",
  "parserOptions": {
    // ECMAScript version: 3—8 (or 2015—2017), default is 5
    "ecmaVersion": 6,
    // Treat source files as ECMAScript modules, default is "script"
    "sourceType": "module",
    "ecmaFeatures": {
        // Enable JSX
        "jsx": true,
        // Enable object rest/spread properties: {...a, ...b}
        "experimentalObjectRestSpread": true
    }
  },
  // If you’re using Flow or experimental ECMAScript features not supported by ESLint
  "parser": "babel-eslint",
  // Predefined sets of global variables
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  }
}
```

See [ESLint docs](http://eslint.org/docs/user-guide/configuring) for more information.

## Linting TypeScript with TSLint

[TSLint](https://palantir.github.io/tslint/) is a linter for TypeScript. It has much smaller community than ESLint and overall experience is not as nice but otherwise it’s like ESLint.

T> [TypeScript support](https://github.com/eslint/typescript-eslint-parser) for ESLint is experimental and has issues.

### Setting up TSLint

Let’s install TSLint with the Airbnb config:

```bash
npm install --save-dev tslint tslint-config-airbnb
```

Update your *package.json* like this:

```json
{
  "scripts": {
    "lint:ts": "tslint --fix 'src/**/*.ts'"
  }
}
```

Create a config file, *tslint.json*:

```json
{
  "extends": "tslint-config-airbnb"
}
```

And finally run:

```bash
npm run lint:ts
```

## Formatting JavaScript with Prettier

[Prettier](https://github.com/prettier/prettier) is an opinionated JavaScript formatter. It has a limited number of settings and most of the code style rules are built in. Prettier removes any existing formatting from your code and prints its own version which makes code absolutely consistent.

Prettier is smarter than other tools. For example you can restrict line length but tools like ESLint can only yell at you it a line is too long — you’d have to reformat code yourself. Prettier can reformat a line of code according to its length as below:

```js
foo(wowJavaScript(), suchFunction(), muchParameters(), shouldReformat());
// ->
foo(
  wowJavaScript(),
  suchFunction(),
  muchParameters(),
  shouldReformat()
);
```

However, shorter statement would be printed as one line:

```js
foo('coffee', 'croissant', 'toast', 'eggs');
```

T> Try Prettier in [an interactive playground](https://prettier.github.io/prettier/).

This approach has many benefits:

* Minimal configuration.
* Almost no decisions to make.
* No arguing about particular rules if you’re working in a team.
* No need to learn you project’s code style for contributors.
* No need to fix style issues reported by ESLint.

Prettier doesn’t support any config files and has few [command line keys](https://github.com/prettier/prettier#api) to modify its behavior, e.g., indentation, quotes and semicolons.

It’s a good idea to disable code style rules in your ESLint config and let Prettier to deal with code style. For example, you can use [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) instead of [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base).

T> [TypeScript support](https://github.com/prettier/prettier/issues/13) for Prettier is under development.

W> Commit your code before running this command — it will reformat all your JavaScript files.

T> To make your contributors’s life easier you can set up Prettier to format code before each commit with lint-staged, see an example in *Automating Linting with lint-staged* section below.

### Setting up Prettier

Let’s install Prettier:

```bash
npm install --save-dev prettier
```

Add a script to your *package.json* like this:

```json
{
  "scripts": {
    "format:js": "prettier --print-width 100 --single-quote --trailing-comma es5 --write '!(node_modules)/**/*.js'"
  }
}
```

And finally run:

```bash
npm run format:js
```

### Setting up Prettier as ESLint Plugin

You can also run Prettier as a [ESLint plugin](https://github.com/prettier/eslint-plugin-prettier). This way Prettier formats all files that go through ESLint and you will not need to repeat glob patterns.

Assuming you already have ESLint configured as described above.

Let’s install Prettier and eslint-plugin-prettier:

```bash
npm install --save-dev prettier eslint-plugin-prettier
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

And finally run:

```bash
npm run lint:js
```

## Linting CSS with Stylelint

[Stylelint](https://stylelint.io/) is a CSS linting tool, it’s like ESLint but for CSS. Stylelint understands CSS, including the latest features like custom properties, and SCSS. Sass-like indented syntaxes are supported using PostCSS [SugarSS](https://github.com/postcss/sugarss). It also has an experimental support for Less.

[stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard) is a config maintaned by stylelint team and based on CSS style guides of GitHub, Google and Airbnb.

### Setting up Stylelint

Let’s install stylelint:

```bash
npm install --save-dev stylelint stylelint-config-standard
```

Add a script to your *package.json* like this:

```json
{
  "scripts": {
    "lint:css": "stylelint '**/*.scss' --syntax scss"
  }
}
```

Create a config file, `.stylelintrc`:

```json
{
  "extends": "stylelint-config-standard"
}
```

And finally run:

```bash
npm run lint:css
```

## Formatting CSS with stylefmt

[stylefmt](https://www.npmjs.com/package/stylefmt) automatically formats CSS according to stylelint rules, it’s like ESLint’s autofix feature.

### Setting up stylefmt

Assuming you already have stylelint configured as described in the previous section.

Let’s install stylefmt:

```bash
npm install --save-dev stylefmt
```

Add a script to your *package.json* like this:

```json
{
  "scripts": {
    "format:css": "stylefmt --recursive '**/*.scss'"
  }
}
```

And finally run:

```bash
npm run format:css
```

## Linting Markdown with Textlint and Proselint

Text linting is less common than code linting but in big projects with many contributors could improve documentation quality. You can:

* Validate links.
* Ensure consistent terminology (e.g., *JavaScript* vs. *Java<wbr>script* or *npm* vs *N<wbr>PM*).
* Improve language (e.g., do not allow words like *ju<wbr>st*, *easi<wbr>ly* and *si<wbr>mply*).

[Textlint](https://textlint.github.io/) is an extensible text linter written in JavaScript, it’s a fork of ESLint so setup is similar. And like ESLint it can fix certain rules for you. It has many plugins:

* [terminology](https://www.npmjs.com/package/textlint-rule-terminology) — checks and fixes terms spelling in your tech writing.
* [common-misspellings](https://www.npmjs.com/package/textlint-rule-common-misspellings) — fixes common English misspellings (e.g. *simi<wbr>liarity* → *similarity*).
* [write-good](https://www.npmjs.com/package/textlint-rule-write-good) — tries to improve your English styles.
* [no-dead-link](https://www.npmjs.com/package/textlint-rule-no-dead-link) — finds dead links, automatically fixes redirects.

[Proselint](http://proselint.com/) is prose linter based on advice of world’s greatest writers and editors, it checks your texts for things like redundancy, jargon, illogic, clichés, sexism, misspelling, inconsistency and misuse of symbols. It has [several dozens of rules](https://github.com/amperser/proselint/#checks) by default.

It’s written in Python but I recommend using is via a [JavaScript wrapper](https://www.npmjs.com/package/proselint) for better UI.

T> If you want to check Markdown syntax and consistency, try [remark-lint](https://www.npmjs.com/package/remark-lint).

### Setting up Textlint

Let’s install Textlint with several rules:

```bash
npm install --save-dev textlint textlint-rule-terminology textlint-rule-common-misspellings textlint-rule-write-good textlint-rule-no-dead-link
```

Add a script to your *package.json* like this:

```json
{
  "scripts": {
    "lint:text": "textlint '**/*.md'"
  }
}
```

Create a config file, `.textlintrc`:

```json
{
  "rules": {
    "terminology": true,
    "common-misspellings": true,
    "write-good": {
      "adverb": false,
      "passive": false,
      "tooWordy": false,
      "weasel": false
    },
    "no-dead-link": true
  }
}
```

And finally run:

```bash
npm run lint:text
```

T> You can run Textlint with autofixing like this: `npm run lint:text -- --fix`. Don’t forget to commit your texts first because autofixing may introduce changes you don’t want to keep.

### Setting up Proselint

Let’s install Proselint:

```bash
pip install proselint
npm install --save-dev proselint
```

Add a script to your *package.json* like this:

```json
{
  "scripts": {
    "lint:prose": "proselintjs '**/*.md'"
  }
}
```

And finally run:

```bash
npm run lint:prose
```

## Automating Linting with lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) runs linters only for changed files before each commit which makes linting mandatory and fast. It uses `pre-commit` Git hook and you can map any file extension to a shell command. You can also configure it to autofix code.

W> You still need to run linters on your CI server: it’s possible to avoid `pre-commit` hook with `git commit --no-verify` of using GitHub UI.

### Setting up lint-staged

Let’s install lint-staged and [husky](https://www.npmjs.com/package/husky) to manage Git hooks:

```bash
npm install --save-dev lint-staged husky
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
      "prettier --print-width 100 --single-quote --trailing-comma es5 --write",
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

This configuration will:

* Every time you commit a `.js` file:
  
  1. Run ESLint with autofixing on files you are committing.
  2. Run Jest tests related to files you are committing.
  3. Format files you are committing with Prettier.
  4. Add changes caused by autofixing and reformatting to your commit.

* Every time you commit an `.scss` file:

  1. Format files you are committing with stylefmt.
  2. Run stylelint on files you are committing.
  3. Add changes caused by reformatting to your commit.

## Conclusion

Code style is an important part of code quality. You can enforce code style through tooling. Doing this forces contributors to code using the same standard and this also keeps the source consistent to read. Pushing code style to configuration also avoids arguments about which conventions to apply.

You'll learn about testing in the next chapter.
