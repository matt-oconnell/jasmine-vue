'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentCache = undefined;
exports.vueInit = vueInit;
exports.vuePreventDestroy = vuePreventDestroy;
exports.setInitializer = setInitializer;
exports.destroyComponents = destroyComponents;

var _JasmineVueWrapper = require('./JasmineVueWrapper');

var _JasmineVueWrapper2 = _interopRequireDefault(_JasmineVueWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentCache = exports.componentCache = [];
var preventDestroy = false;

function vueInit(Component) {
  var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var wrapper = new _JasmineVueWrapper2.default(Component, defaultProps);
  componentCache.push(wrapper);
  return wrapper;
}

function vuePreventDestroy() {
  preventDestroy = true;
}

function setInitializer() {
  this.vueInit = vueInit;
  this.vuePreventDestroy = vuePreventDestroy;
};

function destroyComponents() {
  if (preventDestroy) {
    console.warn('Preventing destruction of components. This is for debugging purposes only.');
    return;
  }
  componentCache.forEach(function (component) {
    return component.destroy();
  });
  exports.componentCache = componentCache = [];
};