# Code Formatting

The ideas of linting and formatting code overlap. Linting can capture language usage related issues while formatting can be seen as a more general idea. Consider handling line endings for example. The problem is the same regardless of the file type. On a more specific level, you may want to format source files in a particular way.

## Configuring IDEs and Editors with EditorConfig

[EditorConfig](http://editorconfig.org/) allows you to define indentation style and other whitespace settings for any file type. This way your editor can automatically choose the correct settings. This is handy when developers use platforms with different line endings, e.g., Mac and Windows.

Here is a typical config (_.editorconfig_) with separate rules for Markdown, JSON and YAML files:

**.editorconfig**

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

T> It's possible to force line endings through _.gitattributes_ by setting `* text=auto` and `bin/* eol=lf` but EditorConfig has more options.

## Formatting JavaScript and TypeScript with Prettier

[Prettier](https://prettier.io/) is an opinionated JavaScript formatter. It has few settings and most of the code style rules are built in. Prettier removes any existing formatting from your code and prints its own version which makes code absolutely consistent.

Prettier is smarter than other tools. For example, you can restrict line length while tools like ESLint can only yell at you if a line is too long and you would have to reformat the code yourself. If any line exceeds the limit, Prettier reformats the whole code block:

<!-- prettier-ignore -->
```javascript
foo(wowJs(), suchFunction(), muchParameters(), shouldReformat());
```

{pagebreak}

After the code goes through Prettier, you'll end up with the code below:

<!-- prettier-ignore -->
```javascript
foo(
  wowJs(),
  suchFunction(),
  muchParameters(),
  shouldReformat()
);
```

However, shorter statement would be printed as one line:

<!-- prettier-ignore -->
```javascript
foo('coffee', 'croissant', 'toast', 'eggs');
```

T> Try Prettier in [an interactive playground](https://prettier.io/playground/).

This approach has many benefits:

* Minimal configuration.
* Almost no decisions to make.
* No arguing about particular rules if you’re working in a team.
* No need to learn you project’s code style for contributors.
* No need to fix style issues reported by ESLint.

Prettier has few [options](https://prettier.io/docs/en/options.html) to modify its behavior, like indentation, quotes and semicolons.

It’s a good idea to disable code style rules in your ESLint config and let Prettier deal with the code style. For example, you can use [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) instead of [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base).

W> Commit your code before running the command — it will reformat all your JavaScript files.

T> To make your contributors’ life easier you can set up Prettier to format code before each commit with lint-staged. The idea is covered in the _Automation_ chapter.

### Setting Up Prettier

Let’s install Prettier:

```bash
npm install prettier --save-dev
```

Add a script to your _package.json_ like this:

**package.json**

```json
{
  "scripts": {
    "format:js": "prettier --write"
  }
}
```

{pagebreak}

Create a config file, _.prettierrc_:

**.prettierrc**

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

Let’s install Prettier and eslint-plugin-prettier, assuming you already have ESLint configured as described in the _Linting_ chapter:

```bash
npm install prettier eslint-plugin-prettier --save-dev
```

Update your _.eslintrc_ like this:

**.eslintrc**

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "es5"
      }
    ]
  }
}
```

T> You can also put your Prettier config into a _.prettierrc_ file, see an example above.

And finally run:

```bash
npm run lint:js
```

When used like this, Prettier itself doesn't perform any alterations itself but instructs ESLint to implement its rules. ESLint will perform the fixing process itself.

T> You can set up your editor to run `eslint --fix` on save and it will reformat your code every time you save a file.

## Formatting CSS with Stylelint

Stylelint can format your CSS with `--fix` switch, check the _Linting_ chapter to know how to set it up.

## Formatting CSS with Prettier

Prettier can format your CSS too, see how to set it up above.

For CSS you’ll need one more script in _package.json_:

**package.json**

```json
{
  "scripts": {
    "format:css": "prettier --write"
  }
}
```

Create a config file, _.prettierrc_:

**.prettierrc**

```json
{
  "printWidth": 100
}
```

And then run it like this:

```bash
npm run format:css
```

## Code Consistency

**Code consistency** can be characterized as follows:

* Does the code look similar everywhere?
* Are the programming patterns used consistent with each other?
* Is the naming consistent?

Code formatting answers the first problem. Linting can help with the second one although it might not capture it entirely. Consistency of naming is another difficult one as it's related to **conceptual code consistency**.

For example, it could have `FooLoader` and `BarThatLoadsFoo` abstractions. Both use the same concept in different ways.

It's difficult, or even impossible, to detect high-level problems like this automatically. For this reason, it's important to review the code for consistency every once in a while. Sometimes you may discover something that can be turned into a linting rule to solidify a specific idea but not everything can be automated.

## Conclusion

Formatting tools complement linting well. They eliminate one source of confusion and make sure your code is formatted in a consistent way.

You'll learn about typing in the next chapter.

T> See the _Automation_ chapter to learn how to automate code formatting.
