import Vue from 'vue';

let cachedComponent = null;

function vueInit(Component, defaultProps = {}) {
  this._jasmineVueComponent = Component;
  this._jasmineVueDefaultProps = defaultProps;
  this._jasmineVueActive = true;
};

function appendWrap() {
  const wrap = document.createElement('div');
  document.body.appendChild(wrap);
  return wrap;
}

function vueMount(propsData = this._jasmineVueDefaultProps) {
  if (!this._jasmineVueActive) {
    return;
  }

  removeComponent();

  const wrap = appendWrap();

  const component = new Vue({
    propsData,
    ...this._jasmineVueComponent,
  }).$mount(wrap);

  cachedComponent = component;

  return {
    component,
    wrap,
  };
};

export function setBeforeEachFunctions() {
  this.vueInit = vueInit;
  this.vueMount = vueMount;
};

export function removeComponent() {
  if (cachedComponent) {
    cachedComponent.$destroy();
    document.body.removeChild(cachedComponent.$el);
    cachedComponent = null;
  }
};
