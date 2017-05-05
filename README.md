# jasmine-vue [![npm](https://img.shields.io/npm/v/jasmine-vue.svg)](https://www.npmjs.com/package/jasmine-vue) [![Build Status](https://travis-ci.org/behance/jasmine-vue.svg?branch=master)](https://travis-ci.org/behance/jasmine-vue)

Jasmine test helper for Vue components

> Requires [`jasmine`](https://github.com/jasmine/jasmine).

## Install

```
$ npm install --save-dev jasmine-vue
```

## Usage

In `karma`:

```javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      // ...,
      'node_modules/jasmine-fixture/dist/jasmine-vue.js',
      // ...
    ],
  });
};
```

Jasmine Vue abstracts away some of the boilerplate required when testing Vue components. Currently it helps with the setup, mounting, and destruction of a component.

## Initialization

```javascript
beforeEach(function() {
  const defaultProps = {
    myProp: true,
  };
  // Initialize
  this.vueInit(MyComponent, defaultProps);
});
```

## Mount

Once the test has been initialized, use `this.vueMount` to mount your component. The event listeners on the component are automatically removed after each test and the component DOM element is destroyed.

```javascript
it('mounts my component', function() {
  const { component } = this.vueMount();
  expect(component.$el).toBeInDOM(); // using jasmine-jquery
});

it('renders my component using default props', function() {
  const { component } = this.vueMount();
  expect(component.myProp).toEqual(true);
});

it('renders my component using custom props', function() {
  const { component } = this.vueMount({ myProp: false });
  expect(component.myProp).toEqual(false);
});
```

When mounting components within nested describe statements, `jasmine-vue` will only render and return the most recent component.

```javascript
beforeEach(function() {
  this.vueMount(); // 1
});

describe('...', function() {
  beforeEach(function() {
    this.vueMount(); // 2
  });

  it('...', function() {
    this.vueMount(); // 3
    // The level 3 component will be the only one rendered at the time of this test
  });
});

it('...', function() {
  // The level 1 component will be the only one rendered at the time of this test
});
```

## License

[Apache-2.0](/LICENSE)
