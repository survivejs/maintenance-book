# Standalone Builds

The scenarios covered in the previous chapter are enough if you consume packages through npm. There may be users that prefer pre-built _standalone builds_ instead. This comes with a several advantages:

* The build can be served through a Content Delivery Network (CDN). Especially popular libraries are available this way.
* Users that want to optimize their development experience can point to the built version. This avoids additional processing during development as their tooling doesn't have to process the original source.
* The build can be integrated easily to online code playgrounds easily.

The problem is that now you have additional configuration to maintain and you may skip step this entirely. This is where **bundlers** such as [Browserify](http://browserify.org/), [Rollup](https://rollupjs.org/), [Fusebox](http://fuse-box.org/), or [webpack](https://webpack.js.org/), come in, as they were designed for the purpose.

## How Bundlers Work

![Bundling process](images/bundler.png)

A **bundler** is a transformation tool that takes the given source, performs given operations on it, and emits **bundles** as output. Bundles contain the manipulated source in such form that the code can be executed in the wanted environment. The process begins from **entry points** which are modules themselves.

Depending on the bundler, you have varying degrees of control over the process. Application-oriented bundlers like webpack allow you to define **split points** which generate dynamically loaded bundles. The feature can be used to defer loading of certain functionality and it enables powerful application development patterns such as [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/).

T> [Webpack and Rollup: the same but different](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c) explains how webpack and Rollup differ. To summarize, webpack works better for applications while Rollup is a better choice for libraries.

T> You can also use webpack and Rollup together through [rollup-loader](https://www.npmjs.com/package/rollup-loader) and leave JavaScript handling to Rollup as this enables tree shaking through Rollup and allows you to use Rollup specific plugins.

T> Both webpack and Rollup support _scope hoisting_. It's a performance oriented feature that pulls modules into a single scope instead of writing separate scope for each module. This reduces the overhead related to function calls.

## Universal Module Definition (UMD)

To make the generated bundle work in different environments, bundlers support [Universal Module Definition](https://github.com/umdjs/umd) (UMD). The UMD wrapper allows the code to be consumed from different environments including the browser (global), [Asynchronous Module Definition](http://requirejs.org/docs/whyamd.html) (AMD), and CommonJS. AMD is an older format that's still being used in legacy projects.

UMD isn't as relevant anymore as it used to be in the past but it's good to be aware of the format as you come around it.

{pagebreak}

## Generating a Build Using Rollup

To illustrate bundling and UMD, set up an entry point for the demo as below:

**index.js**

```javascript
function demo() {
  console.log('demo');
}

export default demo;
```

Define a small **package.json** to contain the build script:

**package.json**

```json
{
  "name": "umd-demo",
  "main": "index.js",
  "scripts": {
    "build": "rollup ./index.js --format umd --name Demo
      --output dist/demo.umd.js"
  }
}
```

Install Rollup to the project:

```bash
npm install rollup --save-dev
```

To prove that the setup works, execute `npm run build` and examine the generated **./dist** directory. It should contain a new file with transformed code and the UMD wrapper. You can import the file from Node REPL like this:

```bash
node
> require('./dist/demo.umd')()
demo
undefined
```

The same build should also work from the browser or as a part of an AMD build.

T> You can achieve a similar result with other tools as well. The specifics will differ depending on the tool, but the basic idea is always the same.

## Conclusion

Generating standalone builds is more common for application purposes than for packaging. Especially popular packages tend to have standalone builds and it's common to find them both in non-minified (`.js`) and minified (`.min.js`) formats.
