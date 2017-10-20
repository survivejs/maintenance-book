# Linting

TODO

## Linting Markdown with Textlint and Proselint

Text linting is less common than code linting but in large projects with many contributors it could improve documentation quality. You can:

* Validate links.
* Ensure consistent terminology (e.g., *JavaScript* vs. *Java&#x200b;script* or *npm* vs. *N&#x200b;PM*).
* Improve language (e.g., do not allow words like *ju&#x200b;st*, *easi&#x200b;ly* and *si&#x200b;mply*).

[Textlint](https://textlint.github.io/) is an extendable text linter written in JavaScript, it’s a fork of ESLint so setup is similar. And like ESLint it can fix certain rules for you. It has many plugins:

* [eslint](https://www.npmjs.com/package/textlint-rule-eslint) — checks code examples in Markdown using ESLint (autofixing is also possible).
* [common-misspellings](https://www.npmjs.com/package/textlint-rule-common-misspellings) — fixes common English misspellings (e.g. *simi&#x200b;liarity* → *similarity*).
* [no-dead-link](https://www.npmjs.com/package/textlint-rule-no-dead-link) — finds dead links, automatically fixes redirects.
* [terminology](https://www.npmjs.com/package/textlint-rule-terminology) — checks and fixes terms spelling in your tech writing.
* [write-good](https://www.npmjs.com/package/textlint-rule-write-good) — tries to improve your English styles.

[Proselint](http://proselint.com/) is prose linter following the advice of world’s greatest writers and editors, it checks your texts for things like redundancy, jargon, illogic, clichés, sexism, misspelling, inconsistency and misuse of symbols. It has [several dozens of rules](https://github.com/amperser/proselint/#checks) by default.

It’s written in Python but we recommend using it via a [JavaScript wrapper](https://www.npmjs.com/package/proselint) for better UI.

T> To check Markdown syntax and consistency, try [remark-lint](https://www.npmjs.com/package/remark-lint).

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

## Conclusion

TODO
