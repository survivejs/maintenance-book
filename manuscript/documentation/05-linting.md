# Linting and Formatting

Text linting is much less common than code linting, but if you have to maintain a lot of text it may save you a lot of time, and improve quality of your documentation.

## Linting Markdown with Textlint and Proselint

Text linting is less common than code linting but in large projects with many contributors it could improve documentation quality. You can:

* Validate links.
* Ensure consistent terminology (e.g., _JavaScript_ vs. _Java&#x200b;script_ or _npm_ vs. _N&#x200b;PM_).
* Improve language (e.g., do not allow words like _ju&#x200b;st_, _easi&#x200b;ly_ and _si&#x200b;mply_).

[Textlint](https://textlint.github.io/) is an extendable text linter written in JavaScript, it’s a fork of ESLint so setup is similar. And like ESLint it can fix certain rules for you. It has many plugins:

* [eslint](https://www.npmjs.com/package/textlint-rule-eslint) — checks code examples in Markdown using ESLint (autofixing is also possible).
* [common-misspellings](https://www.npmjs.com/package/textlint-rule-common-misspellings) — fixes common English misspellings (e.g. _simi&#x200b;liarity_ → _similarity_).
* [no-dead-link](https://www.npmjs.com/package/textlint-rule-no-dead-link) — finds dead links, automatically fixes redirects.
* [stop-words](https://www.npmjs.com/package/textlint-rule-stop-words) — filler words, buzzwords and chiches.
* [terminology](https://www.npmjs.com/package/textlint-rule-terminology) — checks and fixes terms spelling in your tech writing.
* [write-good](https://www.npmjs.com/package/textlint-rule-write-good) — tries to improve your English styles.

[Proselint](http://proselint.com/) is prose linter following the advice of world’s greatest writers and editors, it checks your texts for things like redundancy, jargon, illogic, clichés, sexism, misspelling, inconsistency and misuse of symbols. It has [several dozens of rules](https://github.com/amperser/proselint/#checks) by default.

It’s written in Python but we recommend using it via a [JavaScript wrapper](https://www.npmjs.com/package/proselint) for better UI.

T> To check Markdown syntax and consistency, try [remark-lint](https://www.npmjs.com/package/remark-lint).

### Setting up Textlint

Let’s install Textlint with several rules:

```bash
npm install --save-dev textlint textlint-rule-terminology textlint-rule-common-misspellings textlint-rule-write-good textlint-rule-no-dead-link
```

Add a script to your _package.json_ like this:

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

Add a script to your _package.json_ like this:

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

## Formatting Markdown with Prettier

We’re discussed Prettier in great detail in the _Code Formatting_ chapter but it can do more. It can format your Markdown files, and not only text but also code example for languages it supports: JavaScript, TypeScript, CSS, Less, SCSS, JSON, GraphQL, and Markdown.

### Setting up Prettier

Let’s install Prettier:

```bash
npm install --save-dev prettier
```

Add a script to your _package.json_ like this:

```json
{
  "scripts": {
    "prettier": "prettier --write '**/*.md'"
  }
}
```

Create a config file, `.prettierrc`:

```json
{
  "printWidth": 68,
  "singleQuote": true,
  "trailingComma": "es5",
  "proseWrap": false
}
```

If you’re using Prettier to format your code, you may want to define different rules for code inside Markdown files:

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "useTabs": true,
  "proseWrap": false,
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "printWidth": 68,
        "useTabs": false,
        "trailingComma": "none"
      }
    }
  ]
}
```

And finally run:

```bash
npm run prettier
```

## Conclusion

Documentation linting is as important as code linting: it helps you to improve quality, find mistakes and keep formatting consistent.
