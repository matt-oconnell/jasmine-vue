# jasmine-vue [![npm](https://img.shields.io/npm/v/jasmine-vue.svg)](https://www.npmjs.com/package/jasmine-vue)

Jasmine test helper for Vue components

> Requires [`jasmine`](https://github.com/jasmine/jasmine).

## Install

```
$ npm install --save-dev jasmine-vue
```

Jasmine Vue abstracts away some of the boilerplate required when testing Vue components. Currently it helps with the setup, mounting, and destruction of a component.

## Setup

Include `jasmine-vue` in the root file of your tests using `require`.

```javascript
require('jasmine-vue');
```

## Initialization

A `vueInit` function will be available in the test context. It returns a creator object with `mount` and `destroy` methods. `vueInit` takes in an optional set of default props. It will generally only need to be called once per component test file.

```javascript
beforeEach(function() {
  const defaultProps = {
    myProp: true,
  };
  // Initialize
  this.componentCreator = this.vueInit(MyComponent, defaultProps);
});
```

## Mount

Use `this.componentCreator.mount` to mount the component. The mount method accepts an optional object with custom prop data. This custom data will overwrite the `defaultProps` passed in in the `vueInit` method if provided. It returns the instance of the Vue component itself. 

If components have been mounted, `jasmine-vue` will automatically remove the component DOM element and call Vue's `$destroy` method, cleaning up any event listeners during the `afterEach` phase.


```javascript
it('mounts my component', function() {
  const vm = this.componentCreator.mount();
  expect(vm.$el).toBeInDOM(); // using jasmine-jquery
});

it('renders my component using default props', function() {
  const vm = this.componentCreator.mount();
  expect(vm.myProp).toEqual(true);
});

it('renders my component using custom props', function() {
  const vm = this.wrapper.mount({ myProp: false });
  expect(vm).toEqual(false);
});
```

## License

[Apache-2.0](/LICENSE)
