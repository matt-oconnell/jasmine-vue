import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default class JasmineVueWrapper {
  constructor(Component, defaultProps = {}) {
    this.component = Component;
    this.defaultProps = defaultProps;
    this.container = document.body;
    this.instanceCache = [];
  }

  mount(...args) {
    return this._mount(...args);
  }

  mountSolo(...args) {
    this.destroy();
    return this._mount(...args);
  }

  destroy() {
    this.instanceCache.forEach((vm) => {
      vm.$destroy();
      this.container.removeChild(vm.$el);
    });
    this.instanceCache = [];
  }

  _mount(propsData = this.defaultProps, store, componentOverrides) {
    const wrap = document.createElement('div');
    this.container.appendChild(wrap);

    const componentData = {
      ...this.component,
      ...componentOverrides,
      propsData,
    };

    if (store) {
      componentData.store = new Vuex.Store(store);
    }

    const vm = new Vue(componentData).$mount(wrap);

    this.instanceCache.push(vm);

    return vm;
  }
}
