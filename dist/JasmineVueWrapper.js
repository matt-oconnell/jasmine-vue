'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JasmineVueWrapper = function () {
  function JasmineVueWrapper(Component) {
    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, JasmineVueWrapper);

    this.component = Component;
    this.defaultProps = defaultProps;
    this.container = document.body;
    this.instanceCache = [];
  }

  _createClass(JasmineVueWrapper, [{
    key: 'mount',
    value: function mount() {
      var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultProps;

      var wrap = document.createElement('div');
      this.container.appendChild(wrap);

      var vm = new _vue2.default(_extends({}, this.component, {
        propsData: propsData
      })).$mount(wrap);

      this.instanceCache.push(vm);

      return vm;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this = this;

      this.instanceCache.forEach(function (vm) {
        vm.$destroy();
        _this.container.removeChild(vm.$el);
      });
      this.instanceCache = [];
    }
  }]);

  return JasmineVueWrapper;
}();

exports.default = JasmineVueWrapper;
module.exports = exports['default'];