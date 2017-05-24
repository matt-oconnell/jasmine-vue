import JasmineVueWrapper from './JasmineVueWrapper';

export let componentCache = [];
export let preventDestroy = false;

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
    return;
  }
  componentCache.forEach(component => component.destroy());
  componentCache = [];
};
