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

## Mounting / Rendering Components

Use  the creator returned from `vueInit` to mount the component.

#### creator.mount( [customPropsData], [store], [componentOverrides] )

- Arguments:
    - {Object} customPropsData (optional)
        - will overwrite `defaultProps` passed into `vueInit`, otherwise defaults to them
    - {Object} store (optional)
        - creates a `new Vuex.Store` on the passed-in object and sets it on the instance
    - {Object} componentOverrides (optional)
        - will override any instance properties
        - can be used to spy on or stub lifecycle methods
- Usage:

Without any arguments:

```javascript
it('renders my component with default props', function() {
  const vm = this.componentCreator.mount();
  expect($(vm.$el)).toBeInDOM(); // using jasmine-jquery
  expect(vm.myProp).toEqual(true);
});
```

With custom props data:

```javascript
it('renders my component using custom props', function() {
  const vm = this.componentCreator.mount({ myProp: false });
  expect(vm.myProp).toEqual(false);
});
```

With a store:

```javascript
it('renders my component using custom props and a Vuex store', function() {
  const vm = this.componentCreator.mount({}, {
    state: {
      text: 'abc123',
    },
  });
  expect(vm.$store.state.text).toEqual('abc123');
});
```

With a component override:

```javascript
it('renders my component using custom props and a Vuex store', function() {
  const spy = jasmine.createSpy('spy');
  const vm = this.componentCreator.mount({}, {}, {
    beforeMount: spy
  });
  expect(spy).toHaveBeenCalled();
});
```

#### creator.mountSolo( [customPropsData], [store], [componentOverrides] )

```javascript
beforeEach(function() {
    this.vm = this.componentCreator.mount();
});

it('clears all previously mounted components and mounts a solo component', function() {
  const soloVm = this.componentCreator.mountSolo();
  expect($(this.vm.$el)).not.toBeInDOM();
  expect($(soloVm.$el)).not.toBeInDOM();
});
```

## Clean up

In each `afterEach` phase, if components have been mounted, `jasmine-vue` will automatically remove the component DOM element and call Vue's `$destroy` method.

#### vuePreventDestroy

Available as `this.vuePreventDestroy`, this method will disable the `afterEach` cleanup of components. This (combined with `fit` or `fdescribe`) allows for some nice sandboxing of components. Focus the test, call `this.vuePreventDestroy`, and open the browser and access the component in its current state. Unlike using the debugger, this allows for interacting with the component in it's current state.

## License

[Apache-2.0](/LICENSE)
