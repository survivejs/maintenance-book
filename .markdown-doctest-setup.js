module.exports = {
  globals: {
    exports: {},
    module: {
      exports: {},
    },
    alert: () => {},
    foo: () => {},
    wowJs: () => {},
    drinkCoffee: () => {},
    eatCroissant: () => {},
    muchParameters: () => {},
    shouldReformat: () => {},
    suchFunction: () => {},
    mealType: 'breakfast',
    BREAKFAST: 'breakfast',
  },
  require: {
    assert: require('assert'),
    child_process: require('child_process'),
    fs: require('fs'),
    danger: {
      danger: {
        git: {
          modified_files: ['index.js', 'package.json'],
        },
      },
      fail: () => {},
      warn: () => {},
    },
    './add': (a, b) => a + b,
    'bundling-demo': () => {},
    './dist/index.m.js': () => {},
    './dist/index.umd.js': () => {},
  },
};
