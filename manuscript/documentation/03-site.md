# Site

Project site isn’t only a marketing tool — it also allows you to show your project to its potential users and give them the opportunity to try the project in their browsers.

For many projects GitHub repository would be enough but Markdown pages are the only tool you have there, and a site have some advantages, like easier navigation, interactive examples and demos, or better documentation search.

![React site](images/react-site.png)

T> [Design for Hackers](https://designforhackers.com/) email course and [Hello Web Design](https://hellowebbooks.com/learn-design/) book are good resources to improve your design skills. And the [Beautiful Open](http://beautifulopen.com/) gallery is good if you need some inspiration.

## How to Set up a Site

There are countless number of tools to make a site — look at the list of [top static generators](https://www.staticgen.com/), for example. You can handcode your site or write your own engine, [like authors of](https://antwar.js.org/) [this book did](http://blog.sapegin.me/all/why-fledermaus), though we don’t recommend that unless your needs are unusual.

Many open source projects’ sites are built with the [JAMstack](https://jamstack.org/): static HTML, generated from Markdown content, and, possibly, data from different APIs. [It’s convenient](https://jamstack.org/best-practices/) because you don’t need any backend or a database and can use any hosting, and some of them are free for open source projects.

{pagebreak}

### Docusaurus

[Docusaurus](https://docusaurus.io/) is static site generator that was made for open source sites. It’s React-based, supports localizations, versioning, blog and has Algolia documentation search integration.

### Setting Up Docusaurus

First run:

```bash
npx docusaurus-init
```

This command will create a basic configuration for Docusaurus in _website_ and folders with example documentation and a blog. The _website_ has its own _package.json_ and npm scripts to run and build your new site.

Then tweak example files to your needs:

1. Move your Markdown documentation to the _docs_ folder.
2. [Edit _website/siteConfig.js_](https://docusaurus.io/docs/en/site-config.html) as you wish. It defines things like site title, logo, menu links and colors.
3. Edit *website/core/Footer.js* as you wish. It’s a React component that is used to render the footer of your site with external links, like GitHub, Twitter or Gitter.
4. Edit *website/pages/index.js* as you wish. This is your site’s index page.

Now you can run a dev server:

```bash
cd website
npm run start
```

{pagebreak}

And open `http://localhost:3000` in your browser:

![Docusaurus](images/docusaurus.png)

Even with minimal setup you can create a good-looking site. And later you can customize styles and layout as you like.

### Jekyll

[Jekyll](https://jekyllrb.com/) is a popular Ruby-based static site generator.

If [you’re using GitHub Pages](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/) you don’t need to install anything. You can even edit code in GitHub web UI and your site will be updated automatically.

### Gatsby

[Gatsby](https://www.gatsbyjs.org/) is a React-based static site generator. It’s used by popular projects like [React](https://github.com/reactjs/reactjs.org) and [Storybook](https://github.com/storybooks/storybook/tree/master/docs/). You’ll get a nice developer experience with hot reload and a fast site: Gatsby generates a static progressive web app, so it loads only critical resources for the first page, but later prefetches resources for other pages and works as single page app without rull page reload.

[Gatsby Tutorial](https://www.gatsbyjs.org/tutorial/) and [Gatsby + Contentful + Netlify (and Algolia)](https://www.gatsbyjs.org/blog/2017-12-06-gatsby-plus-contentful-plus-netlify/) will be good starting point in learning how to use Gatsby.

### GitBook

[GitBook](https://github.com/GitbookIO/gitbook) is a tool that generates ebooks from Markdown content. Ebooks are the main use case of GitBook, but the HTML version can work well as a documentation site. It has a nice default theme and search that works without any backend.

[Redux](https://redux.js.org/) site is a good example:

![Redux site made with GitBook](images/gitbook.png)

T> See [how to integrate GitBook with JSDoc](https://medium.com/@kevinast/integrate-gitbook-jsdoc-974be8df6fb3).

### Style Guide and API Documentation Generators

You can use tools, described in the _API Documentation_ chapter, to create a site. Most of these tools allow you to add additional Markdown files with some introductory information. You can customize theme for your liking or you can generate Markdown files and use them as source for your Jekyll or Gatsby site.

## Interactive Examples and Demos

If your project can work in a browser, it’s a great opportunity to show it in action on your site.

You can code demos as part of the site HTML. Good examples are [react-day-picker](http://react-day-picker.js.org/), [React Select](https://jedwatson.github.io/react-select/) and [Draggable](https://shopify.github.io/draggable/).

![react-day-picker demos](images/react-day-picker.png)

[REPLs](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), which stands for _Read–eval–print loop_, allow your visitors to play with a tool in a browser: edit code or change options — and immediately see the results. [Prettier](https://prettier.io/playground/) and [Babel](https://babeljs.io/repl/) have good examples.

![Prettier REPL](images/prettier-repl.png)

You can create a basic REPL by embedding a playground like [CodePen](https://codepen.io/), [JSFiddle](https://jsfiddle.net/) or [JS Bin](http://jsbin.com/).

![CodePen on mo.js](images/mojs-codepen.png)

[CodeSandbox](https://codesandbox.io/) and [WebpackBin](https://www.webpackbin.com/) allow you to create a REPL for a whole project with many files, webpack and dependencies.

## Hosting

### GitHub Pages

[GitHub Pages](https://pages.github.com/) is a free hosting for open source projects. You can host static HTML or a site powered by Jekyll.

You can host a site for your GitHub user, organization or a project. GitHub Pages have a dozen of themes that you can use if your design skills are not great:

![GitHub Pages theme selector](images/gh-pages-themes.png)

### Netlify

[Netlify](https://www.netlify.com/) is a static hosting with global CDN, HTTPS and continuous deployment. They provide one of their paid plans for free for open source projects.

## Deployment

If you’re using Jekyll and GitHub pages, you don’t need to do anything — push your changes to the repository, and GitHub will do the rest.

If you have to generate HTML pages before publishing, you will not want to store them in the main repository of your project. Instead you can use a branch or a separate repository.

Use [gh-pages](https://www.npmjs.com/package/gh-pages) command line tool to commit generated files to another branch (like `gh-pages` for GitHub Pages).

Or you can store your site code in a separate repository, use a web hook to trigger a script that will download Markdown documentation from your project’s main repository and build a site on every commit to the main repository.

![Netlify build hook](images/netlify-build-hook.png)

```bash
#!/usr/bin/env bash

set -e

# URL to download the main project repository
REPO_TAR_GZ="https://codeload.github.com/styleguidist/react-styleguidist/tar.gz/master"

# Download and unpack the main repository
curl "$REPO_TAR_GZ" | tar xz

# Build the site
# It should use Markdown files from downloaded react-styleguidist folder
npm run build
```

## Domain Names

Free domain names by hosting providers are usually long, like `username.github.io` or even `username.github.io/projectname`.

You can buy a custom domain (like `projectname.io` or `projectname.com`) or use a free one from [js.org](https://js.org/).

## Search

[Algolia DocSearch](https://community.algolia.com/docsearch/) is a hosted documentation search engine. It will crawl your documentation pages and you’ll only need to embed their JavaScript code and a search field into your site. You don’t need any backend.

![Algolia DocSearch](images/algolia.png)

## Comments

Commenting options for static sites are limited. The most popular is [Disqus](https://disqus.com/). [Discourse](https://www.discourse.org/) or GitHub issues may work too.

## Testing

If your site content is in Markdown, look at the _Linting and Formatting_ chapter.

Mot likely you don’t need many tests for your site unless you’re doing something complicated, like a custom REPL. But one type of tests maybe useful: deployment smoke test.

To create a basic smoke test you can write a shell script that will download a home page of your site and check that some text is present there, so you’ll know that your site isn’t completely broken.

```bash
#!/usr/bin/env bash

set -e

# Deployment...

# Smoke test
curl --silent https://react-styleguidist.js.org | grep --silent "Development environment" || (echo "Smoke test failed" && exit 1)
```

## Conclusion

The subject is so broad that we could write a separate book only about sites for open source projects. The purpose of this chapter is to give you some ideas for your own research.

Site of an open source project is an open source project in itself: don’t forget to add an Edit link on each page, so people could contribute improvements.
