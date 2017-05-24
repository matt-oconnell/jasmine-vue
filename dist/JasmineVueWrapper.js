'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_vue2.default.use(_vuex2.default);

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
      return this._mount.apply(this, arguments);
    }
  }, {
    key: 'mountSolo',
    value: function mountSolo() {
      this.destroy();
      return this._mount.apply(this, arguments);
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
  }, {
    key: '_mount',
    value: function _mount() {
      var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultProps;
      var store = arguments[1];

      var wrap = document.createElement('div');
      this.container.appendChild(wrap);

      var componentData = _extends({}, this.component, {
        propsData: propsData
      });

      if (store) {
        componentData.store = new _vuex2.default.Store(store);
      }

      var vm = new _vue2.default(componentData).$mount(wrap);

      this.instanceCache.push(vm);

      return vm;
    }
  }]);

  return JasmineVueWrapper;
}();

exports.default = JasmineVueWrapper;
module.exports = exports['default'];