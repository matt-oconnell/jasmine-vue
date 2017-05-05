/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setBeforeEachFunctions = setBeforeEachFunctions;
exports.removeComponent = removeComponent;

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cachedComponent = null;

function vueInit(Component) {
  var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  this._jasmineVueComponent = Component;
  this._jasmineVueDefaultProps = defaultProps;
  this._jasmineVueActive = true;
};

function appendWrap() {
  var wrap = document.createElement('div');
  document.body.appendChild(wrap);
  return wrap;
}

function vueMount() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._jasmineVueDefaultProps;

  if (!this._jasmineVueActive) {
    return;
  }

  removeComponent();

  var wrap = appendWrap();

  var component = new _vue2.default(_extends({
    propsData: propsData
  }, this._jasmineVueComponent)).$mount(wrap);

  cachedComponent = component;

  return {
    component: component,
    wrap: wrap
  };
};

function setBeforeEachFunctions() {
  this.vueInit = vueInit;
  this.vueMount = vueMount;
};

function removeComponent() {
  if (cachedComponent) {
    cachedComponent.$destroy();
    document.body.removeChild(cachedComponent.$el);
    cachedComponent = null;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.3.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
});

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 */
function noop() {}

/**
 * Always return false.
 */
var no = function no() {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
      // possible circular reference
      return a === b;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = null; // work around flow check

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var name = typeof vm === 'string' ? vm : typeof vm === 'function' && vm.options ? vm.options.name : vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  var generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

function handleError(err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err;
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function logError(err) {
      console.error(err);
    };
    timerFunc = function timerFunc() {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) {
        setTimeout(noop);
      }
    };
  } else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function timerFunc() {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function timerFunc() {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      });
    }
  };
}();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1(obj, key, val, customSetter) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(childVal.call(this), parentVal.call(this));
    };
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal ? extend(res, childVal) : res;
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent ? parent.concat(child) : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret;
};

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn('Invalid prop: type check failed for prop "' + name + '".' + ' Expected ' + expectedTypes.map(capitalize).join(', ') + ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.', vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type);
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true;
    }
  }
  /* istanbul ignore next */
  return false;
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + "referenced during render. Make sure to declare reactive data " + "properties in the data option.", target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };
    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode() {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned;
}

function cloneVNodes(vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res;
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || '') + "_" + i));
    } else if (isPrimitive(c)) {
      if (isDef(last) && isDef(last.text)) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isDef(c.text) && isDef(last) && isDef(last.text)) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  return isObject(comp) ? base.extend(comp) : comp;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender() {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            reject(process.env.NODE_ENV !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) && child.data && child.data.slot != null) {
      var name = child.data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment || node.text === ' ';
}

function resolveScopedSlots(fns) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res;
}

/*  */

var activeInstance = null;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse(val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || !Object.isExtensible(val)) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch) {
    initWatch(vm, opts.watch);
  }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn("\"" + key + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }observerState.shouldConvert = true;
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + keys[i] + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  try {
    return data.call(vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production') {
      if (getter === undefined) {
        warn("No getter function has been defined for computed property \"" + key + "\".", vm);
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn("method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("method \"" + key + "\" has already been defined as a prop.", vm);
      }
    }
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray ? inject : hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
    }
    return result;
  }
}

/*  */

function createFunctionalComponent(Ctor, propsData, data, context, children) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function h(a, b, c, d) {
    return createElement(_context, a, b, c, d, true);
  };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function slots() {
      return resolveSlots(children, context);
    }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return;
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children });
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options);
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  };
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) {
      applyNS(vnode, ns);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      slotNodes._rendered = true;
    }
    return slotNodes || fallback;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes(eventKeyCode, key, builtInAlias) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1;
  } else {
    return keyCodes !== eventKeyCode;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };
}

function renderMixin(Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e) : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue$3(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
      }
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry(vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created() {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include(val) {
      pruneCache(this.cache, this._vnode, function (name) {
        return matches(val, name);
      });
    },
    exclude: function exclude(val) {
      pruneCache(this.cache, this._vnode, function (name) {
        return !matches(val, name);
      });
    }
  },

  render: function render() {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (this.include && !matches(this.include, name) || this.exclude && matches(this.exclude, name))) {
        return vnode;
      }
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode;
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get() {
    return this.$vnode.ssrContext;
  }
});

Vue$3.version = '2.3.2';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function genClassFromData(data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (isUndef(value)) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1);
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) {
        res += key + ' ';
      }
    }
    return res.slice(0, -1);
  }
  /* istanbul ignore next */
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b);
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (!inPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) && config.isUnknownElement(tag)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false;
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break;
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false;
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function wrapFilter(exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return "_f(\"" + filter + "\")(" + exp + ")";
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return "_f(\"" + name + "\")(" + exp + "," + args;
  }
}

/*  */

/*  */

/**
 * Cross-platform code generation for component v-model
 */

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var str;
var index$1;

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1(event, _handler, once$$1, capture, passive) {
  if (once$$1) {
    var oldHandler = _handler;
    var _target = target$1; // save current target element in closure
    _handler = function handler(ev) {
      var res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, _handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, _handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, vnode, checkVal) {
  return !elm.composing && (vnode.tag === 'option' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
}

function isDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal;
}

function isInputChanged(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal);
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim();
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && prop in testEl.style) {
    return prop;
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def$$1 === 'undefined' ? 'undefined' : _typeof(def$$1)) === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted(el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function cb() {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple ? binding.value.some(function (v) {
        return hasNoMatchingOption(v, el.options);
      }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false;
    }
  }
  return true;
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag;
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove != null) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
  if (process.env.NODE_ENV !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
  }
}, 0);

/*  */

exports.default = Vue$3;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _setup = __webpack_require__(0);

beforeEach(_setup.setBeforeEachFunctions); /* eslint-env jasmine */

afterEach(_setup.removeComponent);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjA4Y2FmNzkwMTBhNTZmMTMyNmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NldHVwLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vdnVlL2Rpc3QvdnVlLnJ1bnRpbWUuZXNtLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbInNldEJlZm9yZUVhY2hGdW5jdGlvbnMiLCJyZW1vdmVDb21wb25lbnQiLCJjYWNoZWRDb21wb25lbnQiLCJ2dWVJbml0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiX2phc21pbmVWdWVDb21wb25lbnQiLCJfamFzbWluZVZ1ZURlZmF1bHRQcm9wcyIsIl9qYXNtaW5lVnVlQWN0aXZlIiwiYXBwZW5kV3JhcCIsIndyYXAiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJ2dWVNb3VudCIsInByb3BzRGF0YSIsImNvbXBvbmVudCIsIiRtb3VudCIsIiRkZXN0cm95IiwicmVtb3ZlQ2hpbGQiLCIkZWwiLCJwcm9jZXNzIiwibW9kdWxlIiwiZXhwb3J0cyIsImNhY2hlZFNldFRpbWVvdXQiLCJjYWNoZWRDbGVhclRpbWVvdXQiLCJkZWZhdWx0U2V0VGltb3V0IiwiRXJyb3IiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImUiLCJjbGVhclRpbWVvdXQiLCJydW5UaW1lb3V0IiwiZnVuIiwiY2FsbCIsInJ1bkNsZWFyVGltZW91dCIsIm1hcmtlciIsInF1ZXVlIiwiZHJhaW5pbmciLCJjdXJyZW50UXVldWUiLCJxdWV1ZUluZGV4IiwiY2xlYW5VcE5leHRUaWNrIiwibGVuZ3RoIiwiY29uY2F0IiwiZHJhaW5RdWV1ZSIsInRpbWVvdXQiLCJsZW4iLCJydW4iLCJuZXh0VGljayIsImFyZ3MiLCJBcnJheSIsImFyZ3VtZW50cyIsImkiLCJwdXNoIiwiSXRlbSIsImFycmF5IiwicHJvdG90eXBlIiwiYXBwbHkiLCJ0aXRsZSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2IiwidmVyc2lvbiIsInZlcnNpb25zIiwibm9vcCIsIm9uIiwiYWRkTGlzdGVuZXIiLCJvbmNlIiwib2ZmIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJlbWl0IiwicHJlcGVuZExpc3RlbmVyIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImxpc3RlbmVycyIsIm5hbWUiLCJiaW5kaW5nIiwiY3dkIiwiY2hkaXIiLCJkaXIiLCJ1bWFzayIsImlzVW5kZWYiLCJ2IiwidW5kZWZpbmVkIiwiaXNEZWYiLCJpc1RydWUiLCJpc1ByaW1pdGl2ZSIsInZhbHVlIiwiaXNPYmplY3QiLCJvYmoiLCJfdG9TdHJpbmciLCJPYmplY3QiLCJ0b1N0cmluZyIsImlzUGxhaW5PYmplY3QiLCJpc1JlZ0V4cCIsInZhbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJTdHJpbmciLCJ0b051bWJlciIsIm4iLCJwYXJzZUZsb2F0IiwiaXNOYU4iLCJtYWtlTWFwIiwic3RyIiwiZXhwZWN0c0xvd2VyQ2FzZSIsIm1hcCIsImNyZWF0ZSIsImxpc3QiLCJzcGxpdCIsInRvTG93ZXJDYXNlIiwiaXNCdWlsdEluVGFnIiwicmVtb3ZlIiwiYXJyIiwiaXRlbSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImhhc093blByb3BlcnR5IiwiaGFzT3duIiwia2V5IiwiY2FjaGVkIiwiZm4iLCJjYWNoZSIsImNhY2hlZEZuIiwiaGl0IiwiY2FtZWxpemVSRSIsImNhbWVsaXplIiwicmVwbGFjZSIsIl8iLCJjIiwidG9VcHBlckNhc2UiLCJjYXBpdGFsaXplIiwiY2hhckF0Iiwic2xpY2UiLCJoeXBoZW5hdGVSRSIsImh5cGhlbmF0ZSIsImJpbmQiLCJjdHgiLCJib3VuZEZuIiwiYSIsImwiLCJfbGVuZ3RoIiwidG9BcnJheSIsInN0YXJ0IiwicmV0IiwiZXh0ZW5kIiwidG8iLCJfZnJvbSIsInRvT2JqZWN0IiwicmVzIiwibm8iLCJpZGVudGl0eSIsImxvb3NlRXF1YWwiLCJiIiwiaXNPYmplY3RBIiwiaXNPYmplY3RCIiwibG9vc2VJbmRleE9mIiwiY2FsbGVkIiwiU1NSX0FUVFIiLCJBU1NFVF9UWVBFUyIsIkxJRkVDWUNMRV9IT09LUyIsImNvbmZpZyIsIm9wdGlvbk1lcmdlU3RyYXRlZ2llcyIsInNpbGVudCIsInByb2R1Y3Rpb25UaXAiLCJOT0RFX0VOViIsImRldnRvb2xzIiwicGVyZm9ybWFuY2UiLCJlcnJvckhhbmRsZXIiLCJpZ25vcmVkRWxlbWVudHMiLCJrZXlDb2RlcyIsImlzUmVzZXJ2ZWRUYWciLCJpc1Jlc2VydmVkQXR0ciIsImlzVW5rbm93bkVsZW1lbnQiLCJnZXRUYWdOYW1lc3BhY2UiLCJwYXJzZVBsYXRmb3JtVGFnTmFtZSIsIm11c3RVc2VQcm9wIiwiX2xpZmVjeWNsZUhvb2tzIiwiZW1wdHlPYmplY3QiLCJmcmVlemUiLCJpc1Jlc2VydmVkIiwiY2hhckNvZGVBdCIsImRlZiIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwiYmFpbFJFIiwicGFyc2VQYXRoIiwicGF0aCIsInRlc3QiLCJzZWdtZW50cyIsIndhcm4iLCJ0aXAiLCJmb3JtYXRDb21wb25lbnROYW1lIiwiaGFzQ29uc29sZSIsImNvbnNvbGUiLCJjbGFzc2lmeVJFIiwiY2xhc3NpZnkiLCJtc2ciLCJ2bSIsImVycm9yIiwiZ2VuZXJhdGVDb21wb25lbnRUcmFjZSIsImluY2x1ZGVGaWxlIiwiJHJvb3QiLCJvcHRpb25zIiwiX2lzVnVlIiwiJG9wdGlvbnMiLCJfY29tcG9uZW50VGFnIiwiZmlsZSIsIl9fZmlsZSIsIm1hdGNoIiwicmVwZWF0IiwiJHBhcmVudCIsInRyZWUiLCJjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UiLCJsYXN0IiwiY29uc3RydWN0b3IiLCJpc0FycmF5Iiwiam9pbiIsImhhbmRsZUVycm9yIiwiZXJyIiwiaW5mbyIsImluQnJvd3NlciIsImhhc1Byb3RvIiwid2luZG93IiwiVUEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpc0lFIiwiaXNJRTkiLCJpc0VkZ2UiLCJpc0FuZHJvaWQiLCJpc0lPUyIsImlzQ2hyb21lIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsImdldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaXNTZXJ2ZXIiLCJpc1NlcnZlclJlbmRlcmluZyIsImdsb2JhbCIsIlZVRV9FTlYiLCJfX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fIiwiaXNOYXRpdmUiLCJDdG9yIiwiaGFzU3ltYm9sIiwiU3ltYm9sIiwiUmVmbGVjdCIsIm93bktleXMiLCJjYWxsYmFja3MiLCJwZW5kaW5nIiwidGltZXJGdW5jIiwibmV4dFRpY2tIYW5kbGVyIiwiY29waWVzIiwiUHJvbWlzZSIsInAiLCJyZXNvbHZlIiwibG9nRXJyb3IiLCJ0aGVuIiwiY2F0Y2giLCJNdXRhdGlvbk9ic2VydmVyIiwiY291bnRlciIsIm9ic2VydmVyIiwidGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm9ic2VydmUiLCJjaGFyYWN0ZXJEYXRhIiwiZGF0YSIsInF1ZXVlTmV4dFRpY2siLCJjYiIsIl9yZXNvbHZlIiwicmVqZWN0IiwiX1NldCIsIlNldCIsInNldCIsImhhcyIsImFkZCIsImNsZWFyIiwidWlkJDEiLCJEZXAiLCJpZCIsInN1YnMiLCJhZGRTdWIiLCJzdWIiLCJyZW1vdmVTdWIiLCJkZXBlbmQiLCJ0YXJnZXQiLCJhZGREZXAiLCJub3RpZnkiLCJ1cGRhdGUiLCJ0YXJnZXRTdGFjayIsInB1c2hUYXJnZXQiLCJfdGFyZ2V0IiwicG9wVGFyZ2V0IiwicG9wIiwiYXJyYXlQcm90byIsImFycmF5TWV0aG9kcyIsImZvckVhY2giLCJtZXRob2QiLCJvcmlnaW5hbCIsIm11dGF0b3IiLCJhcmd1bWVudHMkMSIsInJlc3VsdCIsIm9iIiwiX19vYl9fIiwiaW5zZXJ0ZWQiLCJvYnNlcnZlQXJyYXkiLCJkZXAiLCJhcnJheUtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwib2JzZXJ2ZXJTdGF0ZSIsInNob3VsZENvbnZlcnQiLCJpc1NldHRpbmdQcm9wcyIsIk9ic2VydmVyIiwidm1Db3VudCIsImF1Z21lbnQiLCJwcm90b0F1Z21lbnQiLCJjb3B5QXVnbWVudCIsIndhbGsiLCJrZXlzIiwiZGVmaW5lUmVhY3RpdmUkJDEiLCJpdGVtcyIsInNyYyIsIl9fcHJvdG9fXyIsImFzUm9vdERhdGEiLCJpc0V4dGVuc2libGUiLCJjdXN0b21TZXR0ZXIiLCJwcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldHRlciIsInNldHRlciIsImNoaWxkT2IiLCJyZWFjdGl2ZUdldHRlciIsImRlcGVuZEFycmF5IiwicmVhY3RpdmVTZXR0ZXIiLCJuZXdWYWwiLCJNYXRoIiwibWF4IiwiZGVsIiwic3RyYXRzIiwiZWwiLCJwYXJlbnQiLCJjaGlsZCIsImRlZmF1bHRTdHJhdCIsIm1lcmdlRGF0YSIsImZyb20iLCJ0b1ZhbCIsImZyb21WYWwiLCJwYXJlbnRWYWwiLCJjaGlsZFZhbCIsIm1lcmdlZERhdGFGbiIsIm1lcmdlZEluc3RhbmNlRGF0YUZuIiwiaW5zdGFuY2VEYXRhIiwiZGVmYXVsdERhdGEiLCJtZXJnZUhvb2siLCJob29rIiwibWVyZ2VBc3NldHMiLCJ0eXBlIiwid2F0Y2giLCJwcm9wcyIsIm1ldGhvZHMiLCJjb21wdXRlZCIsImNoZWNrQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJsb3dlciIsIm5vcm1hbGl6ZVByb3BzIiwibm9ybWFsaXplRGlyZWN0aXZlcyIsImRpcnMiLCJkaXJlY3RpdmVzIiwibWVyZ2VPcHRpb25zIiwiZXh0ZW5kc0Zyb20iLCJleHRlbmRzIiwibWl4aW5zIiwibWVyZ2VGaWVsZCIsInN0cmF0IiwicmVzb2x2ZUFzc2V0Iiwid2Fybk1pc3NpbmciLCJhc3NldHMiLCJjYW1lbGl6ZWRJZCIsIlBhc2NhbENhc2VJZCIsInZhbGlkYXRlUHJvcCIsInByb3BPcHRpb25zIiwicHJvcCIsImFic2VudCIsImlzVHlwZSIsIkJvb2xlYW4iLCJnZXRQcm9wRGVmYXVsdFZhbHVlIiwicHJldlNob3VsZENvbnZlcnQiLCJhc3NlcnRQcm9wIiwiZGVmYXVsdCIsIl9wcm9wcyIsImdldFR5cGUiLCJyZXF1aXJlZCIsInZhbGlkIiwiZXhwZWN0ZWRUeXBlcyIsImFzc2VydGVkVHlwZSIsImFzc2VydFR5cGUiLCJleHBlY3RlZFR5cGUiLCJ2YWxpZGF0b3IiLCJzaW1wbGVDaGVja1JFIiwiaW5pdFByb3h5IiwiYWxsb3dlZEdsb2JhbHMiLCJ3YXJuTm9uUHJlc2VudCIsImhhc1Byb3h5IiwiUHJveHkiLCJpc0J1aWx0SW5Nb2RpZmllciIsImhhc0hhbmRsZXIiLCJpc0FsbG93ZWQiLCJnZXRIYW5kbGVyIiwiaGFuZGxlcnMiLCJyZW5kZXIiLCJfd2l0aFN0cmlwcGVkIiwiX3JlbmRlclByb3h5IiwibWFyayIsIm1lYXN1cmUiLCJwZXJmIiwiY2xlYXJNYXJrcyIsImNsZWFyTWVhc3VyZXMiLCJ0YWciLCJzdGFydFRhZyIsImVuZFRhZyIsIlZOb2RlIiwiY2hpbGRyZW4iLCJ0ZXh0IiwiZWxtIiwiY29udGV4dCIsImNvbXBvbmVudE9wdGlvbnMiLCJucyIsImZ1bmN0aW9uYWxDb250ZXh0IiwiY29tcG9uZW50SW5zdGFuY2UiLCJyYXciLCJpc1N0YXRpYyIsImlzUm9vdEluc2VydCIsImlzQ29tbWVudCIsImlzQ2xvbmVkIiwiaXNPbmNlIiwicHJvdG90eXBlQWNjZXNzb3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImNyZWF0ZUVtcHR5Vk5vZGUiLCJub2RlIiwiY3JlYXRlVGV4dFZOb2RlIiwiY2xvbmVWTm9kZSIsInZub2RlIiwiY2xvbmVkIiwiY2xvbmVWTm9kZXMiLCJ2bm9kZXMiLCJub3JtYWxpemVFdmVudCIsInBhc3NpdmUiLCJvbmNlJCQxIiwiY2FwdHVyZSIsImNyZWF0ZUZuSW52b2tlciIsImZucyIsImludm9rZXIiLCJ1cGRhdGVMaXN0ZW5lcnMiLCJvbGRPbiIsInJlbW92ZSQkMSIsImN1ciIsIm9sZCIsImV2ZW50IiwibWVyZ2VWTm9kZUhvb2siLCJob29rS2V5Iiwib2xkSG9vayIsIndyYXBwZWRIb29rIiwibWVyZ2VkIiwiZXh0cmFjdFByb3BzRnJvbVZOb2RlRGF0YSIsImF0dHJzIiwiYWx0S2V5Iiwia2V5SW5Mb3dlckNhc2UiLCJjaGVja1Byb3AiLCJoYXNoIiwicHJlc2VydmUiLCJzaW1wbGVOb3JtYWxpemVDaGlsZHJlbiIsIm5vcm1hbGl6ZUNoaWxkcmVuIiwibm9ybWFsaXplQXJyYXlDaGlsZHJlbiIsIm5lc3RlZEluZGV4IiwiZW5zdXJlQ3RvciIsImNvbXAiLCJiYXNlIiwicmVzb2x2ZUFzeW5jQ29tcG9uZW50IiwiZmFjdG9yeSIsImJhc2VDdG9yIiwiZXJyb3JDb21wIiwicmVzb2x2ZWQiLCJsb2FkaW5nIiwibG9hZGluZ0NvbXAiLCJjb250ZXh0cyIsInN5bmMiLCJmb3JjZVJlbmRlciIsIiRmb3JjZVVwZGF0ZSIsInJlYXNvbiIsImRlbGF5IiwiZ2V0Rmlyc3RDb21wb25lbnRDaGlsZCIsImluaXRFdmVudHMiLCJfZXZlbnRzIiwiX2hhc0hvb2tFdmVudCIsIl9wYXJlbnRMaXN0ZW5lcnMiLCJ1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnMiLCIkb25jZSIsIiRvbiIsInJlbW92ZSQxIiwiJG9mZiIsIm9sZExpc3RlbmVycyIsImV2ZW50c01peGluIiwiVnVlIiwiaG9va1JFIiwidGhpcyQxIiwiaSQxIiwiY2JzIiwiJGVtaXQiLCJsb3dlckNhc2VFdmVudCIsInJlc29sdmVTbG90cyIsInNsb3RzIiwiZGVmYXVsdFNsb3QiLCJzbG90IiwiZXZlcnkiLCJpc1doaXRlc3BhY2UiLCJyZXNvbHZlU2NvcGVkU2xvdHMiLCJhY3RpdmVJbnN0YW5jZSIsImluaXRMaWZlY3ljbGUiLCJhYnN0cmFjdCIsIiRjaGlsZHJlbiIsIiRyZWZzIiwiX3dhdGNoZXIiLCJfaW5hY3RpdmUiLCJfZGlyZWN0SW5hY3RpdmUiLCJfaXNNb3VudGVkIiwiX2lzRGVzdHJveWVkIiwiX2lzQmVpbmdEZXN0cm95ZWQiLCJsaWZlY3ljbGVNaXhpbiIsIl91cGRhdGUiLCJoeWRyYXRpbmciLCJjYWxsSG9vayIsInByZXZFbCIsInByZXZWbm9kZSIsIl92bm9kZSIsInByZXZBY3RpdmVJbnN0YW5jZSIsIl9fcGF0Y2hfXyIsIl9wYXJlbnRFbG0iLCJfcmVmRWxtIiwiX192dWVfXyIsIiR2bm9kZSIsInRlYXJkb3duIiwiX3dhdGNoZXJzIiwiX2RhdGEiLCJtb3VudENvbXBvbmVudCIsInRlbXBsYXRlIiwidXBkYXRlQ29tcG9uZW50IiwiX25hbWUiLCJfdWlkIiwiX3JlbmRlciIsIldhdGNoZXIiLCJ1cGRhdGVDaGlsZENvbXBvbmVudCIsInBhcmVudFZub2RlIiwicmVuZGVyQ2hpbGRyZW4iLCJoYXNDaGlsZHJlbiIsIl9yZW5kZXJDaGlsZHJlbiIsInNjb3BlZFNsb3RzIiwiJHNjb3BlZFNsb3RzIiwiX3BhcmVudFZub2RlIiwicHJvcEtleXMiLCJfcHJvcEtleXMiLCIkc2xvdHMiLCJpc0luSW5hY3RpdmVUcmVlIiwiYWN0aXZhdGVDaGlsZENvbXBvbmVudCIsImRpcmVjdCIsImRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCIsImoiLCJNQVhfVVBEQVRFX0NPVU5UIiwiYWN0aXZhdGVkQ2hpbGRyZW4iLCJjaXJjdWxhciIsIndhaXRpbmciLCJmbHVzaGluZyIsInJlc2V0U2NoZWR1bGVyU3RhdGUiLCJmbHVzaFNjaGVkdWxlclF1ZXVlIiwid2F0Y2hlciIsInNvcnQiLCJ1c2VyIiwiZXhwcmVzc2lvbiIsImFjdGl2YXRlZFF1ZXVlIiwidXBkYXRlZFF1ZXVlIiwiY2FsbEFjdGl2YXRlZEhvb2tzIiwiY2FsbFVwZGF0ZUhvb2tzIiwicXVldWVBY3RpdmF0ZWRDb21wb25lbnQiLCJxdWV1ZVdhdGNoZXIiLCJ1aWQkMiIsImV4cE9yRm4iLCJkZWVwIiwibGF6eSIsImFjdGl2ZSIsImRpcnR5IiwiZGVwcyIsIm5ld0RlcHMiLCJkZXBJZHMiLCJuZXdEZXBJZHMiLCJ0cmF2ZXJzZSIsImNsZWFudXBEZXBzIiwidG1wIiwib2xkVmFsdWUiLCJldmFsdWF0ZSIsInNlZW5PYmplY3RzIiwiX3RyYXZlcnNlIiwic2VlbiIsImlzQSIsImRlcElkIiwic2hhcmVkUHJvcGVydHlEZWZpbml0aW9uIiwicHJveHkiLCJzb3VyY2VLZXkiLCJwcm94eUdldHRlciIsInByb3h5U2V0dGVyIiwiaW5pdFN0YXRlIiwiaW5pdFByb3BzIiwiaW5pdE1ldGhvZHMiLCJpbml0RGF0YSIsImluaXRDb21wdXRlZCIsImluaXRXYXRjaCIsImlzUmVzZXJ2ZWRQcm9wIiwicmVmIiwicHJvcHNPcHRpb25zIiwiaXNSb290IiwibG9vcCIsImdldERhdGEiLCJjb21wdXRlZFdhdGNoZXJPcHRpb25zIiwid2F0Y2hlcnMiLCJfY29tcHV0ZWRXYXRjaGVycyIsInVzZXJEZWYiLCJkZWZpbmVDb21wdXRlZCIsIiRkYXRhIiwiY3JlYXRlQ29tcHV0ZWRHZXR0ZXIiLCJjb21wdXRlZEdldHRlciIsImhhbmRsZXIiLCJjcmVhdGVXYXRjaGVyIiwiJHdhdGNoIiwic3RhdGVNaXhpbiIsImRhdGFEZWYiLCJwcm9wc0RlZiIsIm5ld0RhdGEiLCIkc2V0IiwiJGRlbGV0ZSIsImltbWVkaWF0ZSIsInVud2F0Y2hGbiIsImluaXRQcm92aWRlIiwicHJvdmlkZSIsIl9wcm92aWRlZCIsImluaXRJbmplY3Rpb25zIiwicmVzb2x2ZUluamVjdCIsImluamVjdCIsInByb3ZpZGVLZXkiLCJzb3VyY2UiLCJjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50IiwibWVyZ2VQcm9wcyIsIl9jb250ZXh0IiwiaCIsImQiLCJpbmplY3Rpb25zIiwiZnVuY3Rpb25hbE9wdGlvbnMiLCJjb21wb25lbnRWTm9kZUhvb2tzIiwiaW5pdCIsInBhcmVudEVsbSIsInJlZkVsbSIsImNyZWF0ZUNvbXBvbmVudEluc3RhbmNlRm9yVm5vZGUiLCJrZWVwQWxpdmUiLCJtb3VudGVkTm9kZSIsInByZXBhdGNoIiwib2xkVm5vZGUiLCJpbnNlcnQiLCJkZXN0cm95IiwiaG9va3NUb01lcmdlIiwiY3JlYXRlQ29tcG9uZW50IiwiX2Jhc2UiLCJjaWQiLCJyZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zIiwibW9kZWwiLCJ0cmFuc2Zvcm1Nb2RlbCIsImZ1bmN0aW9uYWwiLCJuYXRpdmVPbiIsIm1lcmdlSG9va3MiLCJ2bm9kZUNvbXBvbmVudE9wdGlvbnMiLCJfaXNDb21wb25lbnQiLCJpbmxpbmVUZW1wbGF0ZSIsInN0YXRpY1JlbmRlckZucyIsImZyb21QYXJlbnQiLCJvdXJzIiwibWVyZ2VIb29rJDEiLCJvbmUiLCJ0d28iLCJjYWxsYmFjayIsIlNJTVBMRV9OT1JNQUxJWkUiLCJBTFdBWVNfTk9STUFMSVpFIiwibm9ybWFsaXphdGlvblR5cGUiLCJhbHdheXNOb3JtYWxpemUiLCJfY3JlYXRlRWxlbWVudCIsImFwcGx5TlMiLCJyZW5kZXJMaXN0IiwicmVuZGVyU2xvdCIsImZhbGxiYWNrIiwiYmluZE9iamVjdCIsInNjb3BlZFNsb3RGbiIsInNsb3ROb2RlcyIsIl9yZW5kZXJlZCIsInJlc29sdmVGaWx0ZXIiLCJjaGVja0tleUNvZGVzIiwiZXZlbnRLZXlDb2RlIiwiYnVpbHRJbkFsaWFzIiwiYmluZE9iamVjdFByb3BzIiwiYXNQcm9wIiwiZG9tUHJvcHMiLCJyZW5kZXJTdGF0aWMiLCJpc0luRm9yIiwiX3N0YXRpY1RyZWVzIiwibWFya1N0YXRpYyIsIm1hcmtPbmNlIiwibWFya1N0YXRpY05vZGUiLCJpbml0UmVuZGVyIiwicmVuZGVyQ29udGV4dCIsIl9jIiwiJGNyZWF0ZUVsZW1lbnQiLCJyZW5kZXJNaXhpbiIsIiRuZXh0VGljayIsInJlbmRlckVycm9yIiwiX28iLCJfbiIsIl9zIiwiX2wiLCJfdCIsIl9xIiwiX2kiLCJfbSIsIl9mIiwiX2siLCJfYiIsIl92IiwiX2UiLCJfdSIsInVpZCIsImluaXRNaXhpbiIsIl9pbml0IiwiaW5pdEludGVybmFsQ29tcG9uZW50IiwiX3NlbGYiLCJzdXBlciIsInN1cGVyT3B0aW9ucyIsImNhY2hlZFN1cGVyT3B0aW9ucyIsIm1vZGlmaWVkT3B0aW9ucyIsInJlc29sdmVNb2RpZmllZE9wdGlvbnMiLCJleHRlbmRPcHRpb25zIiwibW9kaWZpZWQiLCJsYXRlc3QiLCJleHRlbmRlZCIsInNlYWxlZCIsInNlYWxlZE9wdGlvbnMiLCJkZWR1cGUiLCJWdWUkMyIsImluaXRVc2UiLCJ1c2UiLCJwbHVnaW4iLCJpbnN0YWxsZWQiLCJ1bnNoaWZ0IiwiaW5zdGFsbCIsImluaXRNaXhpbiQxIiwibWl4aW4iLCJpbml0RXh0ZW5kIiwiU3VwZXIiLCJTdXBlcklkIiwiY2FjaGVkQ3RvcnMiLCJfQ3RvciIsIlN1YiIsIlZ1ZUNvbXBvbmVudCIsImluaXRQcm9wcyQxIiwiaW5pdENvbXB1dGVkJDEiLCJDb21wIiwiaW5pdEFzc2V0UmVnaXN0ZXJzIiwiZGVmaW5pdGlvbiIsInBhdHRlcm5UeXBlcyIsIlJlZ0V4cCIsImdldENvbXBvbmVudE5hbWUiLCJtYXRjaGVzIiwicGF0dGVybiIsInBydW5lQ2FjaGUiLCJjdXJyZW50IiwiZmlsdGVyIiwiY2FjaGVkTm9kZSIsInBydW5lQ2FjaGVFbnRyeSIsIktlZXBBbGl2ZSIsImluY2x1ZGUiLCJleGNsdWRlIiwiY3JlYXRlZCIsImRlc3Ryb3llZCIsImJ1aWx0SW5Db21wb25lbnRzIiwiaW5pdEdsb2JhbEFQSSIsImNvbmZpZ0RlZiIsInV0aWwiLCJkZWZpbmVSZWFjdGl2ZSIsImRlbGV0ZSIsInNzckNvbnRleHQiLCJhY2NlcHRWYWx1ZSIsImF0dHIiLCJpc0VudW1lcmF0ZWRBdHRyIiwiaXNCb29sZWFuQXR0ciIsInhsaW5rTlMiLCJpc1hsaW5rIiwiZ2V0WGxpbmtQcm9wIiwiaXNGYWxzeUF0dHJWYWx1ZSIsImdlbkNsYXNzRm9yVm5vZGUiLCJwYXJlbnROb2RlIiwiY2hpbGROb2RlIiwibWVyZ2VDbGFzc0RhdGEiLCJnZW5DbGFzc0Zyb21EYXRhIiwic3RhdGljQ2xhc3MiLCJjbGFzcyIsImR5bmFtaWNDbGFzcyIsInN0cmluZ2lmeUNsYXNzIiwic3RyaW5naWZpZWQiLCJuYW1lc3BhY2VNYXAiLCJzdmciLCJtYXRoIiwiaXNIVE1MVGFnIiwiaXNTVkciLCJ1bmtub3duRWxlbWVudENhY2hlIiwiSFRNTFVua25vd25FbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJxdWVyeSIsInNlbGVjdGVkIiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnQkMSIsInRhZ05hbWUiLCJtdWx0aXBsZSIsInNldEF0dHJpYnV0ZSIsImNyZWF0ZUVsZW1lbnROUyIsIm5hbWVzcGFjZSIsImNyZWF0ZUNvbW1lbnQiLCJpbnNlcnRCZWZvcmUiLCJuZXdOb2RlIiwicmVmZXJlbmNlTm9kZSIsIm5leHRTaWJsaW5nIiwic2V0VGV4dENvbnRlbnQiLCJ0ZXh0Q29udGVudCIsIm5vZGVPcHMiLCJyZWdpc3RlclJlZiIsImlzUmVtb3ZhbCIsInJlZnMiLCJyZWZJbkZvciIsImVtcHR5Tm9kZSIsImhvb2tzIiwic2FtZVZub2RlIiwic2FtZUlucHV0VHlwZSIsInR5cGVBIiwidHlwZUIiLCJjcmVhdGVLZXlUb09sZElkeCIsImJlZ2luSWR4IiwiZW5kSWR4IiwiY3JlYXRlUGF0Y2hGdW5jdGlvbiIsImJhY2tlbmQiLCJtb2R1bGVzIiwiZW1wdHlOb2RlQXQiLCJjcmVhdGVSbUNiIiwiY2hpbGRFbG0iLCJyZW1vdmVOb2RlIiwiaW5QcmUiLCJjcmVhdGVFbG0iLCJpbnNlcnRlZFZub2RlUXVldWUiLCJuZXN0ZWQiLCJwcmUiLCJzZXRTY29wZSIsImNyZWF0ZUNoaWxkcmVuIiwiaW52b2tlQ3JlYXRlSG9va3MiLCJpc1JlYWN0aXZhdGVkIiwiaW5pdENvbXBvbmVudCIsInJlYWN0aXZhdGVDb21wb25lbnQiLCJwZW5kaW5nSW5zZXJ0IiwiaXNQYXRjaGFibGUiLCJpbm5lck5vZGUiLCJ0cmFuc2l0aW9uIiwiYWN0aXZhdGUiLCJhbmNlc3RvciIsIl9zY29wZUlkIiwiYWRkVm5vZGVzIiwic3RhcnRJZHgiLCJpbnZva2VEZXN0cm95SG9vayIsInJlbW92ZVZub2RlcyIsImNoIiwicmVtb3ZlQW5kSW52b2tlUmVtb3ZlSG9vayIsInJtIiwidXBkYXRlQ2hpbGRyZW4iLCJvbGRDaCIsIm5ld0NoIiwicmVtb3ZlT25seSIsIm9sZFN0YXJ0SWR4IiwibmV3U3RhcnRJZHgiLCJvbGRFbmRJZHgiLCJvbGRTdGFydFZub2RlIiwib2xkRW5kVm5vZGUiLCJuZXdFbmRJZHgiLCJuZXdTdGFydFZub2RlIiwibmV3RW5kVm5vZGUiLCJvbGRLZXlUb0lkeCIsImlkeEluT2xkIiwiZWxtVG9Nb3ZlIiwiY2FuTW92ZSIsInBhdGNoVm5vZGUiLCJwb3N0cGF0Y2giLCJpbnZva2VJbnNlcnRIb29rIiwiaW5pdGlhbCIsImJhaWxlZCIsImlzUmVuZGVyZWRNb2R1bGUiLCJoeWRyYXRlIiwiYXNzZXJ0Tm9kZU1hdGNoIiwiaGFzQ2hpbGROb2RlcyIsImNoaWxkcmVuTWF0Y2giLCJmaXJzdENoaWxkIiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwicGF0Y2giLCJpc0luaXRpYWxQYXRjaCIsImlzUmVhbEVsZW1lbnQiLCJoYXNBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJvbGRFbG0iLCJwYXJlbnRFbG0kMSIsIl9sZWF2ZUNiIiwidXBkYXRlRGlyZWN0aXZlcyIsInVuYmluZERpcmVjdGl2ZXMiLCJpc0NyZWF0ZSIsImlzRGVzdHJveSIsIm9sZERpcnMiLCJub3JtYWxpemVEaXJlY3RpdmVzJDEiLCJuZXdEaXJzIiwiZGlyc1dpdGhJbnNlcnQiLCJkaXJzV2l0aFBvc3RwYXRjaCIsIm9sZERpciIsImNhbGxIb29rJDEiLCJjb21wb25lbnRVcGRhdGVkIiwiY2FsbEluc2VydCIsImVtcHR5TW9kaWZpZXJzIiwibW9kaWZpZXJzIiwiZ2V0UmF3RGlyTmFtZSIsInJhd05hbWUiLCJiYXNlTW9kdWxlcyIsInVwZGF0ZUF0dHJzIiwib2xkQXR0cnMiLCJzZXRBdHRyIiwicmVtb3ZlQXR0cmlidXRlTlMiLCJzZXRBdHRyaWJ1dGVOUyIsInVwZGF0ZUNsYXNzIiwib2xkRGF0YSIsImNscyIsInRyYW5zaXRpb25DbGFzcyIsIl90cmFuc2l0aW9uQ2xhc3NlcyIsIl9wcmV2Q2xhc3MiLCJrbGFzcyIsInZhbGlkRGl2aXNpb25DaGFyUkUiLCJ3cmFwRmlsdGVyIiwiZXhwIiwiaW5kZXgkMSIsIlJBTkdFX1RPS0VOIiwiQ0hFQ0tCT1hfUkFESU9fVE9LRU4iLCJub3JtYWxpemVFdmVudHMiLCJ0YXJnZXQkMSIsImFkZCQxIiwib2xkSGFuZGxlciIsImV2IiwicmVtb3ZlJDIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidXBkYXRlRE9NTGlzdGVuZXJzIiwiZXZlbnRzIiwidXBkYXRlRE9NUHJvcHMiLCJvbGRQcm9wcyIsIl92YWx1ZSIsInN0ckN1ciIsInNob3VsZFVwZGF0ZVZhbHVlIiwiY2hlY2tWYWwiLCJjb21wb3NpbmciLCJpc0RpcnR5IiwiaXNJbnB1dENoYW5nZWQiLCJhY3RpdmVFbGVtZW50IiwiX3ZNb2RpZmllcnMiLCJudW1iZXIiLCJ0cmltIiwicGFyc2VTdHlsZVRleHQiLCJjc3NUZXh0IiwibGlzdERlbGltaXRlciIsInByb3BlcnR5RGVsaW1pdGVyIiwibm9ybWFsaXplU3R5bGVEYXRhIiwic3R5bGUiLCJub3JtYWxpemVTdHlsZUJpbmRpbmciLCJzdGF0aWNTdHlsZSIsImJpbmRpbmdTdHlsZSIsImdldFN0eWxlIiwiY2hlY2tDaGlsZCIsInN0eWxlRGF0YSIsImNzc1ZhclJFIiwiaW1wb3J0YW50UkUiLCJzZXRQcm9wIiwic2V0UHJvcGVydHkiLCJub3JtYWxpemVkTmFtZSIsIm5vcm1hbGl6ZSIsInByZWZpeGVzIiwidGVzdEVsIiwidXBwZXIiLCJwcmVmaXhlZCIsInVwZGF0ZVN0eWxlIiwib2xkU3RhdGljU3R5bGUiLCJvbGRTdHlsZUJpbmRpbmciLCJub3JtYWxpemVkU3R5bGUiLCJvbGRTdHlsZSIsIm5ld1N0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVDbGFzcyIsInRhciIsInJlc29sdmVUcmFuc2l0aW9uIiwiZGVmJCQxIiwiY3NzIiwiYXV0b0Nzc1RyYW5zaXRpb24iLCJlbnRlckNsYXNzIiwiZW50ZXJUb0NsYXNzIiwiZW50ZXJBY3RpdmVDbGFzcyIsImxlYXZlQ2xhc3MiLCJsZWF2ZVRvQ2xhc3MiLCJsZWF2ZUFjdGl2ZUNsYXNzIiwiaGFzVHJhbnNpdGlvbiIsIlRSQU5TSVRJT04iLCJBTklNQVRJT04iLCJ0cmFuc2l0aW9uUHJvcCIsInRyYW5zaXRpb25FbmRFdmVudCIsImFuaW1hdGlvblByb3AiLCJhbmltYXRpb25FbmRFdmVudCIsIm9udHJhbnNpdGlvbmVuZCIsIm9ud2Via2l0dHJhbnNpdGlvbmVuZCIsIm9uYW5pbWF0aW9uZW5kIiwib253ZWJraXRhbmltYXRpb25lbmQiLCJyYWYiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJuZXh0RnJhbWUiLCJhZGRUcmFuc2l0aW9uQ2xhc3MiLCJyZW1vdmVUcmFuc2l0aW9uQ2xhc3MiLCJ3aGVuVHJhbnNpdGlvbkVuZHMiLCJnZXRUcmFuc2l0aW9uSW5mbyIsInByb3BDb3VudCIsImVuZGVkIiwiZW5kIiwib25FbmQiLCJ0cmFuc2Zvcm1SRSIsInN0eWxlcyIsImdldENvbXB1dGVkU3R5bGUiLCJ0cmFuc2l0aW9uRGVsYXlzIiwidHJhbnNpdGlvbkR1cmF0aW9ucyIsInRyYW5zaXRpb25UaW1lb3V0IiwiZ2V0VGltZW91dCIsImFuaW1hdGlvbkRlbGF5cyIsImFuaW1hdGlvbkR1cmF0aW9ucyIsImFuaW1hdGlvblRpbWVvdXQiLCJoYXNUcmFuc2Zvcm0iLCJkZWxheXMiLCJkdXJhdGlvbnMiLCJ0b01zIiwicyIsIk51bWJlciIsImVudGVyIiwidG9nZ2xlRGlzcGxheSIsImNhbmNlbGxlZCIsIl9lbnRlckNiIiwiYXBwZWFyQ2xhc3MiLCJhcHBlYXJUb0NsYXNzIiwiYXBwZWFyQWN0aXZlQ2xhc3MiLCJiZWZvcmVFbnRlciIsImFmdGVyRW50ZXIiLCJlbnRlckNhbmNlbGxlZCIsImJlZm9yZUFwcGVhciIsImFwcGVhciIsImFmdGVyQXBwZWFyIiwiYXBwZWFyQ2FuY2VsbGVkIiwiZHVyYXRpb24iLCJ0cmFuc2l0aW9uTm9kZSIsImlzQXBwZWFyIiwic3RhcnRDbGFzcyIsImFjdGl2ZUNsYXNzIiwidG9DbGFzcyIsImJlZm9yZUVudGVySG9vayIsImVudGVySG9vayIsImFmdGVyRW50ZXJIb29rIiwiZW50ZXJDYW5jZWxsZWRIb29rIiwiZXhwbGljaXRFbnRlckR1cmF0aW9uIiwiY2hlY2tEdXJhdGlvbiIsImV4cGVjdHNDU1MiLCJ1c2VyV2FudHNDb250cm9sIiwiZ2V0SG9va0FyZ3VtZW50c0xlbmd0aCIsInNob3ciLCJwZW5kaW5nTm9kZSIsIl9wZW5kaW5nIiwiaXNWYWxpZER1cmF0aW9uIiwibGVhdmUiLCJiZWZvcmVMZWF2ZSIsImFmdGVyTGVhdmUiLCJsZWF2ZUNhbmNlbGxlZCIsImRlbGF5TGVhdmUiLCJleHBsaWNpdExlYXZlRHVyYXRpb24iLCJwZXJmb3JtTGVhdmUiLCJpbnZva2VyRm5zIiwiX2VudGVyIiwicGxhdGZvcm1Nb2R1bGVzIiwidm1vZGVsIiwidHJpZ2dlciIsIm1vZGVsJDEiLCJzZXRTZWxlY3RlZCIsIm9uQ29tcG9zaXRpb25FbmQiLCJvbkNvbXBvc2l0aW9uU3RhcnQiLCJuZWVkUmVzZXQiLCJzb21lIiwiaGFzTm9NYXRjaGluZ09wdGlvbiIsImlzTXVsdGlwbGUiLCJvcHRpb24iLCJnZXRWYWx1ZSIsInNlbGVjdGVkSW5kZXgiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJsb2NhdGVOb2RlIiwib3JpZ2luYWxEaXNwbGF5IiwiX192T3JpZ2luYWxEaXNwbGF5IiwiZGlzcGxheSIsInVuYmluZCIsInBsYXRmb3JtRGlyZWN0aXZlcyIsInRyYW5zaXRpb25Qcm9wcyIsIm1vZGUiLCJnZXRSZWFsQ2hpbGQiLCJjb21wT3B0aW9ucyIsImV4dHJhY3RUcmFuc2l0aW9uRGF0YSIsImtleSQxIiwicGxhY2Vob2xkZXIiLCJyYXdDaGlsZCIsImhhc1BhcmVudFRyYW5zaXRpb24iLCJpc1NhbWVDaGlsZCIsIm9sZENoaWxkIiwiVHJhbnNpdGlvbiIsIl9sZWF2aW5nIiwib2xkUmF3Q2hpbGQiLCJkZWxheWVkTGVhdmUiLCJtb3ZlQ2xhc3MiLCJUcmFuc2l0aW9uR3JvdXAiLCJwcmV2Q2hpbGRyZW4iLCJyYXdDaGlsZHJlbiIsInRyYW5zaXRpb25EYXRhIiwia2VwdCIsInJlbW92ZWQiLCJjJDEiLCJwb3MiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJiZWZvcmVVcGRhdGUiLCJ1cGRhdGVkIiwiaGFzTW92ZSIsImNhbGxQZW5kaW5nQ2JzIiwicmVjb3JkUG9zaXRpb24iLCJhcHBseVRyYW5zbGF0aW9uIiwiZiIsIm9mZnNldEhlaWdodCIsIm1vdmVkIiwidHJhbnNmb3JtIiwiV2Via2l0VHJhbnNmb3JtIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiX21vdmVDYiIsInByb3BlcnR5TmFtZSIsIl9oYXNNb3ZlIiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJuZXdQb3MiLCJvbGRQb3MiLCJkeCIsImxlZnQiLCJkeSIsInRvcCIsInBsYXRmb3JtQ29tcG9uZW50cyIsImciLCJGdW5jdGlvbiIsImV2YWwiLCJiZWZvcmVFYWNoIiwiYWZ0ZXJFYWNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7UUMxQmdCQSxzQixHQUFBQSxzQjtRQUtBQyxlLEdB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LGFBQVQsR0FBTCxJQUFrQyxDQUFDLEdBQUVDLElBQUgsRUFBUyxNQUFULENBQXRDO0FBQ0EsQ0FIRCxDQUdFLE9BQU16bkMsQ0FBTixFQUFTO0FBQ1Y7QUFDQSxLQUFHLFFBQU9vTSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXJCLEVBQ0NtN0IsSUFBSW43QixNQUFKO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBOztBQUVBNU0sT0FBT0MsT0FBUCxHQUFpQjhuQyxDQUFqQixDOzs7Ozs7Ozs7QUNuQkE7O0FBRUFHLDBDLENBSEE7O0FBSUFDLGtDIiwiZmlsZSI6Imphc21pbmUtdnVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MDhjYWY3OTAxMGE1NmYxMzI2ZiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcblxubGV0IGNhY2hlZENvbXBvbmVudCA9IG51bGw7XG5cbmZ1bmN0aW9uIHZ1ZUluaXQoQ29tcG9uZW50LCBkZWZhdWx0UHJvcHMgPSB7fSkge1xuICB0aGlzLl9qYXNtaW5lVnVlQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuICB0aGlzLl9qYXNtaW5lVnVlRGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuICB0aGlzLl9qYXNtaW5lVnVlQWN0aXZlID0gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGFwcGVuZFdyYXAoKSB7XG4gIGNvbnN0IHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwKTtcbiAgcmV0dXJuIHdyYXA7XG59XG5cbmZ1bmN0aW9uIHZ1ZU1vdW50KHByb3BzRGF0YSA9IHRoaXMuX2phc21pbmVWdWVEZWZhdWx0UHJvcHMpIHtcbiAgaWYgKCF0aGlzLl9qYXNtaW5lVnVlQWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVtb3ZlQ29tcG9uZW50KCk7XG5cbiAgY29uc3Qgd3JhcCA9IGFwcGVuZFdyYXAoKTtcblxuICBjb25zdCBjb21wb25lbnQgPSBuZXcgVnVlKHtcbiAgICBwcm9wc0RhdGEsXG4gICAgLi4udGhpcy5famFzbWluZVZ1ZUNvbXBvbmVudCxcbiAgfSkuJG1vdW50KHdyYXApO1xuXG4gIGNhY2hlZENvbXBvbmVudCA9IGNvbXBvbmVudDtcblxuICByZXR1cm4ge1xuICAgIGNvbXBvbmVudCxcbiAgICB3cmFwLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEJlZm9yZUVhY2hGdW5jdGlvbnMoKSB7XG4gIHRoaXMudnVlSW5pdCA9IHZ1ZUluaXQ7XG4gIHRoaXMudnVlTW91bnQgPSB2dWVNb3VudDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDb21wb25lbnQoKSB7XG4gIGlmIChjYWNoZWRDb21wb25lbnQpIHtcbiAgICBjYWNoZWRDb21wb25lbnQuJGRlc3Ryb3koKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNhY2hlZENvbXBvbmVudC4kZWwpO1xuICAgIGNhY2hlZENvbXBvbmVudCA9IG51bGw7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2V0dXAuanMiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCIvKiFcbiAqIFZ1ZS5qcyB2Mi4zLjJcbiAqIChjKSAyMDE0LTIwMTcgRXZhbiBZb3VcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuLyogICovXG5cbi8vIHRoZXNlIGhlbHBlcnMgcHJvZHVjZXMgYmV0dGVyIHZtIGNvZGUgaW4gSlMgZW5naW5lcyBkdWUgdG8gdGhlaXJcbi8vIGV4cGxpY2l0bmVzcyBhbmQgZnVuY3Rpb24gaW5saW5pbmdcbmZ1bmN0aW9uIGlzVW5kZWYgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsXG59XG5cbmZ1bmN0aW9uIGlzRGVmICh2KSB7XG4gIHJldHVybiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbFxufVxuXG5mdW5jdGlvbiBpc1RydWUgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHRydWVcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBpcyBwcmltaXRpdmVcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUgKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbn1cblxuLyoqXG4gKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcbiAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG59XG5cbnZhciBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNSZWdFeHAgKHYpIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBSZWdFeHBdJ1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSB2YWx1ZSB0byBhIHN0cmluZyB0aGF0IGlzIGFjdHVhbGx5IHJlbmRlcmVkLlxuICovXG5mdW5jdGlvbiB0b1N0cmluZyAodmFsKSB7XG4gIHJldHVybiB2YWwgPT0gbnVsbFxuICAgID8gJydcbiAgICA6IHR5cGVvZiB2YWwgPT09ICdvYmplY3QnXG4gICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMilcbiAgICAgIDogU3RyaW5nKHZhbClcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgaW5wdXQgdmFsdWUgdG8gYSBudW1iZXIgZm9yIHBlcnNpc3RlbmNlLlxuICogSWYgdGhlIGNvbnZlcnNpb24gZmFpbHMsIHJldHVybiBvcmlnaW5hbCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyICh2YWwpIHtcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbCk7XG4gIHJldHVybiBpc05hTihuKSA/IHZhbCA6IG5cbn1cblxuLyoqXG4gKiBNYWtlIGEgbWFwIGFuZCByZXR1cm4gYSBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYSBrZXlcbiAqIGlzIGluIHRoYXQgbWFwLlxuICovXG5mdW5jdGlvbiBtYWtlTWFwIChcbiAgc3RyLFxuICBleHBlY3RzTG93ZXJDYXNlXG4pIHtcbiAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBsaXN0ID0gc3RyLnNwbGl0KCcsJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG1hcFtsaXN0W2ldXSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGV4cGVjdHNMb3dlckNhc2VcbiAgICA/IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWwudG9Mb3dlckNhc2UoKV07IH1cbiAgICA6IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWxdOyB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB0YWcgaXMgYSBidWlsdC1pbiB0YWcuXG4gKi9cbnZhciBpc0J1aWx0SW5UYWcgPSBtYWtlTWFwKCdzbG90LGNvbXBvbmVudCcsIHRydWUpO1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpdGVtIGZyb20gYW4gYXJyYXlcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlIChhcnIsIGl0ZW0pIHtcbiAgaWYgKGFyci5sZW5ndGgpIHtcbiAgICB2YXIgaW5kZXggPSBhcnIuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgb2JqZWN0IGhhcyB0aGUgcHJvcGVydHkuXG4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5mdW5jdGlvbiBoYXNPd24gKG9iaiwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGNhY2hlZCB2ZXJzaW9uIG9mIGEgcHVyZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY2FjaGVkIChmbikge1xuICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gKGZ1bmN0aW9uIGNhY2hlZEZuIChzdHIpIHtcbiAgICB2YXIgaGl0ID0gY2FjaGVbc3RyXTtcbiAgICByZXR1cm4gaGl0IHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSlcbiAgfSlcbn1cblxuLyoqXG4gKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxpbWl0ZWQgc3RyaW5nLlxuICovXG52YXIgY2FtZWxpemVSRSA9IC8tKFxcdykvZztcbnZhciBjYW1lbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCBmdW5jdGlvbiAoXywgYykgeyByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnOyB9KVxufSk7XG5cbi8qKlxuICogQ2FwaXRhbGl6ZSBhIHN0cmluZy5cbiAqL1xudmFyIGNhcGl0YWxpemUgPSBjYWNoZWQoZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG59KTtcblxuLyoqXG4gKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxuICovXG52YXIgaHlwaGVuYXRlUkUgPSAvKFteLV0pKFtBLVpdKS9nO1xudmFyIGh5cGhlbmF0ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJylcbiAgICAucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJylcbiAgICAudG9Mb3dlckNhc2UoKVxufSk7XG5cbi8qKlxuICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICovXG5mdW5jdGlvbiBiaW5kIChmbiwgY3R4KSB7XG4gIGZ1bmN0aW9uIGJvdW5kRm4gKGEpIHtcbiAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgcmV0dXJuIGxcbiAgICAgID8gbCA+IDFcbiAgICAgICAgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcbiAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgIDogZm4uY2FsbChjdHgpXG4gIH1cbiAgLy8gcmVjb3JkIG9yaWdpbmFsIGZuIGxlbmd0aFxuICBib3VuZEZuLl9sZW5ndGggPSBmbi5sZW5ndGg7XG4gIHJldHVybiBib3VuZEZuXG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkgKGxpc3QsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCAodG8sIF9mcm9tKSB7XG4gIGZvciAodmFyIGtleSBpbiBfZnJvbSkge1xuICAgIHRvW2tleV0gPSBfZnJvbVtrZXldO1xuICB9XG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIE1lcmdlIGFuIEFycmF5IG9mIE9iamVjdHMgaW50byBhIHNpbmdsZSBPYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0IChhcnIpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0pIHtcbiAgICAgIGV4dGVuZChyZXMsIGFycltpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyoqXG4gKiBQZXJmb3JtIG5vIG9wZXJhdGlvbi5cbiAqL1xuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG4vKipcbiAqIEFsd2F5cyByZXR1cm4gZmFsc2UuXG4gKi9cbnZhciBubyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9O1xuXG4vKipcbiAqIFJldHVybiBzYW1lIHZhbHVlXG4gKi9cbnZhciBpZGVudGl0eSA9IGZ1bmN0aW9uIChfKSB7IHJldHVybiBfOyB9O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgc3RhdGljIGtleXMgc3RyaW5nIGZyb20gY29tcGlsZXIgbW9kdWxlcy5cbiAqL1xuXG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIHZhbHVlcyBhcmUgbG9vc2VseSBlcXVhbCAtIHRoYXQgaXMsXG4gKiBpZiB0aGV5IGFyZSBwbGFpbiBvYmplY3RzLCBkbyB0aGV5IGhhdmUgdGhlIHNhbWUgc2hhcGU/XG4gKi9cbmZ1bmN0aW9uIGxvb3NlRXF1YWwgKGEsIGIpIHtcbiAgdmFyIGlzT2JqZWN0QSA9IGlzT2JqZWN0KGEpO1xuICB2YXIgaXNPYmplY3RCID0gaXNPYmplY3QoYik7XG4gIGlmIChpc09iamVjdEEgJiYgaXNPYmplY3RCKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSA9PT0gSlNPTi5zdHJpbmdpZnkoYilcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBwb3NzaWJsZSBjaXJjdWxhciByZWZlcmVuY2VcbiAgICAgIHJldHVybiBhID09PSBiXG4gICAgfVxuICB9IGVsc2UgaWYgKCFpc09iamVjdEEgJiYgIWlzT2JqZWN0Qikge1xuICAgIHJldHVybiBTdHJpbmcoYSkgPT09IFN0cmluZyhiKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGxvb3NlSW5kZXhPZiAoYXJyLCB2YWwpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobG9vc2VFcXVhbChhcnJbaV0sIHZhbCkpIHsgcmV0dXJuIGkgfVxuICB9XG4gIHJldHVybiAtMVxufVxuXG4vKipcbiAqIEVuc3VyZSBhIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbmx5IG9uY2UuXG4gKi9cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cbnZhciBTU1JfQVRUUiA9ICdkYXRhLXNlcnZlci1yZW5kZXJlZCc7XG5cbnZhciBBU1NFVF9UWVBFUyA9IFtcbiAgJ2NvbXBvbmVudCcsXG4gICdkaXJlY3RpdmUnLFxuICAnZmlsdGVyJ1xuXTtcblxudmFyIExJRkVDWUNMRV9IT09LUyA9IFtcbiAgJ2JlZm9yZUNyZWF0ZScsXG4gICdjcmVhdGVkJyxcbiAgJ2JlZm9yZU1vdW50JyxcbiAgJ21vdW50ZWQnLFxuICAnYmVmb3JlVXBkYXRlJyxcbiAgJ3VwZGF0ZWQnLFxuICAnYmVmb3JlRGVzdHJveScsXG4gICdkZXN0cm95ZWQnLFxuICAnYWN0aXZhdGVkJyxcbiAgJ2RlYWN0aXZhdGVkJ1xuXTtcblxuLyogICovXG5cbnZhciBjb25maWcgPSAoe1xuICAvKipcbiAgICogT3B0aW9uIG1lcmdlIHN0cmF0ZWdpZXMgKHVzZWQgaW4gY29yZS91dGlsL29wdGlvbnMpXG4gICAqL1xuICBvcHRpb25NZXJnZVN0cmF0ZWdpZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc3VwcHJlc3Mgd2FybmluZ3MuXG4gICAqL1xuICBzaWxlbnQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBTaG93IHByb2R1Y3Rpb24gbW9kZSB0aXAgbWVzc2FnZSBvbiBib290P1xuICAgKi9cbiAgcHJvZHVjdGlvblRpcDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyxcblxuICAvKipcbiAgICogV2hldGhlciB0byBlbmFibGUgZGV2dG9vbHNcbiAgICovXG4gIGRldnRvb2xzOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJlY29yZCBwZXJmXG4gICAqL1xuICBwZXJmb3JtYW5jZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEVycm9yIGhhbmRsZXIgZm9yIHdhdGNoZXIgZXJyb3JzXG4gICAqL1xuICBlcnJvckhhbmRsZXI6IG51bGwsXG5cbiAgLyoqXG4gICAqIElnbm9yZSBjZXJ0YWluIGN1c3RvbSBlbGVtZW50c1xuICAgKi9cbiAgaWdub3JlZEVsZW1lbnRzOiBbXSxcblxuICAvKipcbiAgICogQ3VzdG9tIHVzZXIga2V5IGFsaWFzZXMgZm9yIHYtb25cbiAgICovXG4gIGtleUNvZGVzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHRhZyBpcyByZXNlcnZlZCBzbyB0aGF0IGl0IGNhbm5vdCBiZSByZWdpc3RlcmVkIGFzIGFcbiAgICogY29tcG9uZW50LiBUaGlzIGlzIHBsYXRmb3JtLWRlcGVuZGVudCBhbmQgbWF5IGJlIG92ZXJ3cml0dGVuLlxuICAgKi9cbiAgaXNSZXNlcnZlZFRhZzogbm8sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBpcyByZXNlcnZlZCBzbyB0aGF0IGl0IGNhbm5vdCBiZSB1c2VkIGFzIGEgY29tcG9uZW50XG4gICAqIHByb3AuIFRoaXMgaXMgcGxhdGZvcm0tZGVwZW5kZW50IGFuZCBtYXkgYmUgb3ZlcndyaXR0ZW4uXG4gICAqL1xuICBpc1Jlc2VydmVkQXR0cjogbm8sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGFnIGlzIGFuIHVua25vd24gZWxlbWVudC5cbiAgICogUGxhdGZvcm0tZGVwZW5kZW50LlxuICAgKi9cbiAgaXNVbmtub3duRWxlbWVudDogbm8sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbmFtZXNwYWNlIG9mIGFuIGVsZW1lbnRcbiAgICovXG4gIGdldFRhZ05hbWVzcGFjZTogbm9vcCxcblxuICAvKipcbiAgICogUGFyc2UgdGhlIHJlYWwgdGFnIG5hbWUgZm9yIHRoZSBzcGVjaWZpYyBwbGF0Zm9ybS5cbiAgICovXG4gIHBhcnNlUGxhdGZvcm1UYWdOYW1lOiBpZGVudGl0eSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIG11c3QgYmUgYm91bmQgdXNpbmcgcHJvcGVydHksIGUuZy4gdmFsdWVcbiAgICogUGxhdGZvcm0tZGVwZW5kZW50LlxuICAgKi9cbiAgbXVzdFVzZVByb3A6IG5vLFxuXG4gIC8qKlxuICAgKiBFeHBvc2VkIGZvciBsZWdhY3kgcmVhc29uc1xuICAgKi9cbiAgX2xpZmVjeWNsZUhvb2tzOiBMSUZFQ1lDTEVfSE9PS1Ncbn0pO1xuXG4vKiAgKi9cblxudmFyIGVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWQgKHN0cikge1xuICB2YXIgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKTtcbiAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RlxufVxuXG4vKipcbiAqIERlZmluZSBhIHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBkZWYgKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgdmFsdWU6IHZhbCxcbiAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIFBhcnNlIHNpbXBsZSBwYXRoLlxuICovXG52YXIgYmFpbFJFID0gL1teXFx3LiRdLztcbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuICBpZiAoYmFpbFJFLnRlc3QocGF0aCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFvYmopIHsgcmV0dXJuIH1cbiAgICAgIG9iaiA9IG9ialtzZWdtZW50c1tpXV07XG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIHdhcm4gPSBub29wO1xudmFyIHRpcCA9IG5vb3A7XG52YXIgZm9ybWF0Q29tcG9uZW50TmFtZSA9IChudWxsKTsgLy8gd29yayBhcm91bmQgZmxvdyBjaGVja1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJztcbiAgdmFyIGNsYXNzaWZ5UkUgPSAvKD86XnxbLV9dKShcXHcpL2c7XG4gIHZhciBjbGFzc2lmeSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0clxuICAgIC5yZXBsYWNlKGNsYXNzaWZ5UkUsIGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnRvVXBwZXJDYXNlKCk7IH0pXG4gICAgLnJlcGxhY2UoL1stX10vZywgJycpOyB9O1xuXG4gIHdhcm4gPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJbVnVlIHdhcm5dOiBcIiArIG1zZyArIChcbiAgICAgICAgdm0gPyBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlKHZtKSA6ICcnXG4gICAgICApKTtcbiAgICB9XG4gIH07XG5cbiAgdGlwID0gZnVuY3Rpb24gKG1zZywgdm0pIHtcbiAgICBpZiAoaGFzQ29uc29sZSAmJiAoIWNvbmZpZy5zaWxlbnQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJbVnVlIHRpcF06IFwiICsgbXNnICsgKFxuICAgICAgICB2bSA/IGdlbmVyYXRlQ29tcG9uZW50VHJhY2Uodm0pIDogJydcbiAgICAgICkpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXRDb21wb25lbnROYW1lID0gZnVuY3Rpb24gKHZtLCBpbmNsdWRlRmlsZSkge1xuICAgIGlmICh2bS4kcm9vdCA9PT0gdm0pIHtcbiAgICAgIHJldHVybiAnPFJvb3Q+J1xuICAgIH1cbiAgICB2YXIgbmFtZSA9IHR5cGVvZiB2bSA9PT0gJ3N0cmluZydcbiAgICAgID8gdm1cbiAgICAgIDogdHlwZW9mIHZtID09PSAnZnVuY3Rpb24nICYmIHZtLm9wdGlvbnNcbiAgICAgICAgPyB2bS5vcHRpb25zLm5hbWVcbiAgICAgICAgOiB2bS5faXNWdWVcbiAgICAgICAgICA/IHZtLiRvcHRpb25zLm5hbWUgfHwgdm0uJG9wdGlvbnMuX2NvbXBvbmVudFRhZ1xuICAgICAgICAgIDogdm0ubmFtZTtcblxuICAgIHZhciBmaWxlID0gdm0uX2lzVnVlICYmIHZtLiRvcHRpb25zLl9fZmlsZTtcbiAgICBpZiAoIW5hbWUgJiYgZmlsZSkge1xuICAgICAgdmFyIG1hdGNoID0gZmlsZS5tYXRjaCgvKFteL1xcXFxdKylcXC52dWUkLyk7XG4gICAgICBuYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIChuYW1lID8gKFwiPFwiICsgKGNsYXNzaWZ5KG5hbWUpKSArIFwiPlwiKSA6IFwiPEFub255bW91cz5cIikgK1xuICAgICAgKGZpbGUgJiYgaW5jbHVkZUZpbGUgIT09IGZhbHNlID8gKFwiIGF0IFwiICsgZmlsZSkgOiAnJylcbiAgICApXG4gIH07XG5cbiAgdmFyIHJlcGVhdCA9IGZ1bmN0aW9uIChzdHIsIG4pIHtcbiAgICB2YXIgcmVzID0gJyc7XG4gICAgd2hpbGUgKG4pIHtcbiAgICAgIGlmIChuICUgMiA9PT0gMSkgeyByZXMgKz0gc3RyOyB9XG4gICAgICBpZiAobiA+IDEpIHsgc3RyICs9IHN0cjsgfVxuICAgICAgbiA+Pj0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9O1xuXG4gIHZhciBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlID0gZnVuY3Rpb24gKHZtKSB7XG4gICAgaWYgKHZtLl9pc1Z1ZSAmJiB2bS4kcGFyZW50KSB7XG4gICAgICB2YXIgdHJlZSA9IFtdO1xuICAgICAgdmFyIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSA9IDA7XG4gICAgICB3aGlsZSAodm0pIHtcbiAgICAgICAgaWYgKHRyZWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBsYXN0ID0gdHJlZVt0cmVlLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmIChsYXN0LmNvbnN0cnVjdG9yID09PSB2bS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlKys7XG4gICAgICAgICAgICB2bSA9IHZtLiRwYXJlbnQ7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlID4gMCkge1xuICAgICAgICAgICAgdHJlZVt0cmVlLmxlbmd0aCAtIDFdID0gW2xhc3QsIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZV07XG4gICAgICAgICAgICBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmVlLnB1c2godm0pO1xuICAgICAgICB2bSA9IHZtLiRwYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gJ1xcblxcbmZvdW5kIGluXFxuXFxuJyArIHRyZWVcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodm0sIGkpIHsgcmV0dXJuIChcIlwiICsgKGkgPT09IDAgPyAnLS0tPiAnIDogcmVwZWF0KCcgJywgNSArIGkgKiAyKSkgKyAoQXJyYXkuaXNBcnJheSh2bSlcbiAgICAgICAgICAgID8gKChmb3JtYXRDb21wb25lbnROYW1lKHZtWzBdKSkgKyBcIi4uLiAoXCIgKyAodm1bMV0pICsgXCIgcmVjdXJzaXZlIGNhbGxzKVwiKVxuICAgICAgICAgICAgOiBmb3JtYXRDb21wb25lbnROYW1lKHZtKSkpOyB9KVxuICAgICAgICAuam9pbignXFxuJylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcIlxcblxcbihmb3VuZCBpbiBcIiArIChmb3JtYXRDb21wb25lbnROYW1lKHZtKSkgKyBcIilcIilcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBoYW5kbGVFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICBpZiAoY29uZmlnLmVycm9ySGFuZGxlcikge1xuICAgIGNvbmZpZy5lcnJvckhhbmRsZXIuY2FsbChudWxsLCBlcnIsIHZtLCBpbmZvKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybigoXCJFcnJvciBpbiBcIiArIGluZm8gKyBcIjogXFxcIlwiICsgKGVyci50b1N0cmluZygpKSArIFwiXFxcIlwiKSwgdm0pO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChpbkJyb3dzZXIgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cbi8qIGdsb2JhbHMgTXV0YXRpb25PYnNlcnZlciAqL1xuXG4vLyBjYW4gd2UgdXNlIF9fcHJvdG9fXz9cbnZhciBoYXNQcm90byA9ICdfX3Byb3RvX18nIGluIHt9O1xuXG4vLyBCcm93c2VyIGVudmlyb25tZW50IHNuaWZmaW5nXG52YXIgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgVUEgPSBpbkJyb3dzZXIgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbnZhciBpc0lFID0gVUEgJiYgL21zaWV8dHJpZGVudC8udGVzdChVQSk7XG52YXIgaXNJRTkgPSBVQSAmJiBVQS5pbmRleE9mKCdtc2llIDkuMCcpID4gMDtcbnZhciBpc0VkZ2UgPSBVQSAmJiBVQS5pbmRleE9mKCdlZGdlLycpID4gMDtcbnZhciBpc0FuZHJvaWQgPSBVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwO1xudmFyIGlzSU9TID0gVUEgJiYgL2lwaG9uZXxpcGFkfGlwb2R8aW9zLy50ZXN0KFVBKTtcbnZhciBpc0Nocm9tZSA9IFVBICYmIC9jaHJvbWVcXC9cXGQrLy50ZXN0KFVBKSAmJiAhaXNFZGdlO1xuXG52YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG5pZiAoaW5Ccm93c2VyKSB7XG4gIHRyeSB7XG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3B0cywgJ3Bhc3NpdmUnLCAoe1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQgKCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gKSk7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8yODVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdC1wYXNzaXZlJywgbnVsbCwgb3B0cyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cbi8vIHRoaXMgbmVlZHMgdG8gYmUgbGF6eS1ldmFsZWQgYmVjYXVzZSB2dWUgbWF5IGJlIHJlcXVpcmVkIGJlZm9yZVxuLy8gdnVlLXNlcnZlci1yZW5kZXJlciBjYW4gc2V0IFZVRV9FTlZcbnZhciBfaXNTZXJ2ZXI7XG52YXIgaXNTZXJ2ZXJSZW5kZXJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChfaXNTZXJ2ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghaW5Ccm93c2VyICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBkZXRlY3QgcHJlc2VuY2Ugb2YgdnVlLXNlcnZlci1yZW5kZXJlciBhbmQgYXZvaWRcbiAgICAgIC8vIFdlYnBhY2sgc2hpbW1pbmcgdGhlIHByb2Nlc3NcbiAgICAgIF9pc1NlcnZlciA9IGdsb2JhbFsncHJvY2VzcyddLmVudi5WVUVfRU5WID09PSAnc2VydmVyJztcbiAgICB9IGVsc2Uge1xuICAgICAgX2lzU2VydmVyID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBfaXNTZXJ2ZXJcbn07XG5cbi8vIGRldGVjdCBkZXZ0b29sc1xudmFyIGRldnRvb2xzID0gaW5Ccm93c2VyICYmIHdpbmRvdy5fX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gaXNOYXRpdmUgKEN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChDdG9yLnRvU3RyaW5nKCkpXG59XG5cbnZhciBoYXNTeW1ib2wgPVxuICB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTeW1ib2wpICYmXG4gIHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShSZWZsZWN0Lm93bktleXMpO1xuXG4vKipcbiAqIERlZmVyIGEgdGFzayB0byBleGVjdXRlIGl0IGFzeW5jaHJvbm91c2x5LlxuICovXG52YXIgbmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgY2FsbGJhY2tzID0gW107XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciB0aW1lckZ1bmM7XG5cbiAgZnVuY3Rpb24gbmV4dFRpY2tIYW5kbGVyICgpIHtcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gICAgdmFyIGNvcGllcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBjYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29waWVzW2ldKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gdGhlIG5leHRUaWNrIGJlaGF2aW9yIGxldmVyYWdlcyB0aGUgbWljcm90YXNrIHF1ZXVlLCB3aGljaCBjYW4gYmUgYWNjZXNzZWRcbiAgLy8gdmlhIGVpdGhlciBuYXRpdmUgUHJvbWlzZS50aGVuIG9yIE11dGF0aW9uT2JzZXJ2ZXIuXG4gIC8vIE11dGF0aW9uT2JzZXJ2ZXIgaGFzIHdpZGVyIHN1cHBvcnQsIGhvd2V2ZXIgaXQgaXMgc2VyaW91c2x5IGJ1Z2dlZCBpblxuICAvLyBVSVdlYlZpZXcgaW4gaU9TID49IDkuMy4zIHdoZW4gdHJpZ2dlcmVkIGluIHRvdWNoIGV2ZW50IGhhbmRsZXJzLiBJdFxuICAvLyBjb21wbGV0ZWx5IHN0b3BzIHdvcmtpbmcgYWZ0ZXIgdHJpZ2dlcmluZyBhIGZldyB0aW1lcy4uLiBzbywgaWYgbmF0aXZlXG4gIC8vIFByb21pc2UgaXMgYXZhaWxhYmxlLCB3ZSB3aWxsIHVzZSBpdDpcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUHJvbWlzZSkpIHtcbiAgICB2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIHZhciBsb2dFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB9O1xuICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHAudGhlbihuZXh0VGlja0hhbmRsZXIpLmNhdGNoKGxvZ0Vycm9yKTtcbiAgICAgIC8vIGluIHByb2JsZW1hdGljIFVJV2ViVmlld3MsIFByb21pc2UudGhlbiBkb2Vzbid0IGNvbXBsZXRlbHkgYnJlYWssIGJ1dFxuICAgICAgLy8gaXQgY2FuIGdldCBzdHVjayBpbiBhIHdlaXJkIHN0YXRlIHdoZXJlIGNhbGxiYWNrcyBhcmUgcHVzaGVkIGludG8gdGhlXG4gICAgICAvLyBtaWNyb3Rhc2sgcXVldWUgYnV0IHRoZSBxdWV1ZSBpc24ndCBiZWluZyBmbHVzaGVkLCB1bnRpbCB0aGUgYnJvd3NlclxuICAgICAgLy8gbmVlZHMgdG8gZG8gc29tZSBvdGhlciB3b3JrLCBlLmcuIGhhbmRsZSBhIHRpbWVyLiBUaGVyZWZvcmUgd2UgY2FuXG4gICAgICAvLyBcImZvcmNlXCIgdGhlIG1pY3JvdGFzayBxdWV1ZSB0byBiZSBmbHVzaGVkIGJ5IGFkZGluZyBhbiBlbXB0eSB0aW1lci5cbiAgICAgIGlmIChpc0lPUykgeyBzZXRUaW1lb3V0KG5vb3ApOyB9XG4gICAgfTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxuICAgIGlzTmF0aXZlKE11dGF0aW9uT2JzZXJ2ZXIpIHx8XG4gICAgLy8gUGhhbnRvbUpTIGFuZCBpT1MgNy54XG4gICAgTXV0YXRpb25PYnNlcnZlci50b1N0cmluZygpID09PSAnW29iamVjdCBNdXRhdGlvbk9ic2VydmVyQ29uc3RydWN0b3JdJ1xuICApKSB7XG4gICAgLy8gdXNlIE11dGF0aW9uT2JzZXJ2ZXIgd2hlcmUgbmF0aXZlIFByb21pc2UgaXMgbm90IGF2YWlsYWJsZSxcbiAgICAvLyBlLmcuIFBoYW50b21KUyBJRTExLCBpT1M3LCBBbmRyb2lkIDQuNFxuICAgIHZhciBjb3VudGVyID0gMTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihuZXh0VGlja0hhbmRsZXIpO1xuICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhjb3VudGVyKSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0ZXh0Tm9kZSwge1xuICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICAgIH0pO1xuICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvdW50ZXIgPSAoY291bnRlciArIDEpICUgMjtcbiAgICAgIHRleHROb2RlLmRhdGEgPSBTdHJpbmcoY291bnRlcik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBmYWxsYmFjayB0byBzZXRUaW1lb3V0XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KG5leHRUaWNrSGFuZGxlciwgMCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBxdWV1ZU5leHRUaWNrIChjYiwgY3R4KSB7XG4gICAgdmFyIF9yZXNvbHZlO1xuICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjYikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNiLmNhbGwoY3R4KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGUsIGN0eCwgJ25leHRUaWNrJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoX3Jlc29sdmUpIHtcbiAgICAgICAgX3Jlc29sdmUoY3R4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgICAgdGltZXJGdW5jKCk7XG4gICAgfVxuICAgIGlmICghY2IgJiYgdHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkoKTtcblxudmFyIF9TZXQ7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTZXQpKSB7XG4gIC8vIHVzZSBuYXRpdmUgU2V0IHdoZW4gYXZhaWxhYmxlLlxuICBfU2V0ID0gU2V0O1xufSBlbHNlIHtcbiAgLy8gYSBub24tc3RhbmRhcmQgU2V0IHBvbHlmaWxsIHRoYXQgb25seSB3b3JrcyB3aXRoIHByaW1pdGl2ZSBrZXlzLlxuICBfU2V0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTZXQgKCkge1xuICAgICAgdGhpcy5zZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBTZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIGhhcyAoa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRba2V5XSA9PT0gdHJ1ZVxuICAgIH07XG4gICAgU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQgKGtleSkge1xuICAgICAgdGhpcy5zZXRba2V5XSA9IHRydWU7XG4gICAgfTtcbiAgICBTZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKCkge1xuICAgICAgdGhpcy5zZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH07XG5cbiAgICByZXR1cm4gU2V0O1xuICB9KCkpO1xufVxuXG4vKiAgKi9cblxuXG52YXIgdWlkJDEgPSAwO1xuXG4vKipcbiAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cbiAqL1xudmFyIERlcCA9IGZ1bmN0aW9uIERlcCAoKSB7XG4gIHRoaXMuaWQgPSB1aWQkMSsrO1xuICB0aGlzLnN1YnMgPSBbXTtcbn07XG5cbkRlcC5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gYWRkU3ViIChzdWIpIHtcbiAgdGhpcy5zdWJzLnB1c2goc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gcmVtb3ZlU3ViIChzdWIpIHtcbiAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgaWYgKERlcC50YXJnZXQpIHtcbiAgICBEZXAudGFyZ2V0LmFkZERlcCh0aGlzKTtcbiAgfVxufTtcblxuRGVwLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbiBub3RpZnkgKCkge1xuICAvLyBzdGFiaWxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICB2YXIgc3VicyA9IHRoaXMuc3Vicy5zbGljZSgpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgc3Vic1tpXS51cGRhdGUoKTtcbiAgfVxufTtcblxuLy8gdGhlIGN1cnJlbnQgdGFyZ2V0IHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkLlxuLy8gdGhpcyBpcyBnbG9iYWxseSB1bmlxdWUgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvbmx5IG9uZVxuLy8gd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQgYXQgYW55IHRpbWUuXG5EZXAudGFyZ2V0ID0gbnVsbDtcbnZhciB0YXJnZXRTdGFjayA9IFtdO1xuXG5mdW5jdGlvbiBwdXNoVGFyZ2V0IChfdGFyZ2V0KSB7XG4gIGlmIChEZXAudGFyZ2V0KSB7IHRhcmdldFN0YWNrLnB1c2goRGVwLnRhcmdldCk7IH1cbiAgRGVwLnRhcmdldCA9IF90YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHBvcFRhcmdldCAoKSB7XG4gIERlcC50YXJnZXQgPSB0YXJnZXRTdGFjay5wb3AoKTtcbn1cblxuLypcbiAqIG5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBwbGF5IHdlbGwgd2l0aFxuICogZHluYW1pY2FsbHkgYWNjZXNzaW5nIG1ldGhvZHMgb24gQXJyYXkgcHJvdG90eXBlXG4gKi9cblxudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG52YXIgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKTtbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NwbGljZScsXG4gICdzb3J0JyxcbiAgJ3JldmVyc2UnXG5dXG4uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF07XG4gIGRlZihhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG4gICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG4gICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShpKTtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzJDFbaV07XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfXztcbiAgICB2YXIgaW5zZXJ0ZWQ7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgJ3B1c2gnOlxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3M7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBpZiAoaW5zZXJ0ZWQpIHsgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKTsgfVxuICAgIC8vIG5vdGlmeSBjaGFuZ2VcbiAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KTtcbn0pO1xuXG4vKiAgKi9cblxudmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcyk7XG5cbi8qKlxuICogQnkgZGVmYXVsdCwgd2hlbiBhIHJlYWN0aXZlIHByb3BlcnR5IGlzIHNldCwgdGhlIG5ldyB2YWx1ZSBpc1xuICogYWxzbyBjb252ZXJ0ZWQgdG8gYmVjb21lIHJlYWN0aXZlLiBIb3dldmVyIHdoZW4gcGFzc2luZyBkb3duIHByb3BzLFxuICogd2UgZG9uJ3Qgd2FudCB0byBmb3JjZSBjb252ZXJzaW9uIGJlY2F1c2UgdGhlIHZhbHVlIG1heSBiZSBhIG5lc3RlZCB2YWx1ZVxuICogdW5kZXIgYSBmcm96ZW4gZGF0YSBzdHJ1Y3R1cmUuIENvbnZlcnRpbmcgaXQgd291bGQgZGVmZWF0IHRoZSBvcHRpbWl6YXRpb24uXG4gKi9cbnZhciBvYnNlcnZlclN0YXRlID0ge1xuICBzaG91bGRDb252ZXJ0OiB0cnVlLFxuICBpc1NldHRpbmdQcm9wczogZmFsc2Vcbn07XG5cbi8qKlxuICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBhcmUgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxuICogb2JqZWN0LiBPbmNlIGF0dGFjaGVkLCB0aGUgb2JzZXJ2ZXIgY29udmVydHMgdGFyZ2V0XG4gKiBvYmplY3QncyBwcm9wZXJ0eSBrZXlzIGludG8gZ2V0dGVyL3NldHRlcnMgdGhhdFxuICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoZXMgdXBkYXRlcy5cbiAqL1xudmFyIE9ic2VydmVyID0gZnVuY3Rpb24gT2JzZXJ2ZXIgKHZhbHVlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5kZXAgPSBuZXcgRGVwKCk7XG4gIHRoaXMudm1Db3VudCA9IDA7XG4gIGRlZih2YWx1ZSwgJ19fb2JfXycsIHRoaXMpO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB2YXIgYXVnbWVudCA9IGhhc1Byb3RvXG4gICAgICA/IHByb3RvQXVnbWVudFxuICAgICAgOiBjb3B5QXVnbWVudDtcbiAgICBhdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMsIGFycmF5S2V5cyk7XG4gICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2Fsayh2YWx1ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogV2FsayB0aHJvdWdoIGVhY2ggcHJvcGVydHkgYW5kIGNvbnZlcnQgdGhlbSBpbnRvXG4gKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LlxuICovXG5PYnNlcnZlci5wcm90b3R5cGUud2FsayA9IGZ1bmN0aW9uIHdhbGsgKG9iaikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGRlZmluZVJlYWN0aXZlJCQxKG9iaiwga2V5c1tpXSwgb2JqW2tleXNbaV1dKTtcbiAgfVxufTtcblxuLyoqXG4gKiBPYnNlcnZlIGEgbGlzdCBvZiBBcnJheSBpdGVtcy5cbiAqL1xuT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmVBcnJheSA9IGZ1bmN0aW9uIG9ic2VydmVBcnJheSAoaXRlbXMpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBvYnNlcnZlKGl0ZW1zW2ldKTtcbiAgfVxufTtcblxuLy8gaGVscGVyc1xuXG4vKipcbiAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcbiAqIHRoZSBwcm90b3R5cGUgY2hhaW4gdXNpbmcgX19wcm90b19fXG4gKi9cbmZ1bmN0aW9uIHByb3RvQXVnbWVudCAodGFyZ2V0LCBzcmMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbiAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyYztcbiAgLyogZXNsaW50LWVuYWJsZSBuby1wcm90byAqL1xufVxuXG4vKipcbiAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBkZWZpbmluZ1xuICogaGlkZGVuIHByb3BlcnRpZXMuXG4gKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBjb3B5QXVnbWVudCAodGFyZ2V0LCBzcmMsIGtleXMpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGRlZih0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9XG59XG5cbi8qKlxuICogQXR0ZW1wdCB0byBjcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2UgZm9yIGEgdmFsdWUsXG4gKiByZXR1cm5zIHRoZSBuZXcgb2JzZXJ2ZXIgaWYgc3VjY2Vzc2Z1bGx5IG9ic2VydmVkLFxuICogb3IgdGhlIGV4aXN0aW5nIG9ic2VydmVyIGlmIHRoZSB2YWx1ZSBhbHJlYWR5IGhhcyBvbmUuXG4gKi9cbmZ1bmN0aW9uIG9ic2VydmUgKHZhbHVlLCBhc1Jvb3REYXRhKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iO1xuICBpZiAoaGFzT3duKHZhbHVlLCAnX19vYl9fJykgJiYgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXIpIHtcbiAgICBvYiA9IHZhbHVlLl9fb2JfXztcbiAgfSBlbHNlIGlmIChcbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgJiZcbiAgICAhaXNTZXJ2ZXJSZW5kZXJpbmcoKSAmJlxuICAgIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqZWN0KHZhbHVlKSkgJiZcbiAgICBPYmplY3QuaXNFeHRlbnNpYmxlKHZhbHVlKSAmJlxuICAgICF2YWx1ZS5faXNWdWVcbiAgKSB7XG4gICAgb2IgPSBuZXcgT2JzZXJ2ZXIodmFsdWUpO1xuICB9XG4gIGlmIChhc1Jvb3REYXRhICYmIG9iKSB7XG4gICAgb2Iudm1Db3VudCsrO1xuICB9XG4gIHJldHVybiBvYlxufVxuXG4vKipcbiAqIERlZmluZSBhIHJlYWN0aXZlIHByb3BlcnR5IG9uIGFuIE9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUkJDEgKFxuICBvYmosXG4gIGtleSxcbiAgdmFsLFxuICBjdXN0b21TZXR0ZXJcbikge1xuICB2YXIgZGVwID0gbmV3IERlcCgpO1xuXG4gIHZhciBwcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICBpZiAocHJvcGVydHkgJiYgcHJvcGVydHkuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gY2F0ZXIgZm9yIHByZS1kZWZpbmVkIGdldHRlci9zZXR0ZXJzXG4gIHZhciBnZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5nZXQ7XG4gIHZhciBzZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5zZXQ7XG5cbiAgdmFyIGNoaWxkT2IgPSBvYnNlcnZlKHZhbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIgKCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgIGRlcC5kZXBlbmQoKTtcbiAgICAgICAgaWYgKGNoaWxkT2IpIHtcbiAgICAgICAgICBjaGlsZE9iLmRlcC5kZXBlbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBkZXBlbmRBcnJheSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiByZWFjdGl2ZVNldHRlciAobmV3VmFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlICovXG4gICAgICBpZiAobmV3VmFsID09PSB2YWx1ZSB8fCAobmV3VmFsICE9PSBuZXdWYWwgJiYgdmFsdWUgIT09IHZhbHVlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlICovXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjdXN0b21TZXR0ZXIpIHtcbiAgICAgICAgY3VzdG9tU2V0dGVyKCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IG5ld1ZhbDtcbiAgICAgIH1cbiAgICAgIGNoaWxkT2IgPSBvYnNlcnZlKG5ld1ZhbCk7XG4gICAgICBkZXAubm90aWZ5KCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYmplY3QuIEFkZHMgdGhlIG5ldyBwcm9wZXJ0eSBhbmRcbiAqIHRyaWdnZXJzIGNoYW5nZSBub3RpZmljYXRpb24gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3RcbiAqIGFscmVhZHkgZXhpc3QuXG4gKi9cbmZ1bmN0aW9uIHNldCAodGFyZ2V0LCBrZXksIHZhbCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIHR5cGVvZiBrZXkgPT09ICdudW1iZXInKSB7XG4gICAgdGFyZ2V0Lmxlbmd0aCA9IE1hdGgubWF4KHRhcmdldC5sZW5ndGgsIGtleSk7XG4gICAgdGFyZ2V0LnNwbGljZShrZXksIDEsIHZhbCk7XG4gICAgcmV0dXJuIHZhbFxuICB9XG4gIGlmIChoYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIHZhbFxuICB9XG4gIHZhciBvYiA9ICh0YXJnZXQgKS5fX29iX187XG4gIGlmICh0YXJnZXQuX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdBdm9pZCBhZGRpbmcgcmVhY3RpdmUgcHJvcGVydGllcyB0byBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcbiAgICAgICdhdCBydW50aW1lIC0gZGVjbGFyZSBpdCB1cGZyb250IGluIHRoZSBkYXRhIG9wdGlvbi4nXG4gICAgKTtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgaWYgKCFvYikge1xuICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgIHJldHVybiB2YWxcbiAgfVxuICBkZWZpbmVSZWFjdGl2ZSQkMShvYi52YWx1ZSwga2V5LCB2YWwpO1xuICBvYi5kZXAubm90aWZ5KCk7XG4gIHJldHVybiB2YWxcbn1cblxuLyoqXG4gKiBEZWxldGUgYSBwcm9wZXJ0eSBhbmQgdHJpZ2dlciBjaGFuZ2UgaWYgbmVjZXNzYXJ5LlxuICovXG5mdW5jdGlvbiBkZWwgKHRhcmdldCwga2V5KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgdHlwZW9mIGtleSA9PT0gJ251bWJlcicpIHtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCApLl9fb2JfXztcbiAgaWYgKHRhcmdldC5faXNWdWUgfHwgKG9iICYmIG9iLnZtQ291bnQpKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgJ0F2b2lkIGRlbGV0aW5nIHByb3BlcnRpZXMgb24gYSBWdWUgaW5zdGFuY2Ugb3IgaXRzIHJvb3QgJGRhdGEgJyArXG4gICAgICAnLSBqdXN0IHNldCBpdCB0byBudWxsLidcbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIGlmICghaGFzT3duKHRhcmdldCwga2V5KSkge1xuICAgIHJldHVyblxuICB9XG4gIGRlbGV0ZSB0YXJnZXRba2V5XTtcbiAgaWYgKCFvYikge1xuICAgIHJldHVyblxuICB9XG4gIG9iLmRlcC5ub3RpZnkoKTtcbn1cblxuLyoqXG4gKiBDb2xsZWN0IGRlcGVuZGVuY2llcyBvbiBhcnJheSBlbGVtZW50cyB3aGVuIHRoZSBhcnJheSBpcyB0b3VjaGVkLCBzaW5jZVxuICogd2UgY2Fubm90IGludGVyY2VwdCBhcnJheSBlbGVtZW50IGFjY2VzcyBsaWtlIHByb3BlcnR5IGdldHRlcnMuXG4gKi9cbmZ1bmN0aW9uIGRlcGVuZEFycmF5ICh2YWx1ZSkge1xuICBmb3IgKHZhciBlID0gKHZvaWQgMCksIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZSA9IHZhbHVlW2ldO1xuICAgIGUgJiYgZS5fX29iX18gJiYgZS5fX29iX18uZGVwLmRlcGVuZCgpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGUpKSB7XG4gICAgICBkZXBlbmRBcnJheShlKTtcbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogT3B0aW9uIG92ZXJ3cml0aW5nIHN0cmF0ZWdpZXMgYXJlIGZ1bmN0aW9ucyB0aGF0IGhhbmRsZVxuICogaG93IHRvIG1lcmdlIGEgcGFyZW50IG9wdGlvbiB2YWx1ZSBhbmQgYSBjaGlsZCBvcHRpb25cbiAqIHZhbHVlIGludG8gdGhlIGZpbmFsIHZhbHVlLlxuICovXG52YXIgc3RyYXRzID0gY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcztcblxuLyoqXG4gKiBPcHRpb25zIHdpdGggcmVzdHJpY3Rpb25zXG4gKi9cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHN0cmF0cy5lbCA9IHN0cmF0cy5wcm9wc0RhdGEgPSBmdW5jdGlvbiAocGFyZW50LCBjaGlsZCwgdm0sIGtleSkge1xuICAgIGlmICghdm0pIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIFwib3B0aW9uIFxcXCJcIiArIGtleSArIFwiXFxcIiBjYW4gb25seSBiZSB1c2VkIGR1cmluZyBpbnN0YW5jZSBcIiArXG4gICAgICAgICdjcmVhdGlvbiB3aXRoIHRoZSBgbmV3YCBrZXl3b3JkLidcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0U3RyYXQocGFyZW50LCBjaGlsZClcbiAgfTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgdGhhdCByZWN1cnNpdmVseSBtZXJnZXMgdHdvIGRhdGEgb2JqZWN0cyB0b2dldGhlci5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VEYXRhICh0bywgZnJvbSkge1xuICBpZiAoIWZyb20pIHsgcmV0dXJuIHRvIH1cbiAgdmFyIGtleSwgdG9WYWwsIGZyb21WYWw7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJvbSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgdG9WYWwgPSB0b1trZXldO1xuICAgIGZyb21WYWwgPSBmcm9tW2tleV07XG4gICAgaWYgKCFoYXNPd24odG8sIGtleSkpIHtcbiAgICAgIHNldCh0bywga2V5LCBmcm9tVmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodG9WYWwpICYmIGlzUGxhaW5PYmplY3QoZnJvbVZhbCkpIHtcbiAgICAgIG1lcmdlRGF0YSh0b1ZhbCwgZnJvbVZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIERhdGFcbiAqL1xuc3RyYXRzLmRhdGEgPSBmdW5jdGlvbiAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWwsXG4gIHZtXG4pIHtcbiAgaWYgKCF2bSkge1xuICAgIC8vIGluIGEgVnVlLmV4dGVuZCBtZXJnZSwgYm90aCBzaG91bGQgYmUgZnVuY3Rpb25zXG4gICAgaWYgKCFjaGlsZFZhbCkge1xuICAgICAgcmV0dXJuIHBhcmVudFZhbFxuICAgIH1cbiAgICBpZiAodHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgICdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuICAgICAgICAndGhhdCByZXR1cm5zIGEgcGVyLWluc3RhbmNlIHZhbHVlIGluIGNvbXBvbmVudCAnICtcbiAgICAgICAgJ2RlZmluaXRpb25zLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgICAgcmV0dXJuIHBhcmVudFZhbFxuICAgIH1cbiAgICBpZiAoIXBhcmVudFZhbCkge1xuICAgICAgcmV0dXJuIGNoaWxkVmFsXG4gICAgfVxuICAgIC8vIHdoZW4gcGFyZW50VmFsICYgY2hpbGRWYWwgYXJlIGJvdGggcHJlc2VudCxcbiAgICAvLyB3ZSBuZWVkIHRvIHJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgICAvLyBtZXJnZWQgcmVzdWx0IG9mIGJvdGggZnVuY3Rpb25zLi4uIG5vIG5lZWQgdG9cbiAgICAvLyBjaGVjayBpZiBwYXJlbnRWYWwgaXMgYSBmdW5jdGlvbiBoZXJlIGJlY2F1c2VcbiAgICAvLyBpdCBoYXMgdG8gYmUgYSBmdW5jdGlvbiB0byBwYXNzIHByZXZpb3VzIG1lcmdlcy5cbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkRGF0YUZuICgpIHtcbiAgICAgIHJldHVybiBtZXJnZURhdGEoXG4gICAgICAgIGNoaWxkVmFsLmNhbGwodGhpcyksXG4gICAgICAgIHBhcmVudFZhbC5jYWxsKHRoaXMpXG4gICAgICApXG4gICAgfVxuICB9IGVsc2UgaWYgKHBhcmVudFZhbCB8fCBjaGlsZFZhbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWRJbnN0YW5jZURhdGFGbiAoKSB7XG4gICAgICAvLyBpbnN0YW5jZSBtZXJnZVxuICAgICAgdmFyIGluc3RhbmNlRGF0YSA9IHR5cGVvZiBjaGlsZFZhbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IGNoaWxkVmFsLmNhbGwodm0pXG4gICAgICAgIDogY2hpbGRWYWw7XG4gICAgICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gcGFyZW50VmFsLmNhbGwodm0pXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGluc3RhbmNlRGF0YSkge1xuICAgICAgICByZXR1cm4gbWVyZ2VEYXRhKGluc3RhbmNlRGF0YSwgZGVmYXVsdERhdGEpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVmYXVsdERhdGFcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSG9va3MgYW5kIHByb3BzIGFyZSBtZXJnZWQgYXMgYXJyYXlzLlxuICovXG5mdW5jdGlvbiBtZXJnZUhvb2sgKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsXG4pIHtcbiAgcmV0dXJuIGNoaWxkVmFsXG4gICAgPyBwYXJlbnRWYWxcbiAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZFZhbClcbiAgICAgICAgPyBjaGlsZFZhbFxuICAgICAgICA6IFtjaGlsZFZhbF1cbiAgICA6IHBhcmVudFZhbFxufVxuXG5MSUZFQ1lDTEVfSE9PS1MuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICBzdHJhdHNbaG9va10gPSBtZXJnZUhvb2s7XG59KTtcblxuLyoqXG4gKiBBc3NldHNcbiAqXG4gKiBXaGVuIGEgdm0gaXMgcHJlc2VudCAoaW5zdGFuY2UgY3JlYXRpb24pLCB3ZSBuZWVkIHRvIGRvXG4gKiBhIHRocmVlLXdheSBtZXJnZSBiZXR3ZWVuIGNvbnN0cnVjdG9yIG9wdGlvbnMsIGluc3RhbmNlXG4gKiBvcHRpb25zIGFuZCBwYXJlbnQgb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VBc3NldHMgKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgdmFyIHJlcyA9IE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpO1xuICByZXR1cm4gY2hpbGRWYWxcbiAgICA/IGV4dGVuZChyZXMsIGNoaWxkVmFsKVxuICAgIDogcmVzXG59XG5cbkFTU0VUX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgc3RyYXRzW3R5cGUgKyAncyddID0gbWVyZ2VBc3NldHM7XG59KTtcblxuLyoqXG4gKiBXYXRjaGVycy5cbiAqXG4gKiBXYXRjaGVycyBoYXNoZXMgc2hvdWxkIG5vdCBvdmVyd3JpdGUgb25lXG4gKiBhbm90aGVyLCBzbyB3ZSBtZXJnZSB0aGVtIGFzIGFycmF5cy5cbiAqL1xuc3RyYXRzLndhdGNoID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghY2hpbGRWYWwpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpIH1cbiAgaWYgKCFwYXJlbnRWYWwpIHsgcmV0dXJuIGNoaWxkVmFsIH1cbiAgdmFyIHJldCA9IHt9O1xuICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICBmb3IgKHZhciBrZXkgaW4gY2hpbGRWYWwpIHtcbiAgICB2YXIgcGFyZW50ID0gcmV0W2tleV07XG4gICAgdmFyIGNoaWxkID0gY2hpbGRWYWxba2V5XTtcbiAgICBpZiAocGFyZW50ICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIHBhcmVudCA9IFtwYXJlbnRdO1xuICAgIH1cbiAgICByZXRba2V5XSA9IHBhcmVudFxuICAgICAgPyBwYXJlbnQuY29uY2F0KGNoaWxkKVxuICAgICAgOiBbY2hpbGRdO1xuICB9XG4gIHJldHVybiByZXRcbn07XG5cbi8qKlxuICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cbiAqL1xuc3RyYXRzLnByb3BzID1cbnN0cmF0cy5tZXRob2RzID1cbnN0cmF0cy5jb21wdXRlZCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gIGlmICghY2hpbGRWYWwpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpIH1cbiAgaWYgKCFwYXJlbnRWYWwpIHsgcmV0dXJuIGNoaWxkVmFsIH1cbiAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gIGV4dGVuZChyZXQsIGNoaWxkVmFsKTtcbiAgcmV0dXJuIHJldFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IHN0cmF0ZWd5LlxuICovXG52YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgcmV0dXJuIGNoaWxkVmFsID09PSB1bmRlZmluZWRcbiAgICA/IHBhcmVudFZhbFxuICAgIDogY2hpbGRWYWxcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgY29tcG9uZW50IG5hbWVzXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQ29tcG9uZW50cyAob3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucy5jb21wb25lbnRzKSB7XG4gICAgdmFyIGxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGlzQnVpbHRJblRhZyhsb3dlcikgfHwgY29uZmlnLmlzUmVzZXJ2ZWRUYWcobG93ZXIpKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnRG8gbm90IHVzZSBidWlsdC1pbiBvciByZXNlcnZlZCBIVE1MIGVsZW1lbnRzIGFzIGNvbXBvbmVudCAnICtcbiAgICAgICAgJ2lkOiAnICsga2V5XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEVuc3VyZSBhbGwgcHJvcHMgb3B0aW9uIHN5bnRheCBhcmUgbm9ybWFsaXplZCBpbnRvIHRoZVxuICogT2JqZWN0LWJhc2VkIGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHMgKG9wdGlvbnMpIHtcbiAgdmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcbiAgaWYgKCFwcm9wcykgeyByZXR1cm4gfVxuICB2YXIgcmVzID0ge307XG4gIHZhciBpLCB2YWwsIG5hbWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkge1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFsID0gcHJvcHNbaV07XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmFtZSA9IGNhbWVsaXplKHZhbCk7XG4gICAgICAgIHJlc1tuYW1lXSA9IHsgdHlwZTogbnVsbCB9O1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm4oJ3Byb3BzIG11c3QgYmUgc3RyaW5ncyB3aGVuIHVzaW5nIGFycmF5IHN5bnRheC4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwcm9wcykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIHZhbCA9IHByb3BzW2tleV07XG4gICAgICBuYW1lID0gY2FtZWxpemUoa2V5KTtcbiAgICAgIHJlc1tuYW1lXSA9IGlzUGxhaW5PYmplY3QodmFsKVxuICAgICAgICA/IHZhbFxuICAgICAgICA6IHsgdHlwZTogdmFsIH07XG4gICAgfVxuICB9XG4gIG9wdGlvbnMucHJvcHMgPSByZXM7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIHJhdyBmdW5jdGlvbiBkaXJlY3RpdmVzIGludG8gb2JqZWN0IGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyAob3B0aW9ucykge1xuICB2YXIgZGlycyA9IG9wdGlvbnMuZGlyZWN0aXZlcztcbiAgaWYgKGRpcnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGlycykge1xuICAgICAgdmFyIGRlZiA9IGRpcnNba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRpcnNba2V5XSA9IHsgYmluZDogZGVmLCB1cGRhdGU6IGRlZiB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvcHRpb24gb2JqZWN0cyBpbnRvIGEgbmV3IG9uZS5cbiAqIENvcmUgdXRpbGl0eSB1c2VkIGluIGJvdGggaW5zdGFudGlhdGlvbiBhbmQgaW5oZXJpdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAoXG4gIHBhcmVudCxcbiAgY2hpbGQsXG4gIHZtXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjaGVja0NvbXBvbmVudHMoY2hpbGQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoaWxkID0gY2hpbGQub3B0aW9ucztcbiAgfVxuXG4gIG5vcm1hbGl6ZVByb3BzKGNoaWxkKTtcbiAgbm9ybWFsaXplRGlyZWN0aXZlcyhjaGlsZCk7XG4gIHZhciBleHRlbmRzRnJvbSA9IGNoaWxkLmV4dGVuZHM7XG4gIGlmIChleHRlbmRzRnJvbSkge1xuICAgIHBhcmVudCA9IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGV4dGVuZHNGcm9tLCB2bSk7XG4gIH1cbiAgaWYgKGNoaWxkLm1peGlucykge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGQubWl4aW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQubWl4aW5zW2ldLCB2bSk7XG4gICAgfVxuICB9XG4gIHZhciBvcHRpb25zID0ge307XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHBhcmVudCkge1xuICAgIG1lcmdlRmllbGQoa2V5KTtcbiAgfVxuICBmb3IgKGtleSBpbiBjaGlsZCkge1xuICAgIGlmICghaGFzT3duKHBhcmVudCwga2V5KSkge1xuICAgICAgbWVyZ2VGaWVsZChrZXkpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtZXJnZUZpZWxkIChrZXkpIHtcbiAgICB2YXIgc3RyYXQgPSBzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQ7XG4gICAgb3B0aW9uc1trZXldID0gc3RyYXQocGFyZW50W2tleV0sIGNoaWxkW2tleV0sIHZtLCBrZXkpO1xuICB9XG4gIHJldHVybiBvcHRpb25zXG59XG5cbi8qKlxuICogUmVzb2x2ZSBhbiBhc3NldC5cbiAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCBiZWNhdXNlIGNoaWxkIGluc3RhbmNlcyBuZWVkIGFjY2Vzc1xuICogdG8gYXNzZXRzIGRlZmluZWQgaW4gaXRzIGFuY2VzdG9yIGNoYWluLlxuICovXG5mdW5jdGlvbiByZXNvbHZlQXNzZXQgKFxuICBvcHRpb25zLFxuICB0eXBlLFxuICBpZCxcbiAgd2Fybk1pc3Npbmdcbikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgYXNzZXRzID0gb3B0aW9uc1t0eXBlXTtcbiAgLy8gY2hlY2sgbG9jYWwgcmVnaXN0cmF0aW9uIHZhcmlhdGlvbnMgZmlyc3RcbiAgaWYgKGhhc093bihhc3NldHMsIGlkKSkgeyByZXR1cm4gYXNzZXRzW2lkXSB9XG4gIHZhciBjYW1lbGl6ZWRJZCA9IGNhbWVsaXplKGlkKTtcbiAgaWYgKGhhc093bihhc3NldHMsIGNhbWVsaXplZElkKSkgeyByZXR1cm4gYXNzZXRzW2NhbWVsaXplZElkXSB9XG4gIHZhciBQYXNjYWxDYXNlSWQgPSBjYXBpdGFsaXplKGNhbWVsaXplZElkKTtcbiAgaWYgKGhhc093bihhc3NldHMsIFBhc2NhbENhc2VJZCkpIHsgcmV0dXJuIGFzc2V0c1tQYXNjYWxDYXNlSWRdIH1cbiAgLy8gZmFsbGJhY2sgdG8gcHJvdG90eXBlIGNoYWluXG4gIHZhciByZXMgPSBhc3NldHNbaWRdIHx8IGFzc2V0c1tjYW1lbGl6ZWRJZF0gfHwgYXNzZXRzW1Bhc2NhbENhc2VJZF07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm5NaXNzaW5nICYmICFyZXMpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ZhaWxlZCB0byByZXNvbHZlICcgKyB0eXBlLnNsaWNlKDAsIC0xKSArICc6ICcgKyBpZCxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcCAoXG4gIGtleSxcbiAgcHJvcE9wdGlvbnMsXG4gIHByb3BzRGF0YSxcbiAgdm1cbikge1xuICB2YXIgcHJvcCA9IHByb3BPcHRpb25zW2tleV07XG4gIHZhciBhYnNlbnQgPSAhaGFzT3duKHByb3BzRGF0YSwga2V5KTtcbiAgdmFyIHZhbHVlID0gcHJvcHNEYXRhW2tleV07XG4gIC8vIGhhbmRsZSBib29sZWFuIHByb3BzXG4gIGlmIChpc1R5cGUoQm9vbGVhbiwgcHJvcC50eXBlKSkge1xuICAgIGlmIChhYnNlbnQgJiYgIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoIWlzVHlwZShTdHJpbmcsIHByb3AudHlwZSkgJiYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gaHlwaGVuYXRlKGtleSkpKSB7XG4gICAgICB2YWx1ZSA9IHRydWU7XG4gICAgfVxuICB9XG4gIC8vIGNoZWNrIGRlZmF1bHQgdmFsdWVcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICB2YWx1ZSA9IGdldFByb3BEZWZhdWx0VmFsdWUodm0sIHByb3AsIGtleSk7XG4gICAgLy8gc2luY2UgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYSBmcmVzaCBjb3B5LFxuICAgIC8vIG1ha2Ugc3VyZSB0byBvYnNlcnZlIGl0LlxuICAgIHZhciBwcmV2U2hvdWxkQ29udmVydCA9IG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydDtcbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSB0cnVlO1xuICAgIG9ic2VydmUodmFsdWUpO1xuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IHByZXZTaG91bGRDb252ZXJ0O1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0UHJvcChwcm9wLCBrZXksIHZhbHVlLCB2bSwgYWJzZW50KTtcbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYSBwcm9wLlxuICovXG5mdW5jdGlvbiBnZXRQcm9wRGVmYXVsdFZhbHVlICh2bSwgcHJvcCwga2V5KSB7XG4gIC8vIG5vIGRlZmF1bHQsIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKCFoYXNPd24ocHJvcCwgJ2RlZmF1bHQnKSkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuICB2YXIgZGVmID0gcHJvcC5kZWZhdWx0O1xuICAvLyB3YXJuIGFnYWluc3Qgbm9uLWZhY3RvcnkgZGVmYXVsdHMgZm9yIE9iamVjdCAmIEFycmF5XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGlzT2JqZWN0KGRlZikpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ludmFsaWQgZGVmYXVsdCB2YWx1ZSBmb3IgcHJvcCBcIicgKyBrZXkgKyAnXCI6ICcgK1xuICAgICAgJ1Byb3BzIHdpdGggdHlwZSBPYmplY3QvQXJyYXkgbXVzdCB1c2UgYSBmYWN0b3J5IGZ1bmN0aW9uICcgK1xuICAgICAgJ3RvIHJldHVybiB0aGUgZGVmYXVsdCB2YWx1ZS4nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHRoZSByYXcgcHJvcCB2YWx1ZSB3YXMgYWxzbyB1bmRlZmluZWQgZnJvbSBwcmV2aW91cyByZW5kZXIsXG4gIC8vIHJldHVybiBwcmV2aW91cyBkZWZhdWx0IHZhbHVlIHRvIGF2b2lkIHVubmVjZXNzYXJ5IHdhdGNoZXIgdHJpZ2dlclxuICBpZiAodm0gJiYgdm0uJG9wdGlvbnMucHJvcHNEYXRhICYmXG4gICAgdm0uJG9wdGlvbnMucHJvcHNEYXRhW2tleV0gPT09IHVuZGVmaW5lZCAmJlxuICAgIHZtLl9wcm9wc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdm0uX3Byb3BzW2tleV1cbiAgfVxuICAvLyBjYWxsIGZhY3RvcnkgZnVuY3Rpb24gZm9yIG5vbi1GdW5jdGlvbiB0eXBlc1xuICAvLyBhIHZhbHVlIGlzIEZ1bmN0aW9uIGlmIGl0cyBwcm90b3R5cGUgaXMgZnVuY3Rpb24gZXZlbiBhY3Jvc3MgZGlmZmVyZW50IGV4ZWN1dGlvbiBjb250ZXh0XG4gIHJldHVybiB0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nICYmIGdldFR5cGUocHJvcC50eXBlKSAhPT0gJ0Z1bmN0aW9uJ1xuICAgID8gZGVmLmNhbGwodm0pXG4gICAgOiBkZWZcbn1cblxuLyoqXG4gKiBBc3NlcnQgd2hldGhlciBhIHByb3AgaXMgdmFsaWQuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydFByb3AgKFxuICBwcm9wLFxuICBuYW1lLFxuICB2YWx1ZSxcbiAgdm0sXG4gIGFic2VudFxuKSB7XG4gIGlmIChwcm9wLnJlcXVpcmVkICYmIGFic2VudCkge1xuICAgIHdhcm4oXG4gICAgICAnTWlzc2luZyByZXF1aXJlZCBwcm9wOiBcIicgKyBuYW1lICsgJ1wiJyxcbiAgICAgIHZtXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCAmJiAhcHJvcC5yZXF1aXJlZCkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciB0eXBlID0gcHJvcC50eXBlO1xuICB2YXIgdmFsaWQgPSAhdHlwZSB8fCB0eXBlID09PSB0cnVlO1xuICB2YXIgZXhwZWN0ZWRUeXBlcyA9IFtdO1xuICBpZiAodHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgdHlwZSA9IFt0eXBlXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlLmxlbmd0aCAmJiAhdmFsaWQ7IGkrKykge1xuICAgICAgdmFyIGFzc2VydGVkVHlwZSA9IGFzc2VydFR5cGUodmFsdWUsIHR5cGVbaV0pO1xuICAgICAgZXhwZWN0ZWRUeXBlcy5wdXNoKGFzc2VydGVkVHlwZS5leHBlY3RlZFR5cGUgfHwgJycpO1xuICAgICAgdmFsaWQgPSBhc3NlcnRlZFR5cGUudmFsaWQ7XG4gICAgfVxuICB9XG4gIGlmICghdmFsaWQpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ludmFsaWQgcHJvcDogdHlwZSBjaGVjayBmYWlsZWQgZm9yIHByb3AgXCInICsgbmFtZSArICdcIi4nICtcbiAgICAgICcgRXhwZWN0ZWQgJyArIGV4cGVjdGVkVHlwZXMubWFwKGNhcGl0YWxpemUpLmpvaW4oJywgJykgK1xuICAgICAgJywgZ290ICcgKyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKSArICcuJyxcbiAgICAgIHZtXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdmFsaWRhdG9yID0gcHJvcC52YWxpZGF0b3I7XG4gIGlmICh2YWxpZGF0b3IpIHtcbiAgICBpZiAoIXZhbGlkYXRvcih2YWx1ZSkpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdJbnZhbGlkIHByb3A6IGN1c3RvbSB2YWxpZGF0b3IgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJyArIG5hbWUgKyAnXCIuJyxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbnZhciBzaW1wbGVDaGVja1JFID0gL14oU3RyaW5nfE51bWJlcnxCb29sZWFufEZ1bmN0aW9ufFN5bWJvbCkkLztcblxuZnVuY3Rpb24gYXNzZXJ0VHlwZSAodmFsdWUsIHR5cGUpIHtcbiAgdmFyIHZhbGlkO1xuICB2YXIgZXhwZWN0ZWRUeXBlID0gZ2V0VHlwZSh0eXBlKTtcbiAgaWYgKHNpbXBsZUNoZWNrUkUudGVzdChleHBlY3RlZFR5cGUpKSB7XG4gICAgdmFsaWQgPSB0eXBlb2YgdmFsdWUgPT09IGV4cGVjdGVkVHlwZS50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ09iamVjdCcpIHtcbiAgICB2YWxpZCA9IGlzUGxhaW5PYmplY3QodmFsdWUpO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ0FycmF5Jykge1xuICAgIHZhbGlkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWxpZDogdmFsaWQsXG4gICAgZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGVcbiAgfVxufVxuXG4vKipcbiAqIFVzZSBmdW5jdGlvbiBzdHJpbmcgbmFtZSB0byBjaGVjayBidWlsdC1pbiB0eXBlcyxcbiAqIGJlY2F1c2UgYSBzaW1wbGUgZXF1YWxpdHkgY2hlY2sgd2lsbCBmYWlsIHdoZW4gcnVubmluZ1xuICogYWNyb3NzIGRpZmZlcmVudCB2bXMgLyBpZnJhbWVzLlxuICovXG5mdW5jdGlvbiBnZXRUeXBlIChmbikge1xuICB2YXIgbWF0Y2ggPSBmbiAmJiBmbi50b1N0cmluZygpLm1hdGNoKC9eXFxzKmZ1bmN0aW9uIChcXHcrKS8pO1xuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnXG59XG5cbmZ1bmN0aW9uIGlzVHlwZSAodHlwZSwgZm4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGZuKSkge1xuICAgIHJldHVybiBnZXRUeXBlKGZuKSA9PT0gZ2V0VHlwZSh0eXBlKVxuICB9XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChnZXRUeXBlKGZuW2ldKSA9PT0gZ2V0VHlwZSh0eXBlKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qICAqL1xuXG4vKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggUHJveHkgKi9cblxudmFyIGluaXRQcm94eTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGFsbG93ZWRHbG9iYWxzID0gbWFrZU1hcChcbiAgICAnSW5maW5pdHksdW5kZWZpbmVkLE5hTixpc0Zpbml0ZSxpc05hTiwnICtcbiAgICAncGFyc2VGbG9hdCxwYXJzZUludCxkZWNvZGVVUkksZGVjb2RlVVJJQ29tcG9uZW50LGVuY29kZVVSSSxlbmNvZGVVUklDb21wb25lbnQsJyArXG4gICAgJ01hdGgsTnVtYmVyLERhdGUsQXJyYXksT2JqZWN0LEJvb2xlYW4sU3RyaW5nLFJlZ0V4cCxNYXAsU2V0LEpTT04sSW50bCwnICtcbiAgICAncmVxdWlyZScgLy8gZm9yIFdlYnBhY2svQnJvd3NlcmlmeVxuICApO1xuXG4gIHZhciB3YXJuTm9uUHJlc2VudCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgIHdhcm4oXG4gICAgICBcIlByb3BlcnR5IG9yIG1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgbm90IGRlZmluZWQgb24gdGhlIGluc3RhbmNlIGJ1dCBcIiArXG4gICAgICBcInJlZmVyZW5jZWQgZHVyaW5nIHJlbmRlci4gTWFrZSBzdXJlIHRvIGRlY2xhcmUgcmVhY3RpdmUgZGF0YSBcIiArXG4gICAgICBcInByb3BlcnRpZXMgaW4gdGhlIGRhdGEgb3B0aW9uLlwiLFxuICAgICAgdGFyZ2V0XG4gICAgKTtcbiAgfTtcblxuICB2YXIgaGFzUHJveHkgPVxuICAgIHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBQcm94eS50b1N0cmluZygpLm1hdGNoKC9uYXRpdmUgY29kZS8pO1xuXG4gIGlmIChoYXNQcm94eSkge1xuICAgIHZhciBpc0J1aWx0SW5Nb2RpZmllciA9IG1ha2VNYXAoJ3N0b3AscHJldmVudCxzZWxmLGN0cmwsc2hpZnQsYWx0LG1ldGEnKTtcbiAgICBjb25maWcua2V5Q29kZXMgPSBuZXcgUHJveHkoY29uZmlnLmtleUNvZGVzLCB7XG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCAodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChpc0J1aWx0SW5Nb2RpZmllcihrZXkpKSB7XG4gICAgICAgICAgd2FybigoXCJBdm9pZCBvdmVyd3JpdGluZyBidWlsdC1pbiBtb2RpZmllciBpbiBjb25maWcua2V5Q29kZXM6IC5cIiArIGtleSkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIGhhc0hhbmRsZXIgPSB7XG4gICAgaGFzOiBmdW5jdGlvbiBoYXMgKHRhcmdldCwga2V5KSB7XG4gICAgICB2YXIgaGFzID0ga2V5IGluIHRhcmdldDtcbiAgICAgIHZhciBpc0FsbG93ZWQgPSBhbGxvd2VkR2xvYmFscyhrZXkpIHx8IGtleS5jaGFyQXQoMCkgPT09ICdfJztcbiAgICAgIGlmICghaGFzICYmICFpc0FsbG93ZWQpIHtcbiAgICAgICAgd2Fybk5vblByZXNlbnQodGFyZ2V0LCBrZXkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhcyB8fCAhaXNBbGxvd2VkXG4gICAgfVxuICB9O1xuXG4gIHZhciBnZXRIYW5kbGVyID0ge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0ICh0YXJnZXQsIGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmICEoa2V5IGluIHRhcmdldCkpIHtcbiAgICAgICAgd2Fybk5vblByZXNlbnQodGFyZ2V0LCBrZXkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRhcmdldFtrZXldXG4gICAgfVxuICB9O1xuXG4gIGluaXRQcm94eSA9IGZ1bmN0aW9uIGluaXRQcm94eSAodm0pIHtcbiAgICBpZiAoaGFzUHJveHkpIHtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBwcm94eSBoYW5kbGVyIHRvIHVzZVxuICAgICAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcbiAgICAgIHZhciBoYW5kbGVycyA9IG9wdGlvbnMucmVuZGVyICYmIG9wdGlvbnMucmVuZGVyLl93aXRoU3RyaXBwZWRcbiAgICAgICAgPyBnZXRIYW5kbGVyXG4gICAgICAgIDogaGFzSGFuZGxlcjtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IG5ldyBQcm94eSh2bSwgaGFuZGxlcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2bS5fcmVuZGVyUHJveHkgPSB2bTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBtYXJrO1xudmFyIG1lYXN1cmU7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwZXJmID0gaW5Ccm93c2VyICYmIHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChcbiAgICBwZXJmICYmXG4gICAgcGVyZi5tYXJrICYmXG4gICAgcGVyZi5tZWFzdXJlICYmXG4gICAgcGVyZi5jbGVhck1hcmtzICYmXG4gICAgcGVyZi5jbGVhck1lYXN1cmVzXG4gICkge1xuICAgIG1hcmsgPSBmdW5jdGlvbiAodGFnKSB7IHJldHVybiBwZXJmLm1hcmsodGFnKTsgfTtcbiAgICBtZWFzdXJlID0gZnVuY3Rpb24gKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpIHtcbiAgICAgIHBlcmYubWVhc3VyZShuYW1lLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICAgIHBlcmYuY2xlYXJNYXJrcyhzdGFydFRhZyk7XG4gICAgICBwZXJmLmNsZWFyTWFya3MoZW5kVGFnKTtcbiAgICAgIHBlcmYuY2xlYXJNZWFzdXJlcyhuYW1lKTtcbiAgICB9O1xuICB9XG59XG5cbi8qICAqL1xuXG52YXIgVk5vZGUgPSBmdW5jdGlvbiBWTm9kZSAoXG4gIHRhZyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIHRleHQsXG4gIGVsbSxcbiAgY29udGV4dCxcbiAgY29tcG9uZW50T3B0aW9uc1xuKSB7XG4gIHRoaXMudGFnID0gdGFnO1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIHRoaXMudGV4dCA9IHRleHQ7XG4gIHRoaXMuZWxtID0gZWxtO1xuICB0aGlzLm5zID0gdW5kZWZpbmVkO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLmZ1bmN0aW9uYWxDb250ZXh0ID0gdW5kZWZpbmVkO1xuICB0aGlzLmtleSA9IGRhdGEgJiYgZGF0YS5rZXk7XG4gIHRoaXMuY29tcG9uZW50T3B0aW9ucyA9IGNvbXBvbmVudE9wdGlvbnM7XG4gIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIHRoaXMucGFyZW50ID0gdW5kZWZpbmVkO1xuICB0aGlzLnJhdyA9IGZhbHNlO1xuICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG4gIHRoaXMuaXNSb290SW5zZXJ0ID0gdHJ1ZTtcbiAgdGhpcy5pc0NvbW1lbnQgPSBmYWxzZTtcbiAgdGhpcy5pc0Nsb25lZCA9IGZhbHNlO1xuICB0aGlzLmlzT25jZSA9IGZhbHNlO1xufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgY2hpbGQ6IHt9IH07XG5cbi8vIERFUFJFQ0FURUQ6IGFsaWFzIGZvciBjb21wb25lbnRJbnN0YW5jZSBmb3IgYmFja3dhcmRzIGNvbXBhdC5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5wcm90b3R5cGVBY2Nlc3NvcnMuY2hpbGQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5jb21wb25lbnRJbnN0YW5jZVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFZOb2RlLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbnZhciBjcmVhdGVFbXB0eVZOb2RlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbm9kZSA9IG5ldyBWTm9kZSgpO1xuICBub2RlLnRleHQgPSAnJztcbiAgbm9kZS5pc0NvbW1lbnQgPSB0cnVlO1xuICByZXR1cm4gbm9kZVxufTtcblxuZnVuY3Rpb24gY3JlYXRlVGV4dFZOb2RlICh2YWwpIHtcbiAgcmV0dXJuIG5ldyBWTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBTdHJpbmcodmFsKSlcbn1cblxuLy8gb3B0aW1pemVkIHNoYWxsb3cgY2xvbmVcbi8vIHVzZWQgZm9yIHN0YXRpYyBub2RlcyBhbmQgc2xvdCBub2RlcyBiZWNhdXNlIHRoZXkgbWF5IGJlIHJldXNlZCBhY3Jvc3Ncbi8vIG11bHRpcGxlIHJlbmRlcnMsIGNsb25pbmcgdGhlbSBhdm9pZHMgZXJyb3JzIHdoZW4gRE9NIG1hbmlwdWxhdGlvbnMgcmVseVxuLy8gb24gdGhlaXIgZWxtIHJlZmVyZW5jZS5cbmZ1bmN0aW9uIGNsb25lVk5vZGUgKHZub2RlKSB7XG4gIHZhciBjbG9uZWQgPSBuZXcgVk5vZGUoXG4gICAgdm5vZGUudGFnLFxuICAgIHZub2RlLmRhdGEsXG4gICAgdm5vZGUuY2hpbGRyZW4sXG4gICAgdm5vZGUudGV4dCxcbiAgICB2bm9kZS5lbG0sXG4gICAgdm5vZGUuY29udGV4dCxcbiAgICB2bm9kZS5jb21wb25lbnRPcHRpb25zXG4gICk7XG4gIGNsb25lZC5ucyA9IHZub2RlLm5zO1xuICBjbG9uZWQuaXNTdGF0aWMgPSB2bm9kZS5pc1N0YXRpYztcbiAgY2xvbmVkLmtleSA9IHZub2RlLmtleTtcbiAgY2xvbmVkLmlzQ2xvbmVkID0gdHJ1ZTtcbiAgcmV0dXJuIGNsb25lZFxufVxuXG5mdW5jdGlvbiBjbG9uZVZOb2RlcyAodm5vZGVzKSB7XG4gIHZhciBsZW4gPSB2bm9kZXMubGVuZ3RoO1xuICB2YXIgcmVzID0gbmV3IEFycmF5KGxlbik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICByZXNbaV0gPSBjbG9uZVZOb2RlKHZub2Rlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIG5vcm1hbGl6ZUV2ZW50ID0gY2FjaGVkKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciBwYXNzaXZlID0gbmFtZS5jaGFyQXQoMCkgPT09ICcmJztcbiAgbmFtZSA9IHBhc3NpdmUgPyBuYW1lLnNsaWNlKDEpIDogbmFtZTtcbiAgdmFyIG9uY2UkJDEgPSBuYW1lLmNoYXJBdCgwKSA9PT0gJ34nOyAvLyBQcmVmaXhlZCBsYXN0LCBjaGVja2VkIGZpcnN0XG4gIG5hbWUgPSBvbmNlJCQxID8gbmFtZS5zbGljZSgxKSA6IG5hbWU7XG4gIHZhciBjYXB0dXJlID0gbmFtZS5jaGFyQXQoMCkgPT09ICchJztcbiAgbmFtZSA9IGNhcHR1cmUgPyBuYW1lLnNsaWNlKDEpIDogbmFtZTtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIG9uY2U6IG9uY2UkJDEsXG4gICAgY2FwdHVyZTogY2FwdHVyZSxcbiAgICBwYXNzaXZlOiBwYXNzaXZlXG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVGbkludm9rZXIgKGZucykge1xuICBmdW5jdGlvbiBpbnZva2VyICgpIHtcbiAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cbiAgICB2YXIgZm5zID0gaW52b2tlci5mbnM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZm5zKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm5zW2ldLmFwcGx5KG51bGwsIGFyZ3VtZW50cyQxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmV0dXJuIGhhbmRsZXIgcmV0dXJuIHZhbHVlIGZvciBzaW5nbGUgaGFuZGxlcnNcbiAgICAgIHJldHVybiBmbnMuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIH1cbiAgfVxuICBpbnZva2VyLmZucyA9IGZucztcbiAgcmV0dXJuIGludm9rZXJcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGlzdGVuZXJzIChcbiAgb24sXG4gIG9sZE9uLFxuICBhZGQsXG4gIHJlbW92ZSQkMSxcbiAgdm1cbikge1xuICB2YXIgbmFtZSwgY3VyLCBvbGQsIGV2ZW50O1xuICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICBjdXIgPSBvbltuYW1lXTtcbiAgICBvbGQgPSBvbGRPbltuYW1lXTtcbiAgICBldmVudCA9IG5vcm1hbGl6ZUV2ZW50KG5hbWUpO1xuICAgIGlmIChpc1VuZGVmKGN1cikpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJJbnZhbGlkIGhhbmRsZXIgZm9yIGV2ZW50IFxcXCJcIiArIChldmVudC5uYW1lKSArIFwiXFxcIjogZ290IFwiICsgU3RyaW5nKGN1ciksXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoaXNVbmRlZihvbGQpKSB7XG4gICAgICBpZiAoaXNVbmRlZihjdXIuZm5zKSkge1xuICAgICAgICBjdXIgPSBvbltuYW1lXSA9IGNyZWF0ZUZuSW52b2tlcihjdXIpO1xuICAgICAgfVxuICAgICAgYWRkKGV2ZW50Lm5hbWUsIGN1ciwgZXZlbnQub25jZSwgZXZlbnQuY2FwdHVyZSwgZXZlbnQucGFzc2l2ZSk7XG4gICAgfSBlbHNlIGlmIChjdXIgIT09IG9sZCkge1xuICAgICAgb2xkLmZucyA9IGN1cjtcbiAgICAgIG9uW25hbWVdID0gb2xkO1xuICAgIH1cbiAgfVxuICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICBpZiAoaXNVbmRlZihvbltuYW1lXSkpIHtcbiAgICAgIGV2ZW50ID0gbm9ybWFsaXplRXZlbnQobmFtZSk7XG4gICAgICByZW1vdmUkJDEoZXZlbnQubmFtZSwgb2xkT25bbmFtZV0sIGV2ZW50LmNhcHR1cmUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gbWVyZ2VWTm9kZUhvb2sgKGRlZiwgaG9va0tleSwgaG9vaykge1xuICB2YXIgaW52b2tlcjtcbiAgdmFyIG9sZEhvb2sgPSBkZWZbaG9va0tleV07XG5cbiAgZnVuY3Rpb24gd3JhcHBlZEhvb2sgKCkge1xuICAgIGhvb2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAvLyBpbXBvcnRhbnQ6IHJlbW92ZSBtZXJnZWQgaG9vayB0byBlbnN1cmUgaXQncyBjYWxsZWQgb25seSBvbmNlXG4gICAgLy8gYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICByZW1vdmUoaW52b2tlci5mbnMsIHdyYXBwZWRIb29rKTtcbiAgfVxuXG4gIGlmIChpc1VuZGVmKG9sZEhvb2spKSB7XG4gICAgLy8gbm8gZXhpc3RpbmcgaG9va1xuICAgIGludm9rZXIgPSBjcmVhdGVGbkludm9rZXIoW3dyYXBwZWRIb29rXSk7XG4gIH0gZWxzZSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGlzRGVmKG9sZEhvb2suZm5zKSAmJiBpc1RydWUob2xkSG9vay5tZXJnZWQpKSB7XG4gICAgICAvLyBhbHJlYWR5IGEgbWVyZ2VkIGludm9rZXJcbiAgICAgIGludm9rZXIgPSBvbGRIb29rO1xuICAgICAgaW52b2tlci5mbnMucHVzaCh3cmFwcGVkSG9vayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGV4aXN0aW5nIHBsYWluIGhvb2tcbiAgICAgIGludm9rZXIgPSBjcmVhdGVGbkludm9rZXIoW29sZEhvb2ssIHdyYXBwZWRIb29rXSk7XG4gICAgfVxuICB9XG5cbiAgaW52b2tlci5tZXJnZWQgPSB0cnVlO1xuICBkZWZbaG9va0tleV0gPSBpbnZva2VyO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZXh0cmFjdFByb3BzRnJvbVZOb2RlRGF0YSAoXG4gIGRhdGEsXG4gIEN0b3IsXG4gIHRhZ1xuKSB7XG4gIC8vIHdlIGFyZSBvbmx5IGV4dHJhY3RpbmcgcmF3IHZhbHVlcyBoZXJlLlxuICAvLyB2YWxpZGF0aW9uIGFuZCBkZWZhdWx0IHZhbHVlcyBhcmUgaGFuZGxlZCBpbiB0aGUgY2hpbGRcbiAgLy8gY29tcG9uZW50IGl0c2VsZi5cbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLnByb3BzO1xuICBpZiAoaXNVbmRlZihwcm9wT3B0aW9ucykpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgcmVzID0ge307XG4gIHZhciBhdHRycyA9IGRhdGEuYXR0cnM7XG4gIHZhciBwcm9wcyA9IGRhdGEucHJvcHM7XG4gIGlmIChpc0RlZihhdHRycykgfHwgaXNEZWYocHJvcHMpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XG4gICAgICB2YXIgYWx0S2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB2YXIga2V5SW5Mb3dlckNhc2UgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGtleSAhPT0ga2V5SW5Mb3dlckNhc2UgJiZcbiAgICAgICAgICBhdHRycyAmJiBoYXNPd24oYXR0cnMsIGtleUluTG93ZXJDYXNlKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aXAoXG4gICAgICAgICAgICBcIlByb3AgXFxcIlwiICsga2V5SW5Mb3dlckNhc2UgKyBcIlxcXCIgaXMgcGFzc2VkIHRvIGNvbXBvbmVudCBcIiArXG4gICAgICAgICAgICAoZm9ybWF0Q29tcG9uZW50TmFtZSh0YWcgfHwgQ3RvcikpICsgXCIsIGJ1dCB0aGUgZGVjbGFyZWQgcHJvcCBuYW1lIGlzXCIgK1xuICAgICAgICAgICAgXCIgXFxcIlwiICsga2V5ICsgXCJcXFwiLiBcIiArXG4gICAgICAgICAgICBcIk5vdGUgdGhhdCBIVE1MIGF0dHJpYnV0ZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmUgYW5kIGNhbWVsQ2FzZWQgXCIgK1xuICAgICAgICAgICAgXCJwcm9wcyBuZWVkIHRvIHVzZSB0aGVpciBrZWJhYi1jYXNlIGVxdWl2YWxlbnRzIHdoZW4gdXNpbmcgaW4tRE9NIFwiICtcbiAgICAgICAgICAgIFwidGVtcGxhdGVzLiBZb3Ugc2hvdWxkIHByb2JhYmx5IHVzZSBcXFwiXCIgKyBhbHRLZXkgKyBcIlxcXCIgaW5zdGVhZCBvZiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGVja1Byb3AocmVzLCBwcm9wcywga2V5LCBhbHRLZXksIHRydWUpIHx8XG4gICAgICBjaGVja1Byb3AocmVzLCBhdHRycywga2V5LCBhbHRLZXksIGZhbHNlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBjaGVja1Byb3AgKFxuICByZXMsXG4gIGhhc2gsXG4gIGtleSxcbiAgYWx0S2V5LFxuICBwcmVzZXJ2ZVxuKSB7XG4gIGlmIChpc0RlZihoYXNoKSkge1xuICAgIGlmIChoYXNPd24oaGFzaCwga2V5KSkge1xuICAgICAgcmVzW2tleV0gPSBoYXNoW2tleV07XG4gICAgICBpZiAoIXByZXNlcnZlKSB7XG4gICAgICAgIGRlbGV0ZSBoYXNoW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAoaGFzT3duKGhhc2gsIGFsdEtleSkpIHtcbiAgICAgIHJlc1trZXldID0gaGFzaFthbHRLZXldO1xuICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xuICAgICAgICBkZWxldGUgaGFzaFthbHRLZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qICAqL1xuXG4vLyBUaGUgdGVtcGxhdGUgY29tcGlsZXIgYXR0ZW1wdHMgdG8gbWluaW1pemUgdGhlIG5lZWQgZm9yIG5vcm1hbGl6YXRpb24gYnlcbi8vIHN0YXRpY2FsbHkgYW5hbHl6aW5nIHRoZSB0ZW1wbGF0ZSBhdCBjb21waWxlIHRpbWUuXG4vL1xuLy8gRm9yIHBsYWluIEhUTUwgbWFya3VwLCBub3JtYWxpemF0aW9uIGNhbiBiZSBjb21wbGV0ZWx5IHNraXBwZWQgYmVjYXVzZSB0aGVcbi8vIGdlbmVyYXRlZCByZW5kZXIgZnVuY3Rpb24gaXMgZ3VhcmFudGVlZCB0byByZXR1cm4gQXJyYXk8Vk5vZGU+LiBUaGVyZSBhcmVcbi8vIHR3byBjYXNlcyB3aGVyZSBleHRyYSBub3JtYWxpemF0aW9uIGlzIG5lZWRlZDpcblxuLy8gMS4gV2hlbiB0aGUgY2hpbGRyZW4gY29udGFpbnMgY29tcG9uZW50cyAtIGJlY2F1c2UgYSBmdW5jdGlvbmFsIGNvbXBvbmVudFxuLy8gbWF5IHJldHVybiBhbiBBcnJheSBpbnN0ZWFkIG9mIGEgc2luZ2xlIHJvb3QuIEluIHRoaXMgY2FzZSwganVzdCBhIHNpbXBsZVxuLy8gbm9ybWFsaXphdGlvbiBpcyBuZWVkZWQgLSBpZiBhbnkgY2hpbGQgaXMgYW4gQXJyYXksIHdlIGZsYXR0ZW4gdGhlIHdob2xlXG4vLyB0aGluZyB3aXRoIEFycmF5LnByb3RvdHlwZS5jb25jYXQuIEl0IGlzIGd1YXJhbnRlZWQgdG8gYmUgb25seSAxLWxldmVsIGRlZXBcbi8vIGJlY2F1c2UgZnVuY3Rpb25hbCBjb21wb25lbnRzIGFscmVhZHkgbm9ybWFsaXplIHRoZWlyIG93biBjaGlsZHJlbi5cbmZ1bmN0aW9uIHNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW5baV0pKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pXG4gICAgfVxuICB9XG4gIHJldHVybiBjaGlsZHJlblxufVxuXG4vLyAyLiBXaGVuIHRoZSBjaGlsZHJlbiBjb250YWlucyBjb25zdHJ1Y3RzIHRoYXQgYWx3YXlzIGdlbmVyYXRlZCBuZXN0ZWQgQXJyYXlzLFxuLy8gZS5nLiA8dGVtcGxhdGU+LCA8c2xvdD4sIHYtZm9yLCBvciB3aGVuIHRoZSBjaGlsZHJlbiBpcyBwcm92aWRlZCBieSB1c2VyXG4vLyB3aXRoIGhhbmQtd3JpdHRlbiByZW5kZXIgZnVuY3Rpb25zIC8gSlNYLiBJbiBzdWNoIGNhc2VzIGEgZnVsbCBub3JtYWxpemF0aW9uXG4vLyBpcyBuZWVkZWQgdG8gY2F0ZXIgdG8gYWxsIHBvc3NpYmxlIHR5cGVzIG9mIGNoaWxkcmVuIHZhbHVlcy5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICByZXR1cm4gaXNQcmltaXRpdmUoY2hpbGRyZW4pXG4gICAgPyBbY3JlYXRlVGV4dFZOb2RlKGNoaWxkcmVuKV1cbiAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pXG4gICAgICA/IG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4oY2hpbGRyZW4pXG4gICAgICA6IHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheUNoaWxkcmVuIChjaGlsZHJlbiwgbmVzdGVkSW5kZXgpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICB2YXIgaSwgYywgbGFzdDtcbiAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IGNoaWxkcmVuW2ldO1xuICAgIGlmIChpc1VuZGVmKGMpIHx8IHR5cGVvZiBjID09PSAnYm9vbGVhbicpIHsgY29udGludWUgfVxuICAgIGxhc3QgPSByZXNbcmVzLmxlbmd0aCAtIDFdO1xuICAgIC8vICBuZXN0ZWRcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkge1xuICAgICAgcmVzLnB1c2guYXBwbHkocmVzLCBub3JtYWxpemVBcnJheUNoaWxkcmVuKGMsICgobmVzdGVkSW5kZXggfHwgJycpICsgXCJfXCIgKyBpKSkpO1xuICAgIH0gZWxzZSBpZiAoaXNQcmltaXRpdmUoYykpIHtcbiAgICAgIGlmIChpc0RlZihsYXN0KSAmJiBpc0RlZihsYXN0LnRleHQpKSB7XG4gICAgICAgIGxhc3QudGV4dCArPSBTdHJpbmcoYyk7XG4gICAgICB9IGVsc2UgaWYgKGMgIT09ICcnKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgcHJpbWl0aXZlIHRvIHZub2RlXG4gICAgICAgIHJlcy5wdXNoKGNyZWF0ZVRleHRWTm9kZShjKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0RlZihjLnRleHQpICYmIGlzRGVmKGxhc3QpICYmIGlzRGVmKGxhc3QudGV4dCkpIHtcbiAgICAgICAgcmVzW3Jlcy5sZW5ndGggLSAxXSA9IGNyZWF0ZVRleHRWTm9kZShsYXN0LnRleHQgKyBjLnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmYXVsdCBrZXkgZm9yIG5lc3RlZCBhcnJheSBjaGlsZHJlbiAobGlrZWx5IGdlbmVyYXRlZCBieSB2LWZvcilcbiAgICAgICAgaWYgKGlzRGVmKGMudGFnKSAmJiBpc1VuZGVmKGMua2V5KSAmJiBpc0RlZihuZXN0ZWRJbmRleCkpIHtcbiAgICAgICAgICBjLmtleSA9IFwiX192bGlzdFwiICsgbmVzdGVkSW5kZXggKyBcIl9cIiArIGkgKyBcIl9fXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnB1c2goYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGVuc3VyZUN0b3IgKGNvbXAsIGJhc2UpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGNvbXApXG4gICAgPyBiYXNlLmV4dGVuZChjb21wKVxuICAgIDogY29tcFxufVxuXG5mdW5jdGlvbiByZXNvbHZlQXN5bmNDb21wb25lbnQgKFxuICBmYWN0b3J5LFxuICBiYXNlQ3RvcixcbiAgY29udGV4dFxuKSB7XG4gIGlmIChpc1RydWUoZmFjdG9yeS5lcnJvcikgJiYgaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkuZXJyb3JDb21wXG4gIH1cblxuICBpZiAoaXNEZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICByZXR1cm4gZmFjdG9yeS5yZXNvbHZlZFxuICB9XG5cbiAgaWYgKGlzVHJ1ZShmYWN0b3J5LmxvYWRpbmcpICYmIGlzRGVmKGZhY3RvcnkubG9hZGluZ0NvbXApKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkubG9hZGluZ0NvbXBcbiAgfVxuXG4gIGlmIChpc0RlZihmYWN0b3J5LmNvbnRleHRzKSkge1xuICAgIC8vIGFscmVhZHkgcGVuZGluZ1xuICAgIGZhY3RvcnkuY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udGV4dHMgPSBmYWN0b3J5LmNvbnRleHRzID0gW2NvbnRleHRdO1xuICAgIHZhciBzeW5jID0gdHJ1ZTtcblxuICAgIHZhciBmb3JjZVJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY29udGV4dHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnRleHRzW2ldLiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVzb2x2ZSA9IG9uY2UoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8gY2FjaGUgcmVzb2x2ZWRcbiAgICAgIGZhY3RvcnkucmVzb2x2ZWQgPSBlbnN1cmVDdG9yKHJlcywgYmFzZUN0b3IpO1xuICAgICAgLy8gaW52b2tlIGNhbGxiYWNrcyBvbmx5IGlmIHRoaXMgaXMgbm90IGEgc3luY2hyb25vdXMgcmVzb2x2ZVxuICAgICAgLy8gKGFzeW5jIHJlc29sdmVzIGFyZSBzaGltbWVkIGFzIHN5bmNocm9ub3VzIGR1cmluZyBTU1IpXG4gICAgICBpZiAoIXN5bmMpIHtcbiAgICAgICAgZm9yY2VSZW5kZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciByZWplY3QgPSBvbmNlKGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJGYWlsZWQgdG8gcmVzb2x2ZSBhc3luYyBjb21wb25lbnQ6IFwiICsgKFN0cmluZyhmYWN0b3J5KSkgK1xuICAgICAgICAocmVhc29uID8gKFwiXFxuUmVhc29uOiBcIiArIHJlYXNvbikgOiAnJylcbiAgICAgICk7XG4gICAgICBpZiAoaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgICAgIGZhY3RvcnkuZXJyb3IgPSB0cnVlO1xuICAgICAgICBmb3JjZVJlbmRlcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHJlcyA9IGZhY3RvcnkocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgIGlmIChpc09iamVjdChyZXMpKSB7XG4gICAgICBpZiAodHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vICgpID0+IFByb21pc2VcbiAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgICAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKHJlcy5jb21wb25lbnQpICYmIHR5cGVvZiByZXMuY29tcG9uZW50LnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzLmNvbXBvbmVudC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy5lcnJvcikpIHtcbiAgICAgICAgICBmYWN0b3J5LmVycm9yQ29tcCA9IGVuc3VyZUN0b3IocmVzLmVycm9yLCBiYXNlQ3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWYocmVzLmxvYWRpbmcpKSB7XG4gICAgICAgICAgZmFjdG9yeS5sb2FkaW5nQ29tcCA9IGVuc3VyZUN0b3IocmVzLmxvYWRpbmcsIGJhc2VDdG9yKTtcbiAgICAgICAgICBpZiAocmVzLmRlbGF5ID09PSAwKSB7XG4gICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkgJiYgaXNVbmRlZihmYWN0b3J5LmVycm9yKSkge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yY2VSZW5kZXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVzLmRlbGF5IHx8IDIwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy50aW1lb3V0KSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG4gICAgICAgICAgICAgICAgPyAoXCJ0aW1lb3V0IChcIiArIChyZXMudGltZW91dCkgKyBcIm1zKVwiKVxuICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LCByZXMudGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzeW5jID0gZmFsc2U7XG4gICAgLy8gcmV0dXJuIGluIGNhc2UgcmVzb2x2ZWQgc3luY2hyb25vdXNseVxuICAgIHJldHVybiBmYWN0b3J5LmxvYWRpbmdcbiAgICAgID8gZmFjdG9yeS5sb2FkaW5nQ29tcFxuICAgICAgOiBmYWN0b3J5LnJlc29sdmVkXG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGdldEZpcnN0Q29tcG9uZW50Q2hpbGQgKGNoaWxkcmVuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2hpbGRyZW5baV07XG4gICAgICBpZiAoaXNEZWYoYykgJiYgaXNEZWYoYy5jb21wb25lbnRPcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gY1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRFdmVudHMgKHZtKSB7XG4gIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2bS5faGFzSG9va0V2ZW50ID0gZmFsc2U7XG4gIC8vIGluaXQgcGFyZW50IGF0dGFjaGVkIGV2ZW50c1xuICB2YXIgbGlzdGVuZXJzID0gdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgaWYgKGxpc3RlbmVycykge1xuICAgIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyh2bSwgbGlzdGVuZXJzKTtcbiAgfVxufVxuXG52YXIgdGFyZ2V0O1xuXG5mdW5jdGlvbiBhZGQgKGV2ZW50LCBmbiwgb25jZSQkMSkge1xuICBpZiAob25jZSQkMSkge1xuICAgIHRhcmdldC4kb25jZShldmVudCwgZm4pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC4kb24oZXZlbnQsIGZuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUkMSAoZXZlbnQsIGZuKSB7XG4gIHRhcmdldC4kb2ZmKGV2ZW50LCBmbik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyAoXG4gIHZtLFxuICBsaXN0ZW5lcnMsXG4gIG9sZExpc3RlbmVyc1xuKSB7XG4gIHRhcmdldCA9IHZtO1xuICB1cGRhdGVMaXN0ZW5lcnMobGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMgfHwge30sIGFkZCwgcmVtb3ZlJDEsIHZtKTtcbn1cblxuZnVuY3Rpb24gZXZlbnRzTWl4aW4gKFZ1ZSkge1xuICB2YXIgaG9va1JFID0gL15ob29rOi87XG4gIFZ1ZS5wcm90b3R5cGUuJG9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMkMS4kb24oZXZlbnRbaV0sIGZuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgKHZtLl9ldmVudHNbZXZlbnRdIHx8ICh2bS5fZXZlbnRzW2V2ZW50XSA9IFtdKSkucHVzaChmbik7XG4gICAgICAvLyBvcHRpbWl6ZSBob29rOmV2ZW50IGNvc3QgYnkgdXNpbmcgYSBib29sZWFuIGZsYWcgbWFya2VkIGF0IHJlZ2lzdHJhdGlvblxuICAgICAgLy8gaW5zdGVhZCBvZiBhIGhhc2ggbG9va3VwXG4gICAgICBpZiAoaG9va1JFLnRlc3QoZXZlbnQpKSB7XG4gICAgICAgIHZtLl9oYXNIb29rRXZlbnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRvbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgZnVuY3Rpb24gb24gKCkge1xuICAgICAgdm0uJG9mZihldmVudCwgb24pO1xuICAgICAgZm4uYXBwbHkodm0sIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIG9uLmZuID0gZm47XG4gICAgdm0uJG9uKGV2ZW50LCBvbik7XG4gICAgcmV0dXJuIHZtXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHZtID0gdGhpcztcbiAgICAvLyBhbGxcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIC8vIGFycmF5IG9mIGV2ZW50c1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yICh2YXIgaSQxID0gMCwgbCA9IGV2ZW50Lmxlbmd0aDsgaSQxIDwgbDsgaSQxKyspIHtcbiAgICAgICAgdGhpcyQxLiRvZmYoZXZlbnRbaSQxXSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgdmFyIGNicyA9IHZtLl9ldmVudHNbZXZlbnRdO1xuICAgIGlmICghY2JzKSB7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZtLl9ldmVudHNbZXZlbnRdID0gbnVsbDtcbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICAvLyBzcGVjaWZpYyBoYW5kbGVyXG4gICAgdmFyIGNiO1xuICAgIHZhciBpID0gY2JzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjYiA9IGNic1tpXTtcbiAgICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICAgIGNicy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbG93ZXJDYXNlRXZlbnQgPSBldmVudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGxvd2VyQ2FzZUV2ZW50ICE9PSBldmVudCAmJiB2bS5fZXZlbnRzW2xvd2VyQ2FzZUV2ZW50XSkge1xuICAgICAgICB0aXAoXG4gICAgICAgICAgXCJFdmVudCBcXFwiXCIgKyBsb3dlckNhc2VFdmVudCArIFwiXFxcIiBpcyBlbWl0dGVkIGluIGNvbXBvbmVudCBcIiArXG4gICAgICAgICAgKGZvcm1hdENvbXBvbmVudE5hbWUodm0pKSArIFwiIGJ1dCB0aGUgaGFuZGxlciBpcyByZWdpc3RlcmVkIGZvciBcXFwiXCIgKyBldmVudCArIFwiXFxcIi4gXCIgK1xuICAgICAgICAgIFwiTm90ZSB0aGF0IEhUTUwgYXR0cmlidXRlcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZSBhbmQgeW91IGNhbm5vdCB1c2UgXCIgK1xuICAgICAgICAgIFwidi1vbiB0byBsaXN0ZW4gdG8gY2FtZWxDYXNlIGV2ZW50cyB3aGVuIHVzaW5nIGluLURPTSB0ZW1wbGF0ZXMuIFwiICtcbiAgICAgICAgICBcIllvdSBzaG91bGQgcHJvYmFibHkgdXNlIFxcXCJcIiArIChoeXBoZW5hdGUoZXZlbnQpKSArIFwiXFxcIiBpbnN0ZWFkIG9mIFxcXCJcIiArIGV2ZW50ICsgXCJcXFwiLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjYnMgPSB2bS5fZXZlbnRzW2V2ZW50XTtcbiAgICBpZiAoY2JzKSB7XG4gICAgICBjYnMgPSBjYnMubGVuZ3RoID4gMSA/IHRvQXJyYXkoY2JzKSA6IGNicztcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNic1tpXS5hcHBseSh2bSwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIHJhdyBjaGlsZHJlbiBWTm9kZXMgaW50byBhIHNsb3Qgb2JqZWN0LlxuICovXG5mdW5jdGlvbiByZXNvbHZlU2xvdHMgKFxuICBjaGlsZHJlbixcbiAgY29udGV4dFxuKSB7XG4gIHZhciBzbG90cyA9IHt9O1xuICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHNsb3RzXG4gIH1cbiAgdmFyIGRlZmF1bHRTbG90ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgLy8gbmFtZWQgc2xvdHMgc2hvdWxkIG9ubHkgYmUgcmVzcGVjdGVkIGlmIHRoZSB2bm9kZSB3YXMgcmVuZGVyZWQgaW4gdGhlXG4gICAgLy8gc2FtZSBjb250ZXh0LlxuICAgIGlmICgoY2hpbGQuY29udGV4dCA9PT0gY29udGV4dCB8fCBjaGlsZC5mdW5jdGlvbmFsQ29udGV4dCA9PT0gY29udGV4dCkgJiZcbiAgICAgICAgY2hpbGQuZGF0YSAmJiBjaGlsZC5kYXRhLnNsb3QgIT0gbnVsbCkge1xuICAgICAgdmFyIG5hbWUgPSBjaGlsZC5kYXRhLnNsb3Q7XG4gICAgICB2YXIgc2xvdCA9IChzbG90c1tuYW1lXSB8fCAoc2xvdHNbbmFtZV0gPSBbXSkpO1xuICAgICAgaWYgKGNoaWxkLnRhZyA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgICBzbG90LnB1c2guYXBwbHkoc2xvdCwgY2hpbGQuY2hpbGRyZW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xvdC5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVmYXVsdFNsb3QucHVzaChjaGlsZCk7XG4gICAgfVxuICB9XG4gIC8vIGlnbm9yZSB3aGl0ZXNwYWNlXG4gIGlmICghZGVmYXVsdFNsb3QuZXZlcnkoaXNXaGl0ZXNwYWNlKSkge1xuICAgIHNsb3RzLmRlZmF1bHQgPSBkZWZhdWx0U2xvdDtcbiAgfVxuICByZXR1cm4gc2xvdHNcbn1cblxuZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChub2RlKSB7XG4gIHJldHVybiBub2RlLmlzQ29tbWVudCB8fCBub2RlLnRleHQgPT09ICcgJ1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU2NvcGVkU2xvdHMgKFxuICBmbnNcbikge1xuICB2YXIgcmVzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzW2Zuc1tpXVswXV0gPSBmbnNbaV1bMV07XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIGFjdGl2ZUluc3RhbmNlID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdExpZmVjeWNsZSAodm0pIHtcbiAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcblxuICAvLyBsb2NhdGUgZmlyc3Qgbm9uLWFic3RyYWN0IHBhcmVudFxuICB2YXIgcGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XG4gIGlmIChwYXJlbnQgJiYgIW9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICB3aGlsZSAocGFyZW50LiRvcHRpb25zLmFic3RyYWN0ICYmIHBhcmVudC4kcGFyZW50KSB7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQuJHBhcmVudDtcbiAgICB9XG4gICAgcGFyZW50LiRjaGlsZHJlbi5wdXNoKHZtKTtcbiAgfVxuXG4gIHZtLiRwYXJlbnQgPSBwYXJlbnQ7XG4gIHZtLiRyb290ID0gcGFyZW50ID8gcGFyZW50LiRyb290IDogdm07XG5cbiAgdm0uJGNoaWxkcmVuID0gW107XG4gIHZtLiRyZWZzID0ge307XG5cbiAgdm0uX3dhdGNoZXIgPSBudWxsO1xuICB2bS5faW5hY3RpdmUgPSBudWxsO1xuICB2bS5fZGlyZWN0SW5hY3RpdmUgPSBmYWxzZTtcbiAgdm0uX2lzTW91bnRlZCA9IGZhbHNlO1xuICB2bS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcbiAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbGlmZWN5Y2xlTWl4aW4gKFZ1ZSkge1xuICBWdWUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodm5vZGUsIGh5ZHJhdGluZykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl9pc01vdW50ZWQpIHtcbiAgICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlVXBkYXRlJyk7XG4gICAgfVxuICAgIHZhciBwcmV2RWwgPSB2bS4kZWw7XG4gICAgdmFyIHByZXZWbm9kZSA9IHZtLl92bm9kZTtcbiAgICB2YXIgcHJldkFjdGl2ZUluc3RhbmNlID0gYWN0aXZlSW5zdGFuY2U7XG4gICAgYWN0aXZlSW5zdGFuY2UgPSB2bTtcbiAgICB2bS5fdm5vZGUgPSB2bm9kZTtcbiAgICAvLyBWdWUucHJvdG90eXBlLl9fcGF0Y2hfXyBpcyBpbmplY3RlZCBpbiBlbnRyeSBwb2ludHNcbiAgICAvLyBiYXNlZCBvbiB0aGUgcmVuZGVyaW5nIGJhY2tlbmQgdXNlZC5cbiAgICBpZiAoIXByZXZWbm9kZSkge1xuICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgIHZtLiRlbCA9IHZtLl9fcGF0Y2hfXyhcbiAgICAgICAgdm0uJGVsLCB2bm9kZSwgaHlkcmF0aW5nLCBmYWxzZSAvKiByZW1vdmVPbmx5ICovLFxuICAgICAgICB2bS4kb3B0aW9ucy5fcGFyZW50RWxtLFxuICAgICAgICB2bS4kb3B0aW9ucy5fcmVmRWxtXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB1cGRhdGVzXG4gICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18ocHJldlZub2RlLCB2bm9kZSk7XG4gICAgfVxuICAgIGFjdGl2ZUluc3RhbmNlID0gcHJldkFjdGl2ZUluc3RhbmNlO1xuICAgIC8vIHVwZGF0ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxuICAgIGlmIChwcmV2RWwpIHtcbiAgICAgIHByZXZFbC5fX3Z1ZV9fID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHZtLiRlbCkge1xuICAgICAgdm0uJGVsLl9fdnVlX18gPSB2bTtcbiAgICB9XG4gICAgLy8gaWYgcGFyZW50IGlzIGFuIEhPQywgdXBkYXRlIGl0cyAkZWwgYXMgd2VsbFxuICAgIGlmICh2bS4kdm5vZGUgJiYgdm0uJHBhcmVudCAmJiB2bS4kdm5vZGUgPT09IHZtLiRwYXJlbnQuX3Zub2RlKSB7XG4gICAgICB2bS4kcGFyZW50LiRlbCA9IHZtLiRlbDtcbiAgICB9XG4gICAgLy8gdXBkYXRlZCBob29rIGlzIGNhbGxlZCBieSB0aGUgc2NoZWR1bGVyIHRvIGVuc3VyZSB0aGF0IGNoaWxkcmVuIGFyZVxuICAgIC8vIHVwZGF0ZWQgaW4gYSBwYXJlbnQncyB1cGRhdGVkIGhvb2suXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAodm0uX3dhdGNoZXIpIHtcbiAgICAgIHZtLl93YXRjaGVyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRkZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVEZXN0cm95Jyk7XG4gICAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSB0cnVlO1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gcGFyZW50XG4gICAgdmFyIHBhcmVudCA9IHZtLiRwYXJlbnQ7XG4gICAgaWYgKHBhcmVudCAmJiAhcGFyZW50Ll9pc0JlaW5nRGVzdHJveWVkICYmICF2bS4kb3B0aW9ucy5hYnN0cmFjdCkge1xuICAgICAgcmVtb3ZlKHBhcmVudC4kY2hpbGRyZW4sIHZtKTtcbiAgICB9XG4gICAgLy8gdGVhcmRvd24gd2F0Y2hlcnNcbiAgICBpZiAodm0uX3dhdGNoZXIpIHtcbiAgICAgIHZtLl93YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgfVxuICAgIHZhciBpID0gdm0uX3dhdGNoZXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2bS5fd2F0Y2hlcnNbaV0udGVhcmRvd24oKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlZmVyZW5jZSBmcm9tIGRhdGEgb2JcbiAgICAvLyBmcm96ZW4gb2JqZWN0IG1heSBub3QgaGF2ZSBvYnNlcnZlci5cbiAgICBpZiAodm0uX2RhdGEuX19vYl9fKSB7XG4gICAgICB2bS5fZGF0YS5fX29iX18udm1Db3VudC0tO1xuICAgIH1cbiAgICAvLyBjYWxsIHRoZSBsYXN0IGhvb2suLi5cbiAgICB2bS5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgIC8vIGludm9rZSBkZXN0cm95IGhvb2tzIG9uIGN1cnJlbnQgcmVuZGVyZWQgdHJlZVxuICAgIHZtLl9fcGF0Y2hfXyh2bS5fdm5vZGUsIG51bGwpO1xuICAgIC8vIGZpcmUgZGVzdHJveWVkIGhvb2tcbiAgICBjYWxsSG9vayh2bSwgJ2Rlc3Ryb3llZCcpO1xuICAgIC8vIHR1cm4gb2ZmIGFsbCBpbnN0YW5jZSBsaXN0ZW5lcnMuXG4gICAgdm0uJG9mZigpO1xuICAgIC8vIHJlbW92ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxuICAgIGlmICh2bS4kZWwpIHtcbiAgICAgIHZtLiRlbC5fX3Z1ZV9fID0gbnVsbDtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlZmVyZW5jZSB0byBET00gbm9kZXMgKHByZXZlbnRzIGxlYWspXG4gICAgdm0uJG9wdGlvbnMuX3BhcmVudEVsbSA9IHZtLiRvcHRpb25zLl9yZWZFbG0gPSBudWxsO1xuICB9O1xufVxuXG5mdW5jdGlvbiBtb3VudENvbXBvbmVudCAoXG4gIHZtLFxuICBlbCxcbiAgaHlkcmF0aW5nXG4pIHtcbiAgdm0uJGVsID0gZWw7XG4gIGlmICghdm0uJG9wdGlvbnMucmVuZGVyKSB7XG4gICAgdm0uJG9wdGlvbnMucmVuZGVyID0gY3JlYXRlRW1wdHlWTm9kZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoKHZtLiRvcHRpb25zLnRlbXBsYXRlICYmIHZtLiRvcHRpb25zLnRlbXBsYXRlLmNoYXJBdCgwKSAhPT0gJyMnKSB8fFxuICAgICAgICB2bS4kb3B0aW9ucy5lbCB8fCBlbCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdZb3UgYXJlIHVzaW5nIHRoZSBydW50aW1lLW9ubHkgYnVpbGQgb2YgVnVlIHdoZXJlIHRoZSB0ZW1wbGF0ZSAnICtcbiAgICAgICAgICAnY29tcGlsZXIgaXMgbm90IGF2YWlsYWJsZS4gRWl0aGVyIHByZS1jb21waWxlIHRoZSB0ZW1wbGF0ZXMgaW50byAnICtcbiAgICAgICAgICAncmVuZGVyIGZ1bmN0aW9ucywgb3IgdXNlIHRoZSBjb21waWxlci1pbmNsdWRlZCBidWlsZC4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdGYWlsZWQgdG8gbW91bnQgY29tcG9uZW50OiB0ZW1wbGF0ZSBvciByZW5kZXIgZnVuY3Rpb24gbm90IGRlZmluZWQuJyxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjYWxsSG9vayh2bSwgJ2JlZm9yZU1vdW50Jyk7XG5cbiAgdmFyIHVwZGF0ZUNvbXBvbmVudDtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBtYXJrKSB7XG4gICAgdXBkYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5hbWUgPSB2bS5fbmFtZTtcbiAgICAgIHZhciBpZCA9IHZtLl91aWQ7XG4gICAgICB2YXIgc3RhcnRUYWcgPSBcInZ1ZS1wZXJmLXN0YXJ0OlwiICsgaWQ7XG4gICAgICB2YXIgZW5kVGFnID0gXCJ2dWUtcGVyZi1lbmQ6XCIgKyBpZDtcblxuICAgICAgbWFyayhzdGFydFRhZyk7XG4gICAgICB2YXIgdm5vZGUgPSB2bS5fcmVuZGVyKCk7XG4gICAgICBtYXJrKGVuZFRhZyk7XG4gICAgICBtZWFzdXJlKChuYW1lICsgXCIgcmVuZGVyXCIpLCBzdGFydFRhZywgZW5kVGFnKTtcblxuICAgICAgbWFyayhzdGFydFRhZyk7XG4gICAgICB2bS5fdXBkYXRlKHZub2RlLCBoeWRyYXRpbmcpO1xuICAgICAgbWFyayhlbmRUYWcpO1xuICAgICAgbWVhc3VyZSgobmFtZSArIFwiIHBhdGNoXCIpLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZtLl91cGRhdGUodm0uX3JlbmRlcigpLCBoeWRyYXRpbmcpO1xuICAgIH07XG4gIH1cblxuICB2bS5fd2F0Y2hlciA9IG5ldyBXYXRjaGVyKHZtLCB1cGRhdGVDb21wb25lbnQsIG5vb3ApO1xuICBoeWRyYXRpbmcgPSBmYWxzZTtcblxuICAvLyBtYW51YWxseSBtb3VudGVkIGluc3RhbmNlLCBjYWxsIG1vdW50ZWQgb24gc2VsZlxuICAvLyBtb3VudGVkIGlzIGNhbGxlZCBmb3IgcmVuZGVyLWNyZWF0ZWQgY2hpbGQgY29tcG9uZW50cyBpbiBpdHMgaW5zZXJ0ZWQgaG9va1xuICBpZiAodm0uJHZub2RlID09IG51bGwpIHtcbiAgICB2bS5faXNNb3VudGVkID0gdHJ1ZTtcbiAgICBjYWxsSG9vayh2bSwgJ21vdW50ZWQnKTtcbiAgfVxuICByZXR1cm4gdm1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hpbGRDb21wb25lbnQgKFxuICB2bSxcbiAgcHJvcHNEYXRhLFxuICBsaXN0ZW5lcnMsXG4gIHBhcmVudFZub2RlLFxuICByZW5kZXJDaGlsZHJlblxuKSB7XG4gIC8vIGRldGVybWluZSB3aGV0aGVyIGNvbXBvbmVudCBoYXMgc2xvdCBjaGlsZHJlblxuICAvLyB3ZSBuZWVkIHRvIGRvIHRoaXMgYmVmb3JlIG92ZXJ3cml0aW5nICRvcHRpb25zLl9yZW5kZXJDaGlsZHJlblxuICB2YXIgaGFzQ2hpbGRyZW4gPSAhIShcbiAgICByZW5kZXJDaGlsZHJlbiB8fCAgICAgICAgICAgICAgIC8vIGhhcyBuZXcgc3RhdGljIHNsb3RzXG4gICAgdm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuIHx8ICAvLyBoYXMgb2xkIHN0YXRpYyBzbG90c1xuICAgIHBhcmVudFZub2RlLmRhdGEuc2NvcGVkU2xvdHMgfHwgLy8gaGFzIG5ldyBzY29wZWQgc2xvdHNcbiAgICB2bS4kc2NvcGVkU2xvdHMgIT09IGVtcHR5T2JqZWN0IC8vIGhhcyBvbGQgc2NvcGVkIHNsb3RzXG4gICk7XG5cbiAgdm0uJG9wdGlvbnMuX3BhcmVudFZub2RlID0gcGFyZW50Vm5vZGU7XG4gIHZtLiR2bm9kZSA9IHBhcmVudFZub2RlOyAvLyB1cGRhdGUgdm0ncyBwbGFjZWhvbGRlciBub2RlIHdpdGhvdXQgcmUtcmVuZGVyXG4gIGlmICh2bS5fdm5vZGUpIHsgLy8gdXBkYXRlIGNoaWxkIHRyZWUncyBwYXJlbnRcbiAgICB2bS5fdm5vZGUucGFyZW50ID0gcGFyZW50Vm5vZGU7XG4gIH1cbiAgdm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuID0gcmVuZGVyQ2hpbGRyZW47XG5cbiAgLy8gdXBkYXRlIHByb3BzXG4gIGlmIChwcm9wc0RhdGEgJiYgdm0uJG9wdGlvbnMucHJvcHMpIHtcbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSBmYWxzZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgb2JzZXJ2ZXJTdGF0ZS5pc1NldHRpbmdQcm9wcyA9IHRydWU7XG4gICAgfVxuICAgIHZhciBwcm9wcyA9IHZtLl9wcm9wcztcbiAgICB2YXIgcHJvcEtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IHByb3BLZXlzW2ldO1xuICAgICAgcHJvcHNba2V5XSA9IHZhbGlkYXRlUHJvcChrZXksIHZtLiRvcHRpb25zLnByb3BzLCBwcm9wc0RhdGEsIHZtKTtcbiAgICB9XG4gICAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ID0gdHJ1ZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgb2JzZXJ2ZXJTdGF0ZS5pc1NldHRpbmdQcm9wcyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBrZWVwIGEgY29weSBvZiByYXcgcHJvcHNEYXRhXG4gICAgdm0uJG9wdGlvbnMucHJvcHNEYXRhID0gcHJvcHNEYXRhO1xuICB9XG4gIC8vIHVwZGF0ZSBsaXN0ZW5lcnNcbiAgaWYgKGxpc3RlbmVycykge1xuICAgIHZhciBvbGRMaXN0ZW5lcnMgPSB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICAgIHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgPSBsaXN0ZW5lcnM7XG4gICAgdXBkYXRlQ29tcG9uZW50TGlzdGVuZXJzKHZtLCBsaXN0ZW5lcnMsIG9sZExpc3RlbmVycyk7XG4gIH1cbiAgLy8gcmVzb2x2ZSBzbG90cyArIGZvcmNlIHVwZGF0ZSBpZiBoYXMgY2hpbGRyZW5cbiAgaWYgKGhhc0NoaWxkcmVuKSB7XG4gICAgdm0uJHNsb3RzID0gcmVzb2x2ZVNsb3RzKHJlbmRlckNoaWxkcmVuLCBwYXJlbnRWbm9kZS5jb250ZXh0KTtcbiAgICB2bS4kZm9yY2VVcGRhdGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0luSW5hY3RpdmVUcmVlICh2bSkge1xuICB3aGlsZSAodm0gJiYgKHZtID0gdm0uJHBhcmVudCkpIHtcbiAgICBpZiAodm0uX2luYWN0aXZlKSB7IHJldHVybiB0cnVlIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKGlzSW5JbmFjdGl2ZVRyZWUodm0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0gZWxzZSBpZiAodm0uX2RpcmVjdEluYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZtLl9pbmFjdGl2ZSB8fCB2bS5faW5hY3RpdmUgPT09IG51bGwpIHtcbiAgICB2bS5faW5hY3RpdmUgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZtLiRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2FjdGl2YXRlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICBpZiAoZGlyZWN0KSB7XG4gICAgdm0uX2RpcmVjdEluYWN0aXZlID0gdHJ1ZTtcbiAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuICBpZiAoIXZtLl9pbmFjdGl2ZSkge1xuICAgIHZtLl9pbmFjdGl2ZSA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bS4kY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bS4kY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsSG9vayh2bSwgJ2RlYWN0aXZhdGVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEhvb2sgKHZtLCBob29rKSB7XG4gIHZhciBoYW5kbGVycyA9IHZtLiRvcHRpb25zW2hvb2tdO1xuICBpZiAoaGFuZGxlcnMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaGFuZGxlcnNbaV0uY2FsbCh2bSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCAoaG9vayArIFwiIGhvb2tcIikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodm0uX2hhc0hvb2tFdmVudCkge1xuICAgIHZtLiRlbWl0KCdob29rOicgKyBob29rKTtcbiAgfVxufVxuXG4vKiAgKi9cblxuXG52YXIgTUFYX1VQREFURV9DT1VOVCA9IDEwMDtcblxudmFyIHF1ZXVlID0gW107XG52YXIgYWN0aXZhdGVkQ2hpbGRyZW4gPSBbXTtcbnZhciBoYXMgPSB7fTtcbnZhciBjaXJjdWxhciA9IHt9O1xudmFyIHdhaXRpbmcgPSBmYWxzZTtcbnZhciBmbHVzaGluZyA9IGZhbHNlO1xudmFyIGluZGV4ID0gMDtcblxuLyoqXG4gKiBSZXNldCB0aGUgc2NoZWR1bGVyJ3Mgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHJlc2V0U2NoZWR1bGVyU3RhdGUgKCkge1xuICBxdWV1ZS5sZW5ndGggPSBhY3RpdmF0ZWRDaGlsZHJlbi5sZW5ndGggPSAwO1xuICBoYXMgPSB7fTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjaXJjdWxhciA9IHt9O1xuICB9XG4gIHdhaXRpbmcgPSBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG4vKipcbiAqIEZsdXNoIGJvdGggcXVldWVzIGFuZCBydW4gdGhlIHdhdGNoZXJzLlxuICovXG5mdW5jdGlvbiBmbHVzaFNjaGVkdWxlclF1ZXVlICgpIHtcbiAgZmx1c2hpbmcgPSB0cnVlO1xuICB2YXIgd2F0Y2hlciwgaWQ7XG5cbiAgLy8gU29ydCBxdWV1ZSBiZWZvcmUgZmx1c2guXG4gIC8vIFRoaXMgZW5zdXJlcyB0aGF0OlxuICAvLyAxLiBDb21wb25lbnRzIGFyZSB1cGRhdGVkIGZyb20gcGFyZW50IHRvIGNoaWxkLiAoYmVjYXVzZSBwYXJlbnQgaXMgYWx3YXlzXG4gIC8vICAgIGNyZWF0ZWQgYmVmb3JlIHRoZSBjaGlsZClcbiAgLy8gMi4gQSBjb21wb25lbnQncyB1c2VyIHdhdGNoZXJzIGFyZSBydW4gYmVmb3JlIGl0cyByZW5kZXIgd2F0Y2hlciAoYmVjYXVzZVxuICAvLyAgICB1c2VyIHdhdGNoZXJzIGFyZSBjcmVhdGVkIGJlZm9yZSB0aGUgcmVuZGVyIHdhdGNoZXIpXG4gIC8vIDMuIElmIGEgY29tcG9uZW50IGlzIGRlc3Ryb3llZCBkdXJpbmcgYSBwYXJlbnQgY29tcG9uZW50J3Mgd2F0Y2hlciBydW4sXG4gIC8vICAgIGl0cyB3YXRjaGVycyBjYW4gYmUgc2tpcHBlZC5cbiAgcXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5pZCAtIGIuaWQ7IH0pO1xuXG4gIC8vIGRvIG5vdCBjYWNoZSBsZW5ndGggYmVjYXVzZSBtb3JlIHdhdGNoZXJzIG1pZ2h0IGJlIHB1c2hlZFxuICAvLyBhcyB3ZSBydW4gZXhpc3Rpbmcgd2F0Y2hlcnNcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcXVldWUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgd2F0Y2hlciA9IHF1ZXVlW2luZGV4XTtcbiAgICBpZCA9IHdhdGNoZXIuaWQ7XG4gICAgaGFzW2lkXSA9IG51bGw7XG4gICAgd2F0Y2hlci5ydW4oKTtcbiAgICAvLyBpbiBkZXYgYnVpbGQsIGNoZWNrIGFuZCBzdG9wIGNpcmN1bGFyIHVwZGF0ZXMuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaGFzW2lkXSAhPSBudWxsKSB7XG4gICAgICBjaXJjdWxhcltpZF0gPSAoY2lyY3VsYXJbaWRdIHx8IDApICsgMTtcbiAgICAgIGlmIChjaXJjdWxhcltpZF0gPiBNQVhfVVBEQVRFX0NPVU5UKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBhbiBpbmZpbml0ZSB1cGRhdGUgbG9vcCAnICsgKFxuICAgICAgICAgICAgd2F0Y2hlci51c2VyXG4gICAgICAgICAgICAgID8gKFwiaW4gd2F0Y2hlciB3aXRoIGV4cHJlc3Npb24gXFxcIlwiICsgKHdhdGNoZXIuZXhwcmVzc2lvbikgKyBcIlxcXCJcIilcbiAgICAgICAgICAgICAgOiBcImluIGEgY29tcG9uZW50IHJlbmRlciBmdW5jdGlvbi5cIlxuICAgICAgICAgICksXG4gICAgICAgICAgd2F0Y2hlci52bVxuICAgICAgICApO1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGtlZXAgY29waWVzIG9mIHBvc3QgcXVldWVzIGJlZm9yZSByZXNldHRpbmcgc3RhdGVcbiAgdmFyIGFjdGl2YXRlZFF1ZXVlID0gYWN0aXZhdGVkQ2hpbGRyZW4uc2xpY2UoKTtcbiAgdmFyIHVwZGF0ZWRRdWV1ZSA9IHF1ZXVlLnNsaWNlKCk7XG5cbiAgcmVzZXRTY2hlZHVsZXJTdGF0ZSgpO1xuXG4gIC8vIGNhbGwgY29tcG9uZW50IHVwZGF0ZWQgYW5kIGFjdGl2YXRlZCBob29rc1xuICBjYWxsQWN0aXZhdGVkSG9va3MoYWN0aXZhdGVkUXVldWUpO1xuICBjYWxsVXBkYXRlSG9va3ModXBkYXRlZFF1ZXVlKTtcblxuICAvLyBkZXZ0b29sIGhvb2tcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChkZXZ0b29scyAmJiBjb25maWcuZGV2dG9vbHMpIHtcbiAgICBkZXZ0b29scy5lbWl0KCdmbHVzaCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxVcGRhdGVIb29rcyAocXVldWUpIHtcbiAgdmFyIGkgPSBxdWV1ZS5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgd2F0Y2hlciA9IHF1ZXVlW2ldO1xuICAgIHZhciB2bSA9IHdhdGNoZXIudm07XG4gICAgaWYgKHZtLl93YXRjaGVyID09PSB3YXRjaGVyICYmIHZtLl9pc01vdW50ZWQpIHtcbiAgICAgIGNhbGxIb29rKHZtLCAndXBkYXRlZCcpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFF1ZXVlIGEga2VwdC1hbGl2ZSBjb21wb25lbnQgdGhhdCB3YXMgYWN0aXZhdGVkIGR1cmluZyBwYXRjaC5cbiAqIFRoZSBxdWV1ZSB3aWxsIGJlIHByb2Nlc3NlZCBhZnRlciB0aGUgZW50aXJlIHRyZWUgaGFzIGJlZW4gcGF0Y2hlZC5cbiAqL1xuZnVuY3Rpb24gcXVldWVBY3RpdmF0ZWRDb21wb25lbnQgKHZtKSB7XG4gIC8vIHNldHRpbmcgX2luYWN0aXZlIHRvIGZhbHNlIGhlcmUgc28gdGhhdCBhIHJlbmRlciBmdW5jdGlvbiBjYW5cbiAgLy8gcmVseSBvbiBjaGVja2luZyB3aGV0aGVyIGl0J3MgaW4gYW4gaW5hY3RpdmUgdHJlZSAoZS5nLiByb3V0ZXItdmlldylcbiAgdm0uX2luYWN0aXZlID0gZmFsc2U7XG4gIGFjdGl2YXRlZENoaWxkcmVuLnB1c2godm0pO1xufVxuXG5mdW5jdGlvbiBjYWxsQWN0aXZhdGVkSG9va3MgKHF1ZXVlKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICBxdWV1ZVtpXS5faW5hY3RpdmUgPSB0cnVlO1xuICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQocXVldWVbaV0sIHRydWUgLyogdHJ1ZSAqLyk7XG4gIH1cbn1cblxuLyoqXG4gKiBQdXNoIGEgd2F0Y2hlciBpbnRvIHRoZSB3YXRjaGVyIHF1ZXVlLlxuICogSm9icyB3aXRoIGR1cGxpY2F0ZSBJRHMgd2lsbCBiZSBza2lwcGVkIHVubGVzcyBpdCdzXG4gKiBwdXNoZWQgd2hlbiB0aGUgcXVldWUgaXMgYmVpbmcgZmx1c2hlZC5cbiAqL1xuZnVuY3Rpb24gcXVldWVXYXRjaGVyICh3YXRjaGVyKSB7XG4gIHZhciBpZCA9IHdhdGNoZXIuaWQ7XG4gIGlmIChoYXNbaWRdID09IG51bGwpIHtcbiAgICBoYXNbaWRdID0gdHJ1ZTtcbiAgICBpZiAoIWZsdXNoaW5nKSB7XG4gICAgICBxdWV1ZS5wdXNoKHdhdGNoZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBhbHJlYWR5IGZsdXNoaW5nLCBzcGxpY2UgdGhlIHdhdGNoZXIgYmFzZWQgb24gaXRzIGlkXG4gICAgICAvLyBpZiBhbHJlYWR5IHBhc3QgaXRzIGlkLCBpdCB3aWxsIGJlIHJ1biBuZXh0IGltbWVkaWF0ZWx5LlxuICAgICAgdmFyIGkgPSBxdWV1ZS5sZW5ndGggLSAxO1xuICAgICAgd2hpbGUgKGkgPj0gMCAmJiBxdWV1ZVtpXS5pZCA+IHdhdGNoZXIuaWQpIHtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgICAgcXVldWUuc3BsaWNlKE1hdGgubWF4KGksIGluZGV4KSArIDEsIDAsIHdhdGNoZXIpO1xuICAgIH1cbiAgICAvLyBxdWV1ZSB0aGUgZmx1c2hcbiAgICBpZiAoIXdhaXRpbmcpIHtcbiAgICAgIHdhaXRpbmcgPSB0cnVlO1xuICAgICAgbmV4dFRpY2soZmx1c2hTY2hlZHVsZXJRdWV1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8qICAqL1xuXG52YXIgdWlkJDIgPSAwO1xuXG4vKipcbiAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICovXG52YXIgV2F0Y2hlciA9IGZ1bmN0aW9uIFdhdGNoZXIgKFxuICB2bSxcbiAgZXhwT3JGbixcbiAgY2IsXG4gIG9wdGlvbnNcbikge1xuICB0aGlzLnZtID0gdm07XG4gIHZtLl93YXRjaGVycy5wdXNoKHRoaXMpO1xuICAvLyBvcHRpb25zXG4gIGlmIChvcHRpb25zKSB7XG4gICAgdGhpcy5kZWVwID0gISFvcHRpb25zLmRlZXA7XG4gICAgdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXI7XG4gICAgdGhpcy5sYXp5ID0gISFvcHRpb25zLmxhenk7XG4gICAgdGhpcy5zeW5jID0gISFvcHRpb25zLnN5bmM7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kZWVwID0gdGhpcy51c2VyID0gdGhpcy5sYXp5ID0gdGhpcy5zeW5jID0gZmFsc2U7XG4gIH1cbiAgdGhpcy5jYiA9IGNiO1xuICB0aGlzLmlkID0gKyt1aWQkMjsgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIHRoaXMuZGlydHkgPSB0aGlzLmxhenk7IC8vIGZvciBsYXp5IHdhdGNoZXJzXG4gIHRoaXMuZGVwcyA9IFtdO1xuICB0aGlzLm5ld0RlcHMgPSBbXTtcbiAgdGhpcy5kZXBJZHMgPSBuZXcgX1NldCgpO1xuICB0aGlzLm5ld0RlcElkcyA9IG5ldyBfU2V0KCk7XG4gIHRoaXMuZXhwcmVzc2lvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbiAgICA/IGV4cE9yRm4udG9TdHJpbmcoKVxuICAgIDogJyc7XG4gIC8vIHBhcnNlIGV4cHJlc3Npb24gZm9yIGdldHRlclxuICBpZiAodHlwZW9mIGV4cE9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmdldHRlciA9IGV4cE9yRm47XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5nZXR0ZXIgPSBwYXJzZVBhdGgoZXhwT3JGbik7XG4gICAgaWYgKCF0aGlzLmdldHRlcikge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJGYWlsZWQgd2F0Y2hpbmcgcGF0aDogXFxcIlwiICsgZXhwT3JGbiArIFwiXFxcIiBcIiArXG4gICAgICAgICdXYXRjaGVyIG9ubHkgYWNjZXB0cyBzaW1wbGUgZG90LWRlbGltaXRlZCBwYXRocy4gJyArXG4gICAgICAgICdGb3IgZnVsbCBjb250cm9sLCB1c2UgYSBmdW5jdGlvbiBpbnN0ZWFkLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cbiAgfVxuICB0aGlzLnZhbHVlID0gdGhpcy5sYXp5XG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHRoaXMuZ2V0KCk7XG59O1xuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcHVzaFRhcmdldCh0aGlzKTtcbiAgdmFyIHZhbHVlO1xuICB2YXIgdm0gPSB0aGlzLnZtO1xuICBpZiAodGhpcy51c2VyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCAoXCJnZXR0ZXIgZm9yIHdhdGNoZXIgXFxcIlwiICsgKHRoaXMuZXhwcmVzc2lvbikgKyBcIlxcXCJcIikpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IHRoaXMuZ2V0dGVyLmNhbGwodm0sIHZtKTtcbiAgfVxuICAvLyBcInRvdWNoXCIgZXZlcnkgcHJvcGVydHkgc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXNcbiAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gIGlmICh0aGlzLmRlZXApIHtcbiAgICB0cmF2ZXJzZSh2YWx1ZSk7XG4gIH1cbiAgcG9wVGFyZ2V0KCk7XG4gIHRoaXMuY2xlYW51cERlcHMoKTtcbiAgcmV0dXJuIHZhbHVlXG59O1xuXG4vKipcbiAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmFkZERlcCA9IGZ1bmN0aW9uIGFkZERlcCAoZGVwKSB7XG4gIHZhciBpZCA9IGRlcC5pZDtcbiAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoaWQpKSB7XG4gICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKTtcbiAgICB0aGlzLm5ld0RlcHMucHVzaChkZXApO1xuICAgIGlmICghdGhpcy5kZXBJZHMuaGFzKGlkKSkge1xuICAgICAgZGVwLmFkZFN1Yih0aGlzKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYW4gdXAgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuY2xlYW51cERlcHMgPSBmdW5jdGlvbiBjbGVhbnVwRGVwcyAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIGRlcCA9IHRoaXMkMS5kZXBzW2ldO1xuICAgIGlmICghdGhpcyQxLm5ld0RlcElkcy5oYXMoZGVwLmlkKSkge1xuICAgICAgZGVwLnJlbW92ZVN1Yih0aGlzJDEpO1xuICAgIH1cbiAgfVxuICB2YXIgdG1wID0gdGhpcy5kZXBJZHM7XG4gIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHM7XG4gIHRoaXMubmV3RGVwSWRzID0gdG1wO1xuICB0aGlzLm5ld0RlcElkcy5jbGVhcigpO1xuICB0bXAgPSB0aGlzLmRlcHM7XG4gIHRoaXMuZGVwcyA9IHRoaXMubmV3RGVwcztcbiAgdGhpcy5uZXdEZXBzID0gdG1wO1xuICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMDtcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlciBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgZGVwZW5kZW5jeSBjaGFuZ2VzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAodGhpcy5sYXp5KSB7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gIH0gZWxzZSBpZiAodGhpcy5zeW5jKSB7XG4gICAgdGhpcy5ydW4oKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZVdhdGNoZXIodGhpcyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2NoZWR1bGVyIGpvYiBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgc2NoZWR1bGVyLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiBydW4gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpO1xuICAgIGlmIChcbiAgICAgIHZhbHVlICE9PSB0aGlzLnZhbHVlIHx8XG4gICAgICAvLyBEZWVwIHdhdGNoZXJzIGFuZCB3YXRjaGVycyBvbiBPYmplY3QvQXJyYXlzIHNob3VsZCBmaXJlIGV2ZW5cbiAgICAgIC8vIHdoZW4gdGhlIHZhbHVlIGlzIHRoZSBzYW1lLCBiZWNhdXNlIHRoZSB2YWx1ZSBtYXlcbiAgICAgIC8vIGhhdmUgbXV0YXRlZC5cbiAgICAgIGlzT2JqZWN0KHZhbHVlKSB8fFxuICAgICAgdGhpcy5kZWVwXG4gICAgKSB7XG4gICAgICAvLyBzZXQgbmV3IHZhbHVlXG4gICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaGFuZGxlRXJyb3IoZSwgdGhpcy52bSwgKFwiY2FsbGJhY2sgZm9yIHdhdGNoZXIgXFxcIlwiICsgKHRoaXMuZXhwcmVzc2lvbikgKyBcIlxcXCJcIikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIHZhbHVlIG9mIHRoZSB3YXRjaGVyLlxuICogVGhpcyBvbmx5IGdldHMgY2FsbGVkIGZvciBsYXp5IHdhdGNoZXJzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5ldmFsdWF0ZSA9IGZ1bmN0aW9uIGV2YWx1YXRlICgpIHtcbiAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gIHRoaXMuZGlydHkgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogRGVwZW5kIG9uIGFsbCBkZXBzIGNvbGxlY3RlZCBieSB0aGlzIHdhdGNoZXIuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uIGRlcGVuZCAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdGhpcyQxLmRlcHNbaV0uZGVwZW5kKCk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJzY3JpYmVyIGxpc3QuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnRlYXJkb3duID0gZnVuY3Rpb24gdGVhcmRvd24gKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3RcbiAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgZXhwZW5zaXZlIG9wZXJhdGlvbiBzbyB3ZSBza2lwIGl0XG4gICAgLy8gaWYgdGhlIHZtIGlzIGJlaW5nIGRlc3Ryb3llZC5cbiAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgIHJlbW92ZSh0aGlzLnZtLl93YXRjaGVycywgdGhpcyk7XG4gICAgfVxuICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzJDEuZGVwc1tpXS5yZW1vdmVTdWIodGhpcyQxKTtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSB0cmF2ZXJzZSBhbiBvYmplY3QgdG8gZXZva2UgYWxsIGNvbnZlcnRlZFxuICogZ2V0dGVycywgc28gdGhhdCBldmVyeSBuZXN0ZWQgcHJvcGVydHkgaW5zaWRlIHRoZSBvYmplY3RcbiAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBzZWVuT2JqZWN0cyA9IG5ldyBfU2V0KCk7XG5mdW5jdGlvbiB0cmF2ZXJzZSAodmFsKSB7XG4gIHNlZW5PYmplY3RzLmNsZWFyKCk7XG4gIF90cmF2ZXJzZSh2YWwsIHNlZW5PYmplY3RzKTtcbn1cblxuZnVuY3Rpb24gX3RyYXZlcnNlICh2YWwsIHNlZW4pIHtcbiAgdmFyIGksIGtleXM7XG4gIHZhciBpc0EgPSBBcnJheS5pc0FycmF5KHZhbCk7XG4gIGlmICgoIWlzQSAmJiAhaXNPYmplY3QodmFsKSkgfHwgIU9iamVjdC5pc0V4dGVuc2libGUodmFsKSkge1xuICAgIHJldHVyblxuICB9XG4gIGlmICh2YWwuX19vYl9fKSB7XG4gICAgdmFyIGRlcElkID0gdmFsLl9fb2JfXy5kZXAuaWQ7XG4gICAgaWYgKHNlZW4uaGFzKGRlcElkKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHNlZW4uYWRkKGRlcElkKTtcbiAgfVxuICBpZiAoaXNBKSB7XG4gICAgaSA9IHZhbC5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkgeyBfdHJhdmVyc2UodmFsW2ldLCBzZWVuKTsgfVxuICB9IGVsc2Uge1xuICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7IF90cmF2ZXJzZSh2YWxba2V5c1tpXV0sIHNlZW4pOyB9XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24gPSB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBub29wLFxuICBzZXQ6IG5vb3Bcbn07XG5cbmZ1bmN0aW9uIHByb3h5ICh0YXJnZXQsIHNvdXJjZUtleSwga2V5KSB7XG4gIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5nZXQgPSBmdW5jdGlvbiBwcm94eUdldHRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXNbc291cmNlS2V5XVtrZXldXG4gIH07XG4gIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBmdW5jdGlvbiBwcm94eVNldHRlciAodmFsKSB7XG4gICAgdGhpc1tzb3VyY2VLZXldW2tleV0gPSB2YWw7XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uKTtcbn1cblxuZnVuY3Rpb24gaW5pdFN0YXRlICh2bSkge1xuICB2bS5fd2F0Y2hlcnMgPSBbXTtcbiAgdmFyIG9wdHMgPSB2bS4kb3B0aW9ucztcbiAgaWYgKG9wdHMucHJvcHMpIHsgaW5pdFByb3BzKHZtLCBvcHRzLnByb3BzKTsgfVxuICBpZiAob3B0cy5tZXRob2RzKSB7IGluaXRNZXRob2RzKHZtLCBvcHRzLm1ldGhvZHMpOyB9XG4gIGlmIChvcHRzLmRhdGEpIHtcbiAgICBpbml0RGF0YSh2bSk7XG4gIH0gZWxzZSB7XG4gICAgb2JzZXJ2ZSh2bS5fZGF0YSA9IHt9LCB0cnVlIC8qIGFzUm9vdERhdGEgKi8pO1xuICB9XG4gIGlmIChvcHRzLmNvbXB1dGVkKSB7IGluaXRDb21wdXRlZCh2bSwgb3B0cy5jb21wdXRlZCk7IH1cbiAgaWYgKG9wdHMud2F0Y2gpIHsgaW5pdFdhdGNoKHZtLCBvcHRzLndhdGNoKTsgfVxufVxuXG52YXIgaXNSZXNlcnZlZFByb3AgPSB7XG4gIGtleTogMSxcbiAgcmVmOiAxLFxuICBzbG90OiAxXG59O1xuXG5mdW5jdGlvbiBpbml0UHJvcHMgKHZtLCBwcm9wc09wdGlvbnMpIHtcbiAgdmFyIHByb3BzRGF0YSA9IHZtLiRvcHRpb25zLnByb3BzRGF0YSB8fCB7fTtcbiAgdmFyIHByb3BzID0gdm0uX3Byb3BzID0ge307XG4gIC8vIGNhY2hlIHByb3Aga2V5cyBzbyB0aGF0IGZ1dHVyZSBwcm9wcyB1cGRhdGVzIGNhbiBpdGVyYXRlIHVzaW5nIEFycmF5XG4gIC8vIGluc3RlYWQgb2YgZHluYW1pYyBvYmplY3Qga2V5IGVudW1lcmF0aW9uLlxuICB2YXIga2V5cyA9IHZtLiRvcHRpb25zLl9wcm9wS2V5cyA9IFtdO1xuICB2YXIgaXNSb290ID0gIXZtLiRwYXJlbnQ7XG4gIC8vIHJvb3QgaW5zdGFuY2UgcHJvcHMgc2hvdWxkIGJlIGNvbnZlcnRlZFxuICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSBpc1Jvb3Q7XG4gIHZhciBsb29wID0gZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAga2V5cy5wdXNoKGtleSk7XG4gICAgdmFyIHZhbHVlID0gdmFsaWRhdGVQcm9wKGtleSwgcHJvcHNPcHRpb25zLCBwcm9wc0RhdGEsIHZtKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoaXNSZXNlcnZlZFByb3Bba2V5XSB8fCBjb25maWcuaXNSZXNlcnZlZEF0dHIoa2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIlxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhIHJlc2VydmVkIGF0dHJpYnV0ZSBhbmQgY2Fubm90IGJlIHVzZWQgYXMgY29tcG9uZW50IHByb3AuXCIpLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZpbmVSZWFjdGl2ZSQkMShwcm9wcywga2V5LCB2YWx1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodm0uJHBhcmVudCAmJiAhb2JzZXJ2ZXJTdGF0ZS5pc1NldHRpbmdQcm9wcykge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICBcIkF2b2lkIG11dGF0aW5nIGEgcHJvcCBkaXJlY3RseSBzaW5jZSB0aGUgdmFsdWUgd2lsbCBiZSBcIiArXG4gICAgICAgICAgICBcIm92ZXJ3cml0dGVuIHdoZW5ldmVyIHRoZSBwYXJlbnQgY29tcG9uZW50IHJlLXJlbmRlcnMuIFwiICtcbiAgICAgICAgICAgIFwiSW5zdGVhZCwgdXNlIGEgZGF0YSBvciBjb21wdXRlZCBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcHJvcCdzIFwiICtcbiAgICAgICAgICAgIFwidmFsdWUuIFByb3AgYmVpbmcgbXV0YXRlZDogXFxcIlwiICsga2V5ICsgXCJcXFwiXCIsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbmVSZWFjdGl2ZSQkMShwcm9wcywga2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8vIHN0YXRpYyBwcm9wcyBhcmUgYWxyZWFkeSBwcm94aWVkIG9uIHRoZSBjb21wb25lbnQncyBwcm90b3R5cGVcbiAgICAvLyBkdXJpbmcgVnVlLmV4dGVuZCgpLiBXZSBvbmx5IG5lZWQgdG8gcHJveHkgcHJvcHMgZGVmaW5lZCBhdFxuICAgIC8vIGluc3RhbnRpYXRpb24gaGVyZS5cbiAgICBpZiAoIShrZXkgaW4gdm0pKSB7XG4gICAgICBwcm94eSh2bSwgXCJfcHJvcHNcIiwga2V5KTtcbiAgICB9XG4gIH07XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3BzT3B0aW9ucykgbG9vcCgga2V5ICk7XG4gIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGluaXREYXRhICh2bSkge1xuICB2YXIgZGF0YSA9IHZtLiRvcHRpb25zLmRhdGE7XG4gIGRhdGEgPSB2bS5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nXG4gICAgPyBnZXREYXRhKGRhdGEsIHZtKVxuICAgIDogZGF0YSB8fCB7fTtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgZGF0YSA9IHt9O1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdDpcXG4nICtcbiAgICAgICdodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9jb21wb25lbnRzLmh0bWwjZGF0YS1NdXN0LUJlLWEtRnVuY3Rpb24nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXlzW2ldKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIlRoZSBkYXRhIHByb3BlcnR5IFxcXCJcIiArIChrZXlzW2ldKSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlY2xhcmVkIGFzIGEgcHJvcC4gXCIgK1xuICAgICAgICBcIlVzZSBwcm9wIGRlZmF1bHQgdmFsdWUgaW5zdGVhZC5cIixcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghaXNSZXNlcnZlZChrZXlzW2ldKSkge1xuICAgICAgcHJveHkodm0sIFwiX2RhdGFcIiwga2V5c1tpXSk7XG4gICAgfVxuICB9XG4gIC8vIG9ic2VydmUgZGF0YVxuICBvYnNlcnZlKGRhdGEsIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG59XG5cbmZ1bmN0aW9uIGdldERhdGEgKGRhdGEsIHZtKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRhdGEuY2FsbCh2bSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGhhbmRsZUVycm9yKGUsIHZtLCBcImRhdGEoKVwiKTtcbiAgICByZXR1cm4ge31cbiAgfVxufVxuXG52YXIgY29tcHV0ZWRXYXRjaGVyT3B0aW9ucyA9IHsgbGF6eTogdHJ1ZSB9O1xuXG5mdW5jdGlvbiBpbml0Q29tcHV0ZWQgKHZtLCBjb21wdXRlZCkge1xuICB2YXIgd2F0Y2hlcnMgPSB2bS5fY29tcHV0ZWRXYXRjaGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgdmFyIHVzZXJEZWYgPSBjb21wdXRlZFtrZXldO1xuICAgIHZhciBnZXR0ZXIgPSB0eXBlb2YgdXNlckRlZiA9PT0gJ2Z1bmN0aW9uJyA/IHVzZXJEZWYgOiB1c2VyRGVmLmdldDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiTm8gZ2V0dGVyIGZ1bmN0aW9uIGhhcyBiZWVuIGRlZmluZWQgZm9yIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIi5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgICAgZ2V0dGVyID0gbm9vcDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY3JlYXRlIGludGVybmFsIHdhdGNoZXIgZm9yIHRoZSBjb21wdXRlZCBwcm9wZXJ0eS5cbiAgICB3YXRjaGVyc1trZXldID0gbmV3IFdhdGNoZXIodm0sIGdldHRlciwgbm9vcCwgY29tcHV0ZWRXYXRjaGVyT3B0aW9ucyk7XG5cbiAgICAvLyBjb21wb25lbnQtZGVmaW5lZCBjb21wdXRlZCBwcm9wZXJ0aWVzIGFyZSBhbHJlYWR5IGRlZmluZWQgb24gdGhlXG4gICAgLy8gY29tcG9uZW50IHByb3RvdHlwZS4gV2Ugb25seSBuZWVkIHRvIGRlZmluZSBjb21wdXRlZCBwcm9wZXJ0aWVzIGRlZmluZWRcbiAgICAvLyBhdCBpbnN0YW50aWF0aW9uIGhlcmUuXG4gICAgaWYgKCEoa2V5IGluIHZtKSkge1xuICAgICAgZGVmaW5lQ29tcHV0ZWQodm0sIGtleSwgdXNlckRlZik7XG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoa2V5IGluIHZtLiRkYXRhKSB7XG4gICAgICAgIHdhcm4oKFwiVGhlIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlZmluZWQgaW4gZGF0YS5cIiksIHZtKTtcbiAgICAgIH0gZWxzZSBpZiAodm0uJG9wdGlvbnMucHJvcHMgJiYga2V5IGluIHZtLiRvcHRpb25zLnByb3BzKSB7XG4gICAgICAgIHdhcm4oKFwiVGhlIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlZmluZWQgYXMgYSBwcm9wLlwiKSwgdm0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVDb21wdXRlZCAodGFyZ2V0LCBrZXksIHVzZXJEZWYpIHtcbiAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IGNyZWF0ZUNvbXB1dGVkR2V0dGVyKGtleSk7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IG5vb3A7XG4gIH0gZWxzZSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IHVzZXJEZWYuZ2V0XG4gICAgICA/IHVzZXJEZWYuY2FjaGUgIT09IGZhbHNlXG4gICAgICAgID8gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIoa2V5KVxuICAgICAgICA6IHVzZXJEZWYuZ2V0XG4gICAgICA6IG5vb3A7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IHVzZXJEZWYuc2V0XG4gICAgICA/IHVzZXJEZWYuc2V0XG4gICAgICA6IG5vb3A7XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlZEdldHRlciAoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjb21wdXRlZEdldHRlciAoKSB7XG4gICAgdmFyIHdhdGNoZXIgPSB0aGlzLl9jb21wdXRlZFdhdGNoZXJzICYmIHRoaXMuX2NvbXB1dGVkV2F0Y2hlcnNba2V5XTtcbiAgICBpZiAod2F0Y2hlcikge1xuICAgICAgaWYgKHdhdGNoZXIuZGlydHkpIHtcbiAgICAgICAgd2F0Y2hlci5ldmFsdWF0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgd2F0Y2hlci5kZXBlbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRjaGVyLnZhbHVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRNZXRob2RzICh2bSwgbWV0aG9kcykge1xuICB2YXIgcHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wcztcbiAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICB2bVtrZXldID0gbWV0aG9kc1trZXldID09IG51bGwgPyBub29wIDogYmluZChtZXRob2RzW2tleV0sIHZtKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKG1ldGhvZHNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJtZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLiBcIiArXG4gICAgICAgICAgXCJEaWQgeW91IHJlZmVyZW5jZSB0aGUgZnVuY3Rpb24gY29ycmVjdGx5P1wiLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXkpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwibWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYXMgYSBwcm9wLlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0V2F0Y2ggKHZtLCB3YXRjaCkge1xuICBmb3IgKHZhciBrZXkgaW4gd2F0Y2gpIHtcbiAgICB2YXIgaGFuZGxlciA9IHdhdGNoW2tleV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGFuZGxlcikpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXJbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVXYXRjaGVyICh2bSwga2V5LCBoYW5kbGVyKSB7XG4gIHZhciBvcHRpb25zO1xuICBpZiAoaXNQbGFpbk9iamVjdChoYW5kbGVyKSkge1xuICAgIG9wdGlvbnMgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBoYW5kbGVyLmhhbmRsZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJykge1xuICAgIGhhbmRsZXIgPSB2bVtoYW5kbGVyXTtcbiAgfVxuICB2bS4kd2F0Y2goa2V5LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gc3RhdGVNaXhpbiAoVnVlKSB7XG4gIC8vIGZsb3cgc29tZWhvdyBoYXMgcHJvYmxlbXMgd2l0aCBkaXJlY3RseSBkZWNsYXJlZCBkZWZpbml0aW9uIG9iamVjdFxuICAvLyB3aGVuIHVzaW5nIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSwgc28gd2UgaGF2ZSB0byBwcm9jZWR1cmFsbHkgYnVpbGQgdXBcbiAgLy8gdGhlIG9iamVjdCBoZXJlLlxuICB2YXIgZGF0YURlZiA9IHt9O1xuICBkYXRhRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2RhdGEgfTtcbiAgdmFyIHByb3BzRGVmID0ge307XG4gIHByb3BzRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3Byb3BzIH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZGF0YURlZi5zZXQgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0F2b2lkIHJlcGxhY2luZyBpbnN0YW5jZSByb290ICRkYXRhLiAnICtcbiAgICAgICAgJ1VzZSBuZXN0ZWQgZGF0YSBwcm9wZXJ0aWVzIGluc3RlYWQuJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9O1xuICAgIHByb3BzRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXCIkcHJvcHMgaXMgcmVhZG9ubHkuXCIsIHRoaXMpO1xuICAgIH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckZGF0YScsIGRhdGFEZWYpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRwcm9wcycsIHByb3BzRGVmKTtcblxuICBWdWUucHJvdG90eXBlLiRzZXQgPSBzZXQ7XG4gIFZ1ZS5wcm90b3R5cGUuJGRlbGV0ZSA9IGRlbDtcblxuICBWdWUucHJvdG90eXBlLiR3YXRjaCA9IGZ1bmN0aW9uIChcbiAgICBleHBPckZuLFxuICAgIGNiLFxuICAgIG9wdGlvbnNcbiAgKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVzZXIgPSB0cnVlO1xuICAgIHZhciB3YXRjaGVyID0gbmV3IFdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5pbW1lZGlhdGUpIHtcbiAgICAgIGNiLmNhbGwodm0sIHdhdGNoZXIudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gdW53YXRjaEZuICgpIHtcbiAgICAgIHdhdGNoZXIudGVhcmRvd24oKTtcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0UHJvdmlkZSAodm0pIHtcbiAgdmFyIHByb3ZpZGUgPSB2bS4kb3B0aW9ucy5wcm92aWRlO1xuICBpZiAocHJvdmlkZSkge1xuICAgIHZtLl9wcm92aWRlZCA9IHR5cGVvZiBwcm92aWRlID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHByb3ZpZGUuY2FsbCh2bSlcbiAgICAgIDogcHJvdmlkZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0SW5qZWN0aW9ucyAodm0pIHtcbiAgdmFyIHJlc3VsdCA9IHJlc29sdmVJbmplY3Qodm0uJG9wdGlvbnMuaW5qZWN0LCB2bSk7XG4gIGlmIChyZXN1bHQpIHtcbiAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCBrZXksIHJlc3VsdFtrZXldLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIFwiQXZvaWQgbXV0YXRpbmcgYW4gaW5qZWN0ZWQgdmFsdWUgZGlyZWN0bHkgc2luY2UgdGhlIGNoYW5nZXMgd2lsbCBiZSBcIiArXG4gICAgICAgICAgICBcIm92ZXJ3cml0dGVuIHdoZW5ldmVyIHRoZSBwcm92aWRlZCBjb21wb25lbnQgcmUtcmVuZGVycy4gXCIgK1xuICAgICAgICAgICAgXCJpbmplY3Rpb24gYmVpbmcgbXV0YXRlZDogXFxcIlwiICsga2V5ICsgXCJcXFwiXCIsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sIGtleSwgcmVzdWx0W2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVJbmplY3QgKGluamVjdCwgdm0pIHtcbiAgaWYgKGluamVjdCkge1xuICAgIC8vIGluamVjdCBpcyA6YW55IGJlY2F1c2UgZmxvdyBpcyBub3Qgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSBvdXQgY2FjaGVkXG4gICAgLy8gaXNBcnJheSBoZXJlXG4gICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGluamVjdCk7XG4gICAgdmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIGtleXMgPSBpc0FycmF5XG4gICAgICA/IGluamVjdFxuICAgICAgOiBoYXNTeW1ib2xcbiAgICAgICAgPyBSZWZsZWN0Lm93bktleXMoaW5qZWN0KVxuICAgICAgICA6IE9iamVjdC5rZXlzKGluamVjdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgdmFyIHByb3ZpZGVLZXkgPSBpc0FycmF5ID8ga2V5IDogaW5qZWN0W2tleV07XG4gICAgICB2YXIgc291cmNlID0gdm07XG4gICAgICB3aGlsZSAoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuX3Byb3ZpZGVkICYmIHByb3ZpZGVLZXkgaW4gc291cmNlLl9wcm92aWRlZCkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gc291cmNlLl9wcm92aWRlZFtwcm92aWRlS2V5XTtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZS4kcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQgKFxuICBDdG9yLFxuICBwcm9wc0RhdGEsXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuXG4pIHtcbiAgdmFyIHByb3BzID0ge307XG4gIHZhciBwcm9wT3B0aW9ucyA9IEN0b3Iub3B0aW9ucy5wcm9wcztcbiAgaWYgKGlzRGVmKHByb3BPcHRpb25zKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBwcm9wT3B0aW9ucykge1xuICAgICAgcHJvcHNba2V5XSA9IHZhbGlkYXRlUHJvcChrZXksIHByb3BPcHRpb25zLCBwcm9wc0RhdGEgfHwge30pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNEZWYoZGF0YS5hdHRycykpIHsgbWVyZ2VQcm9wcyhwcm9wcywgZGF0YS5hdHRycyk7IH1cbiAgICBpZiAoaXNEZWYoZGF0YS5wcm9wcykpIHsgbWVyZ2VQcm9wcyhwcm9wcywgZGF0YS5wcm9wcyk7IH1cbiAgfVxuICAvLyBlbnN1cmUgdGhlIGNyZWF0ZUVsZW1lbnQgZnVuY3Rpb24gaW4gZnVuY3Rpb25hbCBjb21wb25lbnRzXG4gIC8vIGdldHMgYSB1bmlxdWUgY29udGV4dCAtIHRoaXMgaXMgbmVjZXNzYXJ5IGZvciBjb3JyZWN0IG5hbWVkIHNsb3QgY2hlY2tcbiAgdmFyIF9jb250ZXh0ID0gT2JqZWN0LmNyZWF0ZShjb250ZXh0KTtcbiAgdmFyIGggPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudChfY29udGV4dCwgYSwgYiwgYywgZCwgdHJ1ZSk7IH07XG4gIHZhciB2bm9kZSA9IEN0b3Iub3B0aW9ucy5yZW5kZXIuY2FsbChudWxsLCBoLCB7XG4gICAgZGF0YTogZGF0YSxcbiAgICBwcm9wczogcHJvcHMsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIHBhcmVudDogY29udGV4dCxcbiAgICBsaXN0ZW5lcnM6IGRhdGEub24gfHwge30sXG4gICAgaW5qZWN0aW9uczogcmVzb2x2ZUluamVjdChDdG9yLm9wdGlvbnMuaW5qZWN0LCBjb250ZXh0KSxcbiAgICBzbG90czogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZVNsb3RzKGNoaWxkcmVuLCBjb250ZXh0KTsgfVxuICB9KTtcbiAgaWYgKHZub2RlIGluc3RhbmNlb2YgVk5vZGUpIHtcbiAgICB2bm9kZS5mdW5jdGlvbmFsQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgdm5vZGUuZnVuY3Rpb25hbE9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gICAgaWYgKGRhdGEuc2xvdCkge1xuICAgICAgKHZub2RlLmRhdGEgfHwgKHZub2RlLmRhdGEgPSB7fSkpLnNsb3QgPSBkYXRhLnNsb3Q7XG4gICAgfVxuICB9XG4gIHJldHVybiB2bm9kZVxufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzICh0bywgZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgIHRvW2NhbWVsaXplKGtleSldID0gZnJvbVtrZXldO1xuICB9XG59XG5cbi8qICAqL1xuXG4vLyBob29rcyB0byBiZSBpbnZva2VkIG9uIGNvbXBvbmVudCBWTm9kZXMgZHVyaW5nIHBhdGNoXG52YXIgY29tcG9uZW50Vk5vZGVIb29rcyA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCAoXG4gICAgdm5vZGUsXG4gICAgaHlkcmF0aW5nLFxuICAgIHBhcmVudEVsbSxcbiAgICByZWZFbG1cbiAgKSB7XG4gICAgaWYgKCF2bm9kZS5jb21wb25lbnRJbnN0YW5jZSB8fCB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHZhciBjaGlsZCA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VGb3JWbm9kZShcbiAgICAgICAgdm5vZGUsXG4gICAgICAgIGFjdGl2ZUluc3RhbmNlLFxuICAgICAgICBwYXJlbnRFbG0sXG4gICAgICAgIHJlZkVsbVxuICAgICAgKTtcbiAgICAgIGNoaWxkLiRtb3VudChoeWRyYXRpbmcgPyB2bm9kZS5lbG0gOiB1bmRlZmluZWQsIGh5ZHJhdGluZyk7XG4gICAgfSBlbHNlIGlmICh2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgLy8ga2VwdC1hbGl2ZSBjb21wb25lbnRzLCB0cmVhdCBhcyBhIHBhdGNoXG4gICAgICB2YXIgbW91bnRlZE5vZGUgPSB2bm9kZTsgLy8gd29yayBhcm91bmQgZmxvd1xuICAgICAgY29tcG9uZW50Vk5vZGVIb29rcy5wcmVwYXRjaChtb3VudGVkTm9kZSwgbW91bnRlZE5vZGUpO1xuICAgIH1cbiAgfSxcblxuICBwcmVwYXRjaDogZnVuY3Rpb24gcHJlcGF0Y2ggKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvcHRpb25zID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICB2YXIgY2hpbGQgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IG9sZFZub2RlLmNvbXBvbmVudEluc3RhbmNlO1xuICAgIHVwZGF0ZUNoaWxkQ29tcG9uZW50KFxuICAgICAgY2hpbGQsXG4gICAgICBvcHRpb25zLnByb3BzRGF0YSwgLy8gdXBkYXRlZCBwcm9wc1xuICAgICAgb3B0aW9ucy5saXN0ZW5lcnMsIC8vIHVwZGF0ZWQgbGlzdGVuZXJzXG4gICAgICB2bm9kZSwgLy8gbmV3IHBhcmVudCB2bm9kZVxuICAgICAgb3B0aW9ucy5jaGlsZHJlbiAvLyBuZXcgY2hpbGRyZW5cbiAgICApO1xuICB9LFxuXG4gIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0ICh2bm9kZSkge1xuICAgIHZhciBjb250ZXh0ID0gdm5vZGUuY29udGV4dDtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQpIHtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQgPSB0cnVlO1xuICAgICAgY2FsbEhvb2soY29tcG9uZW50SW5zdGFuY2UsICdtb3VudGVkJyk7XG4gICAgfVxuICAgIGlmICh2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgaWYgKGNvbnRleHQuX2lzTW91bnRlZCkge1xuICAgICAgICAvLyB2dWUtcm91dGVyIzEyMTJcbiAgICAgICAgLy8gRHVyaW5nIHVwZGF0ZXMsIGEga2VwdC1hbGl2ZSBjb21wb25lbnQncyBjaGlsZCBjb21wb25lbnRzIG1heVxuICAgICAgICAvLyBjaGFuZ2UsIHNvIGRpcmVjdGx5IHdhbGtpbmcgdGhlIHRyZWUgaGVyZSBtYXkgY2FsbCBhY3RpdmF0ZWQgaG9va3NcbiAgICAgICAgLy8gb24gaW5jb3JyZWN0IGNoaWxkcmVuLiBJbnN0ZWFkIHdlIHB1c2ggdGhlbSBpbnRvIGEgcXVldWUgd2hpY2ggd2lsbFxuICAgICAgICAvLyBiZSBwcm9jZXNzZWQgYWZ0ZXIgdGhlIHdob2xlIHBhdGNoIHByb2Nlc3MgZW5kZWQuXG4gICAgICAgIHF1ZXVlQWN0aXZhdGVkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UsIHRydWUgLyogZGlyZWN0ICovKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSAodm5vZGUpIHtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgaWYgKCF2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS4kZGVzdHJveSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgaG9va3NUb01lcmdlID0gT2JqZWN0LmtleXMoY29tcG9uZW50Vk5vZGVIb29rcyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAoXG4gIEN0b3IsXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICB0YWdcbikge1xuICBpZiAoaXNVbmRlZihDdG9yKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGJhc2VDdG9yID0gY29udGV4dC4kb3B0aW9ucy5fYmFzZTtcblxuICAvLyBwbGFpbiBvcHRpb25zIG9iamVjdDogdHVybiBpdCBpbnRvIGEgY29uc3RydWN0b3JcbiAgaWYgKGlzT2JqZWN0KEN0b3IpKSB7XG4gICAgQ3RvciA9IGJhc2VDdG9yLmV4dGVuZChDdG9yKTtcbiAgfVxuXG4gIC8vIGlmIGF0IHRoaXMgc3RhZ2UgaXQncyBub3QgYSBjb25zdHJ1Y3RvciBvciBhbiBhc3luYyBjb21wb25lbnQgZmFjdG9yeSxcbiAgLy8gcmVqZWN0LlxuICBpZiAodHlwZW9mIEN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybigoXCJJbnZhbGlkIENvbXBvbmVudCBkZWZpbml0aW9uOiBcIiArIChTdHJpbmcoQ3RvcikpKSwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gYXN5bmMgY29tcG9uZW50XG4gIGlmIChpc1VuZGVmKEN0b3IuY2lkKSkge1xuICAgIEN0b3IgPSByZXNvbHZlQXN5bmNDb21wb25lbnQoQ3RvciwgYmFzZUN0b3IsIGNvbnRleHQpO1xuICAgIGlmIChDdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIHJldHVybiBub3RoaW5nIGlmIHRoaXMgaXMgaW5kZWVkIGFuIGFzeW5jIGNvbXBvbmVudFxuICAgICAgLy8gd2FpdCBmb3IgdGhlIGNhbGxiYWNrIHRvIHRyaWdnZXIgcGFyZW50IHVwZGF0ZS5cbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIC8vIHJlc29sdmUgY29uc3RydWN0b3Igb3B0aW9ucyBpbiBjYXNlIGdsb2JhbCBtaXhpbnMgYXJlIGFwcGxpZWQgYWZ0ZXJcbiAgLy8gY29tcG9uZW50IGNvbnN0cnVjdG9yIGNyZWF0aW9uXG4gIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMoQ3Rvcik7XG5cbiAgZGF0YSA9IGRhdGEgfHwge307XG5cbiAgLy8gdHJhbnNmb3JtIGNvbXBvbmVudCB2LW1vZGVsIGRhdGEgaW50byBwcm9wcyAmIGV2ZW50c1xuICBpZiAoaXNEZWYoZGF0YS5tb2RlbCkpIHtcbiAgICB0cmFuc2Zvcm1Nb2RlbChDdG9yLm9wdGlvbnMsIGRhdGEpO1xuICB9XG5cbiAgLy8gZXh0cmFjdCBwcm9wc1xuICB2YXIgcHJvcHNEYXRhID0gZXh0cmFjdFByb3BzRnJvbVZOb2RlRGF0YShkYXRhLCBDdG9yLCB0YWcpO1xuXG4gIC8vIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4gIGlmIChpc1RydWUoQ3Rvci5vcHRpb25zLmZ1bmN0aW9uYWwpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQoQ3RvciwgcHJvcHNEYXRhLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbilcbiAgfVxuXG4gIC8vIGV4dHJhY3QgbGlzdGVuZXJzLCBzaW5jZSB0aGVzZSBuZWVkcyB0byBiZSB0cmVhdGVkIGFzXG4gIC8vIGNoaWxkIGNvbXBvbmVudCBsaXN0ZW5lcnMgaW5zdGVhZCBvZiBET00gbGlzdGVuZXJzXG4gIHZhciBsaXN0ZW5lcnMgPSBkYXRhLm9uO1xuICAvLyByZXBsYWNlIHdpdGggbGlzdGVuZXJzIHdpdGggLm5hdGl2ZSBtb2RpZmllclxuICBkYXRhLm9uID0gZGF0YS5uYXRpdmVPbjtcblxuICBpZiAoaXNUcnVlKEN0b3Iub3B0aW9ucy5hYnN0cmFjdCkpIHtcbiAgICAvLyBhYnN0cmFjdCBjb21wb25lbnRzIGRvIG5vdCBrZWVwIGFueXRoaW5nXG4gICAgLy8gb3RoZXIgdGhhbiBwcm9wcyAmIGxpc3RlbmVyc1xuICAgIGRhdGEgPSB7fTtcbiAgfVxuXG4gIC8vIG1lcmdlIGNvbXBvbmVudCBtYW5hZ2VtZW50IGhvb2tzIG9udG8gdGhlIHBsYWNlaG9sZGVyIG5vZGVcbiAgbWVyZ2VIb29rcyhkYXRhKTtcblxuICAvLyByZXR1cm4gYSBwbGFjZWhvbGRlciB2bm9kZVxuICB2YXIgbmFtZSA9IEN0b3Iub3B0aW9ucy5uYW1lIHx8IHRhZztcbiAgdmFyIHZub2RlID0gbmV3IFZOb2RlKFxuICAgIChcInZ1ZS1jb21wb25lbnQtXCIgKyAoQ3Rvci5jaWQpICsgKG5hbWUgPyAoXCItXCIgKyBuYW1lKSA6ICcnKSksXG4gICAgZGF0YSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dCxcbiAgICB7IEN0b3I6IEN0b3IsIHByb3BzRGF0YTogcHJvcHNEYXRhLCBsaXN0ZW5lcnM6IGxpc3RlbmVycywgdGFnOiB0YWcsIGNoaWxkcmVuOiBjaGlsZHJlbiB9XG4gICk7XG4gIHJldHVybiB2bm9kZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnRJbnN0YW5jZUZvclZub2RlIChcbiAgdm5vZGUsIC8vIHdlIGtub3cgaXQncyBNb3VudGVkQ29tcG9uZW50Vk5vZGUgYnV0IGZsb3cgZG9lc24ndFxuICBwYXJlbnQsIC8vIGFjdGl2ZUluc3RhbmNlIGluIGxpZmVjeWNsZSBzdGF0ZVxuICBwYXJlbnRFbG0sXG4gIHJlZkVsbVxuKSB7XG4gIHZhciB2bm9kZUNvbXBvbmVudE9wdGlvbnMgPSB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBfaXNDb21wb25lbnQ6IHRydWUsXG4gICAgcGFyZW50OiBwYXJlbnQsXG4gICAgcHJvcHNEYXRhOiB2bm9kZUNvbXBvbmVudE9wdGlvbnMucHJvcHNEYXRhLFxuICAgIF9jb21wb25lbnRUYWc6IHZub2RlQ29tcG9uZW50T3B0aW9ucy50YWcsXG4gICAgX3BhcmVudFZub2RlOiB2bm9kZSxcbiAgICBfcGFyZW50TGlzdGVuZXJzOiB2bm9kZUNvbXBvbmVudE9wdGlvbnMubGlzdGVuZXJzLFxuICAgIF9yZW5kZXJDaGlsZHJlbjogdm5vZGVDb21wb25lbnRPcHRpb25zLmNoaWxkcmVuLFxuICAgIF9wYXJlbnRFbG06IHBhcmVudEVsbSB8fCBudWxsLFxuICAgIF9yZWZFbG06IHJlZkVsbSB8fCBudWxsXG4gIH07XG4gIC8vIGNoZWNrIGlubGluZS10ZW1wbGF0ZSByZW5kZXIgZnVuY3Rpb25zXG4gIHZhciBpbmxpbmVUZW1wbGF0ZSA9IHZub2RlLmRhdGEuaW5saW5lVGVtcGxhdGU7XG4gIGlmIChpc0RlZihpbmxpbmVUZW1wbGF0ZSkpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGlubGluZVRlbXBsYXRlLnJlbmRlcjtcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGlubGluZVRlbXBsYXRlLnN0YXRpY1JlbmRlckZucztcbiAgfVxuICByZXR1cm4gbmV3IHZub2RlQ29tcG9uZW50T3B0aW9ucy5DdG9yKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIG1lcmdlSG9va3MgKGRhdGEpIHtcbiAgaWYgKCFkYXRhLmhvb2spIHtcbiAgICBkYXRhLmhvb2sgPSB7fTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzVG9NZXJnZS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBob29rc1RvTWVyZ2VbaV07XG4gICAgdmFyIGZyb21QYXJlbnQgPSBkYXRhLmhvb2tba2V5XTtcbiAgICB2YXIgb3VycyA9IGNvbXBvbmVudFZOb2RlSG9va3Nba2V5XTtcbiAgICBkYXRhLmhvb2tba2V5XSA9IGZyb21QYXJlbnQgPyBtZXJnZUhvb2skMShvdXJzLCBmcm9tUGFyZW50KSA6IG91cnM7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VIb29rJDEgKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xuICAgIG9uZShhLCBiLCBjLCBkKTtcbiAgICB0d28oYSwgYiwgYywgZCk7XG4gIH1cbn1cblxuLy8gdHJhbnNmb3JtIGNvbXBvbmVudCB2LW1vZGVsIGluZm8gKHZhbHVlIGFuZCBjYWxsYmFjaykgaW50b1xuLy8gcHJvcCBhbmQgZXZlbnQgaGFuZGxlciByZXNwZWN0aXZlbHkuXG5mdW5jdGlvbiB0cmFuc2Zvcm1Nb2RlbCAob3B0aW9ucywgZGF0YSkge1xuICB2YXIgcHJvcCA9IChvcHRpb25zLm1vZGVsICYmIG9wdGlvbnMubW9kZWwucHJvcCkgfHwgJ3ZhbHVlJztcbiAgdmFyIGV2ZW50ID0gKG9wdGlvbnMubW9kZWwgJiYgb3B0aW9ucy5tb2RlbC5ldmVudCkgfHwgJ2lucHV0JzsoZGF0YS5wcm9wcyB8fCAoZGF0YS5wcm9wcyA9IHt9KSlbcHJvcF0gPSBkYXRhLm1vZGVsLnZhbHVlO1xuICB2YXIgb24gPSBkYXRhLm9uIHx8IChkYXRhLm9uID0ge30pO1xuICBpZiAoaXNEZWYob25bZXZlbnRdKSkge1xuICAgIG9uW2V2ZW50XSA9IFtkYXRhLm1vZGVsLmNhbGxiYWNrXS5jb25jYXQob25bZXZlbnRdKTtcbiAgfSBlbHNlIHtcbiAgICBvbltldmVudF0gPSBkYXRhLm1vZGVsLmNhbGxiYWNrO1xuICB9XG59XG5cbi8qICAqL1xuXG52YXIgU0lNUExFX05PUk1BTElaRSA9IDE7XG52YXIgQUxXQVlTX05PUk1BTElaRSA9IDI7XG5cbi8vIHdyYXBwZXIgZnVuY3Rpb24gZm9yIHByb3ZpZGluZyBhIG1vcmUgZmxleGlibGUgaW50ZXJmYWNlXG4vLyB3aXRob3V0IGdldHRpbmcgeWVsbGVkIGF0IGJ5IGZsb3dcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKFxuICBjb250ZXh0LFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICBub3JtYWxpemF0aW9uVHlwZSxcbiAgYWx3YXlzTm9ybWFsaXplXG4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgfHwgaXNQcmltaXRpdmUoZGF0YSkpIHtcbiAgICBub3JtYWxpemF0aW9uVHlwZSA9IGNoaWxkcmVuO1xuICAgIGNoaWxkcmVuID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChpc1RydWUoYWx3YXlzTm9ybWFsaXplKSkge1xuICAgIG5vcm1hbGl6YXRpb25UeXBlID0gQUxXQVlTX05PUk1BTElaRTtcbiAgfVxuICByZXR1cm4gX2NyZWF0ZUVsZW1lbnQoY29udGV4dCwgdGFnLCBkYXRhLCBjaGlsZHJlbiwgbm9ybWFsaXphdGlvblR5cGUpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50IChcbiAgY29udGV4dCxcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgbm9ybWFsaXphdGlvblR5cGVcbikge1xuICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNEZWYoKGRhdGEpLl9fb2JfXykpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICBcIkF2b2lkIHVzaW5nIG9ic2VydmVkIGRhdGEgb2JqZWN0IGFzIHZub2RlIGRhdGE6IFwiICsgKEpTT04uc3RyaW5naWZ5KGRhdGEpKSArIFwiXFxuXCIgK1xuICAgICAgJ0Fsd2F5cyBjcmVhdGUgZnJlc2ggdm5vZGUgZGF0YSBvYmplY3RzIGluIGVhY2ggcmVuZGVyIScsXG4gICAgICBjb250ZXh0XG4gICAgKTtcbiAgICByZXR1cm4gY3JlYXRlRW1wdHlWTm9kZSgpXG4gIH1cbiAgaWYgKCF0YWcpIHtcbiAgICAvLyBpbiBjYXNlIG9mIGNvbXBvbmVudCA6aXMgc2V0IHRvIGZhbHN5IHZhbHVlXG4gICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICB9XG4gIC8vIHN1cHBvcnQgc2luZ2xlIGZ1bmN0aW9uIGNoaWxkcmVuIGFzIGRlZmF1bHQgc2NvcGVkIHNsb3RcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmXG4gICAgICB0eXBlb2YgY2hpbGRyZW5bMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICBkYXRhLnNjb3BlZFNsb3RzID0geyBkZWZhdWx0OiBjaGlsZHJlblswXSB9O1xuICAgIGNoaWxkcmVuLmxlbmd0aCA9IDA7XG4gIH1cbiAgaWYgKG5vcm1hbGl6YXRpb25UeXBlID09PSBBTFdBWVNfTk9STUFMSVpFKSB7XG4gICAgY2hpbGRyZW4gPSBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbik7XG4gIH0gZWxzZSBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IFNJTVBMRV9OT1JNQUxJWkUpIHtcbiAgICBjaGlsZHJlbiA9IHNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKTtcbiAgfVxuICB2YXIgdm5vZGUsIG5zO1xuICBpZiAodHlwZW9mIHRhZyA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgQ3RvcjtcbiAgICBucyA9IGNvbmZpZy5nZXRUYWdOYW1lc3BhY2UodGFnKTtcbiAgICBpZiAoY29uZmlnLmlzUmVzZXJ2ZWRUYWcodGFnKSkge1xuICAgICAgLy8gcGxhdGZvcm0gYnVpbHQtaW4gZWxlbWVudHNcbiAgICAgIHZub2RlID0gbmV3IFZOb2RlKFxuICAgICAgICBjb25maWcucGFyc2VQbGF0Zm9ybVRhZ05hbWUodGFnKSwgZGF0YSwgY2hpbGRyZW4sXG4gICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoaXNEZWYoQ3RvciA9IHJlc29sdmVBc3NldChjb250ZXh0LiRvcHRpb25zLCAnY29tcG9uZW50cycsIHRhZykpKSB7XG4gICAgICAvLyBjb21wb25lbnRcbiAgICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KEN0b3IsIGRhdGEsIGNvbnRleHQsIGNoaWxkcmVuLCB0YWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB1bmtub3duIG9yIHVubGlzdGVkIG5hbWVzcGFjZWQgZWxlbWVudHNcbiAgICAgIC8vIGNoZWNrIGF0IHJ1bnRpbWUgYmVjYXVzZSBpdCBtYXkgZ2V0IGFzc2lnbmVkIGEgbmFtZXNwYWNlIHdoZW4gaXRzXG4gICAgICAvLyBwYXJlbnQgbm9ybWFsaXplcyBjaGlsZHJlblxuICAgICAgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgICAgIHRhZywgZGF0YSwgY2hpbGRyZW4sXG4gICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0XG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBkaXJlY3QgY29tcG9uZW50IG9wdGlvbnMgLyBjb25zdHJ1Y3RvclxuICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KHRhZywgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pO1xuICB9XG4gIGlmIChpc0RlZih2bm9kZSkpIHtcbiAgICBpZiAobnMpIHsgYXBwbHlOUyh2bm9kZSwgbnMpOyB9XG4gICAgcmV0dXJuIHZub2RlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5TlMgKHZub2RlLCBucykge1xuICB2bm9kZS5ucyA9IG5zO1xuICBpZiAodm5vZGUudGFnID09PSAnZm9yZWlnbk9iamVjdCcpIHtcbiAgICAvLyB1c2UgZGVmYXVsdCBuYW1lc3BhY2UgaW5zaWRlIGZvcmVpZ25PYmplY3RcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoaXNEZWYodm5vZGUuY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IHZub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgaWYgKGlzRGVmKGNoaWxkLnRhZykgJiYgaXNVbmRlZihjaGlsZC5ucykpIHtcbiAgICAgICAgYXBwbHlOUyhjaGlsZCwgbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIHYtZm9yIGxpc3RzLlxuICovXG5mdW5jdGlvbiByZW5kZXJMaXN0IChcbiAgdmFsLFxuICByZW5kZXJcbikge1xuICB2YXIgcmV0LCBpLCBsLCBrZXlzLCBrZXk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkgfHwgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXQgPSBuZXcgQXJyYXkodmFsLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgbCA9IHZhbC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxbaV0sIGkpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHJldCA9IG5ldyBBcnJheSh2YWwpO1xuICAgIGZvciAoaSA9IDA7IGkgPCB2YWw7IGkrKykge1xuICAgICAgcmV0W2ldID0gcmVuZGVyKGkgKyAxLCBpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgIHJldCA9IG5ldyBBcnJheShrZXlzLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgcmV0W2ldID0gcmVuZGVyKHZhbFtrZXldLCBrZXksIGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgPHNsb3Q+XG4gKi9cbmZ1bmN0aW9uIHJlbmRlclNsb3QgKFxuICBuYW1lLFxuICBmYWxsYmFjayxcbiAgcHJvcHMsXG4gIGJpbmRPYmplY3Rcbikge1xuICB2YXIgc2NvcGVkU2xvdEZuID0gdGhpcy4kc2NvcGVkU2xvdHNbbmFtZV07XG4gIGlmIChzY29wZWRTbG90Rm4pIHsgLy8gc2NvcGVkIHNsb3RcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIGlmIChiaW5kT2JqZWN0KSB7XG4gICAgICBleHRlbmQocHJvcHMsIGJpbmRPYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gc2NvcGVkU2xvdEZuKHByb3BzKSB8fCBmYWxsYmFja1xuICB9IGVsc2Uge1xuICAgIHZhciBzbG90Tm9kZXMgPSB0aGlzLiRzbG90c1tuYW1lXTtcbiAgICAvLyB3YXJuIGR1cGxpY2F0ZSBzbG90IHVzYWdlXG4gICAgaWYgKHNsb3ROb2RlcyAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBzbG90Tm9kZXMuX3JlbmRlcmVkICYmIHdhcm4oXG4gICAgICAgIFwiRHVwbGljYXRlIHByZXNlbmNlIG9mIHNsb3QgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBmb3VuZCBpbiB0aGUgc2FtZSByZW5kZXIgdHJlZSBcIiArXG4gICAgICAgIFwiLSB0aGlzIHdpbGwgbGlrZWx5IGNhdXNlIHJlbmRlciBlcnJvcnMuXCIsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgICBzbG90Tm9kZXMuX3JlbmRlcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNsb3ROb2RlcyB8fCBmYWxsYmFja1xuICB9XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZXNvbHZpbmcgZmlsdGVyc1xuICovXG5mdW5jdGlvbiByZXNvbHZlRmlsdGVyIChpZCkge1xuICByZXR1cm4gcmVzb2x2ZUFzc2V0KHRoaXMuJG9wdGlvbnMsICdmaWx0ZXJzJywgaWQsIHRydWUpIHx8IGlkZW50aXR5XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciBjaGVja2luZyBrZXlDb2RlcyBmcm9tIGNvbmZpZy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tLZXlDb2RlcyAoXG4gIGV2ZW50S2V5Q29kZSxcbiAga2V5LFxuICBidWlsdEluQWxpYXNcbikge1xuICB2YXIga2V5Q29kZXMgPSBjb25maWcua2V5Q29kZXNba2V5XSB8fCBidWlsdEluQWxpYXM7XG4gIGlmIChBcnJheS5pc0FycmF5KGtleUNvZGVzKSkge1xuICAgIHJldHVybiBrZXlDb2Rlcy5pbmRleE9mKGV2ZW50S2V5Q29kZSkgPT09IC0xXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGtleUNvZGVzICE9PSBldmVudEtleUNvZGVcbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgbWVyZ2luZyB2LWJpbmQ9XCJvYmplY3RcIiBpbnRvIGEgVk5vZGUncyBkYXRhLlxuICovXG5mdW5jdGlvbiBiaW5kT2JqZWN0UHJvcHMgKFxuICBkYXRhLFxuICB0YWcsXG4gIHZhbHVlLFxuICBhc1Byb3Bcbikge1xuICBpZiAodmFsdWUpIHtcbiAgICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAndi1iaW5kIHdpdGhvdXQgYXJndW1lbnQgZXhwZWN0cyBhbiBPYmplY3Qgb3IgQXJyYXkgdmFsdWUnLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB0b09iamVjdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgaGFzaDtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnY2xhc3MnIHx8IGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgIGhhc2ggPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0eXBlID0gZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLnR5cGU7XG4gICAgICAgICAgaGFzaCA9IGFzUHJvcCB8fCBjb25maWcubXVzdFVzZVByb3AodGFnLCB0eXBlLCBrZXkpXG4gICAgICAgICAgICA/IGRhdGEuZG9tUHJvcHMgfHwgKGRhdGEuZG9tUHJvcHMgPSB7fSlcbiAgICAgICAgICAgIDogZGF0YS5hdHRycyB8fCAoZGF0YS5hdHRycyA9IHt9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShrZXkgaW4gaGFzaCkpIHtcbiAgICAgICAgICBoYXNoW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgc3RhdGljIHRyZWVzLlxuICovXG5mdW5jdGlvbiByZW5kZXJTdGF0aWMgKFxuICBpbmRleCxcbiAgaXNJbkZvclxuKSB7XG4gIHZhciB0cmVlID0gdGhpcy5fc3RhdGljVHJlZXNbaW5kZXhdO1xuICAvLyBpZiBoYXMgYWxyZWFkeS1yZW5kZXJlZCBzdGF0aWMgdHJlZSBhbmQgbm90IGluc2lkZSB2LWZvcixcbiAgLy8gd2UgY2FuIHJldXNlIHRoZSBzYW1lIHRyZWUgYnkgZG9pbmcgYSBzaGFsbG93IGNsb25lLlxuICBpZiAodHJlZSAmJiAhaXNJbkZvcikge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRyZWUpXG4gICAgICA/IGNsb25lVk5vZGVzKHRyZWUpXG4gICAgICA6IGNsb25lVk5vZGUodHJlZSlcbiAgfVxuICAvLyBvdGhlcndpc2UsIHJlbmRlciBhIGZyZXNoIHRyZWUuXG4gIHRyZWUgPSB0aGlzLl9zdGF0aWNUcmVlc1tpbmRleF0gPVxuICAgIHRoaXMuJG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zW2luZGV4XS5jYWxsKHRoaXMuX3JlbmRlclByb3h5KTtcbiAgbWFya1N0YXRpYyh0cmVlLCAoXCJfX3N0YXRpY19fXCIgKyBpbmRleCksIGZhbHNlKTtcbiAgcmV0dXJuIHRyZWVcbn1cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3Igdi1vbmNlLlxuICogRWZmZWN0aXZlbHkgaXQgbWVhbnMgbWFya2luZyB0aGUgbm9kZSBhcyBzdGF0aWMgd2l0aCBhIHVuaXF1ZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIG1hcmtPbmNlIChcbiAgdHJlZSxcbiAgaW5kZXgsXG4gIGtleVxuKSB7XG4gIG1hcmtTdGF0aWModHJlZSwgKFwiX19vbmNlX19cIiArIGluZGV4ICsgKGtleSA/IChcIl9cIiArIGtleSkgOiBcIlwiKSksIHRydWUpO1xuICByZXR1cm4gdHJlZVxufVxuXG5mdW5jdGlvbiBtYXJrU3RhdGljIChcbiAgdHJlZSxcbiAga2V5LFxuICBpc09uY2Vcbikge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRyZWVbaV0gJiYgdHlwZW9mIHRyZWVbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1hcmtTdGF0aWNOb2RlKHRyZWVbaV0sIChrZXkgKyBcIl9cIiArIGkpLCBpc09uY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtYXJrU3RhdGljTm9kZSh0cmVlLCBrZXksIGlzT25jZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFya1N0YXRpY05vZGUgKG5vZGUsIGtleSwgaXNPbmNlKSB7XG4gIG5vZGUuaXNTdGF0aWMgPSB0cnVlO1xuICBub2RlLmtleSA9IGtleTtcbiAgbm9kZS5pc09uY2UgPSBpc09uY2U7XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0UmVuZGVyICh2bSkge1xuICB2bS5fdm5vZGUgPSBudWxsOyAvLyB0aGUgcm9vdCBvZiB0aGUgY2hpbGQgdHJlZVxuICB2bS5fc3RhdGljVHJlZXMgPSBudWxsO1xuICB2YXIgcGFyZW50Vm5vZGUgPSB2bS4kdm5vZGUgPSB2bS4kb3B0aW9ucy5fcGFyZW50Vm5vZGU7IC8vIHRoZSBwbGFjZWhvbGRlciBub2RlIGluIHBhcmVudCB0cmVlXG4gIHZhciByZW5kZXJDb250ZXh0ID0gcGFyZW50Vm5vZGUgJiYgcGFyZW50Vm5vZGUuY29udGV4dDtcbiAgdm0uJHNsb3RzID0gcmVzb2x2ZVNsb3RzKHZtLiRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiwgcmVuZGVyQ29udGV4dCk7XG4gIHZtLiRzY29wZWRTbG90cyA9IGVtcHR5T2JqZWN0O1xuICAvLyBiaW5kIHRoZSBjcmVhdGVFbGVtZW50IGZuIHRvIHRoaXMgaW5zdGFuY2VcbiAgLy8gc28gdGhhdCB3ZSBnZXQgcHJvcGVyIHJlbmRlciBjb250ZXh0IGluc2lkZSBpdC5cbiAgLy8gYXJncyBvcmRlcjogdGFnLCBkYXRhLCBjaGlsZHJlbiwgbm9ybWFsaXphdGlvblR5cGUsIGFsd2F5c05vcm1hbGl6ZVxuICAvLyBpbnRlcm5hbCB2ZXJzaW9uIGlzIHVzZWQgYnkgcmVuZGVyIGZ1bmN0aW9ucyBjb21waWxlZCBmcm9tIHRlbXBsYXRlc1xuICB2bS5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KHZtLCBhLCBiLCBjLCBkLCBmYWxzZSk7IH07XG4gIC8vIG5vcm1hbGl6YXRpb24gaXMgYWx3YXlzIGFwcGxpZWQgZm9yIHRoZSBwdWJsaWMgdmVyc2lvbiwgdXNlZCBpblxuICAvLyB1c2VyLXdyaXR0ZW4gcmVuZGVyIGZ1bmN0aW9ucy5cbiAgdm0uJGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudCh2bSwgYSwgYiwgYywgZCwgdHJ1ZSk7IH07XG59XG5cbmZ1bmN0aW9uIHJlbmRlck1peGluIChWdWUpIHtcbiAgVnVlLnByb3RvdHlwZS4kbmV4dFRpY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICByZXR1cm4gbmV4dFRpY2soZm4sIHRoaXMpXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdmFyIHJlZiA9IHZtLiRvcHRpb25zO1xuICAgIHZhciByZW5kZXIgPSByZWYucmVuZGVyO1xuICAgIHZhciBzdGF0aWNSZW5kZXJGbnMgPSByZWYuc3RhdGljUmVuZGVyRm5zO1xuICAgIHZhciBfcGFyZW50Vm5vZGUgPSByZWYuX3BhcmVudFZub2RlO1xuXG4gICAgaWYgKHZtLl9pc01vdW50ZWQpIHtcbiAgICAgIC8vIGNsb25lIHNsb3Qgbm9kZXMgb24gcmUtcmVuZGVyc1xuICAgICAgZm9yICh2YXIga2V5IGluIHZtLiRzbG90cykge1xuICAgICAgICB2bS4kc2xvdHNba2V5XSA9IGNsb25lVk5vZGVzKHZtLiRzbG90c1trZXldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2bS4kc2NvcGVkU2xvdHMgPSAoX3BhcmVudFZub2RlICYmIF9wYXJlbnRWbm9kZS5kYXRhLnNjb3BlZFNsb3RzKSB8fCBlbXB0eU9iamVjdDtcblxuICAgIGlmIChzdGF0aWNSZW5kZXJGbnMgJiYgIXZtLl9zdGF0aWNUcmVlcykge1xuICAgICAgdm0uX3N0YXRpY1RyZWVzID0gW107XG4gICAgfVxuICAgIC8vIHNldCBwYXJlbnQgdm5vZGUuIHRoaXMgYWxsb3dzIHJlbmRlciBmdW5jdGlvbnMgdG8gaGF2ZSBhY2Nlc3NcbiAgICAvLyB0byB0aGUgZGF0YSBvbiB0aGUgcGxhY2Vob2xkZXIgbm9kZS5cbiAgICB2bS4kdm5vZGUgPSBfcGFyZW50Vm5vZGU7XG4gICAgLy8gcmVuZGVyIHNlbGZcbiAgICB2YXIgdm5vZGU7XG4gICAgdHJ5IHtcbiAgICAgIHZub2RlID0gcmVuZGVyLmNhbGwodm0uX3JlbmRlclByb3h5LCB2bS4kY3JlYXRlRWxlbWVudCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIFwicmVuZGVyIGZ1bmN0aW9uXCIpO1xuICAgICAgLy8gcmV0dXJuIGVycm9yIHJlbmRlciByZXN1bHQsXG4gICAgICAvLyBvciBwcmV2aW91cyB2bm9kZSB0byBwcmV2ZW50IHJlbmRlciBlcnJvciBjYXVzaW5nIGJsYW5rIGNvbXBvbmVudFxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZub2RlID0gdm0uJG9wdGlvbnMucmVuZGVyRXJyb3JcbiAgICAgICAgICA/IHZtLiRvcHRpb25zLnJlbmRlckVycm9yLmNhbGwodm0uX3JlbmRlclByb3h5LCB2bS4kY3JlYXRlRWxlbWVudCwgZSlcbiAgICAgICAgICA6IHZtLl92bm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZub2RlID0gdm0uX3Zub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gZW1wdHkgdm5vZGUgaW4gY2FzZSB0aGUgcmVuZGVyIGZ1bmN0aW9uIGVycm9yZWQgb3V0XG4gICAgaWYgKCEodm5vZGUgaW5zdGFuY2VvZiBWTm9kZSkpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIEFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ011bHRpcGxlIHJvb3Qgbm9kZXMgcmV0dXJuZWQgZnJvbSByZW5kZXIgZnVuY3Rpb24uIFJlbmRlciBmdW5jdGlvbiAnICtcbiAgICAgICAgICAnc2hvdWxkIHJldHVybiBhIHNpbmdsZSByb290IG5vZGUuJyxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdm5vZGUgPSBjcmVhdGVFbXB0eVZOb2RlKCk7XG4gICAgfVxuICAgIC8vIHNldCBwYXJlbnRcbiAgICB2bm9kZS5wYXJlbnQgPSBfcGFyZW50Vm5vZGU7XG4gICAgcmV0dXJuIHZub2RlXG4gIH07XG5cbiAgLy8gaW50ZXJuYWwgcmVuZGVyIGhlbHBlcnMuXG4gIC8vIHRoZXNlIGFyZSBleHBvc2VkIG9uIHRoZSBpbnN0YW5jZSBwcm90b3R5cGUgdG8gcmVkdWNlIGdlbmVyYXRlZCByZW5kZXJcbiAgLy8gY29kZSBzaXplLlxuICBWdWUucHJvdG90eXBlLl9vID0gbWFya09uY2U7XG4gIFZ1ZS5wcm90b3R5cGUuX24gPSB0b051bWJlcjtcbiAgVnVlLnByb3RvdHlwZS5fcyA9IHRvU3RyaW5nO1xuICBWdWUucHJvdG90eXBlLl9sID0gcmVuZGVyTGlzdDtcbiAgVnVlLnByb3RvdHlwZS5fdCA9IHJlbmRlclNsb3Q7XG4gIFZ1ZS5wcm90b3R5cGUuX3EgPSBsb29zZUVxdWFsO1xuICBWdWUucHJvdG90eXBlLl9pID0gbG9vc2VJbmRleE9mO1xuICBWdWUucHJvdG90eXBlLl9tID0gcmVuZGVyU3RhdGljO1xuICBWdWUucHJvdG90eXBlLl9mID0gcmVzb2x2ZUZpbHRlcjtcbiAgVnVlLnByb3RvdHlwZS5fayA9IGNoZWNrS2V5Q29kZXM7XG4gIFZ1ZS5wcm90b3R5cGUuX2IgPSBiaW5kT2JqZWN0UHJvcHM7XG4gIFZ1ZS5wcm90b3R5cGUuX3YgPSBjcmVhdGVUZXh0Vk5vZGU7XG4gIFZ1ZS5wcm90b3R5cGUuX2UgPSBjcmVhdGVFbXB0eVZOb2RlO1xuICBWdWUucHJvdG90eXBlLl91ID0gcmVzb2x2ZVNjb3BlZFNsb3RzO1xufVxuXG4vKiAgKi9cblxudmFyIHVpZCA9IDA7XG5cbmZ1bmN0aW9uIGluaXRNaXhpbiAoVnVlKSB7XG4gIFZ1ZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgLy8gYSB1aWRcbiAgICB2bS5fdWlkID0gdWlkKys7XG5cbiAgICB2YXIgc3RhcnRUYWcsIGVuZFRhZztcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcucGVyZm9ybWFuY2UgJiYgbWFyaykge1xuICAgICAgc3RhcnRUYWcgPSBcInZ1ZS1wZXJmLWluaXQ6XCIgKyAodm0uX3VpZCk7XG4gICAgICBlbmRUYWcgPSBcInZ1ZS1wZXJmLWVuZDpcIiArICh2bS5fdWlkKTtcbiAgICAgIG1hcmsoc3RhcnRUYWcpO1xuICAgIH1cblxuICAgIC8vIGEgZmxhZyB0byBhdm9pZCB0aGlzIGJlaW5nIG9ic2VydmVkXG4gICAgdm0uX2lzVnVlID0gdHJ1ZTtcbiAgICAvLyBtZXJnZSBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5faXNDb21wb25lbnQpIHtcbiAgICAgIC8vIG9wdGltaXplIGludGVybmFsIGNvbXBvbmVudCBpbnN0YW50aWF0aW9uXG4gICAgICAvLyBzaW5jZSBkeW5hbWljIG9wdGlvbnMgbWVyZ2luZyBpcyBwcmV0dHkgc2xvdywgYW5kIG5vbmUgb2YgdGhlXG4gICAgICAvLyBpbnRlcm5hbCBjb21wb25lbnQgb3B0aW9ucyBuZWVkcyBzcGVjaWFsIHRyZWF0bWVudC5cbiAgICAgIGluaXRJbnRlcm5hbENvbXBvbmVudCh2bSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuICAgICAgICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKHZtLmNvbnN0cnVjdG9yKSxcbiAgICAgICAgb3B0aW9ucyB8fCB7fSxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGluaXRQcm94eSh2bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IHZtO1xuICAgIH1cbiAgICAvLyBleHBvc2UgcmVhbCBzZWxmXG4gICAgdm0uX3NlbGYgPSB2bTtcbiAgICBpbml0TGlmZWN5Y2xlKHZtKTtcbiAgICBpbml0RXZlbnRzKHZtKTtcbiAgICBpbml0UmVuZGVyKHZtKTtcbiAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZUNyZWF0ZScpO1xuICAgIGluaXRJbmplY3Rpb25zKHZtKTsgLy8gcmVzb2x2ZSBpbmplY3Rpb25zIGJlZm9yZSBkYXRhL3Byb3BzXG4gICAgaW5pdFN0YXRlKHZtKTtcbiAgICBpbml0UHJvdmlkZSh2bSk7IC8vIHJlc29sdmUgcHJvdmlkZSBhZnRlciBkYXRhL3Byb3BzXG4gICAgY2FsbEhvb2sodm0sICdjcmVhdGVkJyk7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcucGVyZm9ybWFuY2UgJiYgbWFyaykge1xuICAgICAgdm0uX25hbWUgPSBmb3JtYXRDb21wb25lbnROYW1lKHZtLCBmYWxzZSk7XG4gICAgICBtYXJrKGVuZFRhZyk7XG4gICAgICBtZWFzdXJlKCgodm0uX25hbWUpICsgXCIgaW5pdFwiKSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgfVxuXG4gICAgaWYgKHZtLiRvcHRpb25zLmVsKSB7XG4gICAgICB2bS4kbW91bnQodm0uJG9wdGlvbnMuZWwpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdEludGVybmFsQ29tcG9uZW50ICh2bSwgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IHZtLiRvcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh2bS5jb25zdHJ1Y3Rvci5vcHRpb25zKTtcbiAgLy8gZG9pbmcgdGhpcyBiZWNhdXNlIGl0J3MgZmFzdGVyIHRoYW4gZHluYW1pYyBlbnVtZXJhdGlvbi5cbiAgb3B0cy5wYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcbiAgb3B0cy5wcm9wc0RhdGEgPSBvcHRpb25zLnByb3BzRGF0YTtcbiAgb3B0cy5fcGFyZW50Vm5vZGUgPSBvcHRpb25zLl9wYXJlbnRWbm9kZTtcbiAgb3B0cy5fcGFyZW50TGlzdGVuZXJzID0gb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICBvcHRzLl9yZW5kZXJDaGlsZHJlbiA9IG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuO1xuICBvcHRzLl9jb21wb25lbnRUYWcgPSBvcHRpb25zLl9jb21wb25lbnRUYWc7XG4gIG9wdHMuX3BhcmVudEVsbSA9IG9wdGlvbnMuX3BhcmVudEVsbTtcbiAgb3B0cy5fcmVmRWxtID0gb3B0aW9ucy5fcmVmRWxtO1xuICBpZiAob3B0aW9ucy5yZW5kZXIpIHtcbiAgICBvcHRzLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyO1xuICAgIG9wdHMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnM7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyAoQ3Rvcikge1xuICB2YXIgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucztcbiAgaWYgKEN0b3Iuc3VwZXIpIHtcbiAgICB2YXIgc3VwZXJPcHRpb25zID0gcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyhDdG9yLnN1cGVyKTtcbiAgICB2YXIgY2FjaGVkU3VwZXJPcHRpb25zID0gQ3Rvci5zdXBlck9wdGlvbnM7XG4gICAgaWYgKHN1cGVyT3B0aW9ucyAhPT0gY2FjaGVkU3VwZXJPcHRpb25zKSB7XG4gICAgICAvLyBzdXBlciBvcHRpb24gY2hhbmdlZCxcbiAgICAgIC8vIG5lZWQgdG8gcmVzb2x2ZSBuZXcgb3B0aW9ucy5cbiAgICAgIEN0b3Iuc3VwZXJPcHRpb25zID0gc3VwZXJPcHRpb25zO1xuICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSBsYXRlLW1vZGlmaWVkL2F0dGFjaGVkIG9wdGlvbnMgKCM0OTc2KVxuICAgICAgdmFyIG1vZGlmaWVkT3B0aW9ucyA9IHJlc29sdmVNb2RpZmllZE9wdGlvbnMoQ3Rvcik7XG4gICAgICAvLyB1cGRhdGUgYmFzZSBleHRlbmQgb3B0aW9uc1xuICAgICAgaWYgKG1vZGlmaWVkT3B0aW9ucykge1xuICAgICAgICBleHRlbmQoQ3Rvci5leHRlbmRPcHRpb25zLCBtb2RpZmllZE9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhzdXBlck9wdGlvbnMsIEN0b3IuZXh0ZW5kT3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIG9wdGlvbnMuY29tcG9uZW50c1tvcHRpb25zLm5hbWVdID0gQ3RvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnNcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1vZGlmaWVkT3B0aW9ucyAoQ3Rvcikge1xuICB2YXIgbW9kaWZpZWQ7XG4gIHZhciBsYXRlc3QgPSBDdG9yLm9wdGlvbnM7XG4gIHZhciBleHRlbmRlZCA9IEN0b3IuZXh0ZW5kT3B0aW9ucztcbiAgdmFyIHNlYWxlZCA9IEN0b3Iuc2VhbGVkT3B0aW9ucztcbiAgZm9yICh2YXIga2V5IGluIGxhdGVzdCkge1xuICAgIGlmIChsYXRlc3Rba2V5XSAhPT0gc2VhbGVkW2tleV0pIHtcbiAgICAgIGlmICghbW9kaWZpZWQpIHsgbW9kaWZpZWQgPSB7fTsgfVxuICAgICAgbW9kaWZpZWRba2V5XSA9IGRlZHVwZShsYXRlc3Rba2V5XSwgZXh0ZW5kZWRba2V5XSwgc2VhbGVkW2tleV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbW9kaWZpZWRcbn1cblxuZnVuY3Rpb24gZGVkdXBlIChsYXRlc3QsIGV4dGVuZGVkLCBzZWFsZWQpIHtcbiAgLy8gY29tcGFyZSBsYXRlc3QgYW5kIHNlYWxlZCB0byBlbnN1cmUgbGlmZWN5Y2xlIGhvb2tzIHdvbid0IGJlIGR1cGxpY2F0ZWRcbiAgLy8gYmV0d2VlbiBtZXJnZXNcbiAgaWYgKEFycmF5LmlzQXJyYXkobGF0ZXN0KSkge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBzZWFsZWQgPSBBcnJheS5pc0FycmF5KHNlYWxlZCkgPyBzZWFsZWQgOiBbc2VhbGVkXTtcbiAgICBleHRlbmRlZCA9IEFycmF5LmlzQXJyYXkoZXh0ZW5kZWQpID8gZXh0ZW5kZWQgOiBbZXh0ZW5kZWRdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF0ZXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBwdXNoIG9yaWdpbmFsIG9wdGlvbnMgYW5kIG5vdCBzZWFsZWQgb3B0aW9ucyB0byBleGNsdWRlIGR1cGxpY2F0ZWQgb3B0aW9uc1xuICAgICAgaWYgKGV4dGVuZGVkLmluZGV4T2YobGF0ZXN0W2ldKSA+PSAwIHx8IHNlYWxlZC5pbmRleE9mKGxhdGVzdFtpXSkgPCAwKSB7XG4gICAgICAgIHJlcy5wdXNoKGxhdGVzdFtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGF0ZXN0XG4gIH1cbn1cblxuZnVuY3Rpb24gVnVlJDMgKG9wdGlvbnMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAhKHRoaXMgaW5zdGFuY2VvZiBWdWUkMykpIHtcbiAgICB3YXJuKCdWdWUgaXMgYSBjb25zdHJ1Y3RvciBhbmQgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSBgbmV3YCBrZXl3b3JkJyk7XG4gIH1cbiAgdGhpcy5faW5pdChvcHRpb25zKTtcbn1cblxuaW5pdE1peGluKFZ1ZSQzKTtcbnN0YXRlTWl4aW4oVnVlJDMpO1xuZXZlbnRzTWl4aW4oVnVlJDMpO1xubGlmZWN5Y2xlTWl4aW4oVnVlJDMpO1xucmVuZGVyTWl4aW4oVnVlJDMpO1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdFVzZSAoVnVlKSB7XG4gIFZ1ZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHBsdWdpbi5pbnN0YWxsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgaWYgKHR5cGVvZiBwbHVnaW4uaW5zdGFsbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcGx1Z2luLmluc3RhbGwuYXBwbHkocGx1Z2luLCBhcmdzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHBsdWdpbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgcGx1Z2luLmluc3RhbGxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXNcbiAgfTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRNaXhpbiQxIChWdWUpIHtcbiAgVnVlLm1peGluID0gZnVuY3Rpb24gKG1peGluKSB7XG4gICAgdGhpcy5vcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMub3B0aW9ucywgbWl4aW4pO1xuICB9O1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEV4dGVuZCAoVnVlKSB7XG4gIC8qKlxuICAgKiBFYWNoIGluc3RhbmNlIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgVnVlLCBoYXMgYSB1bmlxdWVcbiAgICogY2lkLiBUaGlzIGVuYWJsZXMgdXMgdG8gY3JlYXRlIHdyYXBwZWQgXCJjaGlsZFxuICAgKiBjb25zdHJ1Y3RvcnNcIiBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZSBhbmQgY2FjaGUgdGhlbS5cbiAgICovXG4gIFZ1ZS5jaWQgPSAwO1xuICB2YXIgY2lkID0gMTtcblxuICAvKipcbiAgICogQ2xhc3MgaW5oZXJpdGFuY2VcbiAgICovXG4gIFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5kT3B0aW9ucykge1xuICAgIGV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zIHx8IHt9O1xuICAgIHZhciBTdXBlciA9IHRoaXM7XG4gICAgdmFyIFN1cGVySWQgPSBTdXBlci5jaWQ7XG4gICAgdmFyIGNhY2hlZEN0b3JzID0gZXh0ZW5kT3B0aW9ucy5fQ3RvciB8fCAoZXh0ZW5kT3B0aW9ucy5fQ3RvciA9IHt9KTtcbiAgICBpZiAoY2FjaGVkQ3RvcnNbU3VwZXJJZF0pIHtcbiAgICAgIHJldHVybiBjYWNoZWRDdG9yc1tTdXBlcklkXVxuICAgIH1cblxuICAgIHZhciBuYW1lID0gZXh0ZW5kT3B0aW9ucy5uYW1lIHx8IFN1cGVyLm9wdGlvbnMubmFtZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCEvXlthLXpBLVpdW1xcdy1dKiQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnSW52YWxpZCBjb21wb25lbnQgbmFtZTogXCInICsgbmFtZSArICdcIi4gQ29tcG9uZW50IG5hbWVzICcgK1xuICAgICAgICAgICdjYW4gb25seSBjb250YWluIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIGFuZCB0aGUgaHlwaGVuLCAnICtcbiAgICAgICAgICAnYW5kIG11c3Qgc3RhcnQgd2l0aCBhIGxldHRlci4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFN1YiA9IGZ1bmN0aW9uIFZ1ZUNvbXBvbmVudCAob3B0aW9ucykge1xuICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICB9O1xuICAgIFN1Yi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyLnByb3RvdHlwZSk7XG4gICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcbiAgICBTdWIuY2lkID0gY2lkKys7XG4gICAgU3ViLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG4gICAgICBTdXBlci5vcHRpb25zLFxuICAgICAgZXh0ZW5kT3B0aW9uc1xuICAgICk7XG4gICAgU3ViWydzdXBlciddID0gU3VwZXI7XG5cbiAgICAvLyBGb3IgcHJvcHMgYW5kIGNvbXB1dGVkIHByb3BlcnRpZXMsIHdlIGRlZmluZSB0aGUgcHJveHkgZ2V0dGVycyBvblxuICAgIC8vIHRoZSBWdWUgaW5zdGFuY2VzIGF0IGV4dGVuc2lvbiB0aW1lLCBvbiB0aGUgZXh0ZW5kZWQgcHJvdG90eXBlLiBUaGlzXG4gICAgLy8gYXZvaWRzIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxscyBmb3IgZWFjaCBpbnN0YW5jZSBjcmVhdGVkLlxuICAgIGlmIChTdWIub3B0aW9ucy5wcm9wcykge1xuICAgICAgaW5pdFByb3BzJDEoU3ViKTtcbiAgICB9XG4gICAgaWYgKFN1Yi5vcHRpb25zLmNvbXB1dGVkKSB7XG4gICAgICBpbml0Q29tcHV0ZWQkMShTdWIpO1xuICAgIH1cblxuICAgIC8vIGFsbG93IGZ1cnRoZXIgZXh0ZW5zaW9uL21peGluL3BsdWdpbiB1c2FnZVxuICAgIFN1Yi5leHRlbmQgPSBTdXBlci5leHRlbmQ7XG4gICAgU3ViLm1peGluID0gU3VwZXIubWl4aW47XG4gICAgU3ViLnVzZSA9IFN1cGVyLnVzZTtcblxuICAgIC8vIGNyZWF0ZSBhc3NldCByZWdpc3RlcnMsIHNvIGV4dGVuZGVkIGNsYXNzZXNcbiAgICAvLyBjYW4gaGF2ZSB0aGVpciBwcml2YXRlIGFzc2V0cyB0b28uXG4gICAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgU3ViW3R5cGVdID0gU3VwZXJbdHlwZV07XG4gICAgfSk7XG4gICAgLy8gZW5hYmxlIHJlY3Vyc2l2ZSBzZWxmLWxvb2t1cFxuICAgIGlmIChuYW1lKSB7XG4gICAgICBTdWIub3B0aW9ucy5jb21wb25lbnRzW25hbWVdID0gU3ViO1xuICAgIH1cblxuICAgIC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyIG9wdGlvbnMgYXQgZXh0ZW5zaW9uIHRpbWUuXG4gICAgLy8gbGF0ZXIgYXQgaW5zdGFudGlhdGlvbiB3ZSBjYW4gY2hlY2sgaWYgU3VwZXIncyBvcHRpb25zIGhhdmVcbiAgICAvLyBiZWVuIHVwZGF0ZWQuXG4gICAgU3ViLnN1cGVyT3B0aW9ucyA9IFN1cGVyLm9wdGlvbnM7XG4gICAgU3ViLmV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zO1xuICAgIFN1Yi5zZWFsZWRPcHRpb25zID0gZXh0ZW5kKHt9LCBTdWIub3B0aW9ucyk7XG5cbiAgICAvLyBjYWNoZSBjb25zdHJ1Y3RvclxuICAgIGNhY2hlZEN0b3JzW1N1cGVySWRdID0gU3ViO1xuICAgIHJldHVybiBTdWJcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdFByb3BzJDEgKENvbXApIHtcbiAgdmFyIHByb3BzID0gQ29tcC5vcHRpb25zLnByb3BzO1xuICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICBwcm94eShDb21wLnByb3RvdHlwZSwgXCJfcHJvcHNcIiwga2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0Q29tcHV0ZWQkMSAoQ29tcCkge1xuICB2YXIgY29tcHV0ZWQgPSBDb21wLm9wdGlvbnMuY29tcHV0ZWQ7XG4gIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgIGRlZmluZUNvbXB1dGVkKENvbXAucHJvdG90eXBlLCBrZXksIGNvbXB1dGVkW2tleV0pO1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0QXNzZXRSZWdpc3RlcnMgKFZ1ZSkge1xuICAvKipcbiAgICogQ3JlYXRlIGFzc2V0IHJlZ2lzdHJhdGlvbiBtZXRob2RzLlxuICAgKi9cbiAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIFZ1ZVt0eXBlXSA9IGZ1bmN0aW9uIChcbiAgICAgIGlkLFxuICAgICAgZGVmaW5pdGlvblxuICAgICkge1xuICAgICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbXBvbmVudCcgJiYgY29uZmlnLmlzUmVzZXJ2ZWRUYWcoaWQpKSB7XG4gICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAnRG8gbm90IHVzZSBidWlsdC1pbiBvciByZXNlcnZlZCBIVE1MIGVsZW1lbnRzIGFzIGNvbXBvbmVudCAnICtcbiAgICAgICAgICAgICAgJ2lkOiAnICsgaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnY29tcG9uZW50JyAmJiBpc1BsYWluT2JqZWN0KGRlZmluaXRpb24pKSB7XG4gICAgICAgICAgZGVmaW5pdGlvbi5uYW1lID0gZGVmaW5pdGlvbi5uYW1lIHx8IGlkO1xuICAgICAgICAgIGRlZmluaXRpb24gPSB0aGlzLm9wdGlvbnMuX2Jhc2UuZXh0ZW5kKGRlZmluaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnZGlyZWN0aXZlJyAmJiB0eXBlb2YgZGVmaW5pdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRlZmluaXRpb24gPSB7IGJpbmQ6IGRlZmluaXRpb24sIHVwZGF0ZTogZGVmaW5pdGlvbiB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF0gPSBkZWZpbml0aW9uO1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG4vKiAgKi9cblxudmFyIHBhdHRlcm5UeXBlcyA9IFtTdHJpbmcsIFJlZ0V4cF07XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUgKG9wdHMpIHtcbiAgcmV0dXJuIG9wdHMgJiYgKG9wdHMuQ3Rvci5vcHRpb25zLm5hbWUgfHwgb3B0cy50YWcpXG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHBhdHRlcm4sIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KCcsJykuaW5kZXhPZihuYW1lKSA+IC0xXG4gIH0gZWxzZSBpZiAoaXNSZWdFeHAocGF0dGVybikpIHtcbiAgICByZXR1cm4gcGF0dGVybi50ZXN0KG5hbWUpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHBydW5lQ2FjaGUgKGNhY2hlLCBjdXJyZW50LCBmaWx0ZXIpIHtcbiAgZm9yICh2YXIga2V5IGluIGNhY2hlKSB7XG4gICAgdmFyIGNhY2hlZE5vZGUgPSBjYWNoZVtrZXldO1xuICAgIGlmIChjYWNoZWROb2RlKSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY2FjaGVkTm9kZS5jb21wb25lbnRPcHRpb25zKTtcbiAgICAgIGlmIChuYW1lICYmICFmaWx0ZXIobmFtZSkpIHtcbiAgICAgICAgaWYgKGNhY2hlZE5vZGUgIT09IGN1cnJlbnQpIHtcbiAgICAgICAgICBwcnVuZUNhY2hlRW50cnkoY2FjaGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FjaGVba2V5XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBydW5lQ2FjaGVFbnRyeSAodm5vZGUpIHtcbiAgaWYgKHZub2RlKSB7XG4gICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuJGRlc3Ryb3koKTtcbiAgfVxufVxuXG52YXIgS2VlcEFsaXZlID0ge1xuICBuYW1lOiAna2VlcC1hbGl2ZScsXG4gIGFic3RyYWN0OiB0cnVlLFxuXG4gIHByb3BzOiB7XG4gICAgaW5jbHVkZTogcGF0dGVyblR5cGVzLFxuICAgIGV4Y2x1ZGU6IHBhdHRlcm5UeXBlc1xuICB9LFxuXG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQgKCkge1xuICAgIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9LFxuXG4gIGRlc3Ryb3llZDogZnVuY3Rpb24gZGVzdHJveWVkICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzJDEuY2FjaGUpIHtcbiAgICAgIHBydW5lQ2FjaGVFbnRyeSh0aGlzJDEuY2FjaGVba2V5XSk7XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaW5jbHVkZTogZnVuY3Rpb24gaW5jbHVkZSAodmFsKSB7XG4gICAgICBwcnVuZUNhY2hlKHRoaXMuY2FjaGUsIHRoaXMuX3Zub2RlLCBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gbWF0Y2hlcyh2YWwsIG5hbWUpOyB9KTtcbiAgICB9LFxuICAgIGV4Y2x1ZGU6IGZ1bmN0aW9uIGV4Y2x1ZGUgKHZhbCkge1xuICAgICAgcHJ1bmVDYWNoZSh0aGlzLmNhY2hlLCB0aGlzLl92bm9kZSwgZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICFtYXRjaGVzKHZhbCwgbmFtZSk7IH0pO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgdmFyIHZub2RlID0gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZCh0aGlzLiRzbG90cy5kZWZhdWx0KTtcbiAgICB2YXIgY29tcG9uZW50T3B0aW9ucyA9IHZub2RlICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgaWYgKGNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgIC8vIGNoZWNrIHBhdHRlcm5cbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShjb21wb25lbnRPcHRpb25zKTtcbiAgICAgIGlmIChuYW1lICYmIChcbiAgICAgICAgKHRoaXMuaW5jbHVkZSAmJiAhbWF0Y2hlcyh0aGlzLmluY2x1ZGUsIG5hbWUpKSB8fFxuICAgICAgICAodGhpcy5leGNsdWRlICYmIG1hdGNoZXModGhpcy5leGNsdWRlLCBuYW1lKSlcbiAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIHZub2RlXG4gICAgICB9XG4gICAgICB2YXIga2V5ID0gdm5vZGUua2V5ID09IG51bGxcbiAgICAgICAgLy8gc2FtZSBjb25zdHJ1Y3RvciBtYXkgZ2V0IHJlZ2lzdGVyZWQgYXMgZGlmZmVyZW50IGxvY2FsIGNvbXBvbmVudHNcbiAgICAgICAgLy8gc28gY2lkIGFsb25lIGlzIG5vdCBlbm91Z2ggKCMzMjY5KVxuICAgICAgICA/IGNvbXBvbmVudE9wdGlvbnMuQ3Rvci5jaWQgKyAoY29tcG9uZW50T3B0aW9ucy50YWcgPyAoXCI6OlwiICsgKGNvbXBvbmVudE9wdGlvbnMudGFnKSkgOiAnJylcbiAgICAgICAgOiB2bm9kZS5rZXk7XG4gICAgICBpZiAodGhpcy5jYWNoZVtrZXldKSB7XG4gICAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5jYWNoZVtrZXldLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWNoZVtrZXldID0gdm5vZGU7XG4gICAgICB9XG4gICAgICB2bm9kZS5kYXRhLmtlZXBBbGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZVxuICB9XG59O1xuXG52YXIgYnVpbHRJbkNvbXBvbmVudHMgPSB7XG4gIEtlZXBBbGl2ZTogS2VlcEFsaXZlXG59O1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEdsb2JhbEFQSSAoVnVlKSB7XG4gIC8vIGNvbmZpZ1xuICB2YXIgY29uZmlnRGVmID0ge307XG4gIGNvbmZpZ0RlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWc7IH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uZmlnRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdEbyBub3QgcmVwbGFjZSB0aGUgVnVlLmNvbmZpZyBvYmplY3QsIHNldCBpbmRpdmlkdWFsIGZpZWxkcyBpbnN0ZWFkLidcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLCAnY29uZmlnJywgY29uZmlnRGVmKTtcblxuICAvLyBleHBvc2VkIHV0aWwgbWV0aG9kcy5cbiAgLy8gTk9URTogdGhlc2UgYXJlIG5vdCBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIHB1YmxpYyBBUEkgLSBhdm9pZCByZWx5aW5nIG9uXG4gIC8vIHRoZW0gdW5sZXNzIHlvdSBhcmUgYXdhcmUgb2YgdGhlIHJpc2suXG4gIFZ1ZS51dGlsID0ge1xuICAgIHdhcm46IHdhcm4sXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG4gICAgZGVmaW5lUmVhY3RpdmU6IGRlZmluZVJlYWN0aXZlJCQxXG4gIH07XG5cbiAgVnVlLnNldCA9IHNldDtcbiAgVnVlLmRlbGV0ZSA9IGRlbDtcbiAgVnVlLm5leHRUaWNrID0gbmV4dFRpY2s7XG5cbiAgVnVlLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgVnVlLm9wdGlvbnNbdHlwZSArICdzJ10gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9KTtcblxuICAvLyB0aGlzIGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIFwiYmFzZVwiIGNvbnN0cnVjdG9yIHRvIGV4dGVuZCBhbGwgcGxhaW4tb2JqZWN0XG4gIC8vIGNvbXBvbmVudHMgd2l0aCBpbiBXZWV4J3MgbXVsdGktaW5zdGFuY2Ugc2NlbmFyaW9zLlxuICBWdWUub3B0aW9ucy5fYmFzZSA9IFZ1ZTtcblxuICBleHRlbmQoVnVlLm9wdGlvbnMuY29tcG9uZW50cywgYnVpbHRJbkNvbXBvbmVudHMpO1xuXG4gIGluaXRVc2UoVnVlKTtcbiAgaW5pdE1peGluJDEoVnVlKTtcbiAgaW5pdEV4dGVuZChWdWUpO1xuICBpbml0QXNzZXRSZWdpc3RlcnMoVnVlKTtcbn1cblxuaW5pdEdsb2JhbEFQSShWdWUkMyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUkMy5wcm90b3R5cGUsICckaXNTZXJ2ZXInLCB7XG4gIGdldDogaXNTZXJ2ZXJSZW5kZXJpbmdcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlJDMucHJvdG90eXBlLCAnJHNzckNvbnRleHQnLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICByZXR1cm4gdGhpcy4kdm5vZGUuc3NyQ29udGV4dFxuICB9XG59KTtcblxuVnVlJDMudmVyc2lvbiA9ICcyLjMuMic7XG5cbi8qICAqL1xuXG4vLyB0aGVzZSBhcmUgcmVzZXJ2ZWQgZm9yIHdlYiBiZWNhdXNlIHRoZXkgYXJlIGRpcmVjdGx5IGNvbXBpbGVkIGF3YXlcbi8vIGR1cmluZyB0ZW1wbGF0ZSBjb21waWxhdGlvblxudmFyIGlzUmVzZXJ2ZWRBdHRyID0gbWFrZU1hcCgnc3R5bGUsY2xhc3MnKTtcblxuLy8gYXR0cmlidXRlcyB0aGF0IHNob3VsZCBiZSB1c2luZyBwcm9wcyBmb3IgYmluZGluZ1xudmFyIGFjY2VwdFZhbHVlID0gbWFrZU1hcCgnaW5wdXQsdGV4dGFyZWEsb3B0aW9uLHNlbGVjdCcpO1xudmFyIG11c3RVc2VQcm9wID0gZnVuY3Rpb24gKHRhZywgdHlwZSwgYXR0cikge1xuICByZXR1cm4gKFxuICAgIChhdHRyID09PSAndmFsdWUnICYmIGFjY2VwdFZhbHVlKHRhZykpICYmIHR5cGUgIT09ICdidXR0b24nIHx8XG4gICAgKGF0dHIgPT09ICdzZWxlY3RlZCcgJiYgdGFnID09PSAnb3B0aW9uJykgfHxcbiAgICAoYXR0ciA9PT0gJ2NoZWNrZWQnICYmIHRhZyA9PT0gJ2lucHV0JykgfHxcbiAgICAoYXR0ciA9PT0gJ211dGVkJyAmJiB0YWcgPT09ICd2aWRlbycpXG4gIClcbn07XG5cbnZhciBpc0VudW1lcmF0ZWRBdHRyID0gbWFrZU1hcCgnY29udGVudGVkaXRhYmxlLGRyYWdnYWJsZSxzcGVsbGNoZWNrJyk7XG5cbnZhciBpc0Jvb2xlYW5BdHRyID0gbWFrZU1hcChcbiAgJ2FsbG93ZnVsbHNjcmVlbixhc3luYyxhdXRvZm9jdXMsYXV0b3BsYXksY2hlY2tlZCxjb21wYWN0LGNvbnRyb2xzLGRlY2xhcmUsJyArXG4gICdkZWZhdWx0LGRlZmF1bHRjaGVja2VkLGRlZmF1bHRtdXRlZCxkZWZhdWx0c2VsZWN0ZWQsZGVmZXIsZGlzYWJsZWQsJyArXG4gICdlbmFibGVkLGZvcm1ub3ZhbGlkYXRlLGhpZGRlbixpbmRldGVybWluYXRlLGluZXJ0LGlzbWFwLGl0ZW1zY29wZSxsb29wLG11bHRpcGxlLCcgK1xuICAnbXV0ZWQsbm9ocmVmLG5vcmVzaXplLG5vc2hhZGUsbm92YWxpZGF0ZSxub3dyYXAsb3BlbixwYXVzZW9uZXhpdCxyZWFkb25seSwnICtcbiAgJ3JlcXVpcmVkLHJldmVyc2VkLHNjb3BlZCxzZWFtbGVzcyxzZWxlY3RlZCxzb3J0YWJsZSx0cmFuc2xhdGUsJyArXG4gICd0cnVlc3BlZWQsdHlwZW11c3RtYXRjaCx2aXNpYmxlJ1xuKTtcblxudmFyIHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG5cbnZhciBpc1hsaW5rID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUuY2hhckF0KDUpID09PSAnOicgJiYgbmFtZS5zbGljZSgwLCA1KSA9PT0gJ3hsaW5rJ1xufTtcblxudmFyIGdldFhsaW5rUHJvcCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBpc1hsaW5rKG5hbWUpID8gbmFtZS5zbGljZSg2LCBuYW1lLmxlbmd0aCkgOiAnJ1xufTtcblxudmFyIGlzRmFsc3lBdHRyVmFsdWUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIHJldHVybiB2YWwgPT0gbnVsbCB8fCB2YWwgPT09IGZhbHNlXG59O1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gZ2VuQ2xhc3NGb3JWbm9kZSAodm5vZGUpIHtcbiAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICB2YXIgcGFyZW50Tm9kZSA9IHZub2RlO1xuICB2YXIgY2hpbGROb2RlID0gdm5vZGU7XG4gIHdoaWxlIChpc0RlZihjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UpKSB7XG4gICAgY2hpbGROb2RlID0gY2hpbGROb2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZTtcbiAgICBpZiAoY2hpbGROb2RlLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBtZXJnZUNsYXNzRGF0YShjaGlsZE5vZGUuZGF0YSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChpc0RlZihwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnQpKSB7XG4gICAgaWYgKHBhcmVudE5vZGUuZGF0YSkge1xuICAgICAgZGF0YSA9IG1lcmdlQ2xhc3NEYXRhKGRhdGEsIHBhcmVudE5vZGUuZGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBnZW5DbGFzc0Zyb21EYXRhKGRhdGEpXG59XG5cbmZ1bmN0aW9uIG1lcmdlQ2xhc3NEYXRhIChjaGlsZCwgcGFyZW50KSB7XG4gIHJldHVybiB7XG4gICAgc3RhdGljQ2xhc3M6IGNvbmNhdChjaGlsZC5zdGF0aWNDbGFzcywgcGFyZW50LnN0YXRpY0NsYXNzKSxcbiAgICBjbGFzczogaXNEZWYoY2hpbGQuY2xhc3MpXG4gICAgICA/IFtjaGlsZC5jbGFzcywgcGFyZW50LmNsYXNzXVxuICAgICAgOiBwYXJlbnQuY2xhc3NcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5DbGFzc0Zyb21EYXRhIChkYXRhKSB7XG4gIHZhciBkeW5hbWljQ2xhc3MgPSBkYXRhLmNsYXNzO1xuICB2YXIgc3RhdGljQ2xhc3MgPSBkYXRhLnN0YXRpY0NsYXNzO1xuICBpZiAoaXNEZWYoc3RhdGljQ2xhc3MpIHx8IGlzRGVmKGR5bmFtaWNDbGFzcykpIHtcbiAgICByZXR1cm4gY29uY2F0KHN0YXRpY0NsYXNzLCBzdHJpbmdpZnlDbGFzcyhkeW5hbWljQ2xhc3MpKVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBjb25jYXQgKGEsIGIpIHtcbiAgcmV0dXJuIGEgPyBiID8gKGEgKyAnICcgKyBiKSA6IGEgOiAoYiB8fCAnJylcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5Q2xhc3MgKHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmKHZhbHVlKSkge1xuICAgIHJldHVybiAnJ1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cbiAgdmFyIHJlcyA9ICcnO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB2YXIgc3RyaW5naWZpZWQ7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChpc0RlZih2YWx1ZVtpXSkpIHtcbiAgICAgICAgaWYgKGlzRGVmKHN0cmluZ2lmaWVkID0gc3RyaW5naWZ5Q2xhc3ModmFsdWVbaV0pKSAmJiBzdHJpbmdpZmllZCAhPT0gJycpIHtcbiAgICAgICAgICByZXMgKz0gc3RyaW5naWZpZWQgKyAnICc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcy5zbGljZSgwLCAtMSlcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWVba2V5XSkgeyByZXMgKz0ga2V5ICsgJyAnOyB9XG4gICAgfVxuICAgIHJldHVybiByZXMuc2xpY2UoMCwgLTEpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIG5hbWVzcGFjZU1hcCA9IHtcbiAgc3ZnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICBtYXRoOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCdcbn07XG5cbnZhciBpc0hUTUxUYWcgPSBtYWtlTWFwKFxuICAnaHRtbCxib2R5LGJhc2UsaGVhZCxsaW5rLG1ldGEsc3R5bGUsdGl0bGUsJyArXG4gICdhZGRyZXNzLGFydGljbGUsYXNpZGUsZm9vdGVyLGhlYWRlcixoMSxoMixoMyxoNCxoNSxoNixoZ3JvdXAsbmF2LHNlY3Rpb24sJyArXG4gICdkaXYsZGQsZGwsZHQsZmlnY2FwdGlvbixmaWd1cmUsaHIsaW1nLGxpLG1haW4sb2wscCxwcmUsdWwsJyArXG4gICdhLGIsYWJicixiZGksYmRvLGJyLGNpdGUsY29kZSxkYXRhLGRmbixlbSxpLGtiZCxtYXJrLHEscnAscnQscnRjLHJ1YnksJyArXG4gICdzLHNhbXAsc21hbGwsc3BhbixzdHJvbmcsc3ViLHN1cCx0aW1lLHUsdmFyLHdicixhcmVhLGF1ZGlvLG1hcCx0cmFjayx2aWRlbywnICtcbiAgJ2VtYmVkLG9iamVjdCxwYXJhbSxzb3VyY2UsY2FudmFzLHNjcmlwdCxub3NjcmlwdCxkZWwsaW5zLCcgK1xuICAnY2FwdGlvbixjb2wsY29sZ3JvdXAsdGFibGUsdGhlYWQsdGJvZHksdGQsdGgsdHIsJyArXG4gICdidXR0b24sZGF0YWxpc3QsZmllbGRzZXQsZm9ybSxpbnB1dCxsYWJlbCxsZWdlbmQsbWV0ZXIsb3B0Z3JvdXAsb3B0aW9uLCcgK1xuICAnb3V0cHV0LHByb2dyZXNzLHNlbGVjdCx0ZXh0YXJlYSwnICtcbiAgJ2RldGFpbHMsZGlhbG9nLG1lbnUsbWVudWl0ZW0sc3VtbWFyeSwnICtcbiAgJ2NvbnRlbnQsZWxlbWVudCxzaGFkb3csdGVtcGxhdGUnXG4pO1xuXG4vLyB0aGlzIG1hcCBpcyBpbnRlbnRpb25hbGx5IHNlbGVjdGl2ZSwgb25seSBjb3ZlcmluZyBTVkcgZWxlbWVudHMgdGhhdCBtYXlcbi8vIGNvbnRhaW4gY2hpbGQgZWxlbWVudHMuXG52YXIgaXNTVkcgPSBtYWtlTWFwKFxuICAnc3ZnLGFuaW1hdGUsY2lyY2xlLGNsaXBwYXRoLGN1cnNvcixkZWZzLGRlc2MsZWxsaXBzZSxmaWx0ZXIsZm9udC1mYWNlLCcgK1xuICAnZm9yZWlnbk9iamVjdCxnLGdseXBoLGltYWdlLGxpbmUsbWFya2VyLG1hc2ssbWlzc2luZy1nbHlwaCxwYXRoLHBhdHRlcm4sJyArXG4gICdwb2x5Z29uLHBvbHlsaW5lLHJlY3Qsc3dpdGNoLHN5bWJvbCx0ZXh0LHRleHRwYXRoLHRzcGFuLHVzZSx2aWV3JyxcbiAgdHJ1ZVxuKTtcblxuXG5cbnZhciBpc1Jlc2VydmVkVGFnID0gZnVuY3Rpb24gKHRhZykge1xuICByZXR1cm4gaXNIVE1MVGFnKHRhZykgfHwgaXNTVkcodGFnKVxufTtcblxuZnVuY3Rpb24gZ2V0VGFnTmFtZXNwYWNlICh0YWcpIHtcbiAgaWYgKGlzU1ZHKHRhZykpIHtcbiAgICByZXR1cm4gJ3N2ZydcbiAgfVxuICAvLyBiYXNpYyBzdXBwb3J0IGZvciBNYXRoTUxcbiAgLy8gbm90ZSBpdCBkb2Vzbid0IHN1cHBvcnQgb3RoZXIgTWF0aE1MIGVsZW1lbnRzIGJlaW5nIGNvbXBvbmVudCByb290c1xuICBpZiAodGFnID09PSAnbWF0aCcpIHtcbiAgICByZXR1cm4gJ21hdGgnXG4gIH1cbn1cblxudmFyIHVua25vd25FbGVtZW50Q2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuZnVuY3Rpb24gaXNVbmtub3duRWxlbWVudCAodGFnKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWluQnJvd3Nlcikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgaWYgKGlzUmVzZXJ2ZWRUYWcodGFnKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHRhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIHVua25vd25FbGVtZW50Q2FjaGVbdGFnXVxuICB9XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKHRhZy5pbmRleE9mKCctJykgPiAtMSkge1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI4MjEwMzY0LzEwNzAyNDRcbiAgICByZXR1cm4gKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSA9IChcbiAgICAgIGVsLmNvbnN0cnVjdG9yID09PSB3aW5kb3cuSFRNTFVua25vd25FbGVtZW50IHx8XG4gICAgICBlbC5jb25zdHJ1Y3RvciA9PT0gd2luZG93LkhUTUxFbGVtZW50XG4gICAgKSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSA9IC9IVE1MVW5rbm93bkVsZW1lbnQvLnRlc3QoZWwudG9TdHJpbmcoKSkpXG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUXVlcnkgYW4gZWxlbWVudCBzZWxlY3RvciBpZiBpdCdzIG5vdCBhbiBlbGVtZW50IGFscmVhZHkuXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5IChlbCkge1xuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIHZhciBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ0Nhbm5vdCBmaW5kIGVsZW1lbnQ6ICcgKyBlbFxuICAgICAgKTtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0ZWRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWxcbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCQxICh0YWdOYW1lLCB2bm9kZSkge1xuICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgaWYgKHRhZ05hbWUgIT09ICdzZWxlY3QnKSB7XG4gICAgcmV0dXJuIGVsbVxuICB9XG4gIC8vIGZhbHNlIG9yIG51bGwgd2lsbCByZW1vdmUgdGhlIGF0dHJpYnV0ZSBidXQgdW5kZWZpbmVkIHdpbGwgbm90XG4gIGlmICh2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEuYXR0cnMgJiYgdm5vZGUuZGF0YS5hdHRycy5tdWx0aXBsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZWxtLnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCAnbXVsdGlwbGUnKTtcbiAgfVxuICByZXR1cm4gZWxtXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyAobmFtZXNwYWNlLCB0YWdOYW1lKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlTWFwW25hbWVzcGFjZV0sIHRhZ05hbWUpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlICh0ZXh0KSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21tZW50ICh0ZXh0KSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpXG59XG5cbmZ1bmN0aW9uIGluc2VydEJlZm9yZSAocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQgKG5vZGUsIGNoaWxkKSB7XG4gIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZCAobm9kZSwgY2hpbGQpIHtcbiAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG59XG5cbmZ1bmN0aW9uIHBhcmVudE5vZGUgKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZVxufVxuXG5mdW5jdGlvbiBuZXh0U2libGluZyAobm9kZSkge1xuICByZXR1cm4gbm9kZS5uZXh0U2libGluZ1xufVxuXG5mdW5jdGlvbiB0YWdOYW1lIChub2RlKSB7XG4gIHJldHVybiBub2RlLnRhZ05hbWVcbn1cblxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQgKG5vZGUsIHRleHQpIHtcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSAobm9kZSwga2V5LCB2YWwpIHtcbiAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWwpO1xufVxuXG5cbnZhciBub2RlT3BzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQkMSxcblx0Y3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG5cdGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcblx0Y3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcblx0aW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG5cdHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcblx0YXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuXHRwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuXHRuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG5cdHRhZ05hbWU6IHRhZ05hbWUsXG5cdHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcblx0c2V0QXR0cmlidXRlOiBzZXRBdHRyaWJ1dGVcbn0pO1xuXG4vKiAgKi9cblxudmFyIHJlZiA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUgKF8sIHZub2RlKSB7XG4gICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSAob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgaWYgKG9sZFZub2RlLmRhdGEucmVmICE9PSB2bm9kZS5kYXRhLnJlZikge1xuICAgICAgcmVnaXN0ZXJSZWYob2xkVm5vZGUsIHRydWUpO1xuICAgICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xuICAgIH1cbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSAodm5vZGUpIHtcbiAgICByZWdpc3RlclJlZih2bm9kZSwgdHJ1ZSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyUmVmICh2bm9kZSwgaXNSZW1vdmFsKSB7XG4gIHZhciBrZXkgPSB2bm9kZS5kYXRhLnJlZjtcbiAgaWYgKCFrZXkpIHsgcmV0dXJuIH1cblxuICB2YXIgdm0gPSB2bm9kZS5jb250ZXh0O1xuICB2YXIgcmVmID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgfHwgdm5vZGUuZWxtO1xuICB2YXIgcmVmcyA9IHZtLiRyZWZzO1xuICBpZiAoaXNSZW1vdmFsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVmc1trZXldKSkge1xuICAgICAgcmVtb3ZlKHJlZnNba2V5XSwgcmVmKTtcbiAgICB9IGVsc2UgaWYgKHJlZnNba2V5XSA9PT0gcmVmKSB7XG4gICAgICByZWZzW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh2bm9kZS5kYXRhLnJlZkluRm9yKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWZzW2tleV0pICYmIHJlZnNba2V5XS5pbmRleE9mKHJlZikgPCAwKSB7XG4gICAgICAgIHJlZnNba2V5XS5wdXNoKHJlZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWZzW2tleV0gPSBbcmVmXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVmc1trZXldID0gcmVmO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFZpcnR1YWwgRE9NIHBhdGNoaW5nIGFsZ29yaXRobSBiYXNlZCBvbiBTbmFiYmRvbSBieVxuICogU2ltb24gRnJpaXMgVmluZHVtIChAcGFsZGVwaW5kKVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcGFsZGVwaW5kL3NuYWJiZG9tL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBtb2RpZmllZCBieSBFdmFuIFlvdSAoQHl5eDk5MDgwMylcbiAqXG5cbi8qXG4gKiBOb3QgdHlwZS1jaGVja2luZyB0aGlzIGJlY2F1c2UgdGhpcyBmaWxlIGlzIHBlcmYtY3JpdGljYWwgYW5kIHRoZSBjb3N0XG4gKiBvZiBtYWtpbmcgZmxvdyB1bmRlcnN0YW5kIGl0IGlzIG5vdCB3b3J0aCBpdC5cbiAqL1xuXG52YXIgZW1wdHlOb2RlID0gbmV3IFZOb2RlKCcnLCB7fSwgW10pO1xuXG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICdhY3RpdmF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knXTtcblxuZnVuY3Rpb24gc2FtZVZub2RlIChhLCBiKSB7XG4gIHJldHVybiAoXG4gICAgYS5rZXkgPT09IGIua2V5ICYmXG4gICAgYS50YWcgPT09IGIudGFnICYmXG4gICAgYS5pc0NvbW1lbnQgPT09IGIuaXNDb21tZW50ICYmXG4gICAgaXNEZWYoYS5kYXRhKSA9PT0gaXNEZWYoYi5kYXRhKSAmJlxuICAgIHNhbWVJbnB1dFR5cGUoYSwgYilcbiAgKVxufVxuXG4vLyBTb21lIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0IGR5bmFtaWNhbGx5IGNoYW5naW5nIHR5cGUgZm9yIDxpbnB1dD5cbi8vIHNvIHRoZXkgbmVlZCB0byBiZSB0cmVhdGVkIGFzIGRpZmZlcmVudCBub2Rlc1xuZnVuY3Rpb24gc2FtZUlucHV0VHlwZSAoYSwgYikge1xuICBpZiAoYS50YWcgIT09ICdpbnB1dCcpIHsgcmV0dXJuIHRydWUgfVxuICB2YXIgaTtcbiAgdmFyIHR5cGVBID0gaXNEZWYoaSA9IGEuZGF0YSkgJiYgaXNEZWYoaSA9IGkuYXR0cnMpICYmIGkudHlwZTtcbiAgdmFyIHR5cGVCID0gaXNEZWYoaSA9IGIuZGF0YSkgJiYgaXNEZWYoaSA9IGkuYXR0cnMpICYmIGkudHlwZTtcbiAgcmV0dXJuIHR5cGVBID09PSB0eXBlQlxufVxuXG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeCAoY2hpbGRyZW4sIGJlZ2luSWR4LCBlbmRJZHgpIHtcbiAgdmFyIGksIGtleTtcbiAgdmFyIG1hcCA9IHt9O1xuICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgIGtleSA9IGNoaWxkcmVuW2ldLmtleTtcbiAgICBpZiAoaXNEZWYoa2V5KSkgeyBtYXBba2V5XSA9IGk7IH1cbiAgfVxuICByZXR1cm4gbWFwXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhdGNoRnVuY3Rpb24gKGJhY2tlbmQpIHtcbiAgdmFyIGksIGo7XG4gIHZhciBjYnMgPSB7fTtcblxuICB2YXIgbW9kdWxlcyA9IGJhY2tlbmQubW9kdWxlcztcbiAgdmFyIG5vZGVPcHMgPSBiYWNrZW5kLm5vZGVPcHM7XG5cbiAgZm9yIChpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgY2JzW2hvb2tzW2ldXSA9IFtdO1xuICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICBpZiAoaXNEZWYobW9kdWxlc1tqXVtob29rc1tpXV0pKSB7XG4gICAgICAgIGNic1tob29rc1tpXV0ucHVzaChtb2R1bGVzW2pdW2hvb2tzW2ldXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW1wdHlOb2RlQXQgKGVsbSkge1xuICAgIHJldHVybiBuZXcgVk5vZGUobm9kZU9wcy50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSwge30sIFtdLCB1bmRlZmluZWQsIGVsbSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IgKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICBmdW5jdGlvbiByZW1vdmUkJDEgKCkge1xuICAgICAgaWYgKC0tcmVtb3ZlJCQxLmxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICByZW1vdmVOb2RlKGNoaWxkRWxtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlJCQxLmxpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgICByZXR1cm4gcmVtb3ZlJCQxXG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVOb2RlIChlbCkge1xuICAgIHZhciBwYXJlbnQgPSBub2RlT3BzLnBhcmVudE5vZGUoZWwpO1xuICAgIC8vIGVsZW1lbnQgbWF5IGhhdmUgYWxyZWFkeSBiZWVuIHJlbW92ZWQgZHVlIHRvIHYtaHRtbCAvIHYtdGV4dFxuICAgIGlmIChpc0RlZihwYXJlbnQpKSB7XG4gICAgICBub2RlT3BzLnJlbW92ZUNoaWxkKHBhcmVudCwgZWwpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpblByZSA9IDA7XG4gIGZ1bmN0aW9uIGNyZWF0ZUVsbSAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0sIG5lc3RlZCkge1xuICAgIHZub2RlLmlzUm9vdEluc2VydCA9ICFuZXN0ZWQ7IC8vIGZvciB0cmFuc2l0aW9uIGVudGVyIGNoZWNrXG4gICAgaWYgKGNyZWF0ZUNvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgdGFnID0gdm5vZGUudGFnO1xuICAgIGlmIChpc0RlZih0YWcpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnByZSkge1xuICAgICAgICAgIGluUHJlKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFpblByZSAmJlxuICAgICAgICAgICF2bm9kZS5ucyAmJlxuICAgICAgICAgICEoY29uZmlnLmlnbm9yZWRFbGVtZW50cy5sZW5ndGggJiYgY29uZmlnLmlnbm9yZWRFbGVtZW50cy5pbmRleE9mKHRhZykgPiAtMSkgJiZcbiAgICAgICAgICBjb25maWcuaXNVbmtub3duRWxlbWVudCh0YWcpXG4gICAgICAgICkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAnVW5rbm93biBjdXN0b20gZWxlbWVudDogPCcgKyB0YWcgKyAnPiAtIGRpZCB5b3UgJyArXG4gICAgICAgICAgICAncmVnaXN0ZXIgdGhlIGNvbXBvbmVudCBjb3JyZWN0bHk/IEZvciByZWN1cnNpdmUgY29tcG9uZW50cywgJyArXG4gICAgICAgICAgICAnbWFrZSBzdXJlIHRvIHByb3ZpZGUgdGhlIFwibmFtZVwiIG9wdGlvbi4nLFxuICAgICAgICAgICAgdm5vZGUuY29udGV4dFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZub2RlLmVsbSA9IHZub2RlLm5zXG4gICAgICAgID8gbm9kZU9wcy5jcmVhdGVFbGVtZW50TlModm5vZGUubnMsIHRhZylcbiAgICAgICAgOiBub2RlT3BzLmNyZWF0ZUVsZW1lbnQodGFnLCB2bm9kZSk7XG4gICAgICBzZXRTY29wZSh2bm9kZSk7XG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAge1xuICAgICAgICBjcmVhdGVDaGlsZHJlbih2bm9kZSwgY2hpbGRyZW4sIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIGlmIChpc0RlZihkYXRhKSkge1xuICAgICAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9XG4gICAgICAgIGluc2VydChwYXJlbnRFbG0sIHZub2RlLmVsbSwgcmVmRWxtKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgZGF0YSAmJiBkYXRhLnByZSkge1xuICAgICAgICBpblByZS0tO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNUcnVlKHZub2RlLmlzQ29tbWVudCkpIHtcbiAgICAgIHZub2RlLmVsbSA9IG5vZGVPcHMuY3JlYXRlQ29tbWVudCh2bm9kZS50ZXh0KTtcbiAgICAgIGluc2VydChwYXJlbnRFbG0sIHZub2RlLmVsbSwgcmVmRWxtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdm5vZGUuZWxtID0gbm9kZU9wcy5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgIGluc2VydChwYXJlbnRFbG0sIHZub2RlLmVsbSwgcmVmRWxtKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQgKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgcmVmRWxtKSB7XG4gICAgdmFyIGkgPSB2bm9kZS5kYXRhO1xuICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgdmFyIGlzUmVhY3RpdmF0ZWQgPSBpc0RlZih2bm9kZS5jb21wb25lbnRJbnN0YW5jZSkgJiYgaS5rZWVwQWxpdmU7XG4gICAgICBpZiAoaXNEZWYoaSA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgaSh2bm9kZSwgZmFsc2UgLyogaHlkcmF0aW5nICovLCBwYXJlbnRFbG0sIHJlZkVsbSk7XG4gICAgICB9XG4gICAgICAvLyBhZnRlciBjYWxsaW5nIHRoZSBpbml0IGhvb2ssIGlmIHRoZSB2bm9kZSBpcyBhIGNoaWxkIGNvbXBvbmVudFxuICAgICAgLy8gaXQgc2hvdWxkJ3ZlIGNyZWF0ZWQgYSBjaGlsZCBpbnN0YW5jZSBhbmQgbW91bnRlZCBpdC4gdGhlIGNoaWxkXG4gICAgICAvLyBjb21wb25lbnQgYWxzbyBoYXMgc2V0IHRoZSBwbGFjZWhvbGRlciB2bm9kZSdzIGVsbS5cbiAgICAgIC8vIGluIHRoYXQgY2FzZSB3ZSBjYW4ganVzdCByZXR1cm4gdGhlIGVsZW1lbnQgYW5kIGJlIGRvbmUuXG4gICAgICBpZiAoaXNEZWYodm5vZGUuY29tcG9uZW50SW5zdGFuY2UpKSB7XG4gICAgICAgIGluaXRDb21wb25lbnQodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIGlmIChpc1RydWUoaXNSZWFjdGl2YXRlZCkpIHtcbiAgICAgICAgICByZWFjdGl2YXRlQ29tcG9uZW50KHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgcmVmRWxtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRDb21wb25lbnQgKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICBpZiAoaXNEZWYodm5vZGUuZGF0YS5wZW5kaW5nSW5zZXJ0KSkge1xuICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2guYXBwbHkoaW5zZXJ0ZWRWbm9kZVF1ZXVlLCB2bm9kZS5kYXRhLnBlbmRpbmdJbnNlcnQpO1xuICAgIH1cbiAgICB2bm9kZS5lbG0gPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS4kZWw7XG4gICAgaWYgKGlzUGF0Y2hhYmxlKHZub2RlKSkge1xuICAgICAgaW52b2tlQ3JlYXRlSG9va3Modm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICBzZXRTY29wZSh2bm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVtcHR5IGNvbXBvbmVudCByb290LlxuICAgICAgLy8gc2tpcCBhbGwgZWxlbWVudC1yZWxhdGVkIG1vZHVsZXMgZXhjZXB0IGZvciByZWYgKCMzNDU1KVxuICAgICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGludm9rZSB0aGUgaW5zZXJ0IGhvb2tcbiAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFjdGl2YXRlQ29tcG9uZW50ICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgIHZhciBpO1xuICAgIC8vIGhhY2sgZm9yICM0MzM5OiBhIHJlYWN0aXZhdGVkIGNvbXBvbmVudCB3aXRoIGlubmVyIHRyYW5zaXRpb25cbiAgICAvLyBkb2VzIG5vdCB0cmlnZ2VyIGJlY2F1c2UgdGhlIGlubmVyIG5vZGUncyBjcmVhdGVkIGhvb2tzIGFyZSBub3QgY2FsbGVkXG4gICAgLy8gYWdhaW4uIEl0J3Mgbm90IGlkZWFsIHRvIGludm9sdmUgbW9kdWxlLXNwZWNpZmljIGxvZ2ljIGluIGhlcmUgYnV0XG4gICAgLy8gdGhlcmUgZG9lc24ndCBzZWVtIHRvIGJlIGEgYmV0dGVyIHdheSB0byBkbyBpdC5cbiAgICB2YXIgaW5uZXJOb2RlID0gdm5vZGU7XG4gICAgd2hpbGUgKGlubmVyTm9kZS5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgaW5uZXJOb2RlID0gaW5uZXJOb2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZTtcbiAgICAgIGlmIChpc0RlZihpID0gaW5uZXJOb2RlLmRhdGEpICYmIGlzRGVmKGkgPSBpLnRyYW5zaXRpb24pKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuYWN0aXZhdGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjYnMuYWN0aXZhdGVbaV0oZW1wdHlOb2RlLCBpbm5lck5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKGlubmVyTm9kZSk7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVubGlrZSBhIG5ld2x5IGNyZWF0ZWQgY29tcG9uZW50LFxuICAgIC8vIGEgcmVhY3RpdmF0ZWQga2VlcC1hbGl2ZSBjb21wb25lbnQgZG9lc24ndCBpbnNlcnQgaXRzZWxmXG4gICAgaW5zZXJ0KHBhcmVudEVsbSwgdm5vZGUuZWxtLCByZWZFbG0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0IChwYXJlbnQsIGVsbSwgcmVmKSB7XG4gICAgaWYgKGlzRGVmKHBhcmVudCkpIHtcbiAgICAgIGlmIChpc0RlZihyZWYpKSB7XG4gICAgICAgIGlmIChyZWYucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50LCBlbG0sIHJlZik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVPcHMuYXBwZW5kQ2hpbGQocGFyZW50LCBlbG0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoaWxkcmVuICh2bm9kZSwgY2hpbGRyZW4sIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBjcmVhdGVFbG0oY2hpbGRyZW5baV0sIGluc2VydGVkVm5vZGVRdWV1ZSwgdm5vZGUuZWxtLCBudWxsLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzUHJpbWl0aXZlKHZub2RlLnRleHQpKSB7XG4gICAgICBub2RlT3BzLmFwcGVuZENoaWxkKHZub2RlLmVsbSwgbm9kZU9wcy5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNQYXRjaGFibGUgKHZub2RlKSB7XG4gICAgd2hpbGUgKHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICB2bm9kZSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGVmKHZub2RlLnRhZylcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUNyZWF0ZUhvb2tzICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgY2JzLmNyZWF0ZS5sZW5ndGg7ICsraSQxKSB7XG4gICAgICBjYnMuY3JlYXRlW2kkMV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgfVxuICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7IC8vIFJldXNlIHZhcmlhYmxlXG4gICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICBpZiAoaXNEZWYoaS5jcmVhdGUpKSB7IGkuY3JlYXRlKGVtcHR5Tm9kZSwgdm5vZGUpOyB9XG4gICAgICBpZiAoaXNEZWYoaS5pbnNlcnQpKSB7IGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTsgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBzY29wZSBpZCBhdHRyaWJ1dGUgZm9yIHNjb3BlZCBDU1MuXG4gIC8vIHRoaXMgaXMgaW1wbGVtZW50ZWQgYXMgYSBzcGVjaWFsIGNhc2UgdG8gYXZvaWQgdGhlIG92ZXJoZWFkXG4gIC8vIG9mIGdvaW5nIHRocm91Z2ggdGhlIG5vcm1hbCBhdHRyaWJ1dGUgcGF0Y2hpbmcgcHJvY2Vzcy5cbiAgZnVuY3Rpb24gc2V0U2NvcGUgKHZub2RlKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGFuY2VzdG9yID0gdm5vZGU7XG4gICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGFuY2VzdG9yLmNvbnRleHQpICYmIGlzRGVmKGkgPSBpLiRvcHRpb25zLl9zY29wZUlkKSkge1xuICAgICAgICBub2RlT3BzLnNldEF0dHJpYnV0ZSh2bm9kZS5lbG0sIGksICcnKTtcbiAgICAgIH1cbiAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50O1xuICAgIH1cbiAgICAvLyBmb3Igc2xvdCBjb250ZW50IHRoZXkgc2hvdWxkIGFsc28gZ2V0IHRoZSBzY29wZUlkIGZyb20gdGhlIGhvc3QgaW5zdGFuY2UuXG4gICAgaWYgKGlzRGVmKGkgPSBhY3RpdmVJbnN0YW5jZSkgJiZcbiAgICAgICAgaSAhPT0gdm5vZGUuY29udGV4dCAmJlxuICAgICAgICBpc0RlZihpID0gaS4kb3B0aW9ucy5fc2NvcGVJZCkpIHtcbiAgICAgIG5vZGVPcHMuc2V0QXR0cmlidXRlKHZub2RlLmVsbSwgaSwgJycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFZub2RlcyAocGFyZW50RWxtLCByZWZFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgY3JlYXRlRWxtKHZub2Rlc1tzdGFydElkeF0sIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZURlc3Ryb3lIb29rICh2bm9kZSkge1xuICAgIHZhciBpLCBqO1xuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICBpZiAoaXNEZWYoZGF0YSkpIHtcbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5kZXN0cm95KSkgeyBpKHZub2RlKTsgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKSB7IGNicy5kZXN0cm95W2ldKHZub2RlKTsgfVxuICAgIH1cbiAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNoaWxkcmVuKSkge1xuICAgICAgZm9yIChqID0gMDsgaiA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGludm9rZURlc3Ryb3lIb29rKHZub2RlLmNoaWxkcmVuW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVWbm9kZXMgKHBhcmVudEVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgdmFyIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgaWYgKGlzRGVmKGNoLnRhZykpIHtcbiAgICAgICAgICByZW1vdmVBbmRJbnZva2VSZW1vdmVIb29rKGNoKTtcbiAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIFRleHQgbm9kZVxuICAgICAgICAgIHJlbW92ZU5vZGUoY2guZWxtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2sgKHZub2RlLCBybSkge1xuICAgIGlmIChpc0RlZihybSkgfHwgaXNEZWYodm5vZGUuZGF0YSkpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgIGlmIChpc0RlZihybSkpIHtcbiAgICAgICAgLy8gd2UgaGF2ZSBhIHJlY3Vyc2l2ZWx5IHBhc3NlZCBkb3duIHJtIGNhbGxiYWNrXG4gICAgICAgIC8vIGluY3JlYXNlIHRoZSBsaXN0ZW5lcnMgY291bnRcbiAgICAgICAgcm0ubGlzdGVuZXJzICs9IGxpc3RlbmVycztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRpcmVjdGx5IHJlbW92aW5nXG4gICAgICAgIHJtID0gY3JlYXRlUm1DYih2bm9kZS5lbG0sIGxpc3RlbmVycyk7XG4gICAgICB9XG4gICAgICAvLyByZWN1cnNpdmVseSBpbnZva2UgaG9va3Mgb24gY2hpbGQgY29tcG9uZW50IHJvb3Qgbm9kZVxuICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSkgJiYgaXNEZWYoaSA9IGkuX3Zub2RlKSAmJiBpc0RlZihpLmRhdGEpKSB7XG4gICAgICAgIHJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2soaSwgcm0pO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5yZW1vdmUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2JzLnJlbW92ZVtpXSh2bm9kZSwgcm0pO1xuICAgICAgfVxuICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLnJlbW92ZSkpIHtcbiAgICAgICAgaSh2bm9kZSwgcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlTm9kZSh2bm9kZS5lbG0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuIChwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCByZW1vdmVPbmx5KSB7XG4gICAgdmFyIG9sZFN0YXJ0SWR4ID0gMDtcbiAgICB2YXIgbmV3U3RhcnRJZHggPSAwO1xuICAgIHZhciBvbGRFbmRJZHggPSBvbGRDaC5sZW5ndGggLSAxO1xuICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgdmFyIG9sZEVuZFZub2RlID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgICB2YXIgbmV3RW5kSWR4ID0gbmV3Q2gubGVuZ3RoIC0gMTtcbiAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgIHZhciBuZXdFbmRWbm9kZSA9IG5ld0NoW25ld0VuZElkeF07XG4gICAgdmFyIG9sZEtleVRvSWR4LCBpZHhJbk9sZCwgZWxtVG9Nb3ZlLCByZWZFbG07XG5cbiAgICAvLyByZW1vdmVPbmx5IGlzIGEgc3BlY2lhbCBmbGFnIHVzZWQgb25seSBieSA8dHJhbnNpdGlvbi1ncm91cD5cbiAgICAvLyB0byBlbnN1cmUgcmVtb3ZlZCBlbGVtZW50cyBzdGF5IGluIGNvcnJlY3QgcmVsYXRpdmUgcG9zaXRpb25zXG4gICAgLy8gZHVyaW5nIGxlYXZpbmcgdHJhbnNpdGlvbnNcbiAgICB2YXIgY2FuTW92ZSA9ICFyZW1vdmVPbmx5O1xuXG4gICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgIGlmIChpc1VuZGVmKG9sZFN0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgaGFzIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgfSBlbHNlIGlmIChpc1VuZGVmKG9sZEVuZFZub2RlKSkge1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgcmlnaHRcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBub2RlT3BzLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgIG5ld0VuZFZub2RlID0gbmV3Q2hbLS1uZXdFbmRJZHhdO1xuICAgICAgfSBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7IC8vIFZub2RlIG1vdmVkIGxlZnRcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzVW5kZWYob2xkS2V5VG9JZHgpKSB7IG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpOyB9XG4gICAgICAgIGlkeEluT2xkID0gaXNEZWYobmV3U3RhcnRWbm9kZS5rZXkpID8gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldIDogbnVsbDtcbiAgICAgICAgaWYgKGlzVW5kZWYoaWR4SW5PbGQpKSB7IC8vIE5ldyBlbGVtZW50XG4gICAgICAgICAgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhZWxtVG9Nb3ZlKSB7XG4gICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAnSXQgc2VlbXMgdGhlcmUgYXJlIGR1cGxpY2F0ZSBrZXlzIHRoYXQgaXMgY2F1c2luZyBhbiB1cGRhdGUgZXJyb3IuICcgK1xuICAgICAgICAgICAgICAnTWFrZSBzdXJlIGVhY2ggdi1mb3IgaXRlbSBoYXMgYSB1bmlxdWUga2V5LidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzYW1lVm5vZGUoZWxtVG9Nb3ZlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYW5Nb3ZlICYmIG5vZGVPcHMuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgbmV3U3RhcnRWbm9kZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2FtZSBrZXkgYnV0IGRpZmZlcmVudCBlbGVtZW50LiB0cmVhdCBhcyBuZXcgZWxlbWVudFxuICAgICAgICAgICAgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgcmVmRWxtID0gaXNVbmRlZihuZXdDaFtuZXdFbmRJZHggKyAxXSkgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgYWRkVm5vZGVzKHBhcmVudEVsbSwgcmVmRWxtLCBuZXdDaCwgbmV3U3RhcnRJZHgsIG5ld0VuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICB9IGVsc2UgaWYgKG5ld1N0YXJ0SWR4ID4gbmV3RW5kSWR4KSB7XG4gICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGF0Y2hWbm9kZSAob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHJlbW92ZU9ubHkpIHtcbiAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gcmV1c2UgZWxlbWVudCBmb3Igc3RhdGljIHRyZWVzLlxuICAgIC8vIG5vdGUgd2Ugb25seSBkbyB0aGlzIGlmIHRoZSB2bm9kZSBpcyBjbG9uZWQgLVxuICAgIC8vIGlmIHRoZSBuZXcgbm9kZSBpcyBub3QgY2xvbmVkIGl0IG1lYW5zIHRoZSByZW5kZXIgZnVuY3Rpb25zIGhhdmUgYmVlblxuICAgIC8vIHJlc2V0IGJ5IHRoZSBob3QtcmVsb2FkLWFwaSBhbmQgd2UgbmVlZCB0byBkbyBhIHByb3BlciByZS1yZW5kZXIuXG4gICAgaWYgKGlzVHJ1ZSh2bm9kZS5pc1N0YXRpYykgJiZcbiAgICAgICAgaXNUcnVlKG9sZFZub2RlLmlzU3RhdGljKSAmJlxuICAgICAgICB2bm9kZS5rZXkgPT09IG9sZFZub2RlLmtleSAmJlxuICAgICAgICAoaXNUcnVlKHZub2RlLmlzQ2xvbmVkKSB8fCBpc1RydWUodm5vZGUuaXNPbmNlKSkpIHtcbiAgICAgIHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gb2xkVm5vZGUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIGk7XG4gICAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgIGlmIChpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5wcmVwYXRjaCkpIHtcbiAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICB9XG4gICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgY2ggPSB2bm9kZS5jaGlsZHJlbjtcbiAgICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNQYXRjaGFibGUodm5vZGUpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSkgeyBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7IH1cbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS51cGRhdGUpKSB7IGkob2xkVm5vZGUsIHZub2RlKTsgfVxuICAgIH1cbiAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgaWYgKGlzRGVmKG9sZENoKSAmJiBpc0RlZihjaCkpIHtcbiAgICAgICAgaWYgKG9sZENoICE9PSBjaCkgeyB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoLCBjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCByZW1vdmVPbmx5KTsgfVxuICAgICAgfSBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7IG5vZGVPcHMuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7IH1cbiAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgIG5vZGVPcHMuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgfVxuICAgIGlmIChpc0RlZihkYXRhKSkge1xuICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLnBvc3RwYXRjaCkpIHsgaShvbGRWbm9kZSwgdm5vZGUpOyB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlSW5zZXJ0SG9vayAodm5vZGUsIHF1ZXVlLCBpbml0aWFsKSB7XG4gICAgLy8gZGVsYXkgaW5zZXJ0IGhvb2tzIGZvciBjb21wb25lbnQgcm9vdCBub2RlcywgaW52b2tlIHRoZW0gYWZ0ZXIgdGhlXG4gICAgLy8gZWxlbWVudCBpcyByZWFsbHkgaW5zZXJ0ZWRcbiAgICBpZiAoaXNUcnVlKGluaXRpYWwpICYmIGlzRGVmKHZub2RlLnBhcmVudCkpIHtcbiAgICAgIHZub2RlLnBhcmVudC5kYXRhLnBlbmRpbmdJbnNlcnQgPSBxdWV1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBxdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KHF1ZXVlW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgYmFpbGVkID0gZmFsc2U7XG4gIC8vIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IGNhbiBza2lwIGNyZWF0ZSBob29rIGR1cmluZyBoeWRyYXRpb24gYmVjYXVzZSB0aGV5XG4gIC8vIGFyZSBhbHJlYWR5IHJlbmRlcmVkIG9uIHRoZSBjbGllbnQgb3IgaGFzIG5vIG5lZWQgZm9yIGluaXRpYWxpemF0aW9uXG4gIHZhciBpc1JlbmRlcmVkTW9kdWxlID0gbWFrZU1hcCgnYXR0cnMsc3R5bGUsY2xhc3Msc3RhdGljQ2xhc3Msc3RhdGljU3R5bGUsa2V5Jyk7XG5cbiAgLy8gTm90ZTogdGhpcyBpcyBhIGJyb3dzZXItb25seSBmdW5jdGlvbiBzbyB3ZSBjYW4gYXNzdW1lIGVsbXMgYXJlIERPTSBub2Rlcy5cbiAgZnVuY3Rpb24gaHlkcmF0ZSAoZWxtLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICghYXNzZXJ0Tm9kZU1hdGNoKGVsbSwgdm5vZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICB2bm9kZS5lbG0gPSBlbG07XG4gICAgdmFyIHRhZyA9IHZub2RlLnRhZztcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHsgaSh2bm9kZSwgdHJ1ZSAvKiBoeWRyYXRpbmcgKi8pOyB9XG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSkge1xuICAgICAgICAvLyBjaGlsZCBjb21wb25lbnQuIGl0IHNob3VsZCBoYXZlIGh5ZHJhdGVkIGl0cyBvd24gdHJlZS5cbiAgICAgICAgaW5pdENvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzRGVmKHRhZykpIHtcbiAgICAgIGlmIChpc0RlZihjaGlsZHJlbikpIHtcbiAgICAgICAgLy8gZW1wdHkgZWxlbWVudCwgYWxsb3cgY2xpZW50IHRvIHBpY2sgdXAgYW5kIHBvcHVsYXRlIGNoaWxkcmVuXG4gICAgICAgIGlmICghZWxtLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgIGNyZWF0ZUNoaWxkcmVuKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgY2hpbGRyZW5NYXRjaCA9IHRydWU7XG4gICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGVsbS5maXJzdENoaWxkO1xuICAgICAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNoaWxkcmVuLmxlbmd0aDsgaSQxKyspIHtcbiAgICAgICAgICAgIGlmICghY2hpbGROb2RlIHx8ICFoeWRyYXRlKGNoaWxkTm9kZSwgY2hpbGRyZW5baSQxXSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSkge1xuICAgICAgICAgICAgICBjaGlsZHJlbk1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIGNoaWxkTm9kZSBpcyBub3QgbnVsbCwgaXQgbWVhbnMgdGhlIGFjdHVhbCBjaGlsZE5vZGVzIGxpc3QgaXNcbiAgICAgICAgICAvLyBsb25nZXIgdGhhbiB0aGUgdmlydHVhbCBjaGlsZHJlbiBsaXN0LlxuICAgICAgICAgIGlmICghY2hpbGRyZW5NYXRjaCB8fCBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgIWJhaWxlZCkge1xuICAgICAgICAgICAgICBiYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BhcmVudDogJywgZWxtKTtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNaXNtYXRjaGluZyBjaGlsZE5vZGVzIHZzLiBWTm9kZXM6ICcsIGVsbS5jaGlsZE5vZGVzLCBjaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc0RlZihkYXRhKSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgIGlmICghaXNSZW5kZXJlZE1vZHVsZShrZXkpKSB7XG4gICAgICAgICAgICBpbnZva2VDcmVhdGVIb29rcyh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbG0uZGF0YSAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgZWxtLmRhdGEgPSB2bm9kZS50ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gYXNzZXJ0Tm9kZU1hdGNoIChub2RlLCB2bm9kZSkge1xuICAgIGlmIChpc0RlZih2bm9kZS50YWcpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB2bm9kZS50YWcuaW5kZXhPZigndnVlLWNvbXBvbmVudCcpID09PSAwIHx8XG4gICAgICAgIHZub2RlLnRhZy50b0xvd2VyQ2FzZSgpID09PSAobm9kZS50YWdOYW1lICYmIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gKHZub2RlLmlzQ29tbWVudCA/IDggOiAzKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBwYXRjaCAob2xkVm5vZGUsIHZub2RlLCBoeWRyYXRpbmcsIHJlbW92ZU9ubHksIHBhcmVudEVsbSwgcmVmRWxtKSB7XG4gICAgaWYgKGlzVW5kZWYodm5vZGUpKSB7XG4gICAgICBpZiAoaXNEZWYob2xkVm5vZGUpKSB7IGludm9rZURlc3Ryb3lIb29rKG9sZFZub2RlKTsgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIGlzSW5pdGlhbFBhdGNoID0gZmFsc2U7XG4gICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuXG4gICAgaWYgKGlzVW5kZWYob2xkVm5vZGUpKSB7XG4gICAgICAvLyBlbXB0eSBtb3VudCAobGlrZWx5IGFzIGNvbXBvbmVudCksIGNyZWF0ZSBuZXcgcm9vdCBlbGVtZW50XG4gICAgICBpc0luaXRpYWxQYXRjaCA9IHRydWU7XG4gICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaXNSZWFsRWxlbWVudCA9IGlzRGVmKG9sZFZub2RlLm5vZGVUeXBlKTtcbiAgICAgIGlmICghaXNSZWFsRWxlbWVudCAmJiBzYW1lVm5vZGUob2xkVm5vZGUsIHZub2RlKSkge1xuICAgICAgICAvLyBwYXRjaCBleGlzdGluZyByb290IG5vZGVcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNSZWFsRWxlbWVudCkge1xuICAgICAgICAgIC8vIG1vdW50aW5nIHRvIGEgcmVhbCBlbGVtZW50XG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyBzZXJ2ZXItcmVuZGVyZWQgY29udGVudCBhbmQgaWYgd2UgY2FuIHBlcmZvcm1cbiAgICAgICAgICAvLyBhIHN1Y2Nlc3NmdWwgaHlkcmF0aW9uLlxuICAgICAgICAgIGlmIChvbGRWbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBvbGRWbm9kZS5oYXNBdHRyaWJ1dGUoU1NSX0FUVFIpKSB7XG4gICAgICAgICAgICBvbGRWbm9kZS5yZW1vdmVBdHRyaWJ1dGUoU1NSX0FUVFIpO1xuICAgICAgICAgICAgaHlkcmF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzVHJ1ZShoeWRyYXRpbmcpKSB7XG4gICAgICAgICAgICBpZiAoaHlkcmF0ZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkpIHtcbiAgICAgICAgICAgICAgaW52b2tlSW5zZXJ0SG9vayh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9sZFZub2RlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgICAnVGhlIGNsaWVudC1zaWRlIHJlbmRlcmVkIHZpcnR1YWwgRE9NIHRyZWUgaXMgbm90IG1hdGNoaW5nICcgK1xuICAgICAgICAgICAgICAgICdzZXJ2ZXItcmVuZGVyZWQgY29udGVudC4gVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGluY29ycmVjdCAnICtcbiAgICAgICAgICAgICAgICAnSFRNTCBtYXJrdXAsIGZvciBleGFtcGxlIG5lc3RpbmcgYmxvY2stbGV2ZWwgZWxlbWVudHMgaW5zaWRlICcgK1xuICAgICAgICAgICAgICAgICc8cD4sIG9yIG1pc3NpbmcgPHRib2R5Pi4gQmFpbGluZyBoeWRyYXRpb24gYW5kIHBlcmZvcm1pbmcgJyArXG4gICAgICAgICAgICAgICAgJ2Z1bGwgY2xpZW50LXNpZGUgcmVuZGVyLidcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZWl0aGVyIG5vdCBzZXJ2ZXItcmVuZGVyZWQsIG9yIGh5ZHJhdGlvbiBmYWlsZWQuXG4gICAgICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IG5vZGUgYW5kIHJlcGxhY2UgaXRcbiAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXBsYWNpbmcgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgICB2YXIgb2xkRWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgcGFyZW50RWxtJDEgPSBub2RlT3BzLnBhcmVudE5vZGUob2xkRWxtKTtcbiAgICAgICAgY3JlYXRlRWxtKFxuICAgICAgICAgIHZub2RlLFxuICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZSxcbiAgICAgICAgICAvLyBleHRyZW1lbHkgcmFyZSBlZGdlIGNhc2U6IGRvIG5vdCBpbnNlcnQgaWYgb2xkIGVsZW1lbnQgaXMgaW4gYVxuICAgICAgICAgIC8vIGxlYXZpbmcgdHJhbnNpdGlvbi4gT25seSBoYXBwZW5zIHdoZW4gY29tYmluaW5nIHRyYW5zaXRpb24gK1xuICAgICAgICAgIC8vIGtlZXAtYWxpdmUgKyBIT0NzLiAoIzQ1OTApXG4gICAgICAgICAgb2xkRWxtLl9sZWF2ZUNiID8gbnVsbCA6IHBhcmVudEVsbSQxLFxuICAgICAgICAgIG5vZGVPcHMubmV4dFNpYmxpbmcob2xkRWxtKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0RlZih2bm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgLy8gY29tcG9uZW50IHJvb3QgZWxlbWVudCByZXBsYWNlZC5cbiAgICAgICAgICAvLyB1cGRhdGUgcGFyZW50IHBsYWNlaG9sZGVyIG5vZGUgZWxlbWVudCwgcmVjdXJzaXZlbHlcbiAgICAgICAgICB2YXIgYW5jZXN0b3IgPSB2bm9kZS5wYXJlbnQ7XG4gICAgICAgICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICAgICAgICBhbmNlc3Rvci5lbG0gPSB2bm9kZS5lbG07XG4gICAgICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzUGF0Y2hhYmxlKHZub2RlKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZS5wYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZihwYXJlbnRFbG0kMSkpIHtcbiAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtJDEsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRhZykpIHtcbiAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbnZva2VJbnNlcnRIb29rKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIGlzSW5pdGlhbFBhdGNoKTtcbiAgICByZXR1cm4gdm5vZGUuZWxtXG4gIH1cbn1cblxuLyogICovXG5cbnZhciBkaXJlY3RpdmVzID0ge1xuICBjcmVhdGU6IHVwZGF0ZURpcmVjdGl2ZXMsXG4gIHVwZGF0ZTogdXBkYXRlRGlyZWN0aXZlcyxcbiAgZGVzdHJveTogZnVuY3Rpb24gdW5iaW5kRGlyZWN0aXZlcyAodm5vZGUpIHtcbiAgICB1cGRhdGVEaXJlY3RpdmVzKHZub2RlLCBlbXB0eU5vZGUpO1xuICB9XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVEaXJlY3RpdmVzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgaWYgKG9sZFZub2RlLmRhdGEuZGlyZWN0aXZlcyB8fCB2bm9kZS5kYXRhLmRpcmVjdGl2ZXMpIHtcbiAgICBfdXBkYXRlKG9sZFZub2RlLCB2bm9kZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3VwZGF0ZSAob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBpc0NyZWF0ZSA9IG9sZFZub2RlID09PSBlbXB0eU5vZGU7XG4gIHZhciBpc0Rlc3Ryb3kgPSB2bm9kZSA9PT0gZW1wdHlOb2RlO1xuICB2YXIgb2xkRGlycyA9IG5vcm1hbGl6ZURpcmVjdGl2ZXMkMShvbGRWbm9kZS5kYXRhLmRpcmVjdGl2ZXMsIG9sZFZub2RlLmNvbnRleHQpO1xuICB2YXIgbmV3RGlycyA9IG5vcm1hbGl6ZURpcmVjdGl2ZXMkMSh2bm9kZS5kYXRhLmRpcmVjdGl2ZXMsIHZub2RlLmNvbnRleHQpO1xuXG4gIHZhciBkaXJzV2l0aEluc2VydCA9IFtdO1xuICB2YXIgZGlyc1dpdGhQb3N0cGF0Y2ggPSBbXTtcblxuICB2YXIga2V5LCBvbGREaXIsIGRpcjtcbiAgZm9yIChrZXkgaW4gbmV3RGlycykge1xuICAgIG9sZERpciA9IG9sZERpcnNba2V5XTtcbiAgICBkaXIgPSBuZXdEaXJzW2tleV07XG4gICAgaWYgKCFvbGREaXIpIHtcbiAgICAgIC8vIG5ldyBkaXJlY3RpdmUsIGJpbmRcbiAgICAgIGNhbGxIb29rJDEoZGlyLCAnYmluZCcsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICBpZiAoZGlyLmRlZiAmJiBkaXIuZGVmLmluc2VydGVkKSB7XG4gICAgICAgIGRpcnNXaXRoSW5zZXJ0LnB1c2goZGlyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXhpc3RpbmcgZGlyZWN0aXZlLCB1cGRhdGVcbiAgICAgIGRpci5vbGRWYWx1ZSA9IG9sZERpci52YWx1ZTtcbiAgICAgIGNhbGxIb29rJDEoZGlyLCAndXBkYXRlJywgdm5vZGUsIG9sZFZub2RlKTtcbiAgICAgIGlmIChkaXIuZGVmICYmIGRpci5kZWYuY29tcG9uZW50VXBkYXRlZCkge1xuICAgICAgICBkaXJzV2l0aFBvc3RwYXRjaC5wdXNoKGRpcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGRpcnNXaXRoSW5zZXJ0Lmxlbmd0aCkge1xuICAgIHZhciBjYWxsSW5zZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzV2l0aEluc2VydC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjYWxsSG9vayQxKGRpcnNXaXRoSW5zZXJ0W2ldLCAnaW5zZXJ0ZWQnLCB2bm9kZSwgb2xkVm5vZGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGlzQ3JlYXRlKSB7XG4gICAgICBtZXJnZVZOb2RlSG9vayh2bm9kZS5kYXRhLmhvb2sgfHwgKHZub2RlLmRhdGEuaG9vayA9IHt9KSwgJ2luc2VydCcsIGNhbGxJbnNlcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsSW5zZXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRpcnNXaXRoUG9zdHBhdGNoLmxlbmd0aCkge1xuICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLmRhdGEuaG9vayB8fCAodm5vZGUuZGF0YS5ob29rID0ge30pLCAncG9zdHBhdGNoJywgZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzV2l0aFBvc3RwYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjYWxsSG9vayQxKGRpcnNXaXRoUG9zdHBhdGNoW2ldLCAnY29tcG9uZW50VXBkYXRlZCcsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIWlzQ3JlYXRlKSB7XG4gICAgZm9yIChrZXkgaW4gb2xkRGlycykge1xuICAgICAgaWYgKCFuZXdEaXJzW2tleV0pIHtcbiAgICAgICAgLy8gbm8gbG9uZ2VyIHByZXNlbnQsIHVuYmluZFxuICAgICAgICBjYWxsSG9vayQxKG9sZERpcnNba2V5XSwgJ3VuYmluZCcsIG9sZFZub2RlLCBvbGRWbm9kZSwgaXNEZXN0cm95KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGVtcHR5TW9kaWZpZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyQxIChcbiAgZGlycyxcbiAgdm1cbikge1xuICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKCFkaXJzKSB7XG4gICAgcmV0dXJuIHJlc1xuICB9XG4gIHZhciBpLCBkaXI7XG4gIGZvciAoaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgZGlyID0gZGlyc1tpXTtcbiAgICBpZiAoIWRpci5tb2RpZmllcnMpIHtcbiAgICAgIGRpci5tb2RpZmllcnMgPSBlbXB0eU1vZGlmaWVycztcbiAgICB9XG4gICAgcmVzW2dldFJhd0Rpck5hbWUoZGlyKV0gPSBkaXI7XG4gICAgZGlyLmRlZiA9IHJlc29sdmVBc3NldCh2bS4kb3B0aW9ucywgJ2RpcmVjdGl2ZXMnLCBkaXIubmFtZSwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBnZXRSYXdEaXJOYW1lIChkaXIpIHtcbiAgcmV0dXJuIGRpci5yYXdOYW1lIHx8ICgoZGlyLm5hbWUpICsgXCIuXCIgKyAoT2JqZWN0LmtleXMoZGlyLm1vZGlmaWVycyB8fCB7fSkuam9pbignLicpKSlcbn1cblxuZnVuY3Rpb24gY2FsbEhvb2skMSAoZGlyLCBob29rLCB2bm9kZSwgb2xkVm5vZGUsIGlzRGVzdHJveSkge1xuICB2YXIgZm4gPSBkaXIuZGVmICYmIGRpci5kZWZbaG9va107XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICBmbih2bm9kZS5lbG0sIGRpciwgdm5vZGUsIG9sZFZub2RlLCBpc0Rlc3Ryb3kpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGhhbmRsZUVycm9yKGUsIHZub2RlLmNvbnRleHQsIChcImRpcmVjdGl2ZSBcIiArIChkaXIubmFtZSkgKyBcIiBcIiArIGhvb2sgKyBcIiBob29rXCIpKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGJhc2VNb2R1bGVzID0gW1xuICByZWYsXG4gIGRpcmVjdGl2ZXNcbl07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiB1cGRhdGVBdHRycyAob2xkVm5vZGUsIHZub2RlKSB7XG4gIGlmIChpc1VuZGVmKG9sZFZub2RlLmRhdGEuYXR0cnMpICYmIGlzVW5kZWYodm5vZGUuZGF0YS5hdHRycykpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIga2V5LCBjdXIsIG9sZDtcbiAgdmFyIGVsbSA9IHZub2RlLmVsbTtcbiAgdmFyIG9sZEF0dHJzID0gb2xkVm5vZGUuZGF0YS5hdHRycyB8fCB7fTtcbiAgdmFyIGF0dHJzID0gdm5vZGUuZGF0YS5hdHRycyB8fCB7fTtcbiAgLy8gY2xvbmUgb2JzZXJ2ZWQgb2JqZWN0cywgYXMgdGhlIHVzZXIgcHJvYmFibHkgd2FudHMgdG8gbXV0YXRlIGl0XG4gIGlmIChpc0RlZihhdHRycy5fX29iX18pKSB7XG4gICAgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzID0gZXh0ZW5kKHt9LCBhdHRycyk7XG4gIH1cblxuICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgIGN1ciA9IGF0dHJzW2tleV07XG4gICAgb2xkID0gb2xkQXR0cnNba2V5XTtcbiAgICBpZiAob2xkICE9PSBjdXIpIHtcbiAgICAgIHNldEF0dHIoZWxtLCBrZXksIGN1cik7XG4gICAgfVxuICB9XG4gIC8vICM0MzkxOiBpbiBJRTksIHNldHRpbmcgdHlwZSBjYW4gcmVzZXQgdmFsdWUgZm9yIGlucHV0W3R5cGU9cmFkaW9dXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNJRTkgJiYgYXR0cnMudmFsdWUgIT09IG9sZEF0dHJzLnZhbHVlKSB7XG4gICAgc2V0QXR0cihlbG0sICd2YWx1ZScsIGF0dHJzLnZhbHVlKTtcbiAgfVxuICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgIGlmIChpc1VuZGVmKGF0dHJzW2tleV0pKSB7XG4gICAgICBpZiAoaXNYbGluayhrZXkpKSB7XG4gICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBnZXRYbGlua1Byb3Aoa2V5KSk7XG4gICAgICB9IGVsc2UgaWYgKCFpc0VudW1lcmF0ZWRBdHRyKGtleSkpIHtcbiAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRBdHRyIChlbCwga2V5LCB2YWx1ZSkge1xuICBpZiAoaXNCb29sZWFuQXR0cihrZXkpKSB7XG4gICAgLy8gc2V0IGF0dHJpYnV0ZSBmb3IgYmxhbmsgdmFsdWVcbiAgICAvLyBlLmcuIDxvcHRpb24gZGlzYWJsZWQ+U2VsZWN0IG9uZTwvb3B0aW9uPlxuICAgIGlmIChpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIGtleSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzRW51bWVyYXRlZEF0dHIoa2V5KSkge1xuICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpIHx8IHZhbHVlID09PSAnZmFsc2UnID8gJ2ZhbHNlJyA6ICd0cnVlJyk7XG4gIH0gZWxzZSBpZiAoaXNYbGluayhrZXkpKSB7XG4gICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBnZXRYbGlua1Byb3Aoa2V5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNGYWxzeUF0dHJWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbnZhciBhdHRycyA9IHtcbiAgY3JlYXRlOiB1cGRhdGVBdHRycyxcbiAgdXBkYXRlOiB1cGRhdGVBdHRyc1xufTtcblxuLyogICovXG5cbmZ1bmN0aW9uIHVwZGF0ZUNsYXNzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIGVsID0gdm5vZGUuZWxtO1xuICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gIHZhciBvbGREYXRhID0gb2xkVm5vZGUuZGF0YTtcbiAgaWYgKFxuICAgIGlzVW5kZWYoZGF0YS5zdGF0aWNDbGFzcykgJiZcbiAgICBpc1VuZGVmKGRhdGEuY2xhc3MpICYmIChcbiAgICAgIGlzVW5kZWYob2xkRGF0YSkgfHwgKFxuICAgICAgICBpc1VuZGVmKG9sZERhdGEuc3RhdGljQ2xhc3MpICYmXG4gICAgICAgIGlzVW5kZWYob2xkRGF0YS5jbGFzcylcbiAgICAgIClcbiAgICApXG4gICkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGNscyA9IGdlbkNsYXNzRm9yVm5vZGUodm5vZGUpO1xuXG4gIC8vIGhhbmRsZSB0cmFuc2l0aW9uIGNsYXNzZXNcbiAgdmFyIHRyYW5zaXRpb25DbGFzcyA9IGVsLl90cmFuc2l0aW9uQ2xhc3NlcztcbiAgaWYgKGlzRGVmKHRyYW5zaXRpb25DbGFzcykpIHtcbiAgICBjbHMgPSBjb25jYXQoY2xzLCBzdHJpbmdpZnlDbGFzcyh0cmFuc2l0aW9uQ2xhc3MpKTtcbiAgfVxuXG4gIC8vIHNldCB0aGUgY2xhc3NcbiAgaWYgKGNscyAhPT0gZWwuX3ByZXZDbGFzcykge1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbHMpO1xuICAgIGVsLl9wcmV2Q2xhc3MgPSBjbHM7XG4gIH1cbn1cblxudmFyIGtsYXNzID0ge1xuICBjcmVhdGU6IHVwZGF0ZUNsYXNzLFxuICB1cGRhdGU6IHVwZGF0ZUNsYXNzXG59O1xuXG4vKiAgKi9cblxudmFyIHZhbGlkRGl2aXNpb25DaGFyUkUgPSAvW1xcdykuK1xcLV8kXFxdXS87XG5cblxuXG5mdW5jdGlvbiB3cmFwRmlsdGVyIChleHAsIGZpbHRlcikge1xuICB2YXIgaSA9IGZpbHRlci5pbmRleE9mKCcoJyk7XG4gIGlmIChpIDwgMCkge1xuICAgIC8vIF9mOiByZXNvbHZlRmlsdGVyXG4gICAgcmV0dXJuIChcIl9mKFxcXCJcIiArIGZpbHRlciArIFwiXFxcIikoXCIgKyBleHAgKyBcIilcIilcbiAgfSBlbHNlIHtcbiAgICB2YXIgbmFtZSA9IGZpbHRlci5zbGljZSgwLCBpKTtcbiAgICB2YXIgYXJncyA9IGZpbHRlci5zbGljZShpICsgMSk7XG4gICAgcmV0dXJuIChcIl9mKFxcXCJcIiArIG5hbWUgKyBcIlxcXCIpKFwiICsgZXhwICsgXCIsXCIgKyBhcmdzKVxuICB9XG59XG5cbi8qICAqL1xuXG4vKiAgKi9cblxuLyoqXG4gKiBDcm9zcy1wbGF0Zm9ybSBjb2RlIGdlbmVyYXRpb24gZm9yIGNvbXBvbmVudCB2LW1vZGVsXG4gKi9cblxuXG4vKipcbiAqIENyb3NzLXBsYXRmb3JtIGNvZGVnZW4gaGVscGVyIGZvciBnZW5lcmF0aW5nIHYtbW9kZWwgdmFsdWUgYXNzaWdubWVudCBjb2RlLlxuICovXG5cblxuLyoqXG4gKiBwYXJzZSBkaXJlY3RpdmUgbW9kZWwgdG8gZG8gdGhlIGFycmF5IHVwZGF0ZSB0cmFuc2Zvcm0uIGFbaWR4XSA9IHZhbCA9PiAkJGEuc3BsaWNlKCQkaWR4LCAxLCB2YWwpXG4gKlxuICogZm9yIGxvb3AgcG9zc2libGUgY2FzZXM6XG4gKlxuICogLSB0ZXN0XG4gKiAtIHRlc3RbaWR4XVxuICogLSB0ZXN0W3Rlc3QxW2lkeF1dXG4gKiAtIHRlc3RbXCJhXCJdW2lkeF1cbiAqIC0geHh4LnRlc3RbYVthXS50ZXN0MVtpZHhdXVxuICogLSB0ZXN0Lnh4eC5hW1wiYXNhXCJdW3Rlc3QxW2lkeF1dXG4gKlxuICovXG5cbnZhciBzdHI7XG52YXIgaW5kZXgkMTtcblxuLyogICovXG5cbi8vIGluIHNvbWUgY2FzZXMsIHRoZSBldmVudCB1c2VkIGhhcyB0byBiZSBkZXRlcm1pbmVkIGF0IHJ1bnRpbWVcbi8vIHNvIHdlIHVzZWQgc29tZSByZXNlcnZlZCB0b2tlbnMgZHVyaW5nIGNvbXBpbGUuXG52YXIgUkFOR0VfVE9LRU4gPSAnX19yJztcbnZhciBDSEVDS0JPWF9SQURJT19UT0tFTiA9ICdfX2MnO1xuXG4vKiAgKi9cblxuLy8gbm9ybWFsaXplIHYtbW9kZWwgZXZlbnQgdG9rZW5zIHRoYXQgY2FuIG9ubHkgYmUgZGV0ZXJtaW5lZCBhdCBydW50aW1lLlxuLy8gaXQncyBpbXBvcnRhbnQgdG8gcGxhY2UgdGhlIGV2ZW50IGFzIHRoZSBmaXJzdCBpbiB0aGUgYXJyYXkgYmVjYXVzZVxuLy8gdGhlIHdob2xlIHBvaW50IGlzIGVuc3VyaW5nIHRoZSB2LW1vZGVsIGNhbGxiYWNrIGdldHMgY2FsbGVkIGJlZm9yZVxuLy8gdXNlci1hdHRhY2hlZCBoYW5kbGVycy5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUV2ZW50cyAob24pIHtcbiAgdmFyIGV2ZW50O1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGlzRGVmKG9uW1JBTkdFX1RPS0VOXSkpIHtcbiAgICAvLyBJRSBpbnB1dFt0eXBlPXJhbmdlXSBvbmx5IHN1cHBvcnRzIGBjaGFuZ2VgIGV2ZW50XG4gICAgZXZlbnQgPSBpc0lFID8gJ2NoYW5nZScgOiAnaW5wdXQnO1xuICAgIG9uW2V2ZW50XSA9IFtdLmNvbmNhdChvbltSQU5HRV9UT0tFTl0sIG9uW2V2ZW50XSB8fCBbXSk7XG4gICAgZGVsZXRlIG9uW1JBTkdFX1RPS0VOXTtcbiAgfVxuICBpZiAoaXNEZWYob25bQ0hFQ0tCT1hfUkFESU9fVE9LRU5dKSkge1xuICAgIC8vIENocm9tZSBmaXJlcyBtaWNyb3Rhc2tzIGluIGJldHdlZW4gY2xpY2svY2hhbmdlLCBsZWFkcyB0byAjNDUyMVxuICAgIGV2ZW50ID0gaXNDaHJvbWUgPyAnY2xpY2snIDogJ2NoYW5nZSc7XG4gICAgb25bZXZlbnRdID0gW10uY29uY2F0KG9uW0NIRUNLQk9YX1JBRElPX1RPS0VOXSwgb25bZXZlbnRdIHx8IFtdKTtcbiAgICBkZWxldGUgb25bQ0hFQ0tCT1hfUkFESU9fVE9LRU5dO1xuICB9XG59XG5cbnZhciB0YXJnZXQkMTtcblxuZnVuY3Rpb24gYWRkJDEgKFxuICBldmVudCxcbiAgaGFuZGxlcixcbiAgb25jZSQkMSxcbiAgY2FwdHVyZSxcbiAgcGFzc2l2ZVxuKSB7XG4gIGlmIChvbmNlJCQxKSB7XG4gICAgdmFyIG9sZEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIHZhciBfdGFyZ2V0ID0gdGFyZ2V0JDE7IC8vIHNhdmUgY3VycmVudCB0YXJnZXQgZWxlbWVudCBpbiBjbG9zdXJlXG4gICAgaGFuZGxlciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgdmFyIHJlcyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDFcbiAgICAgICAgPyBvbGRIYW5kbGVyKGV2KVxuICAgICAgICA6IG9sZEhhbmRsZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIGlmIChyZXMgIT09IG51bGwpIHtcbiAgICAgICAgcmVtb3ZlJDIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUsIF90YXJnZXQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgdGFyZ2V0JDEuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBldmVudCxcbiAgICBoYW5kbGVyLFxuICAgIHN1cHBvcnRzUGFzc2l2ZVxuICAgICAgPyB7IGNhcHR1cmU6IGNhcHR1cmUsIHBhc3NpdmU6IHBhc3NpdmUgfVxuICAgICAgOiBjYXB0dXJlXG4gICk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSQyIChcbiAgZXZlbnQsXG4gIGhhbmRsZXIsXG4gIGNhcHR1cmUsXG4gIF90YXJnZXRcbikge1xuICAoX3RhcmdldCB8fCB0YXJnZXQkMSkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZURPTUxpc3RlbmVycyAob2xkVm5vZGUsIHZub2RlKSB7XG4gIGlmIChpc1VuZGVmKG9sZFZub2RlLmRhdGEub24pICYmIGlzVW5kZWYodm5vZGUuZGF0YS5vbikpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgb24gPSB2bm9kZS5kYXRhLm9uIHx8IHt9O1xuICB2YXIgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uIHx8IHt9O1xuICB0YXJnZXQkMSA9IHZub2RlLmVsbTtcbiAgbm9ybWFsaXplRXZlbnRzKG9uKTtcbiAgdXBkYXRlTGlzdGVuZXJzKG9uLCBvbGRPbiwgYWRkJDEsIHJlbW92ZSQyLCB2bm9kZS5jb250ZXh0KTtcbn1cblxudmFyIGV2ZW50cyA9IHtcbiAgY3JlYXRlOiB1cGRhdGVET01MaXN0ZW5lcnMsXG4gIHVwZGF0ZTogdXBkYXRlRE9NTGlzdGVuZXJzXG59O1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gdXBkYXRlRE9NUHJvcHMgKG9sZFZub2RlLCB2bm9kZSkge1xuICBpZiAoaXNVbmRlZihvbGRWbm9kZS5kYXRhLmRvbVByb3BzKSAmJiBpc1VuZGVmKHZub2RlLmRhdGEuZG9tUHJvcHMpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIGtleSwgY3VyO1xuICB2YXIgZWxtID0gdm5vZGUuZWxtO1xuICB2YXIgb2xkUHJvcHMgPSBvbGRWbm9kZS5kYXRhLmRvbVByb3BzIHx8IHt9O1xuICB2YXIgcHJvcHMgPSB2bm9kZS5kYXRhLmRvbVByb3BzIHx8IHt9O1xuICAvLyBjbG9uZSBvYnNlcnZlZCBvYmplY3RzLCBhcyB0aGUgdXNlciBwcm9iYWJseSB3YW50cyB0byBtdXRhdGUgaXRcbiAgaWYgKGlzRGVmKHByb3BzLl9fb2JfXykpIHtcbiAgICBwcm9wcyA9IHZub2RlLmRhdGEuZG9tUHJvcHMgPSBleHRlbmQoe30sIHByb3BzKTtcbiAgfVxuXG4gIGZvciAoa2V5IGluIG9sZFByb3BzKSB7XG4gICAgaWYgKGlzVW5kZWYocHJvcHNba2V5XSkpIHtcbiAgICAgIGVsbVtrZXldID0gJyc7XG4gICAgfVxuICB9XG4gIGZvciAoa2V5IGluIHByb3BzKSB7XG4gICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAvLyBpZ25vcmUgY2hpbGRyZW4gaWYgdGhlIG5vZGUgaGFzIHRleHRDb250ZW50IG9yIGlubmVySFRNTCxcbiAgICAvLyBhcyB0aGVzZSB3aWxsIHRocm93IGF3YXkgZXhpc3RpbmcgRE9NIG5vZGVzIGFuZCBjYXVzZSByZW1vdmFsIGVycm9yc1xuICAgIC8vIG9uIHN1YnNlcXVlbnQgcGF0Y2hlcyAoIzMzNjApXG4gICAgaWYgKGtleSA9PT0gJ3RleHRDb250ZW50JyB8fCBrZXkgPT09ICdpbm5lckhUTUwnKSB7XG4gICAgICBpZiAodm5vZGUuY2hpbGRyZW4pIHsgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoID0gMDsgfVxuICAgICAgaWYgKGN1ciA9PT0gb2xkUHJvcHNba2V5XSkgeyBjb250aW51ZSB9XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3ZhbHVlJykge1xuICAgICAgLy8gc3RvcmUgdmFsdWUgYXMgX3ZhbHVlIGFzIHdlbGwgc2luY2VcbiAgICAgIC8vIG5vbi1zdHJpbmcgdmFsdWVzIHdpbGwgYmUgc3RyaW5naWZpZWRcbiAgICAgIGVsbS5fdmFsdWUgPSBjdXI7XG4gICAgICAvLyBhdm9pZCByZXNldHRpbmcgY3Vyc29yIHBvc2l0aW9uIHdoZW4gdmFsdWUgaXMgdGhlIHNhbWVcbiAgICAgIHZhciBzdHJDdXIgPSBpc1VuZGVmKGN1cikgPyAnJyA6IFN0cmluZyhjdXIpO1xuICAgICAgaWYgKHNob3VsZFVwZGF0ZVZhbHVlKGVsbSwgdm5vZGUsIHN0ckN1cikpIHtcbiAgICAgICAgZWxtLnZhbHVlID0gc3RyQ3VyO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbG1ba2V5XSA9IGN1cjtcbiAgICB9XG4gIH1cbn1cblxuLy8gY2hlY2sgcGxhdGZvcm1zL3dlYi91dGlsL2F0dHJzLmpzIGFjY2VwdFZhbHVlXG5cblxuZnVuY3Rpb24gc2hvdWxkVXBkYXRlVmFsdWUgKFxuICBlbG0sXG4gIHZub2RlLFxuICBjaGVja1ZhbFxuKSB7XG4gIHJldHVybiAoIWVsbS5jb21wb3NpbmcgJiYgKFxuICAgIHZub2RlLnRhZyA9PT0gJ29wdGlvbicgfHxcbiAgICBpc0RpcnR5KGVsbSwgY2hlY2tWYWwpIHx8XG4gICAgaXNJbnB1dENoYW5nZWQoZWxtLCBjaGVja1ZhbClcbiAgKSlcbn1cblxuZnVuY3Rpb24gaXNEaXJ0eSAoZWxtLCBjaGVja1ZhbCkge1xuICAvLyByZXR1cm4gdHJ1ZSB3aGVuIHRleHRib3ggKC5udW1iZXIgYW5kIC50cmltKSBsb3NlcyBmb2N1cyBhbmQgaXRzIHZhbHVlIGlzIG5vdCBlcXVhbCB0byB0aGUgdXBkYXRlZCB2YWx1ZVxuICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZWxtICYmIGVsbS52YWx1ZSAhPT0gY2hlY2tWYWxcbn1cblxuZnVuY3Rpb24gaXNJbnB1dENoYW5nZWQgKGVsbSwgbmV3VmFsKSB7XG4gIHZhciB2YWx1ZSA9IGVsbS52YWx1ZTtcbiAgdmFyIG1vZGlmaWVycyA9IGVsbS5fdk1vZGlmaWVyczsgLy8gaW5qZWN0ZWQgYnkgdi1tb2RlbCBydW50aW1lXG4gIGlmICgoaXNEZWYobW9kaWZpZXJzKSAmJiBtb2RpZmllcnMubnVtYmVyKSB8fCBlbG0udHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdG9OdW1iZXIodmFsdWUpICE9PSB0b051bWJlcihuZXdWYWwpXG4gIH1cbiAgaWYgKGlzRGVmKG1vZGlmaWVycykgJiYgbW9kaWZpZXJzLnRyaW0pIHtcbiAgICByZXR1cm4gdmFsdWUudHJpbSgpICE9PSBuZXdWYWwudHJpbSgpXG4gIH1cbiAgcmV0dXJuIHZhbHVlICE9PSBuZXdWYWxcbn1cblxudmFyIGRvbVByb3BzID0ge1xuICBjcmVhdGU6IHVwZGF0ZURPTVByb3BzLFxuICB1cGRhdGU6IHVwZGF0ZURPTVByb3BzXG59O1xuXG4vKiAgKi9cblxudmFyIHBhcnNlU3R5bGVUZXh0ID0gY2FjaGVkKGZ1bmN0aW9uIChjc3NUZXh0KSB7XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGxpc3REZWxpbWl0ZXIgPSAvOyg/IVteKF0qXFwpKS9nO1xuICB2YXIgcHJvcGVydHlEZWxpbWl0ZXIgPSAvOiguKykvO1xuICBjc3NUZXh0LnNwbGl0KGxpc3REZWxpbWl0ZXIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgdmFyIHRtcCA9IGl0ZW0uc3BsaXQocHJvcGVydHlEZWxpbWl0ZXIpO1xuICAgICAgdG1wLmxlbmd0aCA+IDEgJiYgKHJlc1t0bXBbMF0udHJpbSgpXSA9IHRtcFsxXS50cmltKCkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXNcbn0pO1xuXG4vLyBtZXJnZSBzdGF0aWMgYW5kIGR5bmFtaWMgc3R5bGUgZGF0YSBvbiB0aGUgc2FtZSB2bm9kZVxuZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVEYXRhIChkYXRhKSB7XG4gIHZhciBzdHlsZSA9IG5vcm1hbGl6ZVN0eWxlQmluZGluZyhkYXRhLnN0eWxlKTtcbiAgLy8gc3RhdGljIHN0eWxlIGlzIHByZS1wcm9jZXNzZWQgaW50byBhbiBvYmplY3QgZHVyaW5nIGNvbXBpbGF0aW9uXG4gIC8vIGFuZCBpcyBhbHdheXMgYSBmcmVzaCBvYmplY3QsIHNvIGl0J3Mgc2FmZSB0byBtZXJnZSBpbnRvIGl0XG4gIHJldHVybiBkYXRhLnN0YXRpY1N0eWxlXG4gICAgPyBleHRlbmQoZGF0YS5zdGF0aWNTdHlsZSwgc3R5bGUpXG4gICAgOiBzdHlsZVxufVxuXG4vLyBub3JtYWxpemUgcG9zc2libGUgYXJyYXkgLyBzdHJpbmcgdmFsdWVzIGludG8gT2JqZWN0XG5mdW5jdGlvbiBub3JtYWxpemVTdHlsZUJpbmRpbmcgKGJpbmRpbmdTdHlsZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShiaW5kaW5nU3R5bGUpKSB7XG4gICAgcmV0dXJuIHRvT2JqZWN0KGJpbmRpbmdTdHlsZSlcbiAgfVxuICBpZiAodHlwZW9mIGJpbmRpbmdTdHlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGFyc2VTdHlsZVRleHQoYmluZGluZ1N0eWxlKVxuICB9XG4gIHJldHVybiBiaW5kaW5nU3R5bGVcbn1cblxuLyoqXG4gKiBwYXJlbnQgY29tcG9uZW50IHN0eWxlIHNob3VsZCBiZSBhZnRlciBjaGlsZCdzXG4gKiBzbyB0aGF0IHBhcmVudCBjb21wb25lbnQncyBzdHlsZSBjb3VsZCBvdmVycmlkZSBpdFxuICovXG5mdW5jdGlvbiBnZXRTdHlsZSAodm5vZGUsIGNoZWNrQ2hpbGQpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICB2YXIgc3R5bGVEYXRhO1xuXG4gIGlmIChjaGVja0NoaWxkKSB7XG4gICAgdmFyIGNoaWxkTm9kZSA9IHZub2RlO1xuICAgIHdoaWxlIChjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgIGNoaWxkTm9kZSA9IGNoaWxkTm9kZS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGU7XG4gICAgICBpZiAoY2hpbGROb2RlLmRhdGEgJiYgKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YShjaGlsZE5vZGUuZGF0YSkpKSB7XG4gICAgICAgIGV4dGVuZChyZXMsIHN0eWxlRGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEodm5vZGUuZGF0YSkpKSB7XG4gICAgZXh0ZW5kKHJlcywgc3R5bGVEYXRhKTtcbiAgfVxuXG4gIHZhciBwYXJlbnROb2RlID0gdm5vZGU7XG4gIHdoaWxlICgocGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50KSkge1xuICAgIGlmIChwYXJlbnROb2RlLmRhdGEgJiYgKHN0eWxlRGF0YSA9IG5vcm1hbGl6ZVN0eWxlRGF0YShwYXJlbnROb2RlLmRhdGEpKSkge1xuICAgICAgZXh0ZW5kKHJlcywgc3R5bGVEYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIGNzc1ZhclJFID0gL14tLS87XG52YXIgaW1wb3J0YW50UkUgPSAvXFxzKiFpbXBvcnRhbnQkLztcbnZhciBzZXRQcm9wID0gZnVuY3Rpb24gKGVsLCBuYW1lLCB2YWwpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChjc3NWYXJSRS50ZXN0KG5hbWUpKSB7XG4gICAgZWwuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsKTtcbiAgfSBlbHNlIGlmIChpbXBvcnRhbnRSRS50ZXN0KHZhbCkpIHtcbiAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWwucmVwbGFjZShpbXBvcnRhbnRSRSwgJycpLCAnaW1wb3J0YW50Jyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplKG5hbWUpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIC8vIFN1cHBvcnQgdmFsdWVzIGFycmF5IGNyZWF0ZWQgYnkgYXV0b3ByZWZpeGVyLCBlLmcuXG4gICAgICAvLyB7ZGlzcGxheTogW1wiLXdlYmtpdC1ib3hcIiwgXCItbXMtZmxleGJveFwiLCBcImZsZXhcIl19XG4gICAgICAvLyBTZXQgdGhlbSBvbmUgYnkgb25lLCBhbmQgdGhlIGJyb3dzZXIgd2lsbCBvbmx5IHNldCB0aG9zZSBpdCBjYW4gcmVjb2duaXplXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGVsLnN0eWxlW25vcm1hbGl6ZWROYW1lXSA9IHZhbFtpXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbbm9ybWFsaXplZE5hbWVdID0gdmFsO1xuICAgIH1cbiAgfVxufTtcblxudmFyIHByZWZpeGVzID0gWydXZWJraXQnLCAnTW96JywgJ21zJ107XG5cbnZhciB0ZXN0RWw7XG52YXIgbm9ybWFsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChwcm9wKSB7XG4gIHRlc3RFbCA9IHRlc3RFbCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvcCA9IGNhbWVsaXplKHByb3ApO1xuICBpZiAocHJvcCAhPT0gJ2ZpbHRlcicgJiYgKHByb3AgaW4gdGVzdEVsLnN0eWxlKSkge1xuICAgIHJldHVybiBwcm9wXG4gIH1cbiAgdmFyIHVwcGVyID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcHJlZml4ZWQgPSBwcmVmaXhlc1tpXSArIHVwcGVyO1xuICAgIGlmIChwcmVmaXhlZCBpbiB0ZXN0RWwuc3R5bGUpIHtcbiAgICAgIHJldHVybiBwcmVmaXhlZFxuICAgIH1cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICB2YXIgb2xkRGF0YSA9IG9sZFZub2RlLmRhdGE7XG5cbiAgaWYgKGlzVW5kZWYoZGF0YS5zdGF0aWNTdHlsZSkgJiYgaXNVbmRlZihkYXRhLnN0eWxlKSAmJlxuICAgICAgaXNVbmRlZihvbGREYXRhLnN0YXRpY1N0eWxlKSAmJiBpc1VuZGVmKG9sZERhdGEuc3R5bGUpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgY3VyLCBuYW1lO1xuICB2YXIgZWwgPSB2bm9kZS5lbG07XG4gIHZhciBvbGRTdGF0aWNTdHlsZSA9IG9sZERhdGEuc3RhdGljU3R5bGU7XG4gIHZhciBvbGRTdHlsZUJpbmRpbmcgPSBvbGREYXRhLm5vcm1hbGl6ZWRTdHlsZSB8fCBvbGREYXRhLnN0eWxlIHx8IHt9O1xuXG4gIC8vIGlmIHN0YXRpYyBzdHlsZSBleGlzdHMsIHN0eWxlYmluZGluZyBhbHJlYWR5IG1lcmdlZCBpbnRvIGl0IHdoZW4gZG9pbmcgbm9ybWFsaXplU3R5bGVEYXRhXG4gIHZhciBvbGRTdHlsZSA9IG9sZFN0YXRpY1N0eWxlIHx8IG9sZFN0eWxlQmluZGluZztcblxuICB2YXIgc3R5bGUgPSBub3JtYWxpemVTdHlsZUJpbmRpbmcodm5vZGUuZGF0YS5zdHlsZSkgfHwge307XG5cbiAgLy8gc3RvcmUgbm9ybWFsaXplZCBzdHlsZSB1bmRlciBhIGRpZmZlcmVudCBrZXkgZm9yIG5leHQgZGlmZlxuICAvLyBtYWtlIHN1cmUgdG8gY2xvbmUgaXQgaWYgaXQncyByZWFjdGl2ZSwgc2luY2UgdGhlIHVzZXIgbGlrbGV5IHdhbnRzXG4gIC8vIHRvIG11dGF0ZSBpdC5cbiAgdm5vZGUuZGF0YS5ub3JtYWxpemVkU3R5bGUgPSBpc0RlZihzdHlsZS5fX29iX18pXG4gICAgPyBleHRlbmQoe30sIHN0eWxlKVxuICAgIDogc3R5bGU7XG5cbiAgdmFyIG5ld1N0eWxlID0gZ2V0U3R5bGUodm5vZGUsIHRydWUpO1xuXG4gIGZvciAobmFtZSBpbiBvbGRTdHlsZSkge1xuICAgIGlmIChpc1VuZGVmKG5ld1N0eWxlW25hbWVdKSkge1xuICAgICAgc2V0UHJvcChlbCwgbmFtZSwgJycpO1xuICAgIH1cbiAgfVxuICBmb3IgKG5hbWUgaW4gbmV3U3R5bGUpIHtcbiAgICBjdXIgPSBuZXdTdHlsZVtuYW1lXTtcbiAgICBpZiAoY3VyICE9PSBvbGRTdHlsZVtuYW1lXSkge1xuICAgICAgLy8gaWU5IHNldHRpbmcgdG8gbnVsbCBoYXMgbm8gZWZmZWN0LCBtdXN0IHVzZSBlbXB0eSBzdHJpbmdcbiAgICAgIHNldFByb3AoZWwsIG5hbWUsIGN1ciA9PSBudWxsID8gJycgOiBjdXIpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgc3R5bGUgPSB7XG4gIGNyZWF0ZTogdXBkYXRlU3R5bGUsXG4gIHVwZGF0ZTogdXBkYXRlU3R5bGVcbn07XG5cbi8qICAqL1xuXG4vKipcbiAqIEFkZCBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIFNWRyBzaW5jZSBjbGFzc0xpc3QgaXMgbm90IHN1cHBvcnRlZCBvblxuICogU1ZHIGVsZW1lbnRzIGluIElFXG4gKi9cbmZ1bmN0aW9uIGFkZENsYXNzIChlbCwgY2xzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWNscyB8fCAhKGNscyA9IGNscy50cmltKCkpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgaWYgKGNscy5pbmRleE9mKCcgJykgPiAtMSkge1xuICAgICAgY2xzLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGN1ciA9IFwiIFwiICsgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykgKyBcIiBcIjtcbiAgICBpZiAoY3VyLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA8IDApIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoY3VyICsgY2xzKS50cmltKCkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIFNWRyBzaW5jZSBjbGFzc0xpc3QgaXMgbm90IHN1cHBvcnRlZCBvblxuICogU1ZHIGVsZW1lbnRzIGluIElFXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzIChlbCwgY2xzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWNscyB8fCAhKGNscyA9IGNscy50cmltKCkpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgaWYgKGNscy5pbmRleE9mKCcgJykgPiAtMSkge1xuICAgICAgY2xzLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZWwuY2xhc3NMaXN0LnJlbW92ZShjKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGN1ciA9IFwiIFwiICsgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykgKyBcIiBcIjtcbiAgICB2YXIgdGFyID0gJyAnICsgY2xzICsgJyAnO1xuICAgIHdoaWxlIChjdXIuaW5kZXhPZih0YXIpID49IDApIHtcbiAgICAgIGN1ciA9IGN1ci5yZXBsYWNlKHRhciwgJyAnKTtcbiAgICB9XG4gICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGN1ci50cmltKCkpO1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiByZXNvbHZlVHJhbnNpdGlvbiAoZGVmJCQxKSB7XG4gIGlmICghZGVmJCQxKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHR5cGVvZiBkZWYkJDEgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIHJlcyA9IHt9O1xuICAgIGlmIChkZWYkJDEuY3NzICE9PSBmYWxzZSkge1xuICAgICAgZXh0ZW5kKHJlcywgYXV0b0Nzc1RyYW5zaXRpb24oZGVmJCQxLm5hbWUgfHwgJ3YnKSk7XG4gICAgfVxuICAgIGV4dGVuZChyZXMsIGRlZiQkMSk7XG4gICAgcmV0dXJuIHJlc1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWYkJDEgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGF1dG9Dc3NUcmFuc2l0aW9uKGRlZiQkMSlcbiAgfVxufVxuXG52YXIgYXV0b0Nzc1RyYW5zaXRpb24gPSBjYWNoZWQoZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnRlckNsYXNzOiAobmFtZSArIFwiLWVudGVyXCIpLFxuICAgIGVudGVyVG9DbGFzczogKG5hbWUgKyBcIi1lbnRlci10b1wiKSxcbiAgICBlbnRlckFjdGl2ZUNsYXNzOiAobmFtZSArIFwiLWVudGVyLWFjdGl2ZVwiKSxcbiAgICBsZWF2ZUNsYXNzOiAobmFtZSArIFwiLWxlYXZlXCIpLFxuICAgIGxlYXZlVG9DbGFzczogKG5hbWUgKyBcIi1sZWF2ZS10b1wiKSxcbiAgICBsZWF2ZUFjdGl2ZUNsYXNzOiAobmFtZSArIFwiLWxlYXZlLWFjdGl2ZVwiKVxuICB9XG59KTtcblxudmFyIGhhc1RyYW5zaXRpb24gPSBpbkJyb3dzZXIgJiYgIWlzSUU5O1xudmFyIFRSQU5TSVRJT04gPSAndHJhbnNpdGlvbic7XG52YXIgQU5JTUFUSU9OID0gJ2FuaW1hdGlvbic7XG5cbi8vIFRyYW5zaXRpb24gcHJvcGVydHkvZXZlbnQgc25pZmZpbmdcbnZhciB0cmFuc2l0aW9uUHJvcCA9ICd0cmFuc2l0aW9uJztcbnZhciB0cmFuc2l0aW9uRW5kRXZlbnQgPSAndHJhbnNpdGlvbmVuZCc7XG52YXIgYW5pbWF0aW9uUHJvcCA9ICdhbmltYXRpb24nO1xudmFyIGFuaW1hdGlvbkVuZEV2ZW50ID0gJ2FuaW1hdGlvbmVuZCc7XG5pZiAoaGFzVHJhbnNpdGlvbikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHdpbmRvdy5vbnRyYW5zaXRpb25lbmQgPT09IHVuZGVmaW5lZCAmJlxuICAgIHdpbmRvdy5vbndlYmtpdHRyYW5zaXRpb25lbmQgIT09IHVuZGVmaW5lZCkge1xuICAgIHRyYW5zaXRpb25Qcm9wID0gJ1dlYmtpdFRyYW5zaXRpb24nO1xuICAgIHRyYW5zaXRpb25FbmRFdmVudCA9ICd3ZWJraXRUcmFuc2l0aW9uRW5kJztcbiAgfVxuICBpZiAod2luZG93Lm9uYW5pbWF0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcbiAgICB3aW5kb3cub253ZWJraXRhbmltYXRpb25lbmQgIT09IHVuZGVmaW5lZCkge1xuICAgIGFuaW1hdGlvblByb3AgPSAnV2Via2l0QW5pbWF0aW9uJztcbiAgICBhbmltYXRpb25FbmRFdmVudCA9ICd3ZWJraXRBbmltYXRpb25FbmQnO1xuICB9XG59XG5cbi8vIGJpbmRpbmcgdG8gd2luZG93IGlzIG5lY2Vzc2FyeSB0byBtYWtlIGhvdCByZWxvYWQgd29yayBpbiBJRSBpbiBzdHJpY3QgbW9kZVxudmFyIHJhZiA9IGluQnJvd3NlciAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdylcbiAgOiBzZXRUaW1lb3V0O1xuXG5mdW5jdGlvbiBuZXh0RnJhbWUgKGZuKSB7XG4gIHJhZihmdW5jdGlvbiAoKSB7XG4gICAgcmFmKGZuKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZFRyYW5zaXRpb25DbGFzcyAoZWwsIGNscykge1xuICAoZWwuX3RyYW5zaXRpb25DbGFzc2VzIHx8IChlbC5fdHJhbnNpdGlvbkNsYXNzZXMgPSBbXSkpLnB1c2goY2xzKTtcbiAgYWRkQ2xhc3MoZWwsIGNscyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRyYW5zaXRpb25DbGFzcyAoZWwsIGNscykge1xuICBpZiAoZWwuX3RyYW5zaXRpb25DbGFzc2VzKSB7XG4gICAgcmVtb3ZlKGVsLl90cmFuc2l0aW9uQ2xhc3NlcywgY2xzKTtcbiAgfVxuICByZW1vdmVDbGFzcyhlbCwgY2xzKTtcbn1cblxuZnVuY3Rpb24gd2hlblRyYW5zaXRpb25FbmRzIChcbiAgZWwsXG4gIGV4cGVjdGVkVHlwZSxcbiAgY2Jcbikge1xuICB2YXIgcmVmID0gZ2V0VHJhbnNpdGlvbkluZm8oZWwsIGV4cGVjdGVkVHlwZSk7XG4gIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gIHZhciB0aW1lb3V0ID0gcmVmLnRpbWVvdXQ7XG4gIHZhciBwcm9wQ291bnQgPSByZWYucHJvcENvdW50O1xuICBpZiAoIXR5cGUpIHsgcmV0dXJuIGNiKCkgfVxuICB2YXIgZXZlbnQgPSB0eXBlID09PSBUUkFOU0lUSU9OID8gdHJhbnNpdGlvbkVuZEV2ZW50IDogYW5pbWF0aW9uRW5kRXZlbnQ7XG4gIHZhciBlbmRlZCA9IDA7XG4gIHZhciBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb25FbmQpO1xuICAgIGNiKCk7XG4gIH07XG4gIHZhciBvbkVuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBlbCkge1xuICAgICAgaWYgKCsrZW5kZWQgPj0gcHJvcENvdW50KSB7XG4gICAgICAgIGVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGVuZGVkIDwgcHJvcENvdW50KSB7XG4gICAgICBlbmQoKTtcbiAgICB9XG4gIH0sIHRpbWVvdXQgKyAxKTtcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgb25FbmQpO1xufVxuXG52YXIgdHJhbnNmb3JtUkUgPSAvXFxiKHRyYW5zZm9ybXxhbGwpKCx8JCkvO1xuXG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uSW5mbyAoZWwsIGV4cGVjdGVkVHlwZSkge1xuICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICB2YXIgdHJhbnNpdGlvbkRlbGF5cyA9IHN0eWxlc1t0cmFuc2l0aW9uUHJvcCArICdEZWxheSddLnNwbGl0KCcsICcpO1xuICB2YXIgdHJhbnNpdGlvbkR1cmF0aW9ucyA9IHN0eWxlc1t0cmFuc2l0aW9uUHJvcCArICdEdXJhdGlvbiddLnNwbGl0KCcsICcpO1xuICB2YXIgdHJhbnNpdGlvblRpbWVvdXQgPSBnZXRUaW1lb3V0KHRyYW5zaXRpb25EZWxheXMsIHRyYW5zaXRpb25EdXJhdGlvbnMpO1xuICB2YXIgYW5pbWF0aW9uRGVsYXlzID0gc3R5bGVzW2FuaW1hdGlvblByb3AgKyAnRGVsYXknXS5zcGxpdCgnLCAnKTtcbiAgdmFyIGFuaW1hdGlvbkR1cmF0aW9ucyA9IHN0eWxlc1thbmltYXRpb25Qcm9wICsgJ0R1cmF0aW9uJ10uc3BsaXQoJywgJyk7XG4gIHZhciBhbmltYXRpb25UaW1lb3V0ID0gZ2V0VGltZW91dChhbmltYXRpb25EZWxheXMsIGFuaW1hdGlvbkR1cmF0aW9ucyk7XG5cbiAgdmFyIHR5cGU7XG4gIHZhciB0aW1lb3V0ID0gMDtcbiAgdmFyIHByb3BDb3VudCA9IDA7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoZXhwZWN0ZWRUeXBlID09PSBUUkFOU0lUSU9OKSB7XG4gICAgaWYgKHRyYW5zaXRpb25UaW1lb3V0ID4gMCkge1xuICAgICAgdHlwZSA9IFRSQU5TSVRJT047XG4gICAgICB0aW1lb3V0ID0gdHJhbnNpdGlvblRpbWVvdXQ7XG4gICAgICBwcm9wQ291bnQgPSB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWRUeXBlID09PSBBTklNQVRJT04pIHtcbiAgICBpZiAoYW5pbWF0aW9uVGltZW91dCA+IDApIHtcbiAgICAgIHR5cGUgPSBBTklNQVRJT047XG4gICAgICB0aW1lb3V0ID0gYW5pbWF0aW9uVGltZW91dDtcbiAgICAgIHByb3BDb3VudCA9IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRpbWVvdXQgPSBNYXRoLm1heCh0cmFuc2l0aW9uVGltZW91dCwgYW5pbWF0aW9uVGltZW91dCk7XG4gICAgdHlwZSA9IHRpbWVvdXQgPiAwXG4gICAgICA/IHRyYW5zaXRpb25UaW1lb3V0ID4gYW5pbWF0aW9uVGltZW91dFxuICAgICAgICA/IFRSQU5TSVRJT05cbiAgICAgICAgOiBBTklNQVRJT05cbiAgICAgIDogbnVsbDtcbiAgICBwcm9wQ291bnQgPSB0eXBlXG4gICAgICA/IHR5cGUgPT09IFRSQU5TSVRJT05cbiAgICAgICAgPyB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aFxuICAgICAgICA6IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGhcbiAgICAgIDogMDtcbiAgfVxuICB2YXIgaGFzVHJhbnNmb3JtID1cbiAgICB0eXBlID09PSBUUkFOU0lUSU9OICYmXG4gICAgdHJhbnNmb3JtUkUudGVzdChzdHlsZXNbdHJhbnNpdGlvblByb3AgKyAnUHJvcGVydHknXSk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgIHByb3BDb3VudDogcHJvcENvdW50LFxuICAgIGhhc1RyYW5zZm9ybTogaGFzVHJhbnNmb3JtXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGltZW91dCAoZGVsYXlzLCBkdXJhdGlvbnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgd2hpbGUgKGRlbGF5cy5sZW5ndGggPCBkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgZGVsYXlzID0gZGVsYXlzLmNvbmNhdChkZWxheXMpO1xuICB9XG5cbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGR1cmF0aW9ucy5tYXAoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICByZXR1cm4gdG9NcyhkKSArIHRvTXMoZGVsYXlzW2ldKVxuICB9KSlcbn1cblxuZnVuY3Rpb24gdG9NcyAocykge1xuICByZXR1cm4gTnVtYmVyKHMuc2xpY2UoMCwgLTEpKSAqIDEwMDBcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGVudGVyICh2bm9kZSwgdG9nZ2xlRGlzcGxheSkge1xuICB2YXIgZWwgPSB2bm9kZS5lbG07XG5cbiAgLy8gY2FsbCBsZWF2ZSBjYWxsYmFjayBub3dcbiAgaWYgKGlzRGVmKGVsLl9sZWF2ZUNiKSkge1xuICAgIGVsLl9sZWF2ZUNiLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgZWwuX2xlYXZlQ2IoKTtcbiAgfVxuXG4gIHZhciBkYXRhID0gcmVzb2x2ZVRyYW5zaXRpb24odm5vZGUuZGF0YS50cmFuc2l0aW9uKTtcbiAgaWYgKGlzVW5kZWYoZGF0YSkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNEZWYoZWwuX2VudGVyQ2IpIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgY3NzID0gZGF0YS5jc3M7XG4gIHZhciB0eXBlID0gZGF0YS50eXBlO1xuICB2YXIgZW50ZXJDbGFzcyA9IGRhdGEuZW50ZXJDbGFzcztcbiAgdmFyIGVudGVyVG9DbGFzcyA9IGRhdGEuZW50ZXJUb0NsYXNzO1xuICB2YXIgZW50ZXJBY3RpdmVDbGFzcyA9IGRhdGEuZW50ZXJBY3RpdmVDbGFzcztcbiAgdmFyIGFwcGVhckNsYXNzID0gZGF0YS5hcHBlYXJDbGFzcztcbiAgdmFyIGFwcGVhclRvQ2xhc3MgPSBkYXRhLmFwcGVhclRvQ2xhc3M7XG4gIHZhciBhcHBlYXJBY3RpdmVDbGFzcyA9IGRhdGEuYXBwZWFyQWN0aXZlQ2xhc3M7XG4gIHZhciBiZWZvcmVFbnRlciA9IGRhdGEuYmVmb3JlRW50ZXI7XG4gIHZhciBlbnRlciA9IGRhdGEuZW50ZXI7XG4gIHZhciBhZnRlckVudGVyID0gZGF0YS5hZnRlckVudGVyO1xuICB2YXIgZW50ZXJDYW5jZWxsZWQgPSBkYXRhLmVudGVyQ2FuY2VsbGVkO1xuICB2YXIgYmVmb3JlQXBwZWFyID0gZGF0YS5iZWZvcmVBcHBlYXI7XG4gIHZhciBhcHBlYXIgPSBkYXRhLmFwcGVhcjtcbiAgdmFyIGFmdGVyQXBwZWFyID0gZGF0YS5hZnRlckFwcGVhcjtcbiAgdmFyIGFwcGVhckNhbmNlbGxlZCA9IGRhdGEuYXBwZWFyQ2FuY2VsbGVkO1xuICB2YXIgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuXG4gIC8vIGFjdGl2ZUluc3RhbmNlIHdpbGwgYWx3YXlzIGJlIHRoZSA8dHJhbnNpdGlvbj4gY29tcG9uZW50IG1hbmFnaW5nIHRoaXNcbiAgLy8gdHJhbnNpdGlvbi4gT25lIGVkZ2UgY2FzZSB0byBjaGVjayBpcyB3aGVuIHRoZSA8dHJhbnNpdGlvbj4gaXMgcGxhY2VkXG4gIC8vIGFzIHRoZSByb290IG5vZGUgb2YgYSBjaGlsZCBjb21wb25lbnQuIEluIHRoYXQgY2FzZSB3ZSBuZWVkIHRvIGNoZWNrXG4gIC8vIDx0cmFuc2l0aW9uPidzIHBhcmVudCBmb3IgYXBwZWFyIGNoZWNrLlxuICB2YXIgY29udGV4dCA9IGFjdGl2ZUluc3RhbmNlO1xuICB2YXIgdHJhbnNpdGlvbk5vZGUgPSBhY3RpdmVJbnN0YW5jZS4kdm5vZGU7XG4gIHdoaWxlICh0cmFuc2l0aW9uTm9kZSAmJiB0cmFuc2l0aW9uTm9kZS5wYXJlbnQpIHtcbiAgICB0cmFuc2l0aW9uTm9kZSA9IHRyYW5zaXRpb25Ob2RlLnBhcmVudDtcbiAgICBjb250ZXh0ID0gdHJhbnNpdGlvbk5vZGUuY29udGV4dDtcbiAgfVxuXG4gIHZhciBpc0FwcGVhciA9ICFjb250ZXh0Ll9pc01vdW50ZWQgfHwgIXZub2RlLmlzUm9vdEluc2VydDtcblxuICBpZiAoaXNBcHBlYXIgJiYgIWFwcGVhciAmJiBhcHBlYXIgIT09ICcnKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3RhcnRDbGFzcyA9IGlzQXBwZWFyICYmIGFwcGVhckNsYXNzXG4gICAgPyBhcHBlYXJDbGFzc1xuICAgIDogZW50ZXJDbGFzcztcbiAgdmFyIGFjdGl2ZUNsYXNzID0gaXNBcHBlYXIgJiYgYXBwZWFyQWN0aXZlQ2xhc3NcbiAgICA/IGFwcGVhckFjdGl2ZUNsYXNzXG4gICAgOiBlbnRlckFjdGl2ZUNsYXNzO1xuICB2YXIgdG9DbGFzcyA9IGlzQXBwZWFyICYmIGFwcGVhclRvQ2xhc3NcbiAgICA/IGFwcGVhclRvQ2xhc3NcbiAgICA6IGVudGVyVG9DbGFzcztcblxuICB2YXIgYmVmb3JlRW50ZXJIb29rID0gaXNBcHBlYXJcbiAgICA/IChiZWZvcmVBcHBlYXIgfHwgYmVmb3JlRW50ZXIpXG4gICAgOiBiZWZvcmVFbnRlcjtcbiAgdmFyIGVudGVySG9vayA9IGlzQXBwZWFyXG4gICAgPyAodHlwZW9mIGFwcGVhciA9PT0gJ2Z1bmN0aW9uJyA/IGFwcGVhciA6IGVudGVyKVxuICAgIDogZW50ZXI7XG4gIHZhciBhZnRlckVudGVySG9vayA9IGlzQXBwZWFyXG4gICAgPyAoYWZ0ZXJBcHBlYXIgfHwgYWZ0ZXJFbnRlcilcbiAgICA6IGFmdGVyRW50ZXI7XG4gIHZhciBlbnRlckNhbmNlbGxlZEhvb2sgPSBpc0FwcGVhclxuICAgID8gKGFwcGVhckNhbmNlbGxlZCB8fCBlbnRlckNhbmNlbGxlZClcbiAgICA6IGVudGVyQ2FuY2VsbGVkO1xuXG4gIHZhciBleHBsaWNpdEVudGVyRHVyYXRpb24gPSB0b051bWJlcihcbiAgICBpc09iamVjdChkdXJhdGlvbilcbiAgICAgID8gZHVyYXRpb24uZW50ZXJcbiAgICAgIDogZHVyYXRpb25cbiAgKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBleHBsaWNpdEVudGVyRHVyYXRpb24gIT0gbnVsbCkge1xuICAgIGNoZWNrRHVyYXRpb24oZXhwbGljaXRFbnRlckR1cmF0aW9uLCAnZW50ZXInLCB2bm9kZSk7XG4gIH1cblxuICB2YXIgZXhwZWN0c0NTUyA9IGNzcyAhPT0gZmFsc2UgJiYgIWlzSUU5O1xuICB2YXIgdXNlcldhbnRzQ29udHJvbCA9IGdldEhvb2tBcmd1bWVudHNMZW5ndGgoZW50ZXJIb29rKTtcblxuICB2YXIgY2IgPSBlbC5fZW50ZXJDYiA9IG9uY2UoZnVuY3Rpb24gKCkge1xuICAgIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIHRvQ2xhc3MpO1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBhY3RpdmVDbGFzcyk7XG4gICAgfVxuICAgIGlmIChjYi5jYW5jZWxsZWQpIHtcbiAgICAgIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgc3RhcnRDbGFzcyk7XG4gICAgICB9XG4gICAgICBlbnRlckNhbmNlbGxlZEhvb2sgJiYgZW50ZXJDYW5jZWxsZWRIb29rKGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWZ0ZXJFbnRlckhvb2sgJiYgYWZ0ZXJFbnRlckhvb2soZWwpO1xuICAgIH1cbiAgICBlbC5fZW50ZXJDYiA9IG51bGw7XG4gIH0pO1xuXG4gIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XG4gICAgLy8gcmVtb3ZlIHBlbmRpbmcgbGVhdmUgZWxlbWVudCBvbiBlbnRlciBieSBpbmplY3RpbmcgYW4gaW5zZXJ0IGhvb2tcbiAgICBtZXJnZVZOb2RlSG9vayh2bm9kZS5kYXRhLmhvb2sgfHwgKHZub2RlLmRhdGEuaG9vayA9IHt9KSwgJ2luc2VydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgdmFyIHBlbmRpbmdOb2RlID0gcGFyZW50ICYmIHBhcmVudC5fcGVuZGluZyAmJiBwYXJlbnQuX3BlbmRpbmdbdm5vZGUua2V5XTtcbiAgICAgIGlmIChwZW5kaW5nTm9kZSAmJlxuICAgICAgICAgIHBlbmRpbmdOb2RlLnRhZyA9PT0gdm5vZGUudGFnICYmXG4gICAgICAgICAgcGVuZGluZ05vZGUuZWxtLl9sZWF2ZUNiKSB7XG4gICAgICAgIHBlbmRpbmdOb2RlLmVsbS5fbGVhdmVDYigpO1xuICAgICAgfVxuICAgICAgZW50ZXJIb29rICYmIGVudGVySG9vayhlbCwgY2IpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gc3RhcnQgZW50ZXIgdHJhbnNpdGlvblxuICBiZWZvcmVFbnRlckhvb2sgJiYgYmVmb3JlRW50ZXJIb29rKGVsKTtcbiAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIHN0YXJ0Q2xhc3MpO1xuICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgYWN0aXZlQ2xhc3MpO1xuICAgIG5leHRGcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIHRvQ2xhc3MpO1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBzdGFydENsYXNzKTtcbiAgICAgIGlmICghY2IuY2FuY2VsbGVkICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgICAgIGlmIChpc1ZhbGlkRHVyYXRpb24oZXhwbGljaXRFbnRlckR1cmF0aW9uKSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoY2IsIGV4cGxpY2l0RW50ZXJEdXJhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBjYik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmICh2bm9kZS5kYXRhLnNob3cpIHtcbiAgICB0b2dnbGVEaXNwbGF5ICYmIHRvZ2dsZURpc3BsYXkoKTtcbiAgICBlbnRlckhvb2sgJiYgZW50ZXJIb29rKGVsLCBjYik7XG4gIH1cblxuICBpZiAoIWV4cGVjdHNDU1MgJiYgIXVzZXJXYW50c0NvbnRyb2wpIHtcbiAgICBjYigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxlYXZlICh2bm9kZSwgcm0pIHtcbiAgdmFyIGVsID0gdm5vZGUuZWxtO1xuXG4gIC8vIGNhbGwgZW50ZXIgY2FsbGJhY2sgbm93XG4gIGlmIChpc0RlZihlbC5fZW50ZXJDYikpIHtcbiAgICBlbC5fZW50ZXJDYi5jYW5jZWxsZWQgPSB0cnVlO1xuICAgIGVsLl9lbnRlckNiKCk7XG4gIH1cblxuICB2YXIgZGF0YSA9IHJlc29sdmVUcmFuc2l0aW9uKHZub2RlLmRhdGEudHJhbnNpdGlvbik7XG4gIGlmIChpc1VuZGVmKGRhdGEpKSB7XG4gICAgcmV0dXJuIHJtKClcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNEZWYoZWwuX2xlYXZlQ2IpIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgY3NzID0gZGF0YS5jc3M7XG4gIHZhciB0eXBlID0gZGF0YS50eXBlO1xuICB2YXIgbGVhdmVDbGFzcyA9IGRhdGEubGVhdmVDbGFzcztcbiAgdmFyIGxlYXZlVG9DbGFzcyA9IGRhdGEubGVhdmVUb0NsYXNzO1xuICB2YXIgbGVhdmVBY3RpdmVDbGFzcyA9IGRhdGEubGVhdmVBY3RpdmVDbGFzcztcbiAgdmFyIGJlZm9yZUxlYXZlID0gZGF0YS5iZWZvcmVMZWF2ZTtcbiAgdmFyIGxlYXZlID0gZGF0YS5sZWF2ZTtcbiAgdmFyIGFmdGVyTGVhdmUgPSBkYXRhLmFmdGVyTGVhdmU7XG4gIHZhciBsZWF2ZUNhbmNlbGxlZCA9IGRhdGEubGVhdmVDYW5jZWxsZWQ7XG4gIHZhciBkZWxheUxlYXZlID0gZGF0YS5kZWxheUxlYXZlO1xuICB2YXIgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuXG4gIHZhciBleHBlY3RzQ1NTID0gY3NzICE9PSBmYWxzZSAmJiAhaXNJRTk7XG4gIHZhciB1c2VyV2FudHNDb250cm9sID0gZ2V0SG9va0FyZ3VtZW50c0xlbmd0aChsZWF2ZSk7XG5cbiAgdmFyIGV4cGxpY2l0TGVhdmVEdXJhdGlvbiA9IHRvTnVtYmVyKFxuICAgIGlzT2JqZWN0KGR1cmF0aW9uKVxuICAgICAgPyBkdXJhdGlvbi5sZWF2ZVxuICAgICAgOiBkdXJhdGlvblxuICApO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGlzRGVmKGV4cGxpY2l0TGVhdmVEdXJhdGlvbikpIHtcbiAgICBjaGVja0R1cmF0aW9uKGV4cGxpY2l0TGVhdmVEdXJhdGlvbiwgJ2xlYXZlJywgdm5vZGUpO1xuICB9XG5cbiAgdmFyIGNiID0gZWwuX2xlYXZlQ2IgPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLl9wZW5kaW5nKSB7XG4gICAgICBlbC5wYXJlbnROb2RlLl9wZW5kaW5nW3Zub2RlLmtleV0gPSBudWxsO1xuICAgIH1cbiAgICBpZiAoZXhwZWN0c0NTUykge1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZVRvQ2xhc3MpO1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICB9XG4gICAgaWYgKGNiLmNhbmNlbGxlZCkge1xuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGxlYXZlQ2FuY2VsbGVkICYmIGxlYXZlQ2FuY2VsbGVkKGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm0oKTtcbiAgICAgIGFmdGVyTGVhdmUgJiYgYWZ0ZXJMZWF2ZShlbCk7XG4gICAgfVxuICAgIGVsLl9sZWF2ZUNiID0gbnVsbDtcbiAgfSk7XG5cbiAgaWYgKGRlbGF5TGVhdmUpIHtcbiAgICBkZWxheUxlYXZlKHBlcmZvcm1MZWF2ZSk7XG4gIH0gZWxzZSB7XG4gICAgcGVyZm9ybUxlYXZlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwZXJmb3JtTGVhdmUgKCkge1xuICAgIC8vIHRoZSBkZWxheWVkIGxlYXZlIG1heSBoYXZlIGFscmVhZHkgYmVlbiBjYW5jZWxsZWRcbiAgICBpZiAoY2IuY2FuY2VsbGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gcmVjb3JkIGxlYXZpbmcgZWxlbWVudFxuICAgIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XG4gICAgICAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyB8fCAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyA9IHt9KSlbKHZub2RlLmtleSldID0gdm5vZGU7XG4gICAgfVxuICAgIGJlZm9yZUxlYXZlICYmIGJlZm9yZUxlYXZlKGVsKTtcbiAgICBpZiAoZXhwZWN0c0NTUykge1xuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVBY3RpdmVDbGFzcyk7XG4gICAgICBuZXh0RnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlVG9DbGFzcyk7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVDbGFzcyk7XG4gICAgICAgIGlmICghY2IuY2FuY2VsbGVkICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgICAgICAgaWYgKGlzVmFsaWREdXJhdGlvbihleHBsaWNpdExlYXZlRHVyYXRpb24pKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNiLCBleHBsaWNpdExlYXZlRHVyYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGVuVHJhbnNpdGlvbkVuZHMoZWwsIHR5cGUsIGNiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBsZWF2ZSAmJiBsZWF2ZShlbCwgY2IpO1xuICAgIGlmICghZXhwZWN0c0NTUyAmJiAhdXNlcldhbnRzQ29udHJvbCkge1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gb25seSB1c2VkIGluIGRldiBtb2RlXG5mdW5jdGlvbiBjaGVja0R1cmF0aW9uICh2YWwsIG5hbWUsIHZub2RlKSB7XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnbnVtYmVyJykge1xuICAgIHdhcm4oXG4gICAgICBcIjx0cmFuc2l0aW9uPiBleHBsaWNpdCBcIiArIG5hbWUgKyBcIiBkdXJhdGlvbiBpcyBub3QgYSB2YWxpZCBudW1iZXIgLSBcIiArXG4gICAgICBcImdvdCBcIiArIChKU09OLnN0cmluZ2lmeSh2YWwpKSArIFwiLlwiLFxuICAgICAgdm5vZGUuY29udGV4dFxuICAgICk7XG4gIH0gZWxzZSBpZiAoaXNOYU4odmFsKSkge1xuICAgIHdhcm4oXG4gICAgICBcIjx0cmFuc2l0aW9uPiBleHBsaWNpdCBcIiArIG5hbWUgKyBcIiBkdXJhdGlvbiBpcyBOYU4gLSBcIiArXG4gICAgICAndGhlIGR1cmF0aW9uIGV4cHJlc3Npb24gbWlnaHQgYmUgaW5jb3JyZWN0LicsXG4gICAgICB2bm9kZS5jb250ZXh0XG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1ZhbGlkRHVyYXRpb24gKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbClcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgYSB0cmFuc2l0aW9uIGhvb2sncyBhcmd1bWVudCBsZW5ndGguIFRoZSBob29rIG1heSBiZTpcbiAqIC0gYSBtZXJnZWQgaG9vayAoaW52b2tlcikgd2l0aCB0aGUgb3JpZ2luYWwgaW4gLmZuc1xuICogLSBhIHdyYXBwZWQgY29tcG9uZW50IG1ldGhvZCAoY2hlY2sgLl9sZW5ndGgpXG4gKiAtIGEgcGxhaW4gZnVuY3Rpb24gKC5sZW5ndGgpXG4gKi9cbmZ1bmN0aW9uIGdldEhvb2tBcmd1bWVudHNMZW5ndGggKGZuKSB7XG4gIGlmIChpc1VuZGVmKGZuKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHZhciBpbnZva2VyRm5zID0gZm4uZm5zO1xuICBpZiAoaXNEZWYoaW52b2tlckZucykpIHtcbiAgICAvLyBpbnZva2VyXG4gICAgcmV0dXJuIGdldEhvb2tBcmd1bWVudHNMZW5ndGgoXG4gICAgICBBcnJheS5pc0FycmF5KGludm9rZXJGbnMpXG4gICAgICAgID8gaW52b2tlckZuc1swXVxuICAgICAgICA6IGludm9rZXJGbnNcbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChmbi5fbGVuZ3RoIHx8IGZuLmxlbmd0aCkgPiAxXG4gIH1cbn1cblxuZnVuY3Rpb24gX2VudGVyIChfLCB2bm9kZSkge1xuICBpZiAodm5vZGUuZGF0YS5zaG93ICE9PSB0cnVlKSB7XG4gICAgZW50ZXIodm5vZGUpO1xuICB9XG59XG5cbnZhciB0cmFuc2l0aW9uID0gaW5Ccm93c2VyID8ge1xuICBjcmVhdGU6IF9lbnRlcixcbiAgYWN0aXZhdGU6IF9lbnRlcixcbiAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUkJDEgKHZub2RlLCBybSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHZub2RlLmRhdGEuc2hvdyAhPT0gdHJ1ZSkge1xuICAgICAgbGVhdmUodm5vZGUsIHJtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm0oKTtcbiAgICB9XG4gIH1cbn0gOiB7fTtcblxudmFyIHBsYXRmb3JtTW9kdWxlcyA9IFtcbiAgYXR0cnMsXG4gIGtsYXNzLFxuICBldmVudHMsXG4gIGRvbVByb3BzLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvblxuXTtcblxuLyogICovXG5cbi8vIHRoZSBkaXJlY3RpdmUgbW9kdWxlIHNob3VsZCBiZSBhcHBsaWVkIGxhc3QsIGFmdGVyIGFsbFxuLy8gYnVpbHQtaW4gbW9kdWxlcyBoYXZlIGJlZW4gYXBwbGllZC5cbnZhciBtb2R1bGVzID0gcGxhdGZvcm1Nb2R1bGVzLmNvbmNhdChiYXNlTW9kdWxlcyk7XG5cbnZhciBwYXRjaCA9IGNyZWF0ZVBhdGNoRnVuY3Rpb24oeyBub2RlT3BzOiBub2RlT3BzLCBtb2R1bGVzOiBtb2R1bGVzIH0pO1xuXG4vKipcbiAqIE5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBsaWtlIGF0dGFjaGluZ1xuICogcHJvcGVydGllcyB0byBFbGVtZW50cy5cbiAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmIChpc0lFOSkge1xuICAvLyBodHRwOi8vd3d3Lm1hdHRzNDExLmNvbS9wb3N0L2ludGVybmV0LWV4cGxvcmVyLTktb25pbnB1dC9cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGVsICYmIGVsLnZtb2RlbCkge1xuICAgICAgdHJpZ2dlcihlbCwgJ2lucHV0Jyk7XG4gICAgfVxuICB9KTtcbn1cblxudmFyIG1vZGVsJDEgPSB7XG4gIGluc2VydGVkOiBmdW5jdGlvbiBpbnNlcnRlZCAoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgaWYgKHZub2RlLnRhZyA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHZhciBjYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQoZWwsIGJpbmRpbmcsIHZub2RlLmNvbnRleHQpO1xuICAgICAgfTtcbiAgICAgIGNiKCk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChpc0lFIHx8IGlzRWRnZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGNiLCAwKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZub2RlLnRhZyA9PT0gJ3RleHRhcmVhJyB8fCBlbC50eXBlID09PSAndGV4dCcgfHwgZWwudHlwZSA9PT0gJ3Bhc3N3b3JkJykge1xuICAgICAgZWwuX3ZNb2RpZmllcnMgPSBiaW5kaW5nLm1vZGlmaWVycztcbiAgICAgIGlmICghYmluZGluZy5tb2RpZmllcnMubGF6eSkge1xuICAgICAgICAvLyBTYWZhcmkgPCAxMC4yICYgVUlXZWJWaWV3IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCB3aGVuXG4gICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgLy8gdGhpcyBhbHNvIGZpeGVzIHRoZSBpc3N1ZSB3aGVyZSBzb21lIGJyb3dzZXJzIGUuZy4gaU9TIENocm9tZVxuICAgICAgICAvLyBmaXJlcyBcImNoYW5nZVwiIGluc3RlYWQgb2YgXCJpbnB1dFwiIG9uIGF1dG9jb21wbGV0ZS5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25Db21wb3NpdGlvbkVuZCk7XG4gICAgICAgIGlmICghaXNBbmRyb2lkKSB7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25zdGFydCcsIG9uQ29tcG9zaXRpb25TdGFydCk7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25lbmQnLCBvbkNvbXBvc2l0aW9uRW5kKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGlzSUU5KSB7XG4gICAgICAgICAgZWwudm1vZGVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50VXBkYXRlZDogZnVuY3Rpb24gY29tcG9uZW50VXBkYXRlZCAoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgaWYgKHZub2RlLnRhZyA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgIHNldFNlbGVjdGVkKGVsLCBiaW5kaW5nLCB2bm9kZS5jb250ZXh0KTtcbiAgICAgIC8vIGluIGNhc2UgdGhlIG9wdGlvbnMgcmVuZGVyZWQgYnkgdi1mb3IgaGF2ZSBjaGFuZ2VkLFxuICAgICAgLy8gaXQncyBwb3NzaWJsZSB0aGF0IHRoZSB2YWx1ZSBpcyBvdXQtb2Ytc3luYyB3aXRoIHRoZSByZW5kZXJlZCBvcHRpb25zLlxuICAgICAgLy8gZGV0ZWN0IHN1Y2ggY2FzZXMgYW5kIGZpbHRlciBvdXQgdmFsdWVzIHRoYXQgbm8gbG9uZ2VyIGhhcyBhIG1hdGNoaW5nXG4gICAgICAvLyBvcHRpb24gaW4gdGhlIERPTS5cbiAgICAgIHZhciBuZWVkUmVzZXQgPSBlbC5tdWx0aXBsZVxuICAgICAgICA/IGJpbmRpbmcudmFsdWUuc29tZShmdW5jdGlvbiAodikgeyByZXR1cm4gaGFzTm9NYXRjaGluZ09wdGlvbih2LCBlbC5vcHRpb25zKTsgfSlcbiAgICAgICAgOiBiaW5kaW5nLnZhbHVlICE9PSBiaW5kaW5nLm9sZFZhbHVlICYmIGhhc05vTWF0Y2hpbmdPcHRpb24oYmluZGluZy52YWx1ZSwgZWwub3B0aW9ucyk7XG4gICAgICBpZiAobmVlZFJlc2V0KSB7XG4gICAgICAgIHRyaWdnZXIoZWwsICdjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHNldFNlbGVjdGVkIChlbCwgYmluZGluZywgdm0pIHtcbiAgdmFyIHZhbHVlID0gYmluZGluZy52YWx1ZTtcbiAgdmFyIGlzTXVsdGlwbGUgPSBlbC5tdWx0aXBsZTtcbiAgaWYgKGlzTXVsdGlwbGUgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgXCI8c2VsZWN0IG11bHRpcGxlIHYtbW9kZWw9XFxcIlwiICsgKGJpbmRpbmcuZXhwcmVzc2lvbikgKyBcIlxcXCI+IFwiICtcbiAgICAgIFwiZXhwZWN0cyBhbiBBcnJheSB2YWx1ZSBmb3IgaXRzIGJpbmRpbmcsIGJ1dCBnb3QgXCIgKyAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5zbGljZSg4LCAtMSkpLFxuICAgICAgdm1cbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIHZhciBzZWxlY3RlZCwgb3B0aW9uO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgb3B0aW9uID0gZWwub3B0aW9uc1tpXTtcbiAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgc2VsZWN0ZWQgPSBsb29zZUluZGV4T2YodmFsdWUsIGdldFZhbHVlKG9wdGlvbikpID4gLTE7XG4gICAgICBpZiAob3B0aW9uLnNlbGVjdGVkICE9PSBzZWxlY3RlZCkge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGxvb3NlRXF1YWwoZ2V0VmFsdWUob3B0aW9uKSwgdmFsdWUpKSB7XG4gICAgICAgIGlmIChlbC5zZWxlY3RlZEluZGV4ICE9PSBpKSB7XG4gICAgICAgICAgZWwuc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICghaXNNdWx0aXBsZSkge1xuICAgIGVsLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNOb01hdGNoaW5nT3B0aW9uICh2YWx1ZSwgb3B0aW9ucykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IG9wdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGxvb3NlRXF1YWwoZ2V0VmFsdWUob3B0aW9uc1tpXSksIHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlIChvcHRpb24pIHtcbiAgcmV0dXJuICdfdmFsdWUnIGluIG9wdGlvblxuICAgID8gb3B0aW9uLl92YWx1ZVxuICAgIDogb3B0aW9uLnZhbHVlXG59XG5cbmZ1bmN0aW9uIG9uQ29tcG9zaXRpb25TdGFydCAoZSkge1xuICBlLnRhcmdldC5jb21wb3NpbmcgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBvbkNvbXBvc2l0aW9uRW5kIChlKSB7XG4gIGUudGFyZ2V0LmNvbXBvc2luZyA9IGZhbHNlO1xuICB0cmlnZ2VyKGUudGFyZ2V0LCAnaW5wdXQnKTtcbn1cblxuZnVuY3Rpb24gdHJpZ2dlciAoZWwsIHR5cGUpIHtcbiAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbn1cblxuLyogICovXG5cbi8vIHJlY3Vyc2l2ZWx5IHNlYXJjaCBmb3IgcG9zc2libGUgdHJhbnNpdGlvbiBkZWZpbmVkIGluc2lkZSB0aGUgY29tcG9uZW50IHJvb3RcbmZ1bmN0aW9uIGxvY2F0ZU5vZGUgKHZub2RlKSB7XG4gIHJldHVybiB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSAmJiAoIXZub2RlLmRhdGEgfHwgIXZub2RlLmRhdGEudHJhbnNpdGlvbilcbiAgICA/IGxvY2F0ZU5vZGUodm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlKVxuICAgIDogdm5vZGVcbn1cblxudmFyIHNob3cgPSB7XG4gIGJpbmQ6IGZ1bmN0aW9uIGJpbmQgKGVsLCByZWYsIHZub2RlKSB7XG4gICAgdmFyIHZhbHVlID0gcmVmLnZhbHVlO1xuXG4gICAgdm5vZGUgPSBsb2NhdGVOb2RlKHZub2RlKTtcbiAgICB2YXIgdHJhbnNpdGlvbiA9IHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS50cmFuc2l0aW9uO1xuICAgIHZhciBvcmlnaW5hbERpc3BsYXkgPSBlbC5fX3ZPcmlnaW5hbERpc3BsYXkgPVxuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJycgOiBlbC5zdHlsZS5kaXNwbGF5O1xuICAgIGlmICh2YWx1ZSAmJiB0cmFuc2l0aW9uICYmICFpc0lFOSkge1xuICAgICAgdm5vZGUuZGF0YS5zaG93ID0gdHJ1ZTtcbiAgICAgIGVudGVyKHZub2RlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBvcmlnaW5hbERpc3BsYXk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gb3JpZ2luYWxEaXNwbGF5IDogJ25vbmUnO1xuICAgIH1cbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSAoZWwsIHJlZiwgdm5vZGUpIHtcbiAgICB2YXIgdmFsdWUgPSByZWYudmFsdWU7XG4gICAgdmFyIG9sZFZhbHVlID0gcmVmLm9sZFZhbHVlO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHZhbHVlID09PSBvbGRWYWx1ZSkgeyByZXR1cm4gfVxuICAgIHZub2RlID0gbG9jYXRlTm9kZSh2bm9kZSk7XG4gICAgdmFyIHRyYW5zaXRpb24gPSB2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEudHJhbnNpdGlvbjtcbiAgICBpZiAodHJhbnNpdGlvbiAmJiAhaXNJRTkpIHtcbiAgICAgIHZub2RlLmRhdGEuc2hvdyA9IHRydWU7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZW50ZXIodm5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZWwuX192T3JpZ2luYWxEaXNwbGF5O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYXZlKHZub2RlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/IGVsLl9fdk9yaWdpbmFsRGlzcGxheSA6ICdub25lJztcbiAgICB9XG4gIH0sXG5cbiAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQgKFxuICAgIGVsLFxuICAgIGJpbmRpbmcsXG4gICAgdm5vZGUsXG4gICAgb2xkVm5vZGUsXG4gICAgaXNEZXN0cm95XG4gICkge1xuICAgIGlmICghaXNEZXN0cm95KSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZWwuX192T3JpZ2luYWxEaXNwbGF5O1xuICAgIH1cbiAgfVxufTtcblxudmFyIHBsYXRmb3JtRGlyZWN0aXZlcyA9IHtcbiAgbW9kZWw6IG1vZGVsJDEsXG4gIHNob3c6IHNob3dcbn07XG5cbi8qICAqL1xuXG4vLyBQcm92aWRlcyB0cmFuc2l0aW9uIHN1cHBvcnQgZm9yIGEgc2luZ2xlIGVsZW1lbnQvY29tcG9uZW50LlxuLy8gc3VwcG9ydHMgdHJhbnNpdGlvbiBtb2RlIChvdXQtaW4gLyBpbi1vdXQpXG5cbnZhciB0cmFuc2l0aW9uUHJvcHMgPSB7XG4gIG5hbWU6IFN0cmluZyxcbiAgYXBwZWFyOiBCb29sZWFuLFxuICBjc3M6IEJvb2xlYW4sXG4gIG1vZGU6IFN0cmluZyxcbiAgdHlwZTogU3RyaW5nLFxuICBlbnRlckNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlQ2xhc3M6IFN0cmluZyxcbiAgZW50ZXJUb0NsYXNzOiBTdHJpbmcsXG4gIGxlYXZlVG9DbGFzczogU3RyaW5nLFxuICBlbnRlckFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIGxlYXZlQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgYXBwZWFyVG9DbGFzczogU3RyaW5nLFxuICBkdXJhdGlvbjogW051bWJlciwgU3RyaW5nLCBPYmplY3RdXG59O1xuXG4vLyBpbiBjYXNlIHRoZSBjaGlsZCBpcyBhbHNvIGFuIGFic3RyYWN0IGNvbXBvbmVudCwgZS5nLiA8a2VlcC1hbGl2ZT5cbi8vIHdlIHdhbnQgdG8gcmVjdXJzaXZlbHkgcmV0cmlldmUgdGhlIHJlYWwgY29tcG9uZW50IHRvIGJlIHJlbmRlcmVkXG5mdW5jdGlvbiBnZXRSZWFsQ2hpbGQgKHZub2RlKSB7XG4gIHZhciBjb21wT3B0aW9ucyA9IHZub2RlICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gIGlmIChjb21wT3B0aW9ucyAmJiBjb21wT3B0aW9ucy5DdG9yLm9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICByZXR1cm4gZ2V0UmVhbENoaWxkKGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoY29tcE9wdGlvbnMuY2hpbGRyZW4pKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB2bm9kZVxuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RUcmFuc2l0aW9uRGF0YSAoY29tcCkge1xuICB2YXIgZGF0YSA9IHt9O1xuICB2YXIgb3B0aW9ucyA9IGNvbXAuJG9wdGlvbnM7XG4gIC8vIHByb3BzXG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLnByb3BzRGF0YSkge1xuICAgIGRhdGFba2V5XSA9IGNvbXBba2V5XTtcbiAgfVxuICAvLyBldmVudHMuXG4gIC8vIGV4dHJhY3QgbGlzdGVuZXJzIGFuZCBwYXNzIHRoZW0gZGlyZWN0bHkgdG8gdGhlIHRyYW5zaXRpb24gbWV0aG9kc1xuICB2YXIgbGlzdGVuZXJzID0gb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICBmb3IgKHZhciBrZXkkMSBpbiBsaXN0ZW5lcnMpIHtcbiAgICBkYXRhW2NhbWVsaXplKGtleSQxKV0gPSBsaXN0ZW5lcnNba2V5JDFdO1xuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIHBsYWNlaG9sZGVyIChoLCByYXdDaGlsZCkge1xuICBpZiAoL1xcZC1rZWVwLWFsaXZlJC8udGVzdChyYXdDaGlsZC50YWcpKSB7XG4gICAgcmV0dXJuIGgoJ2tlZXAtYWxpdmUnLCB7XG4gICAgICBwcm9wczogcmF3Q2hpbGQuY29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGFcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhc1BhcmVudFRyYW5zaXRpb24gKHZub2RlKSB7XG4gIHdoaWxlICgodm5vZGUgPSB2bm9kZS5wYXJlbnQpKSB7XG4gICAgaWYgKHZub2RlLmRhdGEudHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTYW1lQ2hpbGQgKGNoaWxkLCBvbGRDaGlsZCkge1xuICByZXR1cm4gb2xkQ2hpbGQua2V5ID09PSBjaGlsZC5rZXkgJiYgb2xkQ2hpbGQudGFnID09PSBjaGlsZC50YWdcbn1cblxudmFyIFRyYW5zaXRpb24gPSB7XG4gIG5hbWU6ICd0cmFuc2l0aW9uJyxcbiAgcHJvcHM6IHRyYW5zaXRpb25Qcm9wcyxcbiAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIgKGgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQ7XG4gICAgaWYgKCFjaGlsZHJlbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIG91dCB0ZXh0IG5vZGVzIChwb3NzaWJsZSB3aGl0ZXNwYWNlcylcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy50YWc7IH0pO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyB3YXJuIG11bHRpcGxlIGVsZW1lbnRzXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgd2FybihcbiAgICAgICAgJzx0cmFuc2l0aW9uPiBjYW4gb25seSBiZSB1c2VkIG9uIGEgc2luZ2xlIGVsZW1lbnQuIFVzZSAnICtcbiAgICAgICAgJzx0cmFuc2l0aW9uLWdyb3VwPiBmb3IgbGlzdHMuJyxcbiAgICAgICAgdGhpcy4kcGFyZW50XG4gICAgICApO1xuICAgIH1cblxuICAgIHZhciBtb2RlID0gdGhpcy5tb2RlO1xuXG4gICAgLy8gd2FybiBpbnZhbGlkIG1vZGVcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICAgICBtb2RlICYmIG1vZGUgIT09ICdpbi1vdXQnICYmIG1vZGUgIT09ICdvdXQtaW4nKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnaW52YWxpZCA8dHJhbnNpdGlvbj4gbW9kZTogJyArIG1vZGUsXG4gICAgICAgIHRoaXMuJHBhcmVudFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgcmF3Q2hpbGQgPSBjaGlsZHJlblswXTtcblxuICAgIC8vIGlmIHRoaXMgaXMgYSBjb21wb25lbnQgcm9vdCBub2RlIGFuZCB0aGUgY29tcG9uZW50J3NcbiAgICAvLyBwYXJlbnQgY29udGFpbmVyIG5vZGUgYWxzbyBoYXMgdHJhbnNpdGlvbiwgc2tpcC5cbiAgICBpZiAoaGFzUGFyZW50VHJhbnNpdGlvbih0aGlzLiR2bm9kZSkpIHtcbiAgICAgIHJldHVybiByYXdDaGlsZFxuICAgIH1cblxuICAgIC8vIGFwcGx5IHRyYW5zaXRpb24gZGF0YSB0byBjaGlsZFxuICAgIC8vIHVzZSBnZXRSZWFsQ2hpbGQoKSB0byBpZ25vcmUgYWJzdHJhY3QgY29tcG9uZW50cyBlLmcuIGtlZXAtYWxpdmVcbiAgICB2YXIgY2hpbGQgPSBnZXRSZWFsQ2hpbGQocmF3Q2hpbGQpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghY2hpbGQpIHtcbiAgICAgIHJldHVybiByYXdDaGlsZFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9sZWF2aW5nKSB7XG4gICAgICByZXR1cm4gcGxhY2Vob2xkZXIoaCwgcmF3Q2hpbGQpXG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIGEga2V5IHRoYXQgaXMgdW5pcXVlIHRvIHRoZSB2bm9kZSB0eXBlIGFuZCB0byB0aGlzIHRyYW5zaXRpb25cbiAgICAvLyBjb21wb25lbnQgaW5zdGFuY2UuIFRoaXMga2V5IHdpbGwgYmUgdXNlZCB0byByZW1vdmUgcGVuZGluZyBsZWF2aW5nIG5vZGVzXG4gICAgLy8gZHVyaW5nIGVudGVyaW5nLlxuICAgIHZhciBpZCA9IFwiX190cmFuc2l0aW9uLVwiICsgKHRoaXMuX3VpZCkgKyBcIi1cIjtcbiAgICBjaGlsZC5rZXkgPSBjaGlsZC5rZXkgPT0gbnVsbFxuICAgICAgPyBpZCArIGNoaWxkLnRhZ1xuICAgICAgOiBpc1ByaW1pdGl2ZShjaGlsZC5rZXkpXG4gICAgICAgID8gKFN0cmluZyhjaGlsZC5rZXkpLmluZGV4T2YoaWQpID09PSAwID8gY2hpbGQua2V5IDogaWQgKyBjaGlsZC5rZXkpXG4gICAgICAgIDogY2hpbGQua2V5O1xuXG4gICAgdmFyIGRhdGEgPSAoY2hpbGQuZGF0YSB8fCAoY2hpbGQuZGF0YSA9IHt9KSkudHJhbnNpdGlvbiA9IGV4dHJhY3RUcmFuc2l0aW9uRGF0YSh0aGlzKTtcbiAgICB2YXIgb2xkUmF3Q2hpbGQgPSB0aGlzLl92bm9kZTtcbiAgICB2YXIgb2xkQ2hpbGQgPSBnZXRSZWFsQ2hpbGQob2xkUmF3Q2hpbGQpO1xuXG4gICAgLy8gbWFyayB2LXNob3dcbiAgICAvLyBzbyB0aGF0IHRoZSB0cmFuc2l0aW9uIG1vZHVsZSBjYW4gaGFuZCBvdmVyIHRoZSBjb250cm9sIHRvIHRoZSBkaXJlY3RpdmVcbiAgICBpZiAoY2hpbGQuZGF0YS5kaXJlY3RpdmVzICYmIGNoaWxkLmRhdGEuZGlyZWN0aXZlcy5zb21lKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLm5hbWUgPT09ICdzaG93JzsgfSkpIHtcbiAgICAgIGNoaWxkLmRhdGEuc2hvdyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG9sZENoaWxkICYmIG9sZENoaWxkLmRhdGEgJiYgIWlzU2FtZUNoaWxkKGNoaWxkLCBvbGRDaGlsZCkpIHtcbiAgICAgIC8vIHJlcGxhY2Ugb2xkIGNoaWxkIHRyYW5zaXRpb24gZGF0YSB3aXRoIGZyZXNoIG9uZVxuICAgICAgLy8gaW1wb3J0YW50IGZvciBkeW5hbWljIHRyYW5zaXRpb25zIVxuICAgICAgdmFyIG9sZERhdGEgPSBvbGRDaGlsZCAmJiAob2xkQ2hpbGQuZGF0YS50cmFuc2l0aW9uID0gZXh0ZW5kKHt9LCBkYXRhKSk7XG4gICAgICAvLyBoYW5kbGUgdHJhbnNpdGlvbiBtb2RlXG4gICAgICBpZiAobW9kZSA9PT0gJ291dC1pbicpIHtcbiAgICAgICAgLy8gcmV0dXJuIHBsYWNlaG9sZGVyIG5vZGUgYW5kIHF1ZXVlIHVwZGF0ZSB3aGVuIGxlYXZlIGZpbmlzaGVzXG4gICAgICAgIHRoaXMuX2xlYXZpbmcgPSB0cnVlO1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhvbGREYXRhLCAnYWZ0ZXJMZWF2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzJDEuX2xlYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzJDEuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXIoaCwgcmF3Q2hpbGQpXG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdpbi1vdXQnKSB7XG4gICAgICAgIHZhciBkZWxheWVkTGVhdmU7XG4gICAgICAgIHZhciBwZXJmb3JtTGVhdmUgPSBmdW5jdGlvbiAoKSB7IGRlbGF5ZWRMZWF2ZSgpOyB9O1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhkYXRhLCAnYWZ0ZXJFbnRlcicsIHBlcmZvcm1MZWF2ZSk7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKGRhdGEsICdlbnRlckNhbmNlbGxlZCcsIHBlcmZvcm1MZWF2ZSk7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKG9sZERhdGEsICdkZWxheUxlYXZlJywgZnVuY3Rpb24gKGxlYXZlKSB7IGRlbGF5ZWRMZWF2ZSA9IGxlYXZlOyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmF3Q2hpbGRcbiAgfVxufTtcblxuLyogICovXG5cbi8vIFByb3ZpZGVzIHRyYW5zaXRpb24gc3VwcG9ydCBmb3IgbGlzdCBpdGVtcy5cbi8vIHN1cHBvcnRzIG1vdmUgdHJhbnNpdGlvbnMgdXNpbmcgdGhlIEZMSVAgdGVjaG5pcXVlLlxuXG4vLyBCZWNhdXNlIHRoZSB2ZG9tJ3MgY2hpbGRyZW4gdXBkYXRlIGFsZ29yaXRobSBpcyBcInVuc3RhYmxlXCIgLSBpLmUuXG4vLyBpdCBkb2Vzbid0IGd1YXJhbnRlZSB0aGUgcmVsYXRpdmUgcG9zaXRpb25pbmcgb2YgcmVtb3ZlZCBlbGVtZW50cyxcbi8vIHdlIGZvcmNlIHRyYW5zaXRpb24tZ3JvdXAgdG8gdXBkYXRlIGl0cyBjaGlsZHJlbiBpbnRvIHR3byBwYXNzZXM6XG4vLyBpbiB0aGUgZmlyc3QgcGFzcywgd2UgcmVtb3ZlIGFsbCBub2RlcyB0aGF0IG5lZWQgdG8gYmUgcmVtb3ZlZCxcbi8vIHRyaWdnZXJpbmcgdGhlaXIgbGVhdmluZyB0cmFuc2l0aW9uOyBpbiB0aGUgc2Vjb25kIHBhc3MsIHdlIGluc2VydC9tb3ZlXG4vLyBpbnRvIHRoZSBmaW5hbCBkZXNpcmVkIHN0YXRlLiBUaGlzIHdheSBpbiB0aGUgc2Vjb25kIHBhc3MgcmVtb3ZlZFxuLy8gbm9kZXMgd2lsbCByZW1haW4gd2hlcmUgdGhleSBzaG91bGQgYmUuXG5cbnZhciBwcm9wcyA9IGV4dGVuZCh7XG4gIHRhZzogU3RyaW5nLFxuICBtb3ZlQ2xhc3M6IFN0cmluZ1xufSwgdHJhbnNpdGlvblByb3BzKTtcblxuZGVsZXRlIHByb3BzLm1vZGU7XG5cbnZhciBUcmFuc2l0aW9uR3JvdXAgPSB7XG4gIHByb3BzOiBwcm9wcyxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCkge1xuICAgIHZhciB0YWcgPSB0aGlzLnRhZyB8fCB0aGlzLiR2bm9kZS5kYXRhLnRhZyB8fCAnc3Bhbic7XG4gICAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMucHJldkNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcbiAgICB2YXIgcmF3Q2hpbGRyZW4gPSB0aGlzLiRzbG90cy5kZWZhdWx0IHx8IFtdO1xuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB2YXIgdHJhbnNpdGlvbkRhdGEgPSBleHRyYWN0VHJhbnNpdGlvbkRhdGEodGhpcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHJhd0NoaWxkcmVuW2ldO1xuICAgICAgaWYgKGMudGFnKSB7XG4gICAgICAgIGlmIChjLmtleSAhPSBudWxsICYmIFN0cmluZyhjLmtleSkuaW5kZXhPZignX192bGlzdCcpICE9PSAwKSB7XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChjKTtcbiAgICAgICAgICBtYXBbYy5rZXldID0gY1xuICAgICAgICAgIDsoYy5kYXRhIHx8IChjLmRhdGEgPSB7fSkpLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRGF0YTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSBjLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgICAgICAgdmFyIG5hbWUgPSBvcHRzID8gKG9wdHMuQ3Rvci5vcHRpb25zLm5hbWUgfHwgb3B0cy50YWcgfHwgJycpIDogYy50YWc7XG4gICAgICAgICAgd2FybigoXCI8dHJhbnNpdGlvbi1ncm91cD4gY2hpbGRyZW4gbXVzdCBiZSBrZXllZDogPFwiICsgbmFtZSArIFwiPlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJldkNoaWxkcmVuKSB7XG4gICAgICB2YXIga2VwdCA9IFtdO1xuICAgICAgdmFyIHJlbW92ZWQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IHByZXZDaGlsZHJlbi5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgIHZhciBjJDEgPSBwcmV2Q2hpbGRyZW5baSQxXTtcbiAgICAgICAgYyQxLmRhdGEudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25EYXRhO1xuICAgICAgICBjJDEuZGF0YS5wb3MgPSBjJDEuZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAobWFwW2MkMS5rZXldKSB7XG4gICAgICAgICAga2VwdC5wdXNoKGMkMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVtb3ZlZC5wdXNoKGMkMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMua2VwdCA9IGgodGFnLCBudWxsLCBrZXB0KTtcbiAgICAgIHRoaXMucmVtb3ZlZCA9IHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGgodGFnLCBudWxsLCBjaGlsZHJlbilcbiAgfSxcblxuICBiZWZvcmVVcGRhdGU6IGZ1bmN0aW9uIGJlZm9yZVVwZGF0ZSAoKSB7XG4gICAgLy8gZm9yY2UgcmVtb3ZpbmcgcGFzc1xuICAgIHRoaXMuX19wYXRjaF9fKFxuICAgICAgdGhpcy5fdm5vZGUsXG4gICAgICB0aGlzLmtlcHQsXG4gICAgICBmYWxzZSwgLy8gaHlkcmF0aW5nXG4gICAgICB0cnVlIC8vIHJlbW92ZU9ubHkgKCFpbXBvcnRhbnQsIGF2b2lkcyB1bm5lY2Vzc2FyeSBtb3ZlcylcbiAgICApO1xuICAgIHRoaXMuX3Zub2RlID0gdGhpcy5rZXB0O1xuICB9LFxuXG4gIHVwZGF0ZWQ6IGZ1bmN0aW9uIHVwZGF0ZWQgKCkge1xuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJldkNoaWxkcmVuO1xuICAgIHZhciBtb3ZlQ2xhc3MgPSB0aGlzLm1vdmVDbGFzcyB8fCAoKHRoaXMubmFtZSB8fCAndicpICsgJy1tb3ZlJyk7XG4gICAgaWYgKCFjaGlsZHJlbi5sZW5ndGggfHwgIXRoaXMuaGFzTW92ZShjaGlsZHJlblswXS5lbG0sIG1vdmVDbGFzcykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHdlIGRpdmlkZSB0aGUgd29yayBpbnRvIHRocmVlIGxvb3BzIHRvIGF2b2lkIG1peGluZyBET00gcmVhZHMgYW5kIHdyaXRlc1xuICAgIC8vIGluIGVhY2ggaXRlcmF0aW9uIC0gd2hpY2ggaGVscHMgcHJldmVudCBsYXlvdXQgdGhyYXNoaW5nLlxuICAgIGNoaWxkcmVuLmZvckVhY2goY2FsbFBlbmRpbmdDYnMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2gocmVjb3JkUG9zaXRpb24pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goYXBwbHlUcmFuc2xhdGlvbik7XG5cbiAgICAvLyBmb3JjZSByZWZsb3cgdG8gcHV0IGV2ZXJ5dGhpbmcgaW4gcG9zaXRpb25cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgdmFyIGYgPSBib2R5Lm9mZnNldEhlaWdodDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgaWYgKGMuZGF0YS5tb3ZlZCkge1xuICAgICAgICB2YXIgZWwgPSBjLmVsbTtcbiAgICAgICAgdmFyIHMgPSBlbC5zdHlsZTtcbiAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBtb3ZlQ2xhc3MpO1xuICAgICAgICBzLnRyYW5zZm9ybSA9IHMuV2Via2l0VHJhbnNmb3JtID0gcy50cmFuc2l0aW9uRHVyYXRpb24gPSAnJztcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kRXZlbnQsIGVsLl9tb3ZlQ2IgPSBmdW5jdGlvbiBjYiAoZSkge1xuICAgICAgICAgIGlmICghZSB8fCAvdHJhbnNmb3JtJC8udGVzdChlLnByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkVuZEV2ZW50LCBjYik7XG4gICAgICAgICAgICBlbC5fbW92ZUNiID0gbnVsbDtcbiAgICAgICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbW92ZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBoYXNNb3ZlOiBmdW5jdGlvbiBoYXNNb3ZlIChlbCwgbW92ZUNsYXNzKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghaGFzVHJhbnNpdGlvbikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9oYXNNb3ZlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc01vdmVcbiAgICAgIH1cbiAgICAgIC8vIERldGVjdCB3aGV0aGVyIGFuIGVsZW1lbnQgd2l0aCB0aGUgbW92ZSBjbGFzcyBhcHBsaWVkIGhhc1xuICAgICAgLy8gQ1NTIHRyYW5zaXRpb25zLiBTaW5jZSB0aGUgZWxlbWVudCBtYXkgYmUgaW5zaWRlIGFuIGVudGVyaW5nXG4gICAgICAvLyB0cmFuc2l0aW9uIGF0IHRoaXMgdmVyeSBtb21lbnQsIHdlIG1ha2UgYSBjbG9uZSBvZiBpdCBhbmQgcmVtb3ZlXG4gICAgICAvLyBhbGwgb3RoZXIgdHJhbnNpdGlvbiBjbGFzc2VzIGFwcGxpZWQgdG8gZW5zdXJlIG9ubHkgdGhlIG1vdmUgY2xhc3NcbiAgICAgIC8vIGlzIGFwcGxpZWQuXG4gICAgICB2YXIgY2xvbmUgPSBlbC5jbG9uZU5vZGUoKTtcbiAgICAgIGlmIChlbC5fdHJhbnNpdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgZWwuX3RyYW5zaXRpb25DbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNscykgeyByZW1vdmVDbGFzcyhjbG9uZSwgY2xzKTsgfSk7XG4gICAgICB9XG4gICAgICBhZGRDbGFzcyhjbG9uZSwgbW92ZUNsYXNzKTtcbiAgICAgIGNsb25lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLiRlbC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICB2YXIgaW5mbyA9IGdldFRyYW5zaXRpb25JbmZvKGNsb25lKTtcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgIHJldHVybiAodGhpcy5faGFzTW92ZSA9IGluZm8uaGFzVHJhbnNmb3JtKVxuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY2FsbFBlbmRpbmdDYnMgKGMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChjLmVsbS5fbW92ZUNiKSB7XG4gICAgYy5lbG0uX21vdmVDYigpO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoYy5lbG0uX2VudGVyQ2IpIHtcbiAgICBjLmVsbS5fZW50ZXJDYigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlY29yZFBvc2l0aW9uIChjKSB7XG4gIGMuZGF0YS5uZXdQb3MgPSBjLmVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlUcmFuc2xhdGlvbiAoYykge1xuICB2YXIgb2xkUG9zID0gYy5kYXRhLnBvcztcbiAgdmFyIG5ld1BvcyA9IGMuZGF0YS5uZXdQb3M7XG4gIHZhciBkeCA9IG9sZFBvcy5sZWZ0IC0gbmV3UG9zLmxlZnQ7XG4gIHZhciBkeSA9IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wO1xuICBpZiAoZHggfHwgZHkpIHtcbiAgICBjLmRhdGEubW92ZWQgPSB0cnVlO1xuICAgIHZhciBzID0gYy5lbG0uc3R5bGU7XG4gICAgcy50cmFuc2Zvcm0gPSBzLldlYmtpdFRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgZHggKyBcInB4LFwiICsgZHkgKyBcInB4KVwiO1xuICAgIHMudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBzJztcbiAgfVxufVxuXG52YXIgcGxhdGZvcm1Db21wb25lbnRzID0ge1xuICBUcmFuc2l0aW9uOiBUcmFuc2l0aW9uLFxuICBUcmFuc2l0aW9uR3JvdXA6IFRyYW5zaXRpb25Hcm91cFxufTtcblxuLyogICovXG5cbi8vIGluc3RhbGwgcGxhdGZvcm0gc3BlY2lmaWMgdXRpbHNcblZ1ZSQzLmNvbmZpZy5tdXN0VXNlUHJvcCA9IG11c3RVc2VQcm9wO1xuVnVlJDMuY29uZmlnLmlzUmVzZXJ2ZWRUYWcgPSBpc1Jlc2VydmVkVGFnO1xuVnVlJDMuY29uZmlnLmlzUmVzZXJ2ZWRBdHRyID0gaXNSZXNlcnZlZEF0dHI7XG5WdWUkMy5jb25maWcuZ2V0VGFnTmFtZXNwYWNlID0gZ2V0VGFnTmFtZXNwYWNlO1xuVnVlJDMuY29uZmlnLmlzVW5rbm93bkVsZW1lbnQgPSBpc1Vua25vd25FbGVtZW50O1xuXG4vLyBpbnN0YWxsIHBsYXRmb3JtIHJ1bnRpbWUgZGlyZWN0aXZlcyAmIGNvbXBvbmVudHNcbmV4dGVuZChWdWUkMy5vcHRpb25zLmRpcmVjdGl2ZXMsIHBsYXRmb3JtRGlyZWN0aXZlcyk7XG5leHRlbmQoVnVlJDMub3B0aW9ucy5jb21wb25lbnRzLCBwbGF0Zm9ybUNvbXBvbmVudHMpO1xuXG4vLyBpbnN0YWxsIHBsYXRmb3JtIHBhdGNoIGZ1bmN0aW9uXG5WdWUkMy5wcm90b3R5cGUuX19wYXRjaF9fID0gaW5Ccm93c2VyID8gcGF0Y2ggOiBub29wO1xuXG4vLyBwdWJsaWMgbW91bnQgbWV0aG9kXG5WdWUkMy5wcm90b3R5cGUuJG1vdW50ID0gZnVuY3Rpb24gKFxuICBlbCxcbiAgaHlkcmF0aW5nXG4pIHtcbiAgZWwgPSBlbCAmJiBpbkJyb3dzZXIgPyBxdWVyeShlbCkgOiB1bmRlZmluZWQ7XG4gIHJldHVybiBtb3VudENvbXBvbmVudCh0aGlzLCBlbCwgaHlkcmF0aW5nKVxufTtcblxuLy8gZGV2dG9vbHMgZ2xvYmFsIGhvb2tcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgaWYgKGNvbmZpZy5kZXZ0b29scykge1xuICAgIGlmIChkZXZ0b29scykge1xuICAgICAgZGV2dG9vbHMuZW1pdCgnaW5pdCcsIFZ1ZSQzKTtcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaXNDaHJvbWUpIHtcbiAgICAgIGNvbnNvbGVbY29uc29sZS5pbmZvID8gJ2luZm8nIDogJ2xvZyddKFxuICAgICAgICAnRG93bmxvYWQgdGhlIFZ1ZSBEZXZ0b29scyBleHRlbnNpb24gZm9yIGEgYmV0dGVyIGRldmVsb3BtZW50IGV4cGVyaWVuY2U6XFxuJyArXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlLWRldnRvb2xzJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAgIGNvbmZpZy5wcm9kdWN0aW9uVGlwICE9PSBmYWxzZSAmJlxuICAgICAgaW5Ccm93c2VyICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGVbY29uc29sZS5pbmZvID8gJ2luZm8nIDogJ2xvZyddKFxuICAgICAgXCJZb3UgYXJlIHJ1bm5pbmcgVnVlIGluIGRldmVsb3BtZW50IG1vZGUuXFxuXCIgK1xuICAgICAgXCJNYWtlIHN1cmUgdG8gdHVybiBvbiBwcm9kdWN0aW9uIG1vZGUgd2hlbiBkZXBsb3lpbmcgZm9yIHByb2R1Y3Rpb24uXFxuXCIgK1xuICAgICAgXCJTZWUgbW9yZSB0aXBzIGF0IGh0dHBzOi8vdnVlanMub3JnL2d1aWRlL2RlcGxveW1lbnQuaHRtbFwiXG4gICAgKTtcbiAgfVxufSwgMCk7XG5cbi8qICAqL1xuXG5leHBvcnQgZGVmYXVsdCBWdWUkMztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdnVlL2Rpc3QvdnVlLnJ1bnRpbWUuZXNtLmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuaW1wb3J0IHsgc2V0QmVmb3JlRWFjaEZ1bmN0aW9ucywgcmVtb3ZlQ29tcG9uZW50IH0gZnJvbSAnLi9zZXR1cCc7XG5cbmJlZm9yZUVhY2goc2V0QmVmb3JlRWFjaEZ1bmN0aW9ucyk7XG5hZnRlckVhY2gocmVtb3ZlQ29tcG9uZW50KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=