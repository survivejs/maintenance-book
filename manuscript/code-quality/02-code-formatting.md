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

## Formatting JavaScript with Prettier

[Prettier](https://github.com/prettier/prettier) is an opinionated JavaScript formatter. It has a limited number of settings and most of the code style rules are built in. Prettier removes any existing formatting from your code and prints its own version which makes code absolutely consistent.

Prettier is smarter than other tools. For example, you can restrict line length whereas tools like ESLint can only yell at you if a line is too long and you would have to reformat the code yourself. If any line exceeds the limit, Prettier reformats the whole code block:

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

T> Try Prettier in [an interactive playground](https://prettier.github.io/prettier/).

This approach has many benefits:

* Minimal configuration.
* Almost no decisions to make.
* No arguing about particular rules if you’re working in a team.
* No need to learn you project’s code style for contributors.
* No need to fix style issues reported by ESLint.

Prettier doesn’t support any config files and has few [command line keys](https://github.com/prettier/prettier#api) to modify its behavior, e.g., indentation, quotes and semicolons.

It’s a good idea to disable code style rules in your ESLint config and let Prettier deal with the code style. For example, you can use [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) instead of [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base).

T> [TypeScript support](https://github.com/prettier/prettier/issues/13) for Prettier is under development.

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
    "format:js": "prettier --print-width 100 --single-quote --trailing-comma es5 --write '!(node_modules)/**/*.js'"
  }
}
```

And finally run:

```bash
npm run format:js
```

### Setting Up Prettier as ESLint Plugin

You can also run Prettier as a [ESLint plugin](https://github.com/prettier/eslint-plugin-prettier). This way Prettier formats all files that go through ESLint and you will not need to repeat glob patterns.

Let’s install Prettier and eslint-plugin-prettier, assuming you already have ESLint configured as described above:

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

And finally run:

```bash
npm run lint:js
```

T> You can set up your editor to run `eslint --fix` on save and it will reformat your code every time you save a file.

## Formatting CSS with stylefmt

[stylefmt](https://www.npmjs.com/package/stylefmt) automatically formats CSS according to stylelint rules, it’s like ESLint’s autofix feature.

### Setting Up stylefmt

Let’s install stylefmt, assuming you already have stylelint configured as described in the previous section:

```bash
npm install stylefmt --save-dev
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

## Conclusion

Formatting tools complement linting well. They eliminate one source of confusion and make sure your source is formatted in a consistent manner.

You'll learn about typing in the next chapter.

?> We should say something about lint-staged here and automating code formatting.
?> Might be worth mentioning stylefmt plugins including "order".
?> Mention that Prettier can also be installed as a VSCode extension - seems to run on save.