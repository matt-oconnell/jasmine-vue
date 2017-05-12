import Vue from 'vue';

export default class JasmineVueWrapper {
  constructor(Component, defaultProps = {}) {
    this.component = Component;
    this.defaultProps = defaultProps;
    this.container = document.body;
    this.instanceCache = [];
  }

  mount(propsData = this.defaultProps) {
    const wrap = document.createElement('div');
    this.container.appendChild(wrap);

    const vm = new Vue({
      ...this.component,
      propsData,
    }).$mount(wrap);

    this.instanceCache.push(vm);

    return vm;
  }

  destroy() {
    this.instanceCache.forEach((vm) => {
      vm.$destroy();
      this.container.removeChild(vm.$el);
    });
    this.instanceCache = [];
  }
}
