'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var JasmineVueWrapper = (function () {
  function JasmineVueWrapper(Component) {
    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, JasmineVueWrapper);

    this.component = Component;
    this.defaultProps = defaultProps;
    this.container = document.body;
  }

  _createClass(JasmineVueWrapper, [{
    key: 'mount',
    value: function mount() {
      var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultProps;

      this.wrap = document.createElement('div');
      this.container.appendChild(this.wrap);

      this.vm = new _vue2.default(_extends({}, this.component, {
        propsData: propsData
      })).$mount(this.wrap);

      return this.vm;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (!this.wrap) {
        return;
      }
      this.vm.$destroy();
      this.container.removeChild(this.vm.$el);
      delete this.wrap;
    }
  }]);

  return JasmineVueWrapper;
}());

exports.default = JasmineVueWrapper;
module.exports = exports.default;
'use strict';

var _setup = require('./setup');

beforeEach(_setup.setInitializer); /* eslint-env jasmine */

afterEach(_setup.destroyComponents);
'use strict';

Object.defineProperty(exports, '__esModule', {
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
  componentCache.forEach(function(component) {
    return component.destroy();
  });
  exports.componentCache = componentCache = [];
};
