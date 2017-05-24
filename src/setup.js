import JasmineVueWrapper from './JasmineVueWrapper';

export let componentCache = [];
let preventDestroy = false;

export function vueInit(Component, defaultProps = {}) {
  const wrapper = new JasmineVueWrapper(Component, defaultProps);
  componentCache.push(wrapper);
  return wrapper;
}

export function vuePreventDestroy() {
  preventDestroy = true;
}

export function setInitializer() {
  this.vueInit = vueInit;
  this.vuePreventDestroy = vuePreventDestroy;
};

export function destroyComponents() {
  if (preventDestroy) {
    console.warn('Preventing destruction of components. This is for debugging purposes only.');
    return;
  }
  componentCache.forEach(component => component.destroy());
  componentCache = [];
};
