# Standalone Builds

The scenarios covered in the previous chapter are enough if you consume packages through npm. There may be users that prefer pre-built _standalone builds_ or _bundles_ instead. This comes with a several advantages:

* Everything is packaged into a single file.
* You can include the bundle using a `<script>` tag.
* The build can be served through a Content Delivery Network (CDN), like [unpkg](https://unpkg.com/#/).
* The build can be integrated easily to online code playgrounds, like [JS Bin](http://jsbin.com/).

For example, you can add React to your page using its browser bundle:

```html
<!-- Note: when deploying, replace "development.js" with "production.min.js". -->
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

You don’t need to setup any build process, and it’s a great option for quick prototyping.

To make a bundle for your own library, you need to use a **bundler**, such as [webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), or [Parcel](https://parceljs.org/).

## How Bundlers Work

![Bundling process](images/bundler.png)

A **bundler** takes an **entry point** — your main source file — and produces a single file that contains all dependencies and converted to format, that browsers can understand.

Application-oriented bundlers, like webpack, allow you to define **split points** which generate dynamically loaded bundles. The feature can be used to defer loading of certain functionality and it enables powerful application development patterns such as [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/).

T> [Webpack and Rollup: the same but different](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c) explains how webpack and Rollup differ. To summarize, webpack works better for applications while Rollup is a better choice for libraries.

T> You can also use webpack and Rollup together through [rollup-loader](https://www.npmjs.com/package/rollup-loader) and leave JavaScript handling to Rollup as this enables tree shaking through Rollup and allows you to use Rollup specific plugins.

T> Both webpack and Rollup support _scope hoisting_. It’s a performance oriented feature that pulls modules into a single scope instead of writing separate scope for each module. This reduces the overhead related to function calls.

## Universal Module Definition (UMD)

To make the generated bundle work in different environments, bundlers support [Universal Module Definition](https://github.com/umdjs/umd) (UMD). The UMD wrapper allows the code to be consumed in browsers and Node (CommonJS).

UMD isn’t as relevant anymore as it used to be in the past but it’s good to be aware of the format as you come around it.

{pagebreak}

## Generating a Bundle Using Microbundle

[Microbundle](https://github.com/developit/microbundle) is a zero-configuration tool, based on Rollup, to create bundles for browsers (UMD), Node (Common.js), and bundlers with ECMAScript modules support, like webpack.

To illustrate bundling, set up an entry point as below:

**index.js**

```javascript
export default function demo() {
  console.log('demo');
}
```

Create a **package.json** with a build script and entry points:

**package.json**

```json
{
  "name": "bundling-demo",
  "main": "dist/index.js",
  "umd:main": "dist/index.umd.js",
  "module": "dist/index.m.js",
  "scripts": {
    "build": "microbundle"
  }
}
```

Install Microbundle:

```bash
npm install microbundle
```

Then run `npm run build`, and examine the generated **dist** directory.

The `dist/index.js` is a Common.js build, that you can use in Node:

```bash
node
> require('./dist/index.js')()
demo
undefined
```

The `dist/index.m.js` is build for bundlers, like webpack, that you can import in another ECMAScript module:

```js
import demo from './dist/index.umd.js';
demo();
```

And the `dist/index.umd.js` is a browser build, that you can use in HTML:

```html
<script src="./dist/index.umd.js"></script>
```

If you publish your library to npm, your users could import it by its name in Node or webpack, thanks to `main` and `module` fields in our `package.json`:

```js
import demo from 'bundling-demo';
demo();
```

## Conclusion

Generating standalone builds is another responsibility for the package author, but they make your users’ experience better by giving them bundles that are the most suitable for the tools they are using, whether it’s Node, webpack, or plain HTML.

You’ll learn how to manage dependencies in the next chapter.
