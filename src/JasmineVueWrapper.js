import Vue from 'vue';

export default class JasmineVueWrapper {
  constructor(Component, defaultProps = {}) {
    this.component = Component;
    this.defaultProps = defaultProps;
    this.container = document.body;
  }

  mount(propsData = this.defaultProps) {
    this.wrap = document.createElement('div');
    this.container.appendChild(this.wrap);

    this.vm = new Vue({
      ...this.component,
      propsData,
    }).$mount(this.wrap);

    return this.vm;
  }

  destroy() {
    if (!this.wrap) {
      return;
    }
    this.vm.$destroy();
    this.container.removeChild(this.vm.$el);
    delete this.wrap;
  }
}
