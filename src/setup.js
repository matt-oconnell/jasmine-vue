import JasmineVueWrapper from './JasmineVueWrapper';

export let componentCache = [];

export function vueInit(Component, defaultProps = {}) {
  const wrapper = new JasmineVueWrapper(Component, defaultProps);
  componentCache.push(wrapper);
  return wrapper;
}

export function setInitializer() {
  this.vueInit = vueInit;
};

export function destroyComponents() {
  componentCache.forEach(component => component.destroy());
  componentCache = [];
};
