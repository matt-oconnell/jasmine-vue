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

  mount(options) {
    return this._mount(options);
  }

  mountSolo(options) {
    this.destroy();
    return this._mount(options);
  }

  destroy() {
    this.instanceCache.forEach((vm) => {
      vm.$destroy();
      vm.$el.remove();
    });
    this.instanceCache = [];
  }

  _mount({ propsData, store, componentOverrides, el } = { }) {
    let mountPoint;

    if (el) {
      mountPoint = typeof el === 'string' ? document.querySelector(el) : el;
    }
    else {
      mountPoint = document.createElement('div');
      this.container.appendChild(mountPoint);
    }

    const componentData = {
      ...this.component,
      ...componentOverrides,
      propsData: propsData ? propsData : this.defaultProps,
    };

    if (store) {
      componentData.store = new Vuex.Store(store);
    }

    const vm = new Vue(componentData).$mount(mountPoint);

    this.instanceCache.push(vm);

    return vm;
  }
}
