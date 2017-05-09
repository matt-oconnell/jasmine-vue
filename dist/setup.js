'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentCache = undefined;
exports.vueInit = vueInit;
exports.setInitializer = setInitializer;
exports.destroyComponents = destroyComponents;

var _JasmineVueWrapper = require('./JasmineVueWrapper');

var _JasmineVueWrapper2 = _interopRequireDefault(_JasmineVueWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentCache = exports.componentCache = [];

function vueInit(Component) {
  var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var wrapper = new _JasmineVueWrapper2.default(Component, defaultProps);
  componentCache.push(wrapper);
  return wrapper;
}

function setInitializer() {
  this.vueInit = vueInit;
};

function destroyComponents() {
  componentCache.forEach(function (component) {
    return component.destroy();
  });
  exports.componentCache = componentCache = [];
};