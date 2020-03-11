// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
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
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
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
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
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
 * Check whether an object has the property.
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

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
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
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


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
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
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
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
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


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

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
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
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
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
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


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
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

  generateComponentTrace = function (vm) {
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


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
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

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
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
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
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
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
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


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
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


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
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
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
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
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
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

if ("development" !== 'production') {
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
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
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

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
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

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
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
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
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

  var assets = options[type]; // check local registration variations first

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
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
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

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
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
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
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
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
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

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
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
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
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
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
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
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
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

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
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

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
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
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
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

      if ("development" !== 'production') {
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
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
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
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
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
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
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


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
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


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
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
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
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
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
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
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("development" !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
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

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
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
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


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

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

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
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
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
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
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

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
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
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
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
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
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
    activateChildComponent(queue[i], true
    /* true */
    );
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

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

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

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
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
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
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

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

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
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
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

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
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
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
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
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
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

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
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

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
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

  if ("development" !== 'production') {
    dataDef.set = function () {
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

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


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

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

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
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

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
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
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

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

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
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
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

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
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
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.11';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
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
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
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

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
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
  } // false or null will remove the attribute but undefined will not


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

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
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
  setStyleScope: setStyleScope
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

  if (!isDef(key)) {
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
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
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
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
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
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
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

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
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
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

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
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
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
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
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
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
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

  function removeVnodes(vnodes, startIdx, endIdx) {
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
      } // recursively invoke hooks on child component root node


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
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

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
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
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

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
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
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
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
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
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
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
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
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
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
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


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
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
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
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
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

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


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

/*  */

/*  */

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
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
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
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


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

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
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

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
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

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
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
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
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

var whitespaceRE = /\s+/;
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
      cls.split(whitespaceRE).forEach(function (c) {
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
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
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
var ANIMATION = 'animation'; // Transition property/event sniffing

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
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
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

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
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
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
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
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

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
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
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

  if ("development" !== 'production' && explicitEnterDuration != null) {
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
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
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
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
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

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
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
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


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
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
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

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
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
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

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
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
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

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
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
  model: directive,
  show: show
};
/*  */

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
}; // in case the child is also an abstract component, e.g. <keep-alive>
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
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
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

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
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

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
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
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
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
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

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
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
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

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      // prevent record.options._Ctor from being overwritten accidentally
      newCtor.options._Ctor = record.options._Ctor
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"src/components/Navbar/Navbar.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'Navbar'
};
exports.default = _default;
        var $bdb837 = exports.default || module.exports;
      
      if (typeof $bdb837 === 'function') {
        $bdb837 = $bdb837.options;
      }
    
        /* template */
        Object.assign($bdb837, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ui inverted menu", attrs: { id: "navbar" } },
    [
      _c(
        "div",
        { staticClass: "left menu" },
        [
          _c(
            "sui-button",
            {
              staticStyle: { background: "none" },
              attrs: { animated: "vertical" }
            },
            [
              _c(
                "sui-button-content",
                { staticStyle: { color: "green" }, attrs: { hidden: "" } },
                [_vm._v("Create")]
              ),
              _vm._v(" "),
              _c(
                "sui-button-content",
                { attrs: { visible: "" } },
                [
                  _c("sui-icon", {
                    staticStyle: { background: "none" },
                    attrs: { name: "pencil alternate", color: "green" }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "right menu" },
        [
          _c(
            "sui-button",
            {
              staticStyle: { background: "none" },
              attrs: { animated: "vertical" }
            },
            [
              _c(
                "sui-button-content",
                { staticStyle: { color: "red" }, attrs: { hidden: "" } },
                [_vm._v("Logout")]
              ),
              _vm._v(" "),
              _c(
                "sui-button-content",
                { attrs: { visible: "" } },
                [
                  _c("sui-icon", {
                    staticStyle: { background: "none" },
                    attrs: { name: "sign-out", color: "red" }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        staticClass: "header item",
        staticStyle: { "padding-left": "40vw" },
        attrs: { id: "logo" }
      },
      [_c("p", [_vm._v("QanbaN")])]
    )
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$bdb837', $bdb837);
          } else {
            api.reload('$bdb837', $bdb837);
          }
        }

        
      }
    })();
},{"_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/Form/Register.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'Register'
};
exports.default = _default;
        var $2677e1 = exports.default || module.exports;
      
      if (typeof $2677e1 === 'function') {
        $2677e1 = $2677e1.options;
      }
    
        /* template */
        Object.assign($2677e1, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "register" }, [
    _c(
      "div",
      { staticClass: "column" },
      [
        _c(
          "sui-form",
          { staticClass: "ui large form", attrs: { method: "post" } },
          [
            _c("h1", { staticClass: "ui teal header" }, [
              _c("div", { staticClass: "content" }, [
                _vm._v("\n          Register into QanbaN\n        ")
              ])
            ]),
            _vm._v(" "),
            _c("sui-form-field", [
              _c("label", [_vm._v("Username")]),
              _vm._v(" "),
              _c("div", { staticClass: "ui left icon input" }, [
                _c("i", { staticClass: "user icon" }),
                _vm._v(" "),
                _c("input", {
                  attrs: {
                    type: "text",
                    max: "10",
                    name: "username",
                    placeholder: "Username"
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c("sui-form-field", [
              _c("label", [_vm._v("Email")]),
              _vm._v(" "),
              _c("div", { staticClass: "ui left icon input" }, [
                _c("i", { staticClass: "envelope icon" }),
                _vm._v(" "),
                _c("input", {
                  attrs: { type: "email", name: "email", placeholder: "Email" }
                })
              ])
            ]),
            _vm._v(" "),
            _c("sui-form-field", [
              _c("label", [_vm._v("Password")]),
              _vm._v(" "),
              _c("div", { staticClass: "ui left icon input" }, [
                _c("i", { staticClass: "user secret icon" }),
                _vm._v(" "),
                _c("input", {
                  attrs: {
                    type: "password",
                    name: "password",
                    placeholder: "Password"
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "ui fluid large teal submit button",
                attrs: { type: "submit" }
              },
              [_vm._v("Register")]
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$2677e1', $2677e1);
          } else {
            api.reload('$2677e1', $2677e1);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/Form/Login.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'Login'
};
exports.default = _default;
        var $ff193e = exports.default || module.exports;
      
      if (typeof $ff193e === 'function') {
        $ff193e = $ff193e.options;
      }
    
        /* template */
        Object.assign($ff193e, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "login" }, [
    _c(
      "div",
      { staticClass: "column" },
      [
        _c(
          "sui-form",
          { staticClass: "ui large form", attrs: { method: "post" } },
          [
            _c("h1", { staticClass: "ui teal header" }, [
              _c("div", { staticClass: "content" }, [
                _vm._v("\n          Login into QanbaN\n        ")
              ])
            ]),
            _vm._v(" "),
            _c("sui-form-field", [
              _c("label", [_vm._v("Email")]),
              _vm._v(" "),
              _c("div", { staticClass: "ui left icon input" }, [
                _c("i", { staticClass: "envelope icon" }),
                _vm._v(" "),
                _c("input", {
                  attrs: { type: "email", name: "email", placeholder: "Email" }
                })
              ])
            ]),
            _vm._v(" "),
            _c("sui-form-field", [
              _c("label", [_vm._v("Password")]),
              _vm._v(" "),
              _c("div", { staticClass: "ui left icon input" }, [
                _c("i", { staticClass: "user secret icon" }),
                _vm._v(" "),
                _c("input", {
                  attrs: {
                    type: "password",
                    name: "password",
                    placeholder: "Password"
                  }
                })
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "ui fluid large teal submit button",
                attrs: { type: "submit" }
              },
              [_vm._v("Login")]
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$ff193e', $ff193e);
          } else {
            api.reload('$ff193e', $ff193e);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/Card/Card.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'Card',
  data: function data() {
    return {};
  }
};
exports.default = _default;
        var $84b9fe = exports.default || module.exports;
      
      if (typeof $84b9fe === 'function') {
        $84b9fe = $84b9fe.options;
      }
    
        /* template */
        Object.assign($84b9fe, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "home" }, [
    _c("div", { staticClass: "template" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "category" }, [
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore."
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "template" }, [
      _vm._m(1),
      _vm._v(" "),
      _c("div", { staticClass: "category" }, [
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "template" }, [
      _vm._m(2),
      _vm._v(" "),
      _c("div", { staticClass: "category" }, [
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "template" }, [
      _vm._m(3),
      _vm._v(" "),
      _c("div", { staticClass: "category" }, [
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card" },
          [
            _c(
              "sui-card-group",
              [
                _c(
                  "sui-card",
                  [
                    _c(
                      "sui-card-content",
                      { staticStyle: { "font-family": "arial" } },
                      [
                        _c(
                          "sui-card-header",
                          { staticStyle: { "margin-bottom": "2rem" } },
                          [_vm._v("Belajar Vue")]
                        ),
                        _vm._v(" "),
                        _c(
                          "sui-card-description",
                          { staticStyle: { margin: "1rem 0" } },
                          [
                            _vm._v(
                              "\n                lorem  ipsum dolor sit amet, consectetur adipisicing elit. Ducimus animi fugit ipsum autem odit maxime culpa eius, aut porro excepturi vero iste facilis sunt voluptas quasi, pariatur corrupti dolore tempore.\n              "
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "sui-card-content",
                      { attrs: { extra: "" } },
                      [
                        _c(
                          "sui-container",
                          { attrs: { "text-align": "center" } },
                          [
                            _c(
                              "sui-button-group",
                              [
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: { color: "blue", name: "edit" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: {
                                          color: "#2185d0!important"
                                        },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Edit")]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "sui-button",
                                  {
                                    staticStyle: { background: "none" },
                                    attrs: { animated: "" }
                                  },
                                  [
                                    _c(
                                      "sui-button-content",
                                      { attrs: { visible: "" } },
                                      [
                                        _c("sui-icon", {
                                          attrs: {
                                            color: "red",
                                            name: "trash alternate"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "sui-button-content",
                                      {
                                        staticStyle: { color: "red" },
                                        attrs: { hidden: "" }
                                      },
                                      [_vm._v("Delete")]
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [_c("h1", [_vm._v("BACKLOG")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [_c("h1", [_vm._v("TODO")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [_c("h1", [_vm._v("DONE")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title" }, [_c("h1", [_vm._v("COMPLETE")])])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$84b9fe', $84b9fe);
          } else {
            api.reload('$84b9fe', $84b9fe);
          }
        }

        
      }
    })();
},{"_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/Form/Create.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'Create',
  data: function data() {
    return {
      open: false
    };
  },
  methods: {
    toggle: function toggle() {
      this.open = !this.open;
    }
  }
};
exports.default = _default;
        var $84527f = exports.default || module.exports;
      
      if (typeof $84527f === 'function') {
        $84527f = $84527f.options;
      }
    
        /* template */
        Object.assign($84527f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "sui-button",
        {
          nativeOn: {
            click: function($event) {
              return _vm.toggle($event)
            }
          }
        },
        [_vm._v("Show Modal")]
      ),
      _vm._v(" "),
      _c(
        "sui-modal",
        {
          model: {
            value: _vm.open,
            callback: function($$v) {
              _vm.open = $$v
            },
            expression: "open"
          }
        },
        [
          _c("sui-modal-header", { attrs: { id: "modal-header" } }, [
            _c("h1", [_vm._v("Create QanbaN")])
          ]),
          _vm._v(" "),
          _c(
            "sui-modal-content",
            { attrs: { form: "" } },
            [
              _c(
                "sui-form",
                [
                  _c("sui-form-field", [
                    _c("label", [_vm._v("Title")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "ui left icon input" }, [
                      _c("i", { staticClass: "user icon" }),
                      _vm._v(" "),
                      _c("input", {
                        attrs: {
                          type: "text",
                          max: "10",
                          name: "title",
                          placeholder: "Title"
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _c("sui-form-field", [
                    _c("label", [_vm._v("Description")]),
                    _vm._v(" "),
                    _c("textarea", {
                      staticStyle: { resize: "none" },
                      attrs: {
                        type: "text",
                        name: "description",
                        placeholder: "Description"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "ui fluid large teal submit button",
                      attrs: { type: "submit" }
                    },
                    [_vm._v("Submit")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$84527f', $84527f);
          } else {
            api.reload('$84527f', $84527f);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Navbar = _interopRequireDefault(require("./components/Navbar/Navbar"));

var _Register = _interopRequireDefault(require("./components/Form/Register"));

var _Login = _interopRequireDefault(require("./components/Form/Login"));

var _Card = _interopRequireDefault(require("./components/Card/Card"));

var _Create = _interopRequireDefault(require("./components/Form/Create"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'App',
  data: function data() {
    return {};
  },
  components: {
    Navbar: _Navbar.default,
    Register: _Register.default,
    Login: _Login.default,
    Card: _Card.default,
    Create: _Create.default
  }
};
exports.default = _default;
        var $fb5457 = exports.default || module.exports;
      
      if (typeof $fb5457 === 'function') {
        $fb5457 = $fb5457.options;
      }
    
        /* template */
        Object.assign($fb5457, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("nav", [_c("Navbar")], 1), _vm._v(" "), _c("div")])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-fb5457",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$fb5457', $fb5457);
          } else {
            api.reload('$fb5457', $fb5457);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./components/Navbar/Navbar":"src/components/Navbar/Navbar.vue","./components/Form/Register":"src/components/Form/Register.vue","./components/Form/Login":"src/components/Form/Login.vue","./components/Card/Card":"src/components/Card/Card.vue","./components/Form/Create":"src/components/Form/Create.vue","_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/semantic-ui-vue/dist/commonjs/semantic-ui-vue.js":[function(require,module,exports) {
module.exports = function (e) {
  var t = {};

  function i(n) {
    if (t[n]) return t[n].exports;
    var r = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
  }

  return i.m = e, i.c = t, i.d = function (e, t, n) {
    i.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    });
  }, i.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, i.t = function (e, t) {
    if (1 & t && (e = i(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var r in e) i.d(n, r, function (t) {
      return e[t];
    }.bind(null, r));
    return n;
  }, i.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return i.d(t, "a", t), t;
  }, i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, i.p = "/", i(i.s = 1);
}([function (e, t, i) {
  "use strict";

  function n() {
    return (n = Object.assign || function (e) {
      for (var t, i = 1; i < arguments.length; i++) for (var n in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);

      return e;
    }).apply(this, arguments);
  }

  var r = ["attrs", "props", "domProps"],
      s = ["class", "style", "directives"],
      o = ["on", "nativeOn"],
      a = function (e, t) {
    return function () {
      e && e.apply(this, arguments), t && t.apply(this, arguments);
    };
  };

  e.exports = function (e) {
    return e.reduce(function (e, t) {
      for (var i in t) if (e[i]) {
        if (-1 !== r.indexOf(i)) e[i] = n({}, e[i], t[i]);else if (-1 !== s.indexOf(i)) {
          var c = e[i] instanceof Array ? e[i] : [e[i]],
              l = t[i] instanceof Array ? t[i] : [t[i]];
          e[i] = c.concat(l);
        } else if (-1 !== o.indexOf(i)) {
          for (var d in t[i]) if (e[i][d]) {
            var u = e[i][d] instanceof Array ? e[i][d] : [e[i][d]],
                h = t[i][d] instanceof Array ? t[i][d] : [t[i][d]];
            e[i][d] = u.concat(h);
          } else e[i][d] = t[i][d];
        } else if ("hook" == i) for (var p in t[i]) e[i][p] = e[i][p] ? a(e[i][p], t[i][p]) : t[i][p];else e[i] = t[i];
      } else e[i] = t[i];

      return e;
    }, {});
  };
}, function (e, t, i) {
  "use strict";

  i.r(t);
  var n = {};
  i.r(n), i.d(n, "Breadcrumb", function () {
    return V;
  }), i.d(n, "BreadcrumbDivider", function () {
    return M;
  }), i.d(n, "BreadcrumbSection", function () {
    return I;
  }), i.d(n, "Form", function () {
    return G;
  }), i.d(n, "FormField", function () {
    return q;
  }), i.d(n, "FormFields", function () {
    return _;
  }), i.d(n, "Grid", function () {
    return W;
  }), i.d(n, "GridColumn", function () {
    return U;
  }), i.d(n, "GridRow", function () {
    return Q;
  }), i.d(n, "Menu", function () {
    return ee;
  }), i.d(n, "MenuHeader", function () {
    return te;
  }), i.d(n, "MenuItem", function () {
    return K;
  }), i.d(n, "MenuMenu", function () {
    return ie;
  }), i.d(n, "Message", function () {
    return ae;
  }), i.d(n, "MessageContent", function () {
    return ne;
  }), i.d(n, "MessageHeader", function () {
    return re;
  }), i.d(n, "MessageItem", function () {
    return se;
  }), i.d(n, "MessageList", function () {
    return oe;
  }), i.d(n, "Table", function () {
    return ce;
  }), i.d(n, "TableBody", function () {
    return le;
  }), i.d(n, "TableCell", function () {
    return de;
  }), i.d(n, "TableFooter", function () {
    return ue;
  }), i.d(n, "TableHeader", function () {
    return he;
  }), i.d(n, "TableHeaderCell", function () {
    return pe;
  }), i.d(n, "TableRow", function () {
    return me;
  });
  var r = {};
  i.r(r), i.d(r, "floated", function () {
    return fe;
  });
  var s = {};
  i.r(s), i.d(s, "Button", function () {
    return ge;
  }), i.d(s, "ButtonContent", function () {
    return be;
  }), i.d(s, "ButtonGroup", function () {
    return ye;
  }), i.d(s, "ButtonOr", function () {
    return Ae;
  }), i.d(s, "Container", function () {
    return Oe;
  }), i.d(s, "Divider", function () {
    return xe;
  }), i.d(s, "Flag", function () {
    return Pe;
  }), i.d(s, "Header", function () {
    return Be;
  }), i.d(s, "HeaderContent", function () {
    return Ce;
  }), i.d(s, "HeaderSubheader", function () {
    return je;
  }), i.d(s, "Icon", function () {
    return Y;
  }), i.d(s, "IconGroup", function () {
    return Ee;
  }), i.d(s, "Image", function () {
    return $e;
  }), i.d(s, "ImageGroup", function () {
    return Te;
  }), i.d(s, "Input", function () {
    return Ie;
  }), i.d(s, "Label", function () {
    return Me;
  }), i.d(s, "LabelDetail", function () {
    return Fe;
  }), i.d(s, "List", function () {
    return Ge;
  }), i.d(s, "ListContent", function () {
    return He;
  }), i.d(s, "ListDescription", function () {
    return qe;
  }), i.d(s, "ListHeader", function () {
    return _e;
  }), i.d(s, "ListIcon", function () {
    return Ne;
  }), i.d(s, "ListItem", function () {
    return Ve;
  }), i.d(s, "ListList", function () {
    return We;
  }), i.d(s, "Loader", function () {
    return Ue;
  }), i.d(s, "Rail", function () {
    return Qe;
  }), i.d(s, "Reveal", function () {
    return Ye;
  }), i.d(s, "RevealContent", function () {
    return Ke;
  }), i.d(s, "Segment", function () {
    return Xe;
  }), i.d(s, "Segments", function () {
    return Je;
  }), i.d(s, "Step", function () {
    return it;
  }), i.d(s, "StepContent", function () {
    return tt;
  }), i.d(s, "StepDescription", function () {
    return Ze;
  }), i.d(s, "StepGroup", function () {
    return ot;
  }), i.d(s, "StepTitle", function () {
    return et;
  });
  var o = {};
  i.r(o), i.d(o, "Accordion", function () {
    return lt;
  }), i.d(o, "AccordionContent", function () {
    return pt;
  }), i.d(o, "AccordionTitle", function () {
    return gt;
  }), i.d(o, "Checkbox", function () {
    return bt;
  }), i.d(o, "Dimmer", function () {
    return yt;
  }), i.d(o, "DimmerDimmable", function () {
    return vt;
  }), i.d(o, "Dropdown", function () {
    return zt;
  }), i.d(o, "DropdownDivider", function () {
    return Rt;
  }), i.d(o, "DropdownHeader", function () {
    return Nt;
  }), i.d(o, "DropdownItem", function () {
    return Ot;
  }), i.d(o, "DropdownMenu", function () {
    return jt;
  }), i.d(o, "Embed", function () {
    return Ht;
  }), i.d(o, "Modal", function () {
    return Yt;
  }), i.d(o, "ModalActions", function () {
    return Kt;
  }), i.d(o, "ModalContent", function () {
    return Xt;
  }), i.d(o, "ModalDescription", function () {
    return Jt;
  }), i.d(o, "ModalHeader", function () {
    return Zt;
  }), i.d(o, "Rating", function () {
    return ni;
  }), i.d(o, "Search", function () {
    return di;
  }), i.d(o, "Sidebar", function () {
    return ui;
  }), i.d(o, "SidebarPushable", function () {
    return hi;
  }), i.d(o, "SidebarPusher", function () {
    return pi;
  }), i.d(o, "Popup", function () {
    return Ai;
  }), i.d(o, "PopupContent", function () {
    return wi;
  }), i.d(o, "PopupHeader", function () {
    return Si;
  }), i.d(o, "Progress", function () {
    return Oi;
  }), i.d(o, "TabPane", function () {
    return Ei;
  }), i.d(o, "Tab", function () {
    return ji;
  });
  var a = {};
  i.r(a), i.d(a, "Card", function () {
    return $i;
  }), i.d(a, "CardContent", function () {
    return Ti;
  }), i.d(a, "CardDescription", function () {
    return ki;
  }), i.d(a, "CardGroup", function () {
    return Li;
  }), i.d(a, "CardHeader", function () {
    return Di;
  }), i.d(a, "CardMeta", function () {
    return Ii;
  }), i.d(a, "Comment", function () {
    return Mi;
  }), i.d(a, "CommentAction", function () {
    return Fi;
  }), i.d(a, "CommentActions", function () {
    return zi;
  }), i.d(a, "CommentAuthor", function () {
    return Ri;
  }), i.d(a, "CommentAvatar", function () {
    return Ni;
  }), i.d(a, "CommentContent", function () {
    return Hi;
  }), i.d(a, "CommentGroup", function () {
    return Vi;
  }), i.d(a, "CommentMetadata", function () {
    return Gi;
  }), i.d(a, "CommentText", function () {
    return qi;
  }), i.d(a, "Feed", function () {
    return Yi;
  }), i.d(a, "FeedContent", function () {
    return Ki;
  }), i.d(a, "FeedDate", function () {
    return Xi;
  }), i.d(a, "FeedEvent", function () {
    return _i;
  }), i.d(a, "FeedExtra", function () {
    return Ji;
  }), i.d(a, "FeedLabel", function () {
    return Zi;
  }), i.d(a, "FeedLike", function () {
    return en;
  }), i.d(a, "FeedMeta", function () {
    return tn;
  }), i.d(a, "FeedSummary", function () {
    return nn;
  }), i.d(a, "FeedUser", function () {
    return rn;
  }), i.d(a, "Item", function () {
    return sn;
  }), i.d(a, "ItemGroup", function () {
    return on;
  }), i.d(a, "ItemContent", function () {
    return an;
  }), i.d(a, "ItemImage", function () {
    return cn;
  }), i.d(a, "ItemHeader", function () {
    return ln;
  }), i.d(a, "ItemMeta", function () {
    return dn;
  }), i.d(a, "ItemDescription", function () {
    return un;
  }), i.d(a, "ItemExtra", function () {
    return hn;
  }), i.d(a, "Statistic", function () {
    return pn;
  }), i.d(a, "StatisticValue", function () {
    return mn;
  }), i.d(a, "StatisticLabel", function () {
    return fn;
  }), i.d(a, "StatisticGroup", function () {
    return gn;
  }), i.d(a, "Advertisement", function () {
    return bn;
  });
  var c = i(0),
      l = i.n(c);

  function d(e) {
    return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  var u = "object" === ("undefined" == typeof document ? "undefined" : d(document)) && null !== document,
      h = "object" === ("undefined" == typeof window ? "undefined" : d(window)) && null !== window && window.self === window,
      p = u && h;

  function m(e) {
    return e.match(/[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g);
  }

  function f(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }

  function g(e) {
    return m(e).reduce(function (e, t) {
      var i = t.toLowerCase();
      return e + (e ? f(i) : i);
    }, "");
  }

  function b(e) {
    return m(e).map(function (e) {
      return e.toLowerCase();
    }).join("-");
  }

  function y(e) {
    return e.filter(function (t, i) {
      return e.indexOf(t) === i;
    });
  }

  function v(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function S(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function w(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
      var i = [],
          n = !0,
          r = !1,
          s = void 0;

      try {
        for (var o, a = e[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value), !t || i.length !== t); n = !0);
      } catch (e) {
        r = !0, s = e;
      } finally {
        try {
          n || null == a.return || a.return();
        } finally {
          if (r) throw s;
        }
      }

      return i;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  function A(e) {
    return (A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function O(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
      var i = [],
          n = !0,
          r = !1,
          s = void 0;

      try {
        for (var o, a = e[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value), !t || i.length !== t); n = !0);
      } catch (e) {
        r = !0, s = e;
      } finally {
        try {
          n || null == a.return || a.return();
        } finally {
          if (r) throw s;
        }
      }

      return i;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  function x(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function P(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function B(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
      var i = [],
          n = !0,
          r = !1,
          s = void 0;

      try {
        for (var o, a = e[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value), !t || i.length !== t); n = !0);
      } catch (e) {
        r = !0, s = e;
      } finally {
        try {
          n || null == a.return || a.return();
        } finally {
          if (r) throw s;
        }
      }

      return i;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  var C = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"],
      j = {
    methods: {
      num: function (e) {
        return "number" == typeof e ? C[e - 1] : e;
      },
      classes: function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];

        return t.filter(function (e) {
          return e && !0 !== e;
        }).join(" ");
      },
      getElementType: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
            t = this.$vnode && this.$vnode.data.tag;
        if (!t || "component" === t) return e;
        var i = this.$vnode.context,
            n = Object.entries(i.$options.components || {}).find(function (e) {
          return b(B(e, 1)[0]) === t;
        });
        return n ? n[1] : t;
      },
      getChildProps: function () {
        if (!this.$vnode || !this.$vnode.data.attrs) return {};
        var e,
            t = this.getElementType();

        if ("string" == typeof t) {
          var i,
              n = this.$options.components,
              r = n[t] || n[i = g(t)] || n[f(i)];
          if (!r) return {};
          e = r.options.props;
        } else {
          if ("object" !== A(t)) return {};
          e = t.props;
        }

        return Object.entries(this.$vnode.data.attrs).filter(function (t) {
          return g(w(t, 1)[0]) in e;
        }).map(function (t) {
          var i = w(t, 2),
              n = i[0],
              r = i[1],
              s = g(n);
          return e[s].type === Boolean ? !1 === r ? [s, !1] : [s, !0] : [s, r];
        }).reduce(function (e, t) {
          var i = w(t, 2);
          return function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var i = null != arguments[t] ? arguments[t] : {};
              t % 2 ? v(Object(i), !0).forEach(function (t) {
                S(e, t, i[t]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : v(Object(i)).forEach(function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
              });
            }

            return e;
          }({}, e, S({}, i[0], i[1]));
        }, {});
      },
      getChildListeners: function () {
        var e = function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {};
            t % 2 ? x(Object(i), !0).forEach(function (t) {
              P(e, t, i[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : x(Object(i)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
            });
          }

          return e;
        }({}, this.$listeners);

        return Object.entries(this.$options.events || {}).forEach(function (t) {
          var i = O(t, 2),
              n = i[0];
          i[1].custom && delete e[n];
        }), e;
      },
      getChildPropsAndListeners: function () {
        var e = this.getChildProps();
        return {
          props: e,
          attrs: e,
          on: this.getChildListeners()
        };
      }
    }
  },
      E = {
    methods: {
      getUIClass: function () {
        var e = this.constructor.options && this.constructor.options.name,
            t = this.$parent && this.$parent.constructor.options && this.$parent.constructor.options.name;
        return e && t && t.match(new RegExp("^".concat(e, ".*Group$"))) ? "" : "ui";
      },
      getParentName: function () {
        return this.$parent && this.$parent.constructor.options && this.$parent.constructor.options.name || "";
      }
    }
  },
      $ = function () {
    return window && window.webkitAnimationEnd ? "webkitAnimationEnd" : "animationend";
  };

  function T(e) {
    return e && ("justify" === e ? "justified" : "".concat(e, " aligned"));
  }

  function k(e) {
    return e && "".concat(e, " flipped");
  }

  function L(e) {
    return e && "".concat(e, " rotated");
  }

  function D(e) {
    return e && "".concat(e, " corner");
  }

  var I = {
    name: "SuiBreadcrumbSection",
    mixins: [j],
    props: {
      active: Boolean,
      link: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType(this.link ? "a" : "div");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.active && "active", this.link && "link", "section")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiBreadcrumb"
    }
  },
      M = {
    name: "SuiBreadcrumbDivider",
    mixins: [j],
    props: {
      icon: String
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType(this.icon ? "i" : "div");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.icon, this.icon && "icon", "divider")
      }]), [!this.icon && (this.$slots.default || "/")]);
    },
    meta: {
      parent: "SuiBreadcrumb"
    }
  };

  function F(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function z(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? F(Object(i), !0).forEach(function (t) {
        R(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : F(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function R(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function N(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];

        return i;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  function H() {
    var e,
        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = N(t);
    Array.isArray(i.choices) && n.push.apply(n, N(i.choices));
    var r = y(t.map(function (e) {
      return e.constructor;
    }));
    return i.type ? Array.isArray(i.type) ? (i.type.includes(Boolean) && n.unshift(!0), e = y([].concat(N(i.type), N(r)))) : (i.type === Boolean && n.unshift(!0), e = y([i.type].concat(N(r)))) : e = 1 === r.length ? r[0] : r, z({}, i, {
      choices: n,
      type: e,
      validator: function (e) {
        return !r.includes(e.constructor) || n.includes(e);
      }
    });
  }

  Object.defineProperty(H, "Extend", {
    value: function (e) {
      return function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return H(e, t);
      };
    }
  }), H.State = H.Extend(["active", "disabled", "error", "warning", "success"]), H.Size = H.Extend(["mini", "tiny", "small", "standard", "medium", "large", "big", "huge", "massive"]), H.Color = H.Extend(["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"]), H.Attached = H.Extend(["top", "bottom"]), H.TextAlign = H.Extend(["left", "right", "center", "justified"]), H.VerticalAlign = H.Extend(["top", "middle", "bottom"]), H.Social = H.Extend(["facebook", "twitter", "google", "google plus", "vk", "instagram", "linkedin", "youtube"]), H.Number = H.Extend([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"]), H.Padded = H.Extend(["very"]), H.Emphasis = H.Extend(["secondary", "tertiary"]), H.Floated = H.Extend(["right", "left"]), H.Direction = H.Extend(["horizontally", "vertically"]), H.RotateDirection = H.Extend(["clockwise", "counterclockwise"]), H.Corner = H.Extend(["top left", "top right", "bottom left", "bottom right"]);
  var V = {
    name: "SuiBreadcrumb",
    components: {
      SuiBreadcrumbDivider: M,
      SuiBreadcrumbSection: I
    },
    mixins: [j],
    props: {
      icon: String,
      sections: Array,
      size: H.Size()
    },
    render: function () {
      var e = this,
          t = arguments[0],
          i = this.getElementType();
      return t(i, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.size, "breadcrumb")
      }]), [this.$slots.default || this.sections.map(function (i, n) {
        var r = i.active,
            s = i.content,
            o = i.key,
            a = i.link,
            c = t(I, {
          key: o,
          attrs: {
            active: r,
            link: a
          }
        }, [s]);
        return 0 === n ? c : [" ", t(M, {
          attrs: {
            icon: e.icon
          }
        }), " ", c];
      })]);
    }
  },
      G = {
    name: "SuiForm",
    mixins: [j],
    props: {
      size: H.Size({
        description: "A form can vary in size."
      }),
      loading: {
        type: Boolean,
        description: "If a form is in loading state, it will automatically show a loading indicator."
      },
      success: {
        type: Boolean,
        description: "Automatically show any success Message children."
      },
      warning: {
        type: Boolean,
        description: "Automatically show any warning Message children."
      },
      error: {
        type: Boolean,
        description: "Automatically show any error Message children."
      },
      state: H(["success", "warning", "error", "loading"], {
        description: "You can set the state of form using one variable"
      }),
      inverted: {
        type: Boolean,
        description: "A form can have its color inverted for contrast."
      },
      equalWidth: {
        type: Boolean,
        description: "Forms can automatically divide fields to be equal width."
      },
      unstackable: {
        type: Boolean,
        description: "A form can prevent itself from stacking on mobile."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("form");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.unstackable && "unstackable", this.equalWidth && "equal width", this.inverted && "inverted", this.size, this.loading && "loading", "form", this.success && "success", this.warning && "warning", this.error && "error", this.state)
      }]), [this.$slots.default]);
    }
  },
      q = {
    name: "SuiFormField",
    mixins: [j],
    props: {
      width: H.Number({
        description: "A field can specify its width in grid columns"
      }),
      inline: {
        type: Boolean,
        description: "A field can have its label next to instead of above it."
      },
      required: {
        type: Boolean,
        description: "A field can show that input is mandatory."
      },
      disabled: {
        type: Boolean,
        description: "Individual fields may be disabled."
      },
      error: {
        type: Boolean,
        description: "Individual fields may display an error state."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.width && "".concat(this.num(this.width), " wide"), this.inline && "inline", this.required && "required", this.disabled && "disabled", "field", this.error && "error")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiForm"
    }
  },
      _ = {
    name: "SuiFormFields",
    mixins: [j],
    props: {
      inline: {
        type: Boolean,
        description: "Multiple fields may be inline in a row."
      },
      equalWidth: {
        type: Boolean,
        description: "Field group can automatically divide fields to be equal width."
      },
      grouped: {
        type: Boolean,
        description: "Fields can show related choices."
      },
      fields: H.Number({
        choices: ["equal"],
        description: "Represents number of fields in group"
      }),
      unstackable: {
        type: Boolean,
        description: "A form group can prevent itself from stacking on mobile."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.unstackable && "unstackable", this.inline && "inline", this.equalWidth && "equal width", this.grouped && "grouped", this.num(this.fields), "fields")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiForm"
    }
  },
      W = {
    name: "SuiGrid",
    mixins: [j],
    description: "A grid is used to harmonize negative space in a layout.",
    props: {
      celled: H(["internally"], {
        type: Boolean,
        description: "A grid can have rows divided into cells."
      }),
      centered: {
        type: Boolean,
        description: "A grid can have its columns centered."
      },
      columns: H.Number({
        choices: ["equal"],
        description: "Represents column count per row in Grid."
      }),
      container: {
        type: Boolean,
        description: "A grid can be combined with a container to use the available layout and alignment."
      },
      divided: H(["vertically"], {
        type: Boolean,
        description: "A grid can have dividers between its columns."
      }),
      doubling: {
        type: Boolean,
        description: "A grid can double its column width on tablet and mobile sizes."
      },
      padded: H(["horizontally", "vertically"], {
        type: Boolean,
        description: "A grid can preserve its vertical and horizontal gutters on first and last columns."
      }),
      relaxed: H(["very"], {
        type: Boolean,
        description: "A grid can increase its gutters to allow for more negative space."
      }),
      reversed: H(["mobile", "tablet", "computer"], {
        description: "A grid can specify that its columns should reverse order at different device types."
      }),
      stackable: {
        type: Boolean,
        description: "A grid can have its columns stack on-top of each other after reaching mobile breakpoints."
      },
      stretched: {
        type: Boolean,
        description: "A grid can stretch its contents to take up the entire grid height."
      },
      textAlign: H.TextAlign({
        description: "A grid can specify its text alignment."
      }),
      verticalAlign: H.VerticalAlign({
        description: "A grid can specify its vertical alignment to have all its columns vertically centered."
      }),
      verticallyReversed: H(["mobile", "tablet", "computer"], {
        description: "A grid can specify that its rows should reverse order at different device types."
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.reversed && "".concat(this.reversed, " reversed"), this.verticallyReversed && "".concat(this.verticallyReversed, " vertically reversed"), this.columns && "".concat(this.num(this.columns), " column"), this.stackable && "stackable", this.stretched && "stretched", this.doubling && "doubling", this.padded, this.padded && "padded", this.verticalAlign, this.verticalAlign && "aligned", T(this.textAlign), this.centered && "centered", this.divided, this.divided && "divided", this.celled, this.celled && "celled", this.relaxed, this.relaxed && "relaxed", "grid", this.container && "container")
      }]), [this.$slots.default]);
    }
  },
      U = {
    name: "SuiGridColumn",
    mixins: [j],
    description: "A column sub-component for Grid.",
    props: {
      color: H.Color({
        description: "A grid column can be colored."
      }),
      centered: Boolean,
      width: H.Number({
        description: "Represents width of column."
      }),
      mobile: H.Number({
        description: "A column can specify a width for a mobile device."
      }),
      tablet: H.Number({
        description: "A column can specify a width for a tablet device."
      }),
      computer: H.Number({
        description: "A column can specify a width for a computer."
      }),
      largeScreen: H.Number({
        description: "A column can specify a width for a large screen device."
      }),
      widescreen: H.Number({
        description: "A column can specify a width for a widescreen device."
      }),
      floated: H(["left", "right"], {
        description: "A column can sit flush against the left or right edge of a row."
      }),
      textAlign: H.TextAlign({
        description: "A column can specify its text alignment."
      }),
      verticalAlign: H.VerticalAlign({
        description: "A column can specify its vertical alignment to have all its columns vertically centered."
      }),
      only: H(["mobile", "tablet", "computer", "widescreen", "large screen"], {
        description: "A column can appear only for a specific device, or screen sizes."
      }),
      stretched: {
        type: Boolean,
        description: "A column can stretch its contents to take up the entire grid or row height."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.floated && "".concat(this.floated, " floated"), T(this.textAlign), this.verticalAlign && "".concat(this.verticalAlign, " aligned"), this.width && "".concat(this.num(this.width), " wide"), this.mobile && "".concat(this.num(this.mobile), " wide mobile"), this.tablet && "".concat(this.num(this.tablet), " wide tablet"), this.computer && "".concat(this.num(this.computer), " wide computer"), this.widescreen && "".concat(this.num(this.widescreen), " wide widescreen"), this.largeScreen && "".concat(this.num(this.largeScreen), " wide large screen"), this.only && "".concat(this.only, " only"), this.centered && "centered", this.stretched && "stretched", this.color, "column")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiGrid"
    }
  },
      Q = {
    name: "SuiGridRow",
    mixins: [j],
    description: "A row sub-component for Grid",
    props: {
      columns: H.Number({
        description: "Represents column count per line in Row."
      }),
      centered: {
        type: Boolean,
        description: "A row can have its columns centered."
      },
      only: H(["mobile", "tablet", "computer", "widescreen", "large screen"], {
        description: "A row can appear only for a specific device, or screen sizes."
      }),
      divided: {
        type: Boolean,
        description: "A row can have dividers between its columns."
      },
      color: H.Color({
        description: "A grid row can be colored."
      }),
      reversed: H(["mobile", "tablet", "computer"], {
        description: "A row can specify that its columns should reverse order at different device types."
      }),
      stretched: {
        type: Boolean,
        description: "A row can stretch its contents to take up the entire column height."
      },
      textAlign: H.TextAlign({
        description: "A row can specify its text alignment."
      }),
      verticalAlign: H.VerticalAlign({
        description: "A row can specify its vertical alignment to have all its columns vertically centered."
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.reversed && "".concat(this.reversed, " reversed"), this.only && "".concat(this.only, " only"), this.divided && "divided", T(this.textAlign), this.verticalAlign && "".concat(this.verticalAlign, " aligned"), this.centered && "centered", this.stretched && "stretched", this.color, this.columns && "".concat(this.num(this.columns), " column"), "row")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiGrid"
    }
  },
      Y = {
    name: "SuiIcon",
    mixins: [j],
    props: {
      bordered: {
        type: Boolean,
        description: "Add squared border to icon."
      },
      circular: {
        type: Boolean,
        description: "Add circular border to icon."
      },
      color: H.Color({
        description: "Icon color."
      }),
      corner: H.Corner({
        type: [Boolean, String],
        description: "Align icon to corner"
      }),
      disabled: {
        type: Boolean,
        description: 'Reducing icon opacity to create "disabled icon" effect.'
      },
      fitted: {
        type: Boolean,
        description: "Remove margin from icon"
      },
      flipped: H.Direction({
        description: "Icon flip direction."
      }),
      inverted: {
        type: Boolean,
        description: "Add black background to icon, also change icon color to contrasted variant."
      },
      link: {
        type: Boolean,
        description: "Add hover animation to icon."
      },
      loading: {
        type: Boolean,
        description: "Add rotate animation to icon."
      },
      name: {
        type: String,
        required: !0,
        description: "Icon name."
      },
      outline: {
        type: Boolean,
        description: "Set font-family icon to outlined"
      },
      rotated: H.RotateDirection({
        description: "Icon rotate direction."
      }),
      size: H.Size({
        description: "Icon size."
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("i");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(k(this.flipped), L(this.rotated), this.bordered && "bordered", this.circular && "circular", this.inverted && "inverted", D(this.corner), this.color, this.name, this.size, this.disabled && "disabled", this.fitted && "fitted", this.link && "link", this.loading && "loading", this.outline && "outline", "icon")
      }]));
    }
  },
      K = {
    name: "SuiMenuItem",
    mixins: [j],
    props: {
      active: {
        type: Boolean,
        description: "A menu item can be active."
      },
      color: H.Color({
        description: "Additional colors can be specified."
      }),
      content: {
        type: String,
        description: "Shorthand for primary content."
      },
      header: {
        type: Boolean,
        description: "A menu item may include a header or may itself be a header."
      },
      icon: {
        type: [Boolean, String],
        description: "MenuItem can be only icon."
      },
      link: {
        type: Boolean,
        description: "A menu item can be link."
      },
      position: H(["left", "right"], {
        description: "A menu item can take left or right position."
      }),
      disabled: {
        type: Boolean,
        description: "A menu item can be disabled."
      },
      fitted: H(["horizontally", "vertically"], {
        type: Boolean,
        description: "A menu item or menu can remove element padding, vertically or horizontally.."
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType(this.link ? "a" : "div");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.disabled && "disabled", this.active && "active", this.fitted, this.fitted && "fitted", this.header && "header", this.link && "link", this.icon && "icon", this.position, "item")
      }]), ["string" == typeof this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.$slots.default || this.content]);
    },
    meta: {
      parent: "SuiMenu"
    }
  };

  function X(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function J(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? X(Object(i), !0).forEach(function (t) {
        Z(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : X(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function Z(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var ee = {
    name: "SuiMenu",
    components: {
      SuiMenuItem: K
    },
    mixins: [j],
    props: {
      activeIndex: {
        type: Number,
        description: "Index of the currently active item."
      },
      attached: H.Attached({
        type: Boolean,
        description: "A menu may be attached to other content segments."
      }),
      color: H.Color({
        description: "Additional colors can be specified."
      }),
      compact: {
        type: Boolean,
        description: "A menu can take up only the space necessary to fit its content."
      },
      fixed: H(["right", "left", "bottom", "top"], {
        description: "A menu can be fixed to a side of its context.",
        type: Boolean
      }),
      icon: H(["labeled"], {
        type: Boolean,
        description: "A menu may have just icons (bool) or labeled icons"
      }),
      inverted: {
        type: Boolean,
        description: "A menu may have its colors inverted to show greater contrast."
      },
      items: {
        type: Array,
        description: "Shorthand array of props for Menu items."
      },
      floated: H(["right"], {
        type: Boolean,
        description: "A menu can be floated."
      }),
      fluid: {
        type: Boolean,
        default: !1,
        description: "A vertical menu may take the size of its container."
      },
      secondary: {
        type: Boolean,
        description: "A menu can adjust its appearance to de-emphasize its contents."
      },
      pointing: {
        type: Boolean,
        description: "A menu can point to show its relationship to nearby content."
      },
      tabular: H(["right"], {
        type: Boolean,
        description: "A menu can be formatted to show tabs of information"
      }),
      text: {
        type: Boolean,
        description: "A menu can be formatted for text content."
      },
      vertical: {
        type: Boolean,
        description: "A vertical menu displays elements vertically."
      },
      widths: H.Number({
        description: "A menu can have its items divided evenly."
      }),
      borderless: {
        type: Boolean,
        default: !1,
        description: "A menu item or menu can have no borders."
      },
      pagination: {
        type: Boolean,
        description: "A pagination menu is specially formatted to present links to pages of content."
      }
    },
    render: function () {
      var e = this,
          t = arguments[0],
          i = this.getElementType();
      return t(i, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.attached && "".concat(this.attached, " attached"), this.vertical && "vertical", this.fluid && "fluid", this.compact && "compact", this.fixed && "".concat(this.fixed, " fixed"), this.text && "text", this.icon, this.icon && "icon", this.inverted && "inverted", this.pagination && "pagination", this.borderless && "borderless", this.floated, this.floated && "floated", this.widths && "".concat(this.num(this.widths), " item"), this.secondary && "secondary", this.pointing && "pointing", this.tabular, this.tabular && "tabular", this.color, "menu")
      }]), [this.$slots.default || this.items && this.items.map(function (i, n) {
        return t(K, {
          props: J({}, i),
          attrs: {
            active: i.active || e.activeIndex === n
          }
        });
      })]);
    }
  },
      te = {
    name: "SuiMenuHeader",
    mixins: [j],
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "header"
      }]), [this.$slots.default || this.content]);
    },
    meta: {
      parent: "SuiMenu"
    }
  },
      ie = {
    name: "SuiMenuMenu",
    mixins: [j],
    props: {
      position: H(["left", "right"], {
        description: "A sub menu can take left or right position"
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.position, "menu")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiMenu"
    }
  },
      ne = {
    name: "SuiMessageContent",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("content")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiMessage"
    }
  },
      re = {
    name: "SuiMessageHeader",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("header")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiMessage"
    }
  },
      se = {
    name: "SuiMessageItem",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType("li");
      return e(t, l()([{}, this.getChildPropsAndListeners()]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiMessage"
    }
  },
      oe = {
    name: "SuiMessageList",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType("ul");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("list")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiMessage"
    }
  },
      ae = {
    name: "SuiMessage",
    components: {
      SuiIcon: Y,
      SuiMessageContent: ne,
      SuiMessageHeader: re,
      SuiMessageItem: se,
      SuiMessageList: oe
    },
    mixins: [j],
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content."
      },
      dismissable: {
        type: Boolean,
        description: "A message can be dismissable"
      },
      header: {
        type: String,
        description: "Shorthand for SuiMessageHeader."
      },
      icon: {
        type: [Boolean, String],
        description: "A message can contain an icon."
      },
      list: {
        type: Array,
        description: "Array shorthand items for the SuiMessageList"
      },
      size: H(["mini", "tiny", "small", "large", "big", "huge", "massive"], {
        description: "A message can have different sizes."
      }),
      attached: H(["bottom", "top"], {
        type: Boolean,
        description: "A message can be formatted to attach itself to other content."
      }),
      color: H.Color({
        description: "A message can be formatted to be different colors."
      }),
      compact: {
        type: Boolean,
        description: "A message can only take up the width of its content."
      },
      floating: {
        type: Boolean,
        description: "A message can float above content that it is related to."
      },
      info: {
        type: Boolean,
        description: "A message may be formatted to display information."
      },
      warning: {
        type: Boolean,
        description: "A message may be formatted to display warning messages."
      },
      error: {
        type: Boolean,
        description: "A message may be formatted to display a negative message. Same as `negative`."
      },
      negative: {
        type: Boolean,
        description: "A message may be formatted to display a negative message. Same as `error`."
      },
      success: {
        type: Boolean,
        description: "A message may be formatted to display a positive message. Same as `positive`."
      },
      positive: {
        type: Boolean,
        description: "A message may be formatted to display a positive message. Same as `success`."
      },
      hidden: {
        type: Boolean,
        description: "A message can be hidden."
      },
      visible: {
        type: Boolean,
        description: "A message can be set to visible to force itself to be shown."
      }
    },
    events: {
      dismiss: {
        custom: !0
      }
    },
    methods: {
      handleDismiss: function () {
        this.$emit("dismiss");
      }
    },
    render: function () {
      var e = arguments[0],
          t = [this.header && e(re, [this.header]), this.content, this.$slots.default, this.list && e(oe, [this.list.map(function (t) {
        return e(se, [t]);
      })])],
          i = this.getElementType();
      return e(i, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.color, this.size, this.floating && "floating", this.info && "info", this.warning && "warning", this.success && "success", this.positive && "positive", this.error && "error", this.negative && "negative", this.attached, this.attached && "attached", this.icon && "icon", this.compact && "compact", this.hidden && "hidden", this.visible && "visible", "message")
      }]), [this.dismissable && e(Y, {
        attrs: {
          name: "close"
        },
        nativeOn: {
          click: this.handleDismiss
        }
      }), "string" == typeof this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), !this.icon && t]);
    }
  },
      ce = {
    name: "SuiTable",
    mixins: [j],
    description: "A table displays a collections of data grouped into rows.",
    props: {
      basic: H(["very"], {
        type: Boolean,
        description: "A table can reduce its complexity to increase readability."
      }),
      celled: Boolean,
      padded: H(["very"], {
        type: Boolean
      }),
      collapsing: Boolean,
      compact: H(["very"], {
        type: Boolean,
        description: "A table may sometimes need to be more compact to make more rows visible at a time."
      }),
      definition: Boolean,
      striped: Boolean,
      textAlign: H(["left", "right", "center"]),
      fixed: Boolean,
      unstackable: Boolean,
      stackable: Boolean,
      selectable: Boolean,
      inverted: Boolean,
      color: H.Color(),
      size: H(["small", "large"]),
      singleLine: Boolean,
      columns: H.Number()
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("table");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.textAlign, this.textAlign && "aligned", this.basic, this.basic && "basic", this.celled && "celled", this.padded, this.padded && "padded", this.collapsing && "collapsing", this.compact, this.compact && "compact", this.definition && "definition", this.striped && "striped", this.fixed && "fixed", this.unstackable && "unstackable", this.stackable && "tablet stackable", this.selectable && "selectable", this.inverted && "inverted", this.color, this.size, this.singleLine && "single line", this.columns && "".concat(this.num(this.columns), " column"), "table")
      }]), [this.$slots.default]);
    }
  },
      le = {
    name: "SuiTableBody",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType("tbody");
      return e(t, l()([{}, this.getChildPropsAndListeners()]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiTable"
    }
  },
      de = {
    name: "SuiTableCell",
    mixins: [j],
    props: {
      negative: Boolean,
      positive: Boolean,
      selected: Boolean,
      textAlign: H(["left", "right", "center"]),
      warning: Boolean,
      singleLine: Boolean,
      collapsing: Boolean,
      disabled: Boolean,
      selectable: Boolean,
      width: H.Number(),
      state: H.State(),
      verticalAlign: H.VerticalAlign()
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("td");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.textAlign && "".concat(this.textAlign, " aligned"), this.verticalAlign && "".concat(this.verticalAlign, " aligned"), this.negative && "negative", this.positive && "positive", this.warning && "warning", this.singleLine && "single line", this.collapsing && "collapsing", this.disabled && "disabled", this.selectable && "selectable", this.width && "".concat(this.num(this.width), " wide"), this.state)
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiTable"
    }
  },
      ue = {
    name: "SuiTableFooter",
    mixins: [j],
    props: {
      fullWidth: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("tfoot");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.fullWidth && "full-width")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiTable"
    }
  },
      he = {
    name: "SuiTableHeader",
    mixins: [j],
    props: {
      fullWidth: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("thead");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.fullWidth && "full-width")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiTable"
    }
  },
      pe = {
    name: "SuiTableHeaderCell",
    mixins: [j],
    props: {
      negative: Boolean,
      positive: Boolean,
      selected: Boolean,
      textAlign: H(["left", "right", "center"]),
      warning: Boolean,
      singleLine: Boolean,
      collapsing: Boolean,
      disabled: Boolean,
      selectable: Boolean,
      width: H.Number(),
      verticalAlign: H.VerticalAlign()
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("th");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.textAlign && "".concat(this.textAlign, " aligned"), this.verticalAlign && "".concat(this.verticalAlign, " aligned"), this.negative && "negative", this.positive && "positive", this.warning && "warning", this.singleLine && "single line", this.collapsing && "collapsing", this.disabled && "disabled", this.selectable && "selectable", this.width && "".concat(this.num(this.width), " wide"))
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiTable"
    }
  },
      me = {
    name: "SuiTableRow",
    mixins: [j],
    props: {
      active: {
        description: "A row can be active or selected by a user.",
        type: Boolean
      },
      disabled: {
        description: "A row can be disabled.",
        type: Boolean
      },
      error: {
        description: "A row may call attention to an error or a negative value.",
        type: Boolean
      },
      negative: {
        description: "A row may let a user know whether a value is bad.",
        type: Boolean
      },
      positive: {
        description: "A row may let a user know whether a value is good.",
        type: Boolean
      },
      selected: {
        description: "DEPRECATED A row can be active or selected by a user.",
        type: Boolean
      },
      state: H.State({
        description: "DEPRECATED"
      }),
      textAlign: H(["left", "right", "center"], {
        description: "A table row can adjust its text alignment."
      }),
      verticalAlign: H.VerticalAlign({
        description: "A row may warn a user."
      }),
      warning: {
        description: "A row may warn a user.",
        type: Boolean
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("tr");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.textAlign && "".concat(this.textAlign, " aligned"), this.verticalAlign && "".concat(this.verticalAlign, " aligned"), this.disabled && "disabled", this.error && "error", this.negative && "negative", this.positive && "positive", (this.selected || this.active) && "active", this.warning && "warning", this.state)
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiTable"
    }
  };

  function fe(e, t) {
    var i = t.arg;
    e.classList.remove("left"), e.classList.remove("right"), e.classList.remove("floated"), e.classList.add(i), e.classList.add("floated");
  }

  var ge = {
    name: "SuiButton",
    description: "A button indicates a possible user action",
    mixins: [j],
    props: {
      active: {
        type: Boolean,
        description: "A button can show it is currently the active user selection."
      },
      animated: H(["fade", "vertical"], {
        type: Boolean,
        description: "A button can animate to show hidden content."
      }),
      attached: H(["left", "right", "top", "bottom"], {
        description: "A button can be attached to the top or bottom of other content."
      }),
      basic: {
        type: Boolean,
        description: "A basic button is less pronounced."
      },
      circular: {
        type: Boolean,
        description: "A button can be circular."
      },
      className: {
        type: String,
        description: "Additional classes."
      },
      color: H.Color(),
      compact: {
        type: Boolean,
        description: "A button can reduce its padding to fit into tighter spaces."
      },
      content: {
        type: String,
        description: "Shorthand for primary content."
      },
      disabled: {
        type: Boolean,
        description: "A button can show it is currently unable to be interacted with."
      },
      floated: H(["left", "right"], {
        description: "A button can be aligned to the left or right of its container."
      }),
      fluid: {
        type: Boolean,
        description: "A button can take the width of its container."
      },
      icon: [Boolean, String],
      inverted: {
        type: Boolean,
        description: "A button can be formatted to appear on dark backgrounds."
      },
      labelPosition: H(["left", "right"], {
        description: "A labeled button can format a Label or Icon to appear on the left or right."
      }),
      loading: {
        type: Boolean,
        description: "A button can show a loading indicator."
      },
      negative: {
        type: Boolean,
        description: "A button can hint towards a negative consequence."
      },
      positive: {
        type: Boolean,
        description: "A button can hint towards a positive consequence."
      },
      primary: {
        type: Boolean,
        description: "A button can be formatted to show different levels of emphasis."
      },
      secondary: {
        type: Boolean,
        description: "A button can be formatted to show different levels of emphasis."
      },
      size: H.Size(),
      tabIndex: {
        type: [Number, String],
        description: "A button can receive focus."
      },
      toggle: {
        type: Boolean,
        description: "A button can be formatted to toggle on and off."
      },
      social: H.Social()
    },
    meta: {
      events: {
        click: {
          description: "Click event passed to the button.",
          value: "Event"
        }
      },
      slots: {
        default: {
          description: "Primary content."
        }
      }
    },
    computed: {
      hasIconClass: function () {
        return !!this.icon && ("string" != typeof this.icon || !(this.content || this.$slots.default));
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("button"),
          i = this.$slots.label,
          n = this.classes("ui", this.active && "active", this.attached && "".concat(this.attached, " attached"), this.animated, this.animated && "animated", this.basic && "basic", this.circular && "circular", this.className, this.color, this.compact && "compact", this.disabled && "disabled", this.floated && "".concat(this.floated, " floated"), this.fluid && "fluid", this.hasIconClass && "icon", !i && this.icon && this.labelPosition && "icon", this.inverted && "inverted", !i && this.labelPosition && this.labelPosition, !i && this.labelPosition && "labeled", this.loading && "loading", this.toggle && "toggle", this.negative && "negative", this.positive && "positive", this.primary && "primary", this.secondary && "secondary", this.social, this.size, "button"),
          r = e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: n,
        attrs: {
          role: "button"
        }
      }]), ["string" == typeof this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.content || this.$slots.default]);
      return i ? e("div", {
        class: this.classes("ui", this.labelPosition, "labeled", "button")
      }, ["left" === this.labelPosition && i, r, "left" !== this.labelPosition && i]) : r;
    }
  },
      be = {
    name: "SuiButtonContent",
    mixins: [j],
    props: {
      visible: {
        type: Boolean
      },
      hidden: {
        type: Boolean
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("div"),
          i = this.classes(this.visible && "visible", this.hidden && "hidden", "content");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: i
      }]), [this.content || this.$slots.default]);
    },
    meta: {
      parent: "SuiButton"
    }
  },
      ye = {
    name: "SuiButtonGroup",
    mixins: [j],
    props: {
      attached: H(["top", "bottom"]),
      widths: H.Number(),
      vertical: Boolean,
      labeled: Boolean,
      icons: Boolean,
      color: H.Color(),
      basic: Boolean,
      size: H.Size()
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.size, this.color, this.attached, this.attached && "attached", this.num(this.widths), this.vertical && "vertical", this.labeled && "labeled", this.icons && "icon", this.basic && "basic", "buttons")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiButton"
    }
  };

  function ve(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function Se(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ve(Object(i), !0).forEach(function (t) {
        we(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ve(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function we(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var Ae = {
    name: "SuiButtonOr",
    mixins: [j],
    props: {
      text: String
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType(),
          i = {};
      return this.text && (i["data-text"] = this.text), e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "or",
        attrs: Se({}, i)
      }]));
    },
    meta: {
      parent: "SuiButton"
    }
  },
      Oe = {
    name: "SuiContainer",
    mixins: [j],
    props: {
      fluid: {
        type: Boolean,
        description: "Container has no maximum width."
      },
      text: {
        type: Boolean,
        description: "Reduce maximum width to more naturally accommodate text."
      },
      textAlign: H.TextAlign({
        description: "Align container text."
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", T(this.textAlign), this.text && "text", this.fluid && "fluid", "container")
      }]), [this.$slots.default]);
    }
  },
      xe = {
    name: "SuiDivider",
    mixins: [j],
    props: {
      clearing: Boolean,
      fitted: Boolean,
      hidden: Boolean,
      horizontal: Boolean,
      inverted: Boolean,
      vertical: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.clearing && "clearing", this.fitted && "fitted", this.hidden && "hidden", this.horizontal && "horizontal", this.vertical && "vertical", this.inverted && "inverted", "divider")
      }]), [this.$slots.default]);
    }
  },
      Pe = {
    name: "SuiFlag",
    mixins: [j],
    props: {
      name: String
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("i");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("flag", this.name)
      }]));
    }
  },
      Be = {
    name: "SuiHeader",
    mixins: [j],
    props: {
      color: H.Color(),
      content: String,
      dividing: Boolean,
      disabled: Boolean,
      floated: H(["left", "right"]),
      icon: {
        type: [Boolean, String],
        default: !1
      },
      image: {
        type: String,
        description: "Add an image by img src or pass an Image."
      },
      size: H.Size(),
      sub: Boolean,
      textAlign: H(["left", "right", "center", "justify"]),
      block: Boolean,
      attached: H(["top", "bottom"], {
        type: Boolean
      }),
      inverted: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.floated && "".concat(this.floated, " floated"), T(this.textAlign), this.attached, this.attached && "attached", this.color, this.size, this.icon && "icon", this.block && "block", this.dividing && "dividing", this.image && "image", this.sub && "sub", this.disabled && "disabled", this.inverted && "inverted", "header")
      }]), [this.icon !== !!this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.image && e("img", {
        attrs: {
          src: this.image
        },
        class: "ui image"
      }), this.$slots.default || this.content]);
    }
  },
      Ce = {
    name: "SuiHeaderContent",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "content"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiHeader"
    }
  },
      je = {
    name: "SuiHeaderSubheader",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "sub header"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiHeader"
    }
  },
      Ee = {
    name: "SuiIconGroup",
    mixins: [j],
    props: {
      size: H.Size({
        description: "Icon group size."
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("i");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.size, "icons")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiIcon"
    }
  },
      $e = {
    name: "SuiImage",
    mixins: [j],
    props: {
      avatar: {
        type: Boolean,
        description: "An image may be formatted to appear inline with text as an avatar."
      },
      bordered: {
        type: Boolean,
        description: "An image may include a border to emphasize the edges of white or transparent content."
      },
      circular: {
        type: Boolean,
        description: "An image may appear circular."
      },
      rounded: {
        type: Boolean,
        description: "An image may appear rounded."
      },
      disabled: Boolean,
      hidden: Boolean,
      size: H.Size(),
      spaced: H(["left", "right"], {
        type: Boolean
      }),
      shape: H(["rounded", "circular"]),
      src: {
        type: String,
        required: !0
      },
      floated: H(["left", "right"]),
      centered: Boolean,
      verticalAlign: H.VerticalAlign({
        description: "An image can specify its vertical alignment."
      }),
      wrapped: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("div"),
          i = this.classes("ui", this.avatar && "avatar", this.size, this.shape, this.verticalAlign && "".concat(this.verticalAlign, " aligned"), this.floated && "".concat(this.floated, " floated"), this.centered && "centered", this.bordered && "bordered", this.rounded && "rounded", this.circular && "circular", this.spaced, this.spaced && "spaced", this.hidden && "hidden", this.disabled && "disabled", "image");
      return this.wrapped || this.$slots.corner || this.$slots.label ? e(t, {
        class: i
      }, [this.$slots.corner, e("img", {
        attrs: {
          src: this.src
        }
      }), this.$slots.label]) : e("img", {
        class: i,
        attrs: {
          src: this.src
        }
      });
    }
  },
      Te = {
    name: "SuiImageGroup",
    mixins: [j],
    props: {
      size: H.Size()
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("div");
      return e(t, {
        class: this.classes("ui", this.size, "images")
      }, [this.$slots.default]);
    },
    meta: {
      parent: "SuiImage"
    }
  };

  function ke(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function Le(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ke(Object(i), !0).forEach(function (t) {
        De(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ke(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function De(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var Ie = {
    name: "SuiInput",
    components: {
      SuiButton: ge,
      SuiIcon: Y
    },
    mixins: [j],
    props: {
      action: String,
      disabled: Boolean,
      error: Boolean,
      focus: Boolean,
      fluid: Boolean,
      icon: String,
      iconPosition: H(["left", "right"]),
      inverted: Boolean,
      loading: Boolean,
      size: H(["mini", "small", "large", "big", "huge", "massive"]),
      transparent: Boolean,
      type: {
        description: "The HTML input type.",
        default: "text",
        type: String
      },
      value: [String, Number]
    },
    events: {
      input: {
        custom: !0
      },
      blur: {
        custom: !0
      }
    },
    methods: {
      handleChange: function (e) {
        var t = e.target.value,
            i = "number" === this.type ? Number(t) : t;
        this.$emit("input", i);
      }
    },
    render: function () {
      var e,
          t = this,
          i = arguments[0],
          n = this.getElementType();
      return (this.loading || this.icon) && (e = i(Y, {
        attrs: {
          name: this.loading ? "loading" : this.icon
        }
      })), i(n, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.action && "action", this.disabled && "disabled", this.error && "error", this.focus && "focus", this.transparent && "transparent", this.inverted && "inverted", this.loading && "loading", this.fluid && "fluid", "left" === this.iconPosition && "left", (this.loading || this.icon) && "icon", Boolean(this.size) && this.size, "input")
      }]), [i("input", {
        domProps: {
          value: this.value
        },
        on: {
          input: this.handleChange,
          blur: function (e) {
            return t.$emit("blur", e);
          }
        },
        ref: "input",
        attrs: Le({
          type: this.type
        }, this.$attrs)
      }), e, this.action && i(ge, {
        attrs: {
          content: this.action
        }
      })]);
    }
  },
      Me = {
    name: "SuiLabel",
    mixins: [j],
    description: "A label displays content classification.",
    props: {
      attached: H(["top", "bottom", "top right", "top left", "bottom left", "bottom right"], {
        description: "A label can attach to a content segment."
      }),
      basic: {
        type: Boolean,
        description: "A label can reduce its complexity."
      },
      circular: {
        type: Boolean,
        description: "A label can be circular."
      },
      color: H.Color(),
      corner: H(["left", "right"], {
        description: "A label can position itself in the corner of an element."
      }),
      empty: {
        type: Boolean,
        description: "Formats the label as a dot."
      },
      floating: {
        type: Boolean,
        description: "Float above another element in the upper right corner."
      },
      image: Boolean,
      pointing: H(["left", "right", "above", "below"], {
        description: "A label can point to content next to it.",
        type: Boolean
      }),
      icon: String,
      ribbon: H(["left", "right"], {
        description: "A label can appear as a ribbon attaching itself to an element.",
        type: Boolean
      }),
      size: H.Size({
        description: "A label can have different sizes."
      }),
      tag: H.Color({
        description: "A label can appear as a tag.",
        type: Boolean
      })
    },
    computed: {
      pointingClass: function () {
        if (!this.pointing) return "";
        var e = "";
        return ["left", "right"].includes(this.pointing) && (e += "".concat(this.pointing, " ")), e += "pointing", ["above", "below"].includes(this.pointing) && (e += " ".concat(this.pointing)), e;
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.pointingClass, this.color, this.size, this.circular && "circular", this.empty && "empty", this.floating && "floating", this.basic && "basic", this.image && "image", this.attached && "".concat(this.attached, " attached"), this.ribbon && "".concat(this.ribbon, " ribbon"), this.corner && "".concat(this.corner, " corner"), this.tag && "".concat(this.tag, " tag"), "label")
      }]), [this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.$slots.default]);
    }
  },
      Fe = {
    name: "SuiLabelDetail",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "detail"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiLabel"
    }
  };

  function ze(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function Re(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var Ne = function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ze(Object(i), !0).forEach(function (t) {
        Re(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ze(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }({}, Y, {
    name: "SuiListIcon",
    mixins: [j],
    meta: {
      parent: "SuiList"
    }
  }),
      He = {
    name: "SuiListContent",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "content"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiList"
    }
  },
      Ve = {
    name: "SuiListItem",
    components: {
      SuiListContent: He,
      SuiListIcon: Ne
    },
    mixins: [j],
    props: {
      active: {
        type: Boolean,
        description: "A list item can be active."
      },
      content: String,
      icon: String
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("item", this.active && "active"),
        attrs: {
          role: "listitem"
        }
      }]), [this.icon && e(Ne, {
        attrs: {
          name: this.icon
        }
      }), this.content ? e(He, [this.content]) : this.$slots.default]);
    },
    meta: {
      parent: "SuiList"
    }
  },
      Ge = {
    name: "SuiList",
    mixins: [j],
    props: {
      bulleted: {
        type: Boolean,
        description: "A list can mark items with a bullet."
      },
      divided: Boolean,
      horizontal: Boolean,
      items: Array,
      link: Boolean,
      relaxed: Boolean,
      inverted: {
        type: Boolean,
        description: "A list can be inverted to appear on a dark background."
      },
      ordered: {
        type: Boolean,
        description: "A list can be ordered numerically."
      },
      size: H.Size()
    },
    render: function () {
      var e,
          t = arguments[0],
          i = this.getElementType();
      return e = this.items ? this.items.map(function (e) {
        return t(Ve, [e]);
      }) : this.$slots.default, t(i, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.size, this.bulleted && "bulleted", this.divided && "divided", this.ordered && "ordered", this.horizontal && "horizontal", this.link && "link", this.relaxed && "relaxed", this.inverted && "inverted", "list"),
        attrs: {
          role: "list"
        }
      }]), [e]);
    }
  },
      qe = {
    name: "SuiListDescription",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "description"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiList"
    }
  },
      _e = {
    name: "SuiListHeader",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "header"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiList"
    }
  },
      We = {
    name: "SuiListList",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "list"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiList"
    }
  },
      Ue = {
    name: "SuiLoader",
    mixins: [j],
    props: {
      active: Boolean,
      content: String,
      indeterminate: Boolean,
      disabled: Boolean,
      inline: Boolean,
      centered: Boolean,
      size: H.Size({
        type: String
      }),
      inverted: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.indeterminate && "indeterminate", this.active && "active", this.disabled && "disabled", this.inline && "inline", this.centered && "centered", this.inverted && "inverted", this.size, (this.content || this.$slots.default) && "text", "loader")
      }]), [this.content || this.$slots.default]);
    }
  },
      Qe = {
    name: "SuiRail",
    mixins: [j],
    props: {
      attached: Boolean,
      dividing: Boolean,
      internal: Boolean,
      position: H(["left", "right"])
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.dividing && "dividing", this.attached && "attached", this.internal && "internal", this.position, "rail")
      }]), [this.$slots.default]);
    }
  },
      Ye = {
    name: "SuiReveal",
    mixins: [j],
    props: {
      active: {
        type: Boolean,
        description: "An active reveal displays its hidden content."
      },
      animated: H(["fade", "small fade", "move", "move right", "move up", "move down", "rotate", "rotate left"]),
      disabled: {
        type: Boolean,
        description: "A disabled reveal will not animate when hovered."
      },
      instant: {
        type: Boolean,
        description: "An element can show its content without delay."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.animated, this.disabled && "disabled", this.instant && "instant", this.active && "active", "reveal")
      }]), [this.$slots.default]);
    }
  },
      Ke = {
    name: "SuiRevealContent",
    mixins: [j],
    props: {
      visible: Boolean,
      hidden: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.hidden && "hidden", this.visible && "visible", "content")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiReveal"
    }
  },
      Xe = {
    name: "SuiSegment",
    mixins: [j],
    props: {
      attached: H.Attached({
        type: Boolean,
        description: "Attach segment to other content, like a header."
      }),
      basic: Boolean,
      clearing: {
        type: Boolean,
        description: "A segment can clear floated content."
      },
      inverted: Boolean,
      padded: H.Padded({
        type: Boolean,
        description: "A segment can increase its padding"
      }),
      piled: Boolean,
      raised: Boolean,
      stacked: H(["tall"], {
        type: Boolean
      }),
      vertical: Boolean,
      disabled: Boolean,
      loading: Boolean,
      compact: Boolean,
      color: H.Color({
        type: String
      }),
      emphasis: H.Emphasis({
        type: String
      }),
      circular: Boolean,
      floated: H.Floated({
        type: String
      }),
      aligned: H.TextAlign({
        type: String
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.attached, this.attached && "attached", this.basic && "basic", this.clearing && "clearing", this.padded, this.padded && "padded", this.inverted && "inverted", this.stacked, this.stacked && "stacked", this.piled && "piled", this.raised && "raised", this.vertical && "vertical", this.disabled && "disabled", this.loading && "loading", this.compact && "compact", this.color, this.emphasis, this.circular && "circular", this.floated, this.floated && "floated", this.aligned, this.aligned && "aligned", "segment")
      }]), [this.$slots.default]);
    }
  },
      Je = {
    name: "SuiSegments",
    mixins: [j],
    props: {
      piled: Boolean,
      raised: Boolean,
      stacked: Boolean,
      horizontal: Boolean,
      vertical: Boolean
    },
    meta: {
      parent: "SuiSegment"
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.piled && "piled", this.raised && "raised", this.stacked && "stacked", this.horizontal && "horizontal", this.vertical && "vertical", "segments")
      }]), [this.$slots.default]);
    }
  },
      Ze = {
    name: "SuiStepDescription",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "description"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiStep"
    }
  },
      et = {
    name: "SuiStepTitle",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "title"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiStep"
    }
  },
      tt = {
    name: "SuiStepContent",
    components: {
      SuiStepDescription: Ze,
      SuiStepTitle: et
    },
    mixins: [j],
    props: {
      description: String,
      title: String
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "content"
      }]), [this.title && e(et, [this.title]), this.description && e(Ze, [this.description]), this.$slots.default]);
    },
    meta: {
      parent: "SuiStep"
    }
  },
      it = {
    name: "SuiStep",
    components: {
      SuiIcon: Y,
      SuiStepContent: tt,
      SuiStepTitle: et,
      SuiStepDescription: Ze
    },
    mixins: [j],
    props: {
      active: Boolean,
      completed: Boolean,
      description: String,
      disabled: Boolean,
      icon: String,
      title: String,
      link: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.active && "active", this.completed && "completed", this.disabled && "disabled", this.link && "link", "step")
      }]), [this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.title || this.description ? e(tt, [this.title && e(et, [this.title]), this.description && e(Ze, [this.description])]) : this.$slots.default]);
    }
  };

  function nt(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function rt(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? nt(Object(i), !0).forEach(function (t) {
        st(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : nt(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function st(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var ot = {
    name: "SuiStepGroup",
    components: {
      SuiStep: it
    },
    mixins: [j],
    props: {
      ordered: Boolean,
      steps: Array,
      vertical: Boolean,
      stackable: Boolean,
      unstackable: Boolean,
      fluid: Boolean,
      attached: H.Attached({
        type: Boolean
      }),
      stepNumber: H.Number({
        type: String,
        description: "Defined number of steps"
      }),
      size: H.Size({
        type: String
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.stepNumber && this.num(this.stepNumber), this.ordered && "ordered", this.vertical && "vertical", this.fluid && "fluid", this.stackable && "tablet stackable", this.unstackable && "unstackable", this.attached, this.attached && "attached", this.size, "steps")
      }]), [this.steps ? this.steps.map(function (t) {
        return e(it, {
          props: rt({}, t)
        });
      }) : this.$slots.default]);
    },
    meta: {
      parent: "SuiStep"
    }
  };

  function at(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function ct(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var lt = {
    name: "SuiAccordion",
    mixins: [j],
    props: {
      activeIndex: [Number, Array],
      exclusive: Boolean,
      fluid: Boolean,
      inverted: Boolean,
      panels: Array,
      styled: Boolean
    },
    data: function () {
      return {
        active: this.exclusive ? Array.isArray(this.activeIndex) ? this.activeIndex[0] : this.activeIndex : Array.isArray(this.activeIndex) ? this.activeIndex : [this.activeIndex],
        panelElms: []
      };
    },
    methods: {
      register: function (e) {
        var t,
            i = this,
            n = -1;
        !function r(s) {
          s.some(function (s) {
            return "SuiAccordion" !== s.$options.name && ("SuiAccordionTitle" === s.$options.name && (n += 1), s === e ? (i.panelElms[n] = function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var i = null != arguments[t] ? arguments[t] : {};
                t % 2 ? at(Object(i), !0).forEach(function (t) {
                  ct(e, t, i[t]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : at(Object(i)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
                });
              }

              return e;
            }({}, i.panelElms[n] || {}, ct({}, s.$options.name, s)), t = !0, !0) : (r(s.$children), t));
          });
        }(this.$children);
      },
      toggleEl: function (e) {
        var t = this;
        this.panelElms.some(function (i, n) {
          return (i.SuiAccordionTitle === e || i.SuiAccordionContent === e) && (t.toggle(n), !0);
        });
      },
      toggle: function (e) {
        this.exclusive ? this.active === e ? this.active = null : this.active = e : this.active.includes(e) ? this.active = this.active.filter(function (t) {
          return t !== e;
        }) : this.active = this.active.concat([e]), this.panelElms && this.toggleChildren();
      },
      toggleChildren: function () {
        var e = this;
        this.panelElms.forEach(function (t, i) {
          var n = e.isPanelActive(i);
          t.SuiAccordionTitle && t.SuiAccordionTitle.setActive(n), t.SuiAccordionContent && t.SuiAccordionContent.setActive(n);
        });
      },
      isPanelActive: function (e) {
        return Array.isArray(this.active) ? this.active.includes(e) : this.active === e;
      }
    },
    render: function () {
      var e = this,
          t = arguments[0],
          i = this.getElementType();
      return t(i, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.inverted && "inverted", this.fluid && "fluid", this.styled && "styled", "accordion")
      }]), [this.panels ? this.panels.map(function (i, n) {
        var r = i.title,
            s = i.content;
        return t("template", [t("div", {
          class: e.classes("title", e.isPanelActive(n) && "active"),
          on: {
            click: function () {
              return e.toggle(n);
            }
          }
        }, [r]), t("div", {
          class: e.classes("content", e.isPanelActive(n) && "active")
        }, [s])]);
      }) : this.$slots.default]);
    }
  },
      dt = {
    props: {
      active: Boolean
    },
    data: function () {
      return {
        dataActive: this.active,
        currentIndex: null,
        accordion: null
      };
    },
    methods: {
      setActive: function (e) {
        this.dataActive = e;
      },
      toggle: function () {
        this.accordion.toggleEl(this);
      }
    },
    mounted: function () {
      for (var e = this.$parent; e && !this.accordion;) "SuiAccordion" === e.$options.name && (this.accordion = e), e = e.$parent;

      if (!this.accordion) throw new Error("".concat(this.$options.name, " must be place as a child of a SuiAccordion"));
      this.accordion.register(this);
    },
    watch: {
      active: function (e) {
        this.dataActive = e;
      }
    },
    meta: {
      parent: "SuiAccordion"
    }
  };

  function ut(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function ht(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var pt = function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ut(Object(i), !0).forEach(function (t) {
        ht(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ut(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }({
    name: "SuiAccordionContent",
    mixins: [j]
  }, dt, {
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("content", this.dataActive && "active")
      }]), [this.$slots.default]);
    }
  });

  function mt(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function ft(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var gt = function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? mt(Object(i), !0).forEach(function (t) {
        ft(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : mt(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }({
    name: "SuiAccordionTitle",
    mixins: [j]
  }, dt, {
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("title", this.dataActive && "active"),
        on: {
          click: this.toggle
        }
      }]), [this.$slots.default]);
    }
  }),
      bt = {
    name: "SuiCheckbox",
    model: {
      prop: "inputValue",
      event: "change"
    },
    mixins: [j],
    props: {
      disabled: {
        type: Boolean,
        description: "Disables checkbox interactions"
      },
      inputValue: [Array, Boolean, Number, String, Object],
      label: {
        type: String,
        description: "Adds label next to the checkbox"
      },
      radio: {
        type: Boolean,
        description: "Changes checkbox to radio button"
      },
      toggle: {
        type: Boolean,
        description: "Make checkbox looks like a on/off toggle"
      },
      name: {
        type: String,
        description: "Naming input field"
      },
      value: [String, Object],
      required: {
        type: Boolean,
        description: 'Adds "required" to checkbox input'
      },
      slider: {
        type: Boolean,
        description: "Make checkbox looks like a two-positional slider"
      }
    },
    events: {
      change: {
        custom: !0
      }
    },
    computed: {
      isArray: function () {
        return Array.isArray(this.inputValue);
      },
      isChecked: function () {
        return this.radio && this.value ? this.inputValue === this.value : this.isArray ? this.inputValue.includes(this.value) : !!this.inputValue;
      }
    },
    methods: {
      setValue: function (e) {
        var t = this,
            i = e.target.checked;
        this.radio && this.value ? this.$emit("change", this.value) : this.isArray ? i ? this.$emit("change", this.inputValue.concat([this.value])) : this.$emit("change", this.inputValue.filter(function (e) {
          return e !== t.value;
        })) : this.$emit("change", i);
      }
    },
    render: function () {
      var e = this,
          t = arguments[0],
          i = this.getElementType();
      return t(i, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", !(this.label || this.$slots.default) && "fitted", this.radio && "radio", this.toggle && "toggle", this.slider && "slider", this.disabled && "disabled", "checkbox")
      }]), [t("input", {
        ref: "input",
        class: "hidden",
        attrs: {
          readonly: "",
          tabindex: "0",
          name: this.name,
          type: this.radio ? "radio" : "checkbox",
          disabled: this.disabled,
          required: this.required
        },
        domProps: {
          checked: this.isChecked
        },
        on: {
          change: this.setValue
        }
      }), t("label", {
        on: {
          click: function () {
            return e.$refs.input.click();
          }
        },
        attrs: {
          for: this.name
        }
      }, [this.label || this.$slots.default])]);
    }
  },
      yt = {
    name: "SuiDimmer",
    mixins: [j],
    props: {
      active: Boolean,
      inverted: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.active && "active", this.inverted && "inverted", "dimmer")
      }]), [e("div", {
        class: "content"
      }, [e("div", {
        class: "center"
      }, [this.$slots.default])])]);
    }
  },
      vt = {
    name: "SuiDimmerDimmable",
    mixins: [j],
    props: {},
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("dimmable")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiDimmer"
    }
  };

  function St(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function wt(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? St(Object(i), !0).forEach(function (t) {
        At(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : St(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function At(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var Ot = {
    name: "SuiDropdownItem",
    mixins: [j],
    props: {
      flag: {
        type: String,
        description: "Shorthand for sui-flag."
      },
      image: {
        type: Object,
        description: "Shorthand for sui-image."
      },
      icon: {
        type: String,
        description: "Shorthand for sui-icon."
      },
      label: {
        type: Object,
        description: "Shorthand for sui-label"
      },
      text: {
        type: String,
        description: "Display text."
      },
      value: {
        type: null,
        description: "Stored value."
      },
      active: {
        type: Boolean,
        default: !1,
        description: "Style as the currently chosen item."
      },
      selected: {
        type: Boolean,
        default: !1,
        description: "Is item selected"
      },
      disabled: {
        type: Boolean,
        default: !1,
        description: "A dropdown item can be disabled."
      }
    },
    events: {
      select: {
        custom: !0
      }
    },
    methods: {
      select: function () {
        this.$emit("select", this.value);
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        attrs: {
          role: "option"
        },
        class: this.classes(this.disabled && "disabled", this.active && "active", this.selected && "selected", "item"),
        on: {
          click: this.select
        }
      }]), [this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.image && e($e, {
        props: wt({}, this.image)
      }), this.flag && e(Pe, {
        attrs: {
          name: this.flag
        }
      }), this.label && e(Me, {
        props: wt({}, this.label)
      }), this.text || this.$slots.default]);
    },
    meta: {
      parent: "SuiDropdown"
    }
  },
      xt = "closed",
      Pt = "opening",
      Bt = "open",
      Ct = "closing",
      jt = {
    name: "SuiDropdownMenu",
    mixins: [j],
    data: function () {
      return {
        open: !1,
        visualState: xt
      };
    },
    computed: {
      animation: function () {
        var e = this.$parent.animation;

        switch (this.visualState) {
          case Pt:
            return "animating ".concat(e, " in visible");

          case Ct:
            return "animating ".concat(e, " out visible");

          default:
            return "";
        }
      }
    },
    watch: {
      open: function (e) {
        this.visualState = e ? Pt : Ct;
      }
    },
    mounted: function () {
      for (var e = this.$parent; e && !this.accordion;) /^SuiDropdown(WithRequired)?$/.test(e.$options.name) && (this.dropdown = e), e = e.$parent;

      if (!this.dropdown) throw new Error("SuiDropdownMenu must be place as a child of a SuiDropdown");
      this.dropdown.register(this), this.$el.addEventListener($(), this.onAnimationEnded, !1);
    },
    methods: {
      onAnimationEnded: function () {
        this.visualState = this.open ? Bt : xt;
      },
      setOpen: function (e) {
        this.open = e;
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{
        attrs: {
          tabindex: "-1"
        }
      }, this.getChildPropsAndListeners(), {
        class: this.classes("menu", this.open && "visible active", "transition", this.animation)
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiDropdown"
    }
  };

  function Et(e) {
    return (Et = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function $t(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function Tt(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? $t(Object(i), !0).forEach(function (t) {
        kt(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : $t(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function kt(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var Lt = {
    auto: "auto",
    autoUpward: "auto-upward",
    upward: "upward",
    downward: "downward"
  },
      Dt = "slide",
      It = "down",
      Mt = "up";
  var Ft,
      zt = {
    name: "SuiDropdown",
    mixins: [j],
    props: {
      allowAdditions: {
        type: Boolean,
        description: "A dropdown can allow user additions."
      },
      button: {
        type: Boolean,
        description: "A dropdown button style."
      },
      icon: {
        type: String,
        description: "Change default button to other button."
      },
      item: {
        type: Boolean,
        description: "A dropdown can be formatted as a Menu item."
      },
      floating: {
        type: Boolean,
        description: "A dropdown menu can appear to be floating below an element."
      },
      fluid: {
        type: Boolean,
        description: "A dropdown can take the full width of its parent."
      },
      labeled: {
        type: Boolean,
        description: "A dropdown can be labeled."
      },
      multiple: {
        type: Boolean,
        description: "A selection dropdown can allow multiple selections."
      },
      loading: {
        type: Boolean,
        description: "A dropdown can show that it is currently loading data."
      },
      maxSelections: {
        type: Number,
        default: 1 / 0,
        description: "Maximum possible selections when using multiple selection"
      },
      options: {
        type: Array,
        default: function () {
          return [];
        },
        description: "Array of SuiDropdownItem props e.g. `{ text: '', value: '' }`"
      },
      placeholder: {
        type: String,
        description: "Placeholder text."
      },
      pointing: {
        type: String,
        description: "A dropdown can be formatted so that its menu is pointing."
      },
      search: {
        type: Boolean,
        description: "A dropdown can have a search field to filter options."
      },
      searchInMenu: {
        type: Object,
        description: "A dropdown can have a search input in dropdown menu. Should be passed an Object with SuiInput props."
      },
      selection: {
        type: Boolean,
        description: "A dropdown can be used to select between choices in a form."
      },
      simple: {
        type: Boolean,
        description: "A dropdown that works without JavaScript",
        default: !1
      },
      text: {
        type: String,
        description: "Text of dropdown"
      },
      value: {
        type: [Array, String, Number],
        description: "Value of the dropdown."
      },
      direction: H(Object.values(Lt), {
        default: Lt.auto,
        description: "A dropdown can have a direction to open"
      }),
      openOnFocus: {
        type: Boolean,
        default: !0,
        description: "Whether or not the menu should open when the dropdown is focused."
      },
      closeOnBlur: {
        type: Boolean,
        default: !0,
        description: "Whether or not the menu should close when the dropdown is blurred."
      },
      noResultsMessage: {
        type: String,
        default: "No results found",
        description: "Message to display when there are no results."
      },
      maxSelectionsMessage: {
        type: String,
        default: "Max {selections} selections",
        description: "Message to display when the maximum amount of selections is reached."
      },
      disabled: {
        type: Boolean,
        default: !1,
        description: "Whether or not the dropdown is disabled"
      }
    },
    events: {
      input: {
        custom: !0
      }
    },
    data: function () {
      return {
        filter: "",
        menu: null,
        open: !1,
        menuDirection: null,
        focused: !1,
        isMouseDown: !1,
        selectedIndex: -1
      };
    },
    computed: {
      maximumValuesSelected: function () {
        return this.multipleValue.length >= this.maxSelections;
      },
      downward: function () {
        return this.direction !== Lt.auto && this.direction !== Lt.autoUpward ? this.direction === Lt.downward : (this.calculateMenuDirection(), null === this.menuDirection || (this.menuDirection.below && this.menuDirection.above || !this.menuDirection.below && !this.menuDirection.above ? this.direction === Lt.auto : !!this.menuDirection.below));
      },
      animation: function () {
        return "".concat(Dt, " ").concat(this.downward ? It : Mt);
      },
      filteredOptions: function () {
        var e = this;
        if (!this.search && !this.multiple && !this.searchInMenu) return this.options;
        var t = new RegExp(this.filter.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
        return this.options.filter(function (i) {
          return !(e.filter && !t.test(i.text)) && (!e.multiple || !(e.maximumValuesSelected || e.multipleValue.indexOf(i.value) > -1));
        });
      },
      message: function () {
        if (0 === this.filteredOptions.length) {
          if (this.multiple && this.maximumValuesSelected) return this.maxSelectionsMessage.replace("{selections}", this.maxSelections);
          if (this.filter && !this.allowAdditions) return this.noResultsMessage;
        }

        return "";
      },
      menuNode: function () {
        var e = this,
            t = this.$createElement;
        return t(jt, [[this.searchInMenu && [t(Ie, l()([{}, {
          props: this.searchInMenu,
          ref: "searchInMenu"
        }, {
          on: {
            input: this.updateFilter,
            keydown: this.handleSearchKeyDown
          },
          attrs: {
            value: this.filter
          }
        }])), t(xe)], this.message ? t("div", {
          class: "message"
        }, [this.message]) : this.filteredOptions.map(function (i, n) {
          return t(Ot, {
            props: Tt({}, i),
            attrs: {
              active: e.multiple ? -1 !== e.multipleValue.indexOf(i.value) : e.value === i.value,
              selected: e.selectedIndex === n
            },
            class: i.class,
            on: {
              select: e.selectItem
            }
          });
        })]]);
      },
      multipleValue: function () {
        return Array.isArray(this.value) ? this.value : [];
      },
      searchNode: function () {
        var e = this.$createElement;
        return this.search && e("input", {
          attrs: {
            type: "text",
            "aria-autocomplete": "list",
            autoComplete: "off",
            tabindex: "0"
          },
          class: "search",
          on: {
            input: this.updateFilter,
            keydown: this.handleSearchKeyDown
          },
          ref: "search",
          domProps: {
            value: this.filter
          }
        });
      },
      selectedNodes: function () {
        var e = this,
            t = this.$createElement;
        return this.multiple ? this.multipleValue.map(function (i) {
          var n = e.findOption(i),
              r = e.allowAdditions && !n ? {
            text: i
          } : n;
          return r ? t(Me, {
            nativeOn: {
              click: e.handleClickOnSelectedNode
            }
          }, [r.icon && t(Y, {
            attrs: {
              name: r.icon
            }
          }), r.image && t($e, {
            props: Tt({}, r.image)
          }), r.flag && t(Pe, {
            attrs: {
              name: r.flag
            }
          }), r.text, t(Y, {
            attrs: {
              name: "delete"
            },
            nativeOn: {
              click: function () {
                return e.deselectItem(i);
              }
            }
          })]) : null;
        }).filter(function (e) {
          return null != e;
        }) : null;
      },
      textNode: function () {
        var e = this.$createElement,
            t = this.text || this.placeholder,
            i = this.multiple && this.value && this.value.length || !this.multiple && -1 === [null, void 0].indexOf(this.value),
            n = !this.multiple && this.open && void 0 !== this.filteredOptions[this.selectedIndex] && this.filteredOptions[this.selectedIndex].value === this.value,
            r = i ? this.findOption(this.value) : t;
        if (!r) return null;
        var s = this.classes(this.placeholder && !i && "default", !this.searchInMenu && this.filter && !n && "filtered", "text"),
            o = "object" === Et(r) ? r : {
          text: r
        };
        return e("div", {
          ref: "text",
          class: s,
          attrs: {
            role: "alert",
            "aria-live": "polite"
          }
        }, [o.icon && e(Y, {
          attrs: {
            name: o.icon
          }
        }), o.image && e($e, {
          props: Tt({}, o.image)
        }), o.flag && e(Pe, {
          attrs: {
            name: o.flag
          }
        }), o.label && e(Me, {
          props: Tt({}, o.label)
        }), o.text]);
      }
    },
    watch: {
      filteredOptions: function () {
        this.updateSelectedIndex();
      },
      filter: function (e) {
        this.$emit("filtered", e), this.search && this.resizeInput();
      }
    },
    mounted: function () {
      document.body.addEventListener("click", this.closeMenu);
    },
    destroyed: function () {
      document.body.removeEventListener("click", this.closeMenu);
    },
    methods: {
      setOpen: function () {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.open = e, this.search && this.filteredOptions.length >= 0 && (this.selectedIndex = 0), this.menu && this.menu.setOpen && this.menu.setOpen(e);
      },
      closeMenu: function () {
        this.closeOnBlur && this.setOpen(!1);
      },
      deselectItem: function (e) {
        this.$emit("input", this.multipleValue.filter(function (t) {
          return t !== e;
        }));
      },
      findOption: function (e) {
        return this.options.find(function (t) {
          return t.value === e;
        });
      },
      handleMouseDown: function () {
        var e = this;
        this.isMouseDown = !0, document.body.addEventListener("mouseup", function () {
          e.isMouseDown = !1;
        }, {
          capture: !0,
          once: !0
        });
      },
      handleClick: function (e) {
        var t = this;

        if (e.stopPropagation(), this.open) {
          if (this.search && e.target === this.$refs.search) return;
          var i = e.path || e.composedPath && e.composedPath();
          if (i || this.addEventPath(), this.searchInMenu && e.target === this.$refs.searchInMenu.$refs.input) return;
          if (this.multiple && -1 !== i.indexOf(this.menu.$el)) return void this.$nextTick(function () {
            return t.focusSearch();
          });
        }

        this.focusSearch(), this.setOpen(!this.open);
      },
      addEventPath: function () {
        "path" in Event.prototype || Object.defineProperty(Event.prototype, "path", {
          get: function () {
            for (var e = [], t = this.target; t;) e.push(t), t = t.parentElement;

            return -1 === e.indexOf(window) && -1 === e.indexOf(document) && e.push(document), -1 === e.indexOf(window) && e.push(window), e;
          }
        });
      },
      handleFocus: function () {
        this.focused || (this.focused = !0, !this.isMouseDown && this.openOnFocus && this.setOpen(!0));
      },
      handleBlur: function (e) {
        var t = this.filter;
        "" !== t && this.multiple && this.selectItem(t), this.isMouseDown || e.relatedTarget === this.$refs.search || (this.focused = !1, this.open && this.closeOnBlur && this.setOpen(!1));
      },
      handleClickOnSelectedNode: function (e) {
        e.stopPropagation();
      },
      toggleFilteredText: function (e, t) {
        this.searchInMenu || this.multiple || e.classList.contains("filtered") || "" === t.trim() || e.classList.add("filtered"), this.multiple || "" !== t.trim() || e.classList.remove("filtered");
      },
      handleKeyDown: function (e) {
        this.$refs.text && this.toggleFilteredText(this.$refs.text, this.filter);
        var t = 13,
            i = 27,
            n = 38,
            r = 40;

        if (this.open) {
          var s = 1;

          switch (e.keyCode) {
            case t:
              var o = this.filter;
              if (this.multiple || -1 === this.selectedIndex || (this.filter = ""), this.allowAdditions && -1 === this.selectedIndex && "" !== o.trim()) e.preventDefault(), this.selectItem(o);else if (this.selection || this.searchInMenu || this.search) {
                if (-1 === this.selectedIndex) return;
                e.preventDefault(), this.multiple ? this.selectItem(this.filteredOptions[this.selectedIndex].value) : (this.setOpen(!1), this.$refs.text.classList.remove("filtered"));
              }
              return;

            case i:
              return void (this.open && this.setOpen(!1));

            case n:
              s = -1;
              break;

            case r:
              break;

            default:
              return;
          }

          if (e.preventDefault(), 0 !== this.filteredOptions.length) {
            var a = this.selectedIndex + s;
            this.filteredOptions.length <= a ? this.selectedIndex = 0 : this.selectedIndex = a < 0 ? this.filteredOptions.length - 1 : a, (this.selection || this.searchInMenu || this.search) && !this.multiple && this.$emit("input", this.filteredOptions[this.selectedIndex].value);
          }
        } else e.keyCode !== t && (this.setOpen(!0), e.preventDefault());
      },
      register: function (e) {
        this.menu = e;
      },
      selectItem: function (e) {
        if (!this.multiple || !this.maximumValuesSelected) {
          var t = this.multiple ? this.multipleValue.filter(function (t) {
            return t !== e;
          }).concat(e) : e;
          this.$emit("input", t), this.filter = "", this.multiple || this.$nextTick(this.updateSelectedIndex);
        }
      },
      updateSelectedIndex: function () {
        var e = this;
        this.multiple ? this.selectedIndex = this.filteredOptions.length > this.selectedIndex ? this.selectedIndex : this.selectedIndex - 1 : this.selectedIndex = this.filteredOptions.findIndex(function (t) {
          return t.value === e.value;
        });
      },
      resizeInput: function () {
        var e = this.$refs.sizer;
        e.innerText = this.filter;
        var t = e.offsetWidth;
        e.style.display = "", e.style.padding = "", this.$refs.search.style.minWidth = "".concat(Math.ceil(t + 1), "px");
      },
      updateFilter: function (e) {
        this.filter = "string" == typeof e ? e : e.target.value;
      },
      focusSearch: function () {
        this.search && this.$refs.search.focus();
      },
      handleSearchKeyDown: function (e) {
        this.multiple && 8 === e.keyCode && "" === this.filter && (this.multipleValue.pop(), this.$emit("input", this.multipleValue));
      },
      calculateMenuDirection: function () {
        if ("undefined" != typeof window && this.menu && this.menu.$el && this.open) {
          this.menu.$el.classList.add("loading"), this.$el.classList.remove("upward");
          var e,
              t,
              i,
              n,
              r = {
            offset: {
              top: 0,
              left: 0
            },
            scrollTop: document.body.scrollTop,
            height: document.body.offsetHeight
          },
              s = {
            offset: (e = this.menu.$el, t = e.getBoundingClientRect(), i = window.pageXOffset || document.documentElement.scrollLeft, n = window.pageYOffset || document.documentElement.scrollTop, {
              top: t.top + n,
              left: t.left + i
            }),
            height: this.menu.$el.offsetHeight
          };
          this.menu.$el.classList.remove("loading"), this.menuDirection = {
            above: s.offset.top - s.height - this.$el.clientHeight >= 0,
            below: s.offset.top + s.height < r.height
          };
        }
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("div"),
          i = "string" == typeof t && !t.includes("-"),
          n = kt({}, i ? "on" : "nativeOn", {
        "!mousedown": this.handleMouseDown,
        click: this.handleClick,
        "!focus": this.handleFocus,
        "!blur": this.handleBlur,
        "!keydown": this.handleKeyDown
      });
      return e(t, l()([{
        attrs: {
          role: "listbox",
          "aria-expanded": this.open,
          tabindex: "0"
        }
      }, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.button && "button", this.item && "item", this.floating && "floating", this.fluid && "fluid", this.pointing && "pointing ".concat(this.pointing), this.loading && "loading", this.labeled && "labeled", this.multiple && "multiple", this.selection && "selection", this.search && "search", this.open && "active visible", this.disabled && "disabled", this.simple && "simple", !this.downward && Lt.upward, "dropdown")
      }, n]), [this.selectedNodes, this.searchNode, this.textNode, null !== this.icon && e("i", {
        ref: "icon",
        attrs: {
          "aria-hidden": "true"
        },
        class: "".concat(this.icon || "dropdown", " icon")
      }), e("span", {
        class: "sizer",
        ref: "sizer"
      }), this.$slots.default || this.menuNode]);
    }
  },
      Rt = {
    name: "SuiDropdownDivider",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        attrs: {
          role: "option"
        },
        class: this.classes("divider")
      }]));
    },
    meta: {
      parent: "SuiDropdown"
    }
  },
      Nt = {
    name: "SuiDropdownHeader",
    mixins: [j],
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content."
      },
      icon: {
        type: String,
        description: "Shorthand for `sui-icon`."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("header")
      }]), [this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.content || this.$slots.default]);
    },
    meta: {
      parent: "SuiDropdown"
    }
  },
      Ht = {
    name: "SuiEmbed",
    mixins: [j],
    props: {
      active: {
        type: Boolean,
        description: "An embed can be active"
      },
      aspectRatio: H(["4:3", "16:9", "21:9"], {
        description: "An embed can specify an alternative aspect ratio (4:3 | 16:9 | 21:9)"
      }),
      icon: {
        type: String,
        description: "Specifies an icon to use with placeholder content",
        default: "video play"
      },
      placeholder: {
        type: String,
        description: "A placeholder image for embed"
      },
      source: H(["youtube", "vimeo"], {
        description: "Specifies a source to use. Cannot be used together with url"
      }),
      url: {
        type: String,
        description: "Specifies a url to use for embed. Cannot be used together with source"
      },
      autoplay: {
        type: Boolean,
        description: "Setting to true or false will force autoplay",
        default: !0
      },
      brandedUI: {
        type: Boolean,
        description: "Whether to show networks branded UI like title cards, or after video calls to action"
      },
      color: {
        type: String,
        description: "Specifies what default chrome color with Vimeo or YouTube",
        default: "#444444"
      },
      hd: {
        type: Boolean,
        description: "Specifies whether to display YouTuber/Vimeo video in high-definition",
        default: !0
      },
      id: {
        type: String,
        description: "Specifies an id for source"
      },
      iframe: {
        type: Object,
        description: "Shorthand for HTML iframe"
      }
    },
    data: function () {
      return {
        isActive: !1
      };
    },
    computed: {
      isActiveState: function () {
        return this.active || this.isActive;
      }
    },
    methods: {
      setActive: function () {
        this.isActive = !0;
      }
    },
    render: function () {
      var e = arguments[0],
          t = this;

      function i() {
        var e = !t.url && t.source,
            i = !t.source && t.url,
            n = e && t.autoplay,
            r = e && t.brandedUI,
            s = e && t.color,
            o = e && t.hd,
            a = e && t.id;
        return "youtube" === e ? ["//www.youtube.com/embed/".concat(a), "?autohide=true", "&amp;autoplay=".concat(n), "&amp;color=".concat(encodeURIComponent(s)), "&amp;hq=".concat(o), "&amp;jsapi=false", "&amp;modestbranding=".concat(r)].join("") : "vimeo" === e ? ["//player.vimeo.com/video/".concat(a), "?api=false", "&amp;autoplay=".concat(n), "&amp;byline=false", "&amp;color=".concat(encodeURIComponent(s)), "&amp;portrait=false", "&amp;title=false"].join("") : i;
      }

      function n(e) {
        return Object.entries(e).reduce(function (e, t) {
          return "".concat(e).concat(t[0], ":").concat(t[1], ";");
        }, "");
      }

      function r() {
        if (!t.isActiveState) return null;
        if (t.$slots.default) return t.$slots.default;
        var r = t.iframe || {},
            s = i(),
            o = r.style ? n(r.style) : "";
        return e("div", {
          class: "embed"
        }, [e("iframe", {
          attrs: {
            src: r.src || s,
            allowFullScreen: r.allowFullScreen || !1,
            frameBorder: r.frameBorder || 0,
            width: r.width || "100%",
            height: r.height || "100%",
            scrolling: r.scrolling || "no",
            title: r.title || "Embedded content from ".concat(t.source || "custom host")
          },
          style: o
        })]);
      }

      var s = this.getElementType();
      return e(s, l()([{
        on: {
          click: this.setActive
        }
      }, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.aspectRatio, this.isActiveState && "active", "embed")
      }]), [this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.placeholder && e("img", {
        class: "placeholder",
        attrs: {
          src: this.placeholder
        }
      }), r()]);
    }
  };

  function Vt(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function Gt(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];

        return i;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  var qt = {
    closed: "closed",
    opening: "opening",
    open: "open",
    closing: "closing"
  };

  function _t(e) {
    return ["".concat(e, " up"), "".concat(e, " down"), "".concat(e, " left"), "".concat(e, " right")];
  }

  var Wt = ["scale", "drop", "horizontal flip", "vertical flip", "fade"].concat(Gt(_t("fade")), Gt(_t("fly")), Gt(_t("swing")));

  function Ut(e, t) {
    return "animating ".concat(e, " ").concat(t ? "in" : "out");
  }

  function Qt(e, t) {
    switch (e) {
      case qt.opening:
        return Ut(t, !0);

      case qt.open:
        return "visible active";

      case qt.closing:
        return "visible active ".concat(Ut(t, !1));

      case qt.close:
        return "hidden";

      default:
        return "";
    }
  }

  var Yt = {
    name: "SuiModal",
    model: {
      prop: "open",
      event: "changed"
    },
    mixins: [j],
    props: {
      animation: H(Wt, {
        default: Wt[0]
      }),
      animationDuration: {
        type: Number,
        default: 500
      },
      aligned: H(["top"]),
      closeIcon: {
        type: Boolean,
        default: !1
      },
      dimmer: H(["inverted"]),
      image: {
        type: Boolean,
        default: !1
      },
      open: {
        type: Boolean,
        default: !1
      },
      size: H(["standard", "fullscreen", "small", "large", "mini", "tiny"], {
        default: "standard"
      }),
      basic: {
        type: Boolean
      },
      closable: {
        type: Boolean,
        default: !0
      }
    },
    events: (Ft = {
      displayChanged: {
        custom: !0
      }
    }, Vt(Ft, "changed", {
      custom: !0
    }), Vt(Ft, "clickAwayModal", {
      custom: !0
    }), Ft),
    data: function () {
      return {
        visualState: this.open ? qt.open : qt.closed
      };
    },
    computed: {
      dimmerClass: function () {
        return Qt(this.visualState, "fade");
      },
      modalClass: function () {
        return Qt(this.visualState, this.animation);
      },
      visible: function () {
        return this.visualState !== qt.closed;
      },
      dimmerStyle: function () {
        return {
          display: this.visible ? "flex !important" : "none !important",
          animationDuration: "".concat(this.animationDuration, "ms")
        };
      },
      modalStyle: function () {
        return {
          display: this.visible ? "block !important" : "none !important",
          animationDuration: "".concat(this.animationDuration, "ms")
        };
      }
    },
    watch: {
      open: function (e) {
        this.visualState = e ? qt.opening : qt.closing;
      },
      visualState: function (e) {
        this.$emit("displayChanged", e);
      }
    },
    mounted: function () {
      this.$el.addEventListener($(), this.onAnimationEnd, !0);
    },
    beforeDestroy: function () {
      this.$el.removeEventListener($(), this.onAnimationEnd, !0);
    },
    methods: {
      close: function () {
        this.$emit("changed", !1);
      },
      dimmerClick: function (e) {
        this.closable && e.target === e.currentTarget && this.visualState === qt.open && (this.$emit("clickAwayModal"), this.close());
      },
      onAnimationEnd: function () {
        this.visualState = this.open ? qt.open : qt.closed;
      }
    },
    render: function () {
      var e = this,
          t = arguments[0];
      return t("div", {
        ref: "dimmer",
        class: this.classes("ui", this.dimmer, "dimmer modals page transition", this.dimmerClass),
        style: this.dimmerStyle,
        on: {
          click: this.dimmerClick
        }
      }, [t("div", {
        ref: "modal",
        style: this.modalStyle,
        class: this.classes("ui", this.size, this.basic && "basic", this.aligned && "".concat(this.aligned, " aligned"), "modal", "transition", this.modalClass)
      }, [this.closeIcon && t(Y, {
        attrs: {
          name: "close"
        },
        nativeOn: {
          click: function () {
            return e.close();
          }
        }
      }), this.$slots.default])]);
    }
  },
      Kt = {
    name: "SuiModalActions",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("actions")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiModal"
    }
  },
      Xt = {
    name: "SuiModalContent",
    mixins: [j],
    props: {
      image: Boolean,
      scrolling: {
        type: Boolean,
        default: !1,
        description: "A modal can use the entire size of the screen."
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("content", this.image && "image", this.scrolling && "scrolling")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiModal"
    }
  },
      Jt = {
    name: "SuiModalDescription",
    mixins: [j],
    props: {},
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("description")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiModal"
    }
  },
      Zt = {
    name: "SuiModalHeader",
    mixins: [j],
    props: {},
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("header")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiModal"
    }
  };

  function ei(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];

        return i;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  function ti(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function ii(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var ni = {
    name: "SuiRating",
    mixins: [j],
    binding: {
      prop: "rating",
      event: "changed"
    },
    props: {
      icon: String,
      maxRating: Number,
      rating: Number
    },
    events: {
      rate: {
        custom: !0
      }
    },
    data: function () {
      return {
        selected: 0
      };
    },
    methods: {
      getCurrentValue: function (e) {
        return Number(e.target.getAttribute("aria-posinset"));
      },
      onRate: function (e) {
        var t = this.getCurrentValue(e);
        this.$emit("rate", e, function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {};
            t % 2 ? ti(Object(i), !0).forEach(function (t) {
              ii(e, t, i[t]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ti(Object(i)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
            });
          }

          return e;
        }({}, this.$props, {
          rating: t
        }));
      },
      onMouseleave: function () {
        this.selected = 0;
      },
      onMouseover: function (e) {
        this.selected = this.getCurrentValue(e);
      }
    },
    render: function () {
      var e = this,
          t = arguments[0],
          i = this.getElementType();
      return t(i, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.icon, "rating"),
        attrs: {
          role: "radiogroup"
        }
      }]), [ei(new Array(this.maxRating)).map(function (i, n) {
        var r = n + 1,
            s = e.rating > n,
            o = e.selected > n;
        return t("i", {
          attrs: {
            "aria-checked": s.toString(),
            "aria-posinset": r,
            "aria-setsize": e.maxRating,
            tabindex: "0",
            role: "radio"
          },
          class: e.classes(s && "active", o && "selected", "icon"),
          on: {
            click: e.onRate,
            mouseover: e.onMouseover,
            mouseleave: e.onMouseleave
          }
        });
      })]);
    }
  },
      ri = {
    name: "SuiSearchEmptyMessage",
    mixins: [j],
    render: function () {
      var e = arguments[0];
      return e("div", {
        class: this.classes("message", "empty")
      }, [e("div", {
        class: this.classes("header")
      }, ["No Results"]), e("div", {
        class: this.classes("description")
      }, ["Your search returned no results"])]);
    }
  },
      si = {
    name: "SuiSearchResult",
    mixins: [j],
    props: {
      item: {
        type: Object,
        default: null
      }
    },
    methods: {
      handleClick: function () {
        this.$emit("selected", this.item);
      }
    },
    render: function () {
      var e = arguments[0];
      return e("a", {
        on: {
          click: this.handleClick
        },
        class: "result"
      }, [e("div", {
        class: "content"
      }, [e("div", {
        class: "title"
      }, [this.item.title]), this.item.description && e("div", {
        class: "description"
      }, [this.item.description])])]);
    }
  },
      oi = {
    name: "SuiSearchResults",
    components: {
      EmptyMessage: ri,
      Result: si
    },
    mixins: [j],
    props: {
      visible: {
        type: Boolean,
        default: !1
      },
      source: {
        type: Array,
        default: function () {
          return [];
        }
      },
      query: {
        type: String,
        default: ""
      },
      category: {
        type: Boolean,
        default: !1
      },
      firstFocus: {
        type: Boolean,
        default: !1
      }
    },
    data: function () {
      return {
        prevQuery: ""
      };
    },
    computed: {
      transitionClass: function () {
        return this.visible ? "in" : "out";
      },
      results: function () {
        var e = this.filterResults(this.source, this.query, this.prevQuery);
        return this.category ? this.renderCategoryResults(e) : this.renderResults(e);
      },
      visibleClass: function () {
        return this.firstFocus ? "visible" : "";
      }
    },
    watch: {
      query: function (e) {
        "" !== e && (this.prevQuery = e);
      }
    },
    mounted: function () {
      this.prevQuery = this.query;
    },
    methods: {
      renderResults: function (e) {
        var t = this,
            i = this.$createElement;
        return e.length ? e.map(function (e) {
          return t.renderResult(e);
        }) : i(ri);
      },
      renderCategoryResults: function (e) {
        var t,
            i,
            n,
            r,
            s = this,
            o = this.$createElement,
            a = (t = "category", e.reduce(function (e, i) {
          var n = i[t];
          return e[n] ? e[n].push(i) : e[n] = [i], e;
        }, {})),
            c = [];
        return i = a, n = function (e, t) {
          return c.push({
            name: t,
            items: e
          });
        }, r = function (e) {
          return n(i[e], e);
        }, Object.keys(i).forEach(r), Object.keys(i.__proto__).forEach(r), (c = function (e, t) {
          return e.sort(function (e, i) {
            return e[t] > i[t] ? 1 : -1;
          });
        }(c, "name")).length ? c.map(function (e) {
          return s.renderCategory(e);
        }) : o(ri);
      },
      renderResult: function (e) {
        return (0, this.$createElement)(si, {
          on: {
            selected: this.handleSelect
          },
          attrs: {
            item: e
          }
        });
      },
      filterResults: function (e, t, i) {
        return e.filter(function (e) {
          return e.title.toLowerCase().includes("" !== t ? t.toLowerCase() : i.toLowerCase());
        });
      },
      renderCategory: function (e) {
        var t = this,
            i = this.$createElement;
        return i("div", {
          class: this.classes("category")
        }, [i("div", {
          class: this.classes("name")
        }, [e.name]), i("div", {
          class: this.classes("results")
        }, [e.items.map(function (e) {
          return t.renderResult(e);
        })])]);
      },
      handleSelect: function (e) {
        this.$emit("selected", e);
      }
    },
    render: function () {
      var e = arguments[0];
      return e("div", {
        class: this.classes("results", "transition", "scale", "fade", this.visibleClass, this.transitionClass)
      }, [this.results]);
    }
  };

  function ai(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function ci(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ai(Object(i), !0).forEach(function (t) {
        li(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ai(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function li(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var di = {
    name: "SuiSearch",
    components: {
      Results: oi
    },
    mixins: [j],
    props: {
      value: {
        type: Object,
        default: function () {
          return null;
        },
        description: "Value of the search"
      },
      source: {
        type: Array,
        default: function () {
          return [];
        },
        description: "Specify a Javascript object which will be searched locally"
      },
      minCharacters: {
        type: Number,
        default: 1,
        descriptiom: "Minimum characters to query for results"
      },
      category: {
        type: Boolean,
        default: !1,
        description: "Whether to display search component in category mode."
      },
      input: {
        type: Boolean,
        default: !1,
        description: "Whether the search component should has input class."
      }
    },
    data: function () {
      return {
        focused: !1,
        firstSearch: null,
        firstFocus: !1,
        internalQuery: null
      };
    },
    computed: {
      resultsVisible: function () {
        return !!(this.internalQuery && this.internalQuery.length >= this.minCharacters && this.focused);
      }
    },
    watch: {
      internalQuery: function () {
        this.checkFirstSearch();
      }
    },
    created: function () {
      this.checkFirstSearch();
    },
    methods: {
      handleFocus: function () {
        this.focused = !0, this.firstFocus || (this.firstFocus = !0);
      },
      handleBlur: function () {
        this.focused = !1;
      },
      checkFirstSearch: function () {
        this.internalQuery && this.internalQuery.length >= this.minCharacters && (this.firstSearch = !0);
      },
      handleSelect: function (e) {
        this.$emit("input", e), this.internalQuery = e.title;
      },
      handleInput: function (e) {
        this.internalQuery = e.target.value;
      },
      renderInput: function () {
        var e = this.$createElement,
            t = e("input", {
          on: {
            blur: this.handleBlur,
            focus: this.handleFocus,
            input: this.handleInput
          },
          domProps: {
            value: this.value
          },
          class: this.classes("prompt"),
          attrs: ci({}, this.$attrs)
        });
        return t = this.input ? e("div", {
          class: this.classes("ui", "icon", "input")
        }, [t, this.$slots.icon]) : t;
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, {
        class: this.classes("ui", "search", this.category ? "category" : "")
      }, [this.renderInput(), this.firstSearch && e(oi, {
        attrs: {
          query: this.internalQuery,
          source: this.source,
          category: this.category,
          firstFocus: this.firstFocus,
          visible: this.resultsVisible
        },
        on: {
          selected: this.handleSelect
        }
      })]);
    }
  },
      ui = {
    name: "SuiSidebar",
    mixins: [j],
    props: {
      animation: H(["overlay", "push", "scale down", "uncover", "slide out", "slide along"]),
      direction: H(["top", "right", "bottom", "left"], {
        default: "left"
      }),
      visible: Boolean,
      width: H(["very thin", "thin", "wide", "very wide"])
    },
    data: function () {
      return {
        animating: !1
      };
    },
    watch: {
      visible: function () {
        var e = this;
        this.animating = !0, setTimeout(function () {
          e.animating = !1;
        }, 500);
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "ui sidebar ".concat(this.direction, " ").concat(this.width, " ").concat(this.animation || "").concat(this.visible ? " visible" : "").concat(this.animating ? " animating" : "")
      }]), [this.$slots.default]);
    }
  },
      hi = {
    name: "SuiSidebarPushable",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "pushable"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiSidebar"
    }
  },
      pi = {
    name: "SuiSidebarPusher",
    mixins: [j],
    props: {
      dimmed: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("pusher", this.dimmed && "dimmed")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiSidebar"
    }
  },
      mi = {
    inserted: function (e) {
      var t = document.createDocumentFragment(),
          i = Array.from(e.childNodes),
          n = e.parentNode,
          r = document.createComment("fragment tail");
      t.appendChild(r), i.forEach(function (e) {
        return t.appendChild(e);
      }), n.insertBefore(t, e), n.removeChild(e), i.forEach(function (t) {
        return fi(t, e);
      }), e.__hooks__ = {
        appendChild: e.appendChild,
        insertBefore: e.insertBefore,
        removeChild: e.removeChild
      }, e.appendChild = function (t) {
        var i = n.insertBefore(t, r);
        return t.parentNode !== e && fi(t, e), i;
      }, e.insertBefore = function (t, i) {
        var r = n.insertBefore(t, i);
        return t.parentNode !== e && fi(t, e), r;
      }, e.removeChild = function (e) {
        return gi(e), n.removeChild(e);
      };
    },
    unbind: function (e) {
      e.__hooks__ && (Object.keys(e.__hooks__).forEach(function (t) {
        e[t] = e.__hooks__[t];
      }), delete e.__hooks__);
    }
  },
      fi = function (e, t) {
    Object.defineProperty(e, "parentNode", {
      configurable: !0,
      writable: !1,
      value: t
    });
  },
      gi = function (e) {
    Object.defineProperty(e, "parentNode", {
      configurable: !0,
      writable: !0,
      value: null
    });
  },
      bi = {
    abstract: !0,
    directives: {
      fragment: mi
    },
    render: function (e) {
      return e("div", {
        attrs: {
          class: "v-fragment"
        },
        directives: [{
          name: "fragment"
        }]
      }, [this.$slots.default]);
    }
  },
      yi = ["top left", "top right", "bottom right", "bottom left", "right center", "left center", "top center", "bottom center"],
      vi = {
    name: "SuiPrivatePopupContainer",
    mixins: [j],
    props: {
      popupClass: String,
      triggerCoords: p ? [window.DOMRect, Object] : Object,
      position: String
    },
    data: function () {
      return {
        mountedPosition: this.position,
        mountedStyle: null
      };
    },
    mounted: function () {
      var e = this;
      this.$nextTick(function () {
        e.popupCoords = e.$refs.container.getBoundingClientRect(), e.setPopupStyle();
      });
    },
    methods: {
      computePopupStyle: function (e) {
        var t = {
          position: "absolute"
        };
        if (!p) return t;
        var i = this.offset,
            n = window,
            r = n.pageYOffset,
            s = n.pageXOffset,
            o = document.documentElement,
            a = o.clientWidth,
            c = o.clientHeight;
        if (e.includes("right")) t.right = Math.round(a - (this.triggerCoords.right + s)), t.left = "auto";else if (e.includes("left")) t.left = Math.round(this.triggerCoords.left + s), t.right = "auto";else {
          var l = (this.triggerCoords.width - this.popupCoords.width) / 2;
          t.left = Math.round(this.triggerCoords.left + l + s), t.right = "auto";
        }
        if (e.includes("top")) t.bottom = Math.round(c - (this.triggerCoords.top + r)), t.top = "auto";else if (e.includes("bottom")) t.top = Math.round(this.triggerCoords.bottom + r), t.bottom = "auto";else {
          var d = (this.triggerCoords.height + this.popupCoords.height) / 2;
          t.top = Math.round(this.triggerCoords.bottom + r - d), t.bottom = "auto";
          var u = this.popupCoords.width + 8;
          e.includes("right") ? t.right -= u : t.left -= u;
        }
        return i && ("number" == typeof t.right ? t.right -= i : t.left -= i), t;
      },
      isStyleInViewport: function (e) {
        var t = window,
            i = t.pageYOffset,
            n = t.pageXOffset,
            r = document.documentElement,
            s = r.clientWidth,
            o = r.clientHeight,
            a = {
          top: e.top,
          left: e.left,
          width: this.popupCoords.width,
          height: this.popupCoords.height
        };
        return "number" == typeof e.right && (a.left = s - e.right - a.width), "number" == typeof e.bottom && (a.top = o - e.bottom - a.height), !(a.top < i) && !(a.top + a.height > i + o) && !(a.left < n) && !(a.left + a.width > n + s);
      },
      setPopupStyle: function () {
        if (this.triggerCoords && this.popupCoords) {
          for (var e, t, i, n, r = this.position, s = this.computePopupStyle(r), o = (e = yi, t = r, e.filter(function (e) {
            return e !== t;
          })).concat([r]), a = 0; !this.isStyleInViewport(s) && a < o.length; a += 1) s = this.computePopupStyle(o[a]), r = o[a];

          i = s, n = function (e) {
            return "number" == typeof e ? "".concat(e, "px") : e;
          }, s = Object.keys(i).reduce(function (e, t) {
            return e[t] = n(i[t]), e;
          }, {}), this.mountedStyle = s, this.mountedPosition = r;
        }
      }
    },
    render: function () {
      var e = this,
          t = arguments[0],
          i = this.classes("ui", this.mountedPosition, this.popupClass, "popup", "transition visible");
      return t("portal", {
        attrs: {
          to: "semantic-ui-vue"
        }
      }, [t("div", {
        ref: "container",
        class: i,
        style: this.mountedStyle,
        on: {
          mouseover: function () {
            return e.$emit("mouseover");
          },
          mouseleave: function () {
            return e.$emit("mouseleave");
          }
        }
      }, [this.$slots.default])]);
    }
  },
      Si = {
    name: "SuiPopupHeader",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "header"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiPopup"
    }
  },
      wi = {
    name: "SuiPopupContent",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: "content"
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiPopup"
    }
  },
      Ai = {
    name: "SuiPopup",
    description: "A popup displays additional information on top of a page.",
    mixins: [j],
    props: {
      basic: {
        type: Boolean,
        description: "Display the popup without the pointing arrow."
      },
      content: {
        type: String,
        description: "Simple text content for the popover."
      },
      flowing: {
        type: Boolean,
        description: "A flowing Popup has no maximum width and continues to flow to fit its content."
      },
      header: {
        type: String,
        description: "Header displayed above the content in bold."
      },
      hoverable: {
        type: Boolean,
        description: "Whether the popup should not close on hover."
      },
      inverted: {
        type: Boolean,
        description: "Invert the colors of the Popup."
      },
      position: H(yi, {
        description: "Position for the popover.",
        default: "top left"
      }),
      size: H(["mini", "tiny", "small", "large", "huge"], {
        description: "Popup size."
      }),
      wide: H(["very"], {
        type: Boolean,
        description: "Popup width."
      })
    },
    data: function () {
      return {
        coords: null,
        open: !1
      };
    },
    mounted: function () {
      this.$slots.trigger[0].elm.addEventListener("mouseenter", this.handleOpen), this.$slots.trigger[0].elm.addEventListener("mouseleave", this.handleBlur);
    },
    methods: {
      handleOpen: function () {
        this.coords = this.$slots.trigger[0].elm.getBoundingClientRect(), this.open = !0, this.$emit("open");
      },
      handleBlur: function () {
        this.hoverable ? this.blurTimeout = setTimeout(this.close, 300) : this.close();
      },
      handleContainerHover: function () {
        this.hoverable && this.blurTimeout && clearTimeout(this.blurTimeout);
      },
      close: function () {
        this.open = !1, this.$emit("close");
      }
    },
    render: function () {
      var e = arguments[0];
      return e(bi, [this.$slots.trigger, this.open && e(vi, {
        on: {
          mouseover: this.handleContainerHover,
          mouseleave: this.handleBlur
        },
        attrs: {
          popupClass: this.classes(this.basic && "basic", this.flowing && "flowing", this.inverted && "inverted", this.size, this.wide, this.wide && "wide"),
          triggerCoords: this.coords,
          position: this.position,
          content: this.content
        }
      }, [this.header && e(Si, [this.header]), this.content && e(wi, [this.content]), this.$slots.default])]);
    }
  },
      Oi = {
    name: "SuiProgress",
    mixins: [j],
    props: {
      label: String,
      content: String,
      top: Boolean,
      bottom: Boolean,
      attached: Boolean,
      inverted: Boolean,
      progress: Boolean,
      indicating: Boolean,
      indeterminate: Boolean,
      size: H.Size(),
      color: H.Color(),
      state: H.State(),
      percent: {
        type: [Number, String],
        default: 50,
        validator: function (e) {
          return e >= 0 && e <= 100;
        }
      }
    },
    computed: {
      percentString: function () {
        return "".concat(this.percent, "%");
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", "progress", this.state, this.color, this.size, this.top && "top", this.bottom && "bottom", this.inverted && "inverted", this.attached && "attached", this.indicating && "indicating", this.indeterminate && "indeterminate"),
        attrs: {
          "data-percent": this.percent
        }
      }]), [e("div", {
        class: "bar",
        style: {
          width: this.percentString,
          "transition-duration": "300ms"
        }
      }, [this.progress && e("div", {
        class: "progress"
      }, [" ", this.percentString, " "])]), this.label && e("div", {
        class: "label"
      }, [this.label])]);
    }
  };

  function xi(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];

        return i;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  function Pi(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function Bi(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? Pi(Object(i), !0).forEach(function (t) {
        Ci(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : Pi(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function Ci(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var ji = {
    name: "SuiTab",
    props: {
      menu: {
        type: Object,
        default: function () {
          return {
            attached: !0,
            tabular: !0
          };
        }
      },
      menuPosition: H(["left", "right"], {
        description: "Menu Position"
      }),
      activeIndex: {
        type: [String, Number],
        default: 0
      }
    },
    data: function () {
      return {
        tabs: [],
        activeTab: null
      };
    },
    computed: {
      tabMenu: function () {
        var e = this,
            t = this.$createElement;
        return t("sui-menu", {
          props: Bi({}, this.menu)
        }, [this.tabs.map(function (i) {
          return t("a", {
            class: ["item", {
              active: i.active,
              disabled: i.disabled
            }],
            on: {
              click: function (t) {
                return e.openTab(t, i);
              }
            }
          }, [i.icon && t("sui-icon", {
            attrs: {
              name: i.icon
            }
          }), t("span", [i.title]), i.label && t("sui-label", [i.label])]);
        })]);
      }
    },
    watch: {
      activeIndex: function (e) {
        this.openTab(null, this.tabs[+e]);
      }
    },
    mounted: function () {
      if (!this.tabs.length) throw new Error("tab used without tab-pane");
      var e = this.tabs[this.activeIndex] || this.tabs[0];
      e.open(), this.activeTab = e;
    },
    methods: {
      addTab: function (e) {
        this.tabs.push(e);
      },
      openTab: function (e, t) {
        if (!t.disabled) {
          this.activeTab.close(), t.open();
          var i = this.tabs.indexOf(t);
          this.$emit("change", e, t, i), this.$emit("update:activeIndex", i), this.activeTab = t;
        }
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.$slots.default,
          i = [this.tabMenu, t];
      return "bottom" === this.menu.attached && i.reverse(), this.menu.vertical && (i = [e("sui-grid-column", {
        attrs: {
          width: 4
        }
      }, [this.tabMenu]), e("sui-grid-column", {
        attrs: {
          width: 12
        },
        class: "stretched"
      }, [t])], "right" !== this.menu.tabular && "right" !== this.menuPosition || i.reverse(), i = e("sui-grid", [e("sui-grid-row", [i])])), e("div", [Array.isArray(i) ? xi(i) : i]);
    }
  },
      Ei = {
    name: "SuiTabPane",
    meta: {
      parent: "SuiTab"
    },
    props: {
      title: {
        type: String,
        required: !0
      },
      icon: {
        type: String
      },
      label: {
        type: String
      },
      attached: {
        type: [Boolean, String],
        default: !0
      },
      loading: {
        type: Boolean,
        default: !1
      },
      disabled: {
        type: Boolean,
        default: !1
      }
    },
    data: function () {
      return {
        active: !1
      };
    },
    computed: {
      classList: function () {
        var e = ["ui", "tab", "segment", {
          loading: this.active && this.loading
        }, {
          attached: this.attached
        }, {
          active: this.active
        }];
        return "string" == typeof this.attached && e.push(this.attached), e;
      }
    },
    mounted: function () {
      try {
        this.findParent().addTab(this);
      } catch (e) {
        throw new Error("tab-pane was placed outside of tab component");
      }
    },
    methods: {
      findParent: function () {
        for (var e = this.$parent, t = ji.name; e.$options.name !== t;) e = e.$parent;

        return e;
      },
      open: function () {
        this.active = !0;
      },
      close: function () {
        this.active = !1;
      }
    },
    render: function () {
      var e = arguments[0];
      return this.active && e("div", {
        class: this.classList
      }, [this.$slots.default]);
    }
  },
      $i = {
    name: "SuiCard",
    mixins: [j],
    props: {},
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", "card")
      }]), [this.$slots.default]);
    }
  },
      Ti = {
    name: "SuiCardContent",
    mixins: [j],
    props: {
      extra: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.extra && "extra", "content")
      }]), [this.$slots.default, this.$slots.right && e("div", {
        class: "right floated"
      }, [this.$slots.right])]);
    },
    meta: {
      parent: "SuiCard"
    }
  },
      ki = {
    name: "SuiCardDescription",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("description")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiCard"
    }
  },
      Li = {
    name: "SuiCardGroup",
    mixins: [j],
    props: {
      itemsPerRow: H.Number(),
      stackable: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.num(this.itemsPerRow), this.stackable && "stackable", "cards")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiCard"
    }
  },
      Di = {
    name: "SuiCardHeader",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("header")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiCard"
    }
  },
      Ii = {
    name: "SuiCardMeta",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("meta")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiCard"
    }
  },
      Mi = {
    name: "SuiComment",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", "comment")
      }]), [this.$slots.default]);
    }
  },
      Fi = {
    name: "SuiCommentAction",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType("a");
      return e(t, l()([{}, this.getChildPropsAndListeners()]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      zi = {
    name: "SuiCommentActions",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("actions")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      Ri = {
    name: "SuiCommentAuthor",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("author")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      Ni = {
    name: "SuiCommentAvatar",
    mixins: [j],
    props: {
      src: String
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("avatar")
      }]), [e("img", {
        attrs: {
          src: this.src
        }
      })]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      Hi = {
    name: "SuiCommentContent",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("content")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      Vi = {
    name: "SuiCommentGroup",
    mixins: [j, E],
    props: {
      threaded: {
        type: Boolean,
        description: "A comment list can be threaded to showing the relationship between conversations.",
        default: !1
      },
      minimal: {
        type: Boolean,
        description: "Comments can hide extra information unless a user shows intent to interact with a comment.",
        default: !1
      },
      size: H.Size()
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType(),
          i = ["comments", this.threaded && "threaded", this.minimal && "minimal", this.size],
          n = this.getParentName();
      return "SuiComment" !== n && i.push("ui"), e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes.apply(this, i)
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      Gi = {
    name: "SuiCommentMetadata",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("metadata")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      qi = {
    name: "SuiCommentText",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("text")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiComment"
    }
  },
      _i = {
    name: "SuiFeedEvent",
    mixins: [j],
    description: "A feed contains an event",
    props: {
      content: {
        type: String,
        description: "Shorthand for SuiFeedContent"
      },
      image: {
        type: String,
        description: "An event can contain image label"
      },
      icon: {
        type: String,
        description: "An event can contain icon label"
      },
      date: {
        type: String,
        description: "Shorthand for SuiFeedDate"
      },
      summary: {
        type: String,
        description: "Shorthand for SuiFeedSummary"
      },
      extraImages: {
        type: Array,
        description: "Shorthand for SuiFeedExtra with images"
      },
      extraText: {
        type: String,
        description: "Shorthand for SuiFeedExtra with text"
      },
      meta: {
        type: String,
        description: "Shorthand for SuiFeedMeta"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType(),
          i = this.content || this.date || this.summary || this.extraImages || this.extraText || this.meta;
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("event")
      }]), [this.image && e(Zi, {
        attrs: {
          image: this.image
        }
      }), this.icon && e(Zi, {
        attrs: {
          icon: this.icon
        }
      }), i && e(Ki, {
        attrs: {
          content: this.content,
          date: this.date,
          summary: this.summary,
          extraImages: this.extraImages,
          extraText: this.extraText,
          meta: this.meta
        }
      }), this.$slots.default]);
    },
    meta: {
      parent: "SuiFeed"
    }
  };

  function Wi(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function Ui(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? Wi(Object(i), !0).forEach(function (t) {
        Qi(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : Wi(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function Qi(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  var Yi = {
    name: "SuiFeed",
    mixins: [j],
    description: "A feed presents user activity chronologically",
    props: {
      size: H(["small", "large"], {
        description: "A feed can have different sizes (small | large)"
      }),
      events: {
        type: Array,
        description: "Shorthand array of props for FeedEvent"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.size, "feed")
      }]), [this.$slots.default || this.events && this.events.map(function (t) {
        return e(_i, {
          props: Ui({}, t)
        });
      })]);
    }
  },
      Ki = {
    name: "SuiFeedContent",
    mixins: [j],
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      },
      date: {
        type: String,
        description: "Shorthand for SuiFeedDate"
      },
      summary: {
        type: String,
        description: "Shorthand for SuiFeedSummary"
      },
      extraImages: {
        type: Array,
        description: "Shorthand for SuiFeedExtra with images"
      },
      extraText: {
        type: String,
        description: "Shorthand for SuiFeedExtra with text"
      },
      meta: {
        type: String,
        description: "Shorthand for SuiFeedMeta"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("content")
      }]), [this.$slots.default || [this.date && e(Xi, {
        attrs: {
          content: this.date
        }
      }), this.content, this.summary && e(nn, {
        attrs: {
          content: this.summary
        }
      }), this.extraText && e(Ji, {
        attrs: {
          text: !0,
          content: this.extraText
        }
      }), this.extraImages && e(Ji, {
        attrs: {
          images: this.extraImages
        }
      }), this.meta && e(tn, {
        attrs: {
          content: this.meta
        }
      })]]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      Xi = {
    name: "SuiFeedDate",
    mixins: [j],
    description: "An event or an event summary can contain a date",
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("date")
      }]), [this.$slots.default || this.content]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      Ji = {
    name: "SuiFeedExtra",
    mixins: [j],
    description: "A feed can contain an extra content",
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      },
      images: {
        type: [Array, Boolean],
        description: "An event can contain additional information like a set of images"
      },
      text: {
        type: Boolean,
        description: "An event can contain additional text information"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType(),
          i = Array.isArray(this.images) && this.images.map(function (t) {
        return e($e, {
          attrs: {
            src: t
          }
        });
      }),
          n = [this.content, i];
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.images && "images", (this.text || this.content) && "text", "extra")
      }]), [this.$slots.default || n]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      Zi = {
    name: "SuiFeedLabel",
    mixins: [j],
    description: "An event can contain an image or icon label",
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      },
      image: {
        type: String,
        description: "An event can contain image label"
      },
      icon: {
        type: String,
        description: "An event can contain icon label"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("label")
      }]), [this.$slots.default || [this.content, this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.image && e($e, {
        attrs: {
          src: this.image
        }
      })]]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      en = {
    name: "SuiFeedLike",
    mixins: [j],
    description: "A feed can contain a like element",
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      },
      icon: {
        type: String,
        description: "Shorthand for icon. Mutually exclusive with children"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("a");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("like")
      }]), [this.$slots.default || [this.icon && e(Y, {
        attrs: {
          name: this.icon
        }
      }), this.content]]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      tn = {
    name: "SuiFeedMeta",
    mixins: [j],
    description: "A feed can contain a meta",
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      },
      like: {
        type: String,
        description: "Shorthand for SuiFeedLike"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("meta")
      }]), [this.$slots.default || [this.like && e(en, {
        attrs: {
          content: this.like
        }
      }), this.content]]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      nn = {
    name: "SuiFeedSummary",
    mixins: [j],
    description: "A feed can contain a summary",
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      },
      date: {
        type: String,
        description: "Shorthand for SuiFeedDate"
      },
      user: {
        type: String,
        description: "Shorthand for SuiFeedUser"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("summary")
      }]), [this.$slots.default || [this.user && e(rn, {
        attrs: {
          content: this.user
        }
      }), this.content, this.date && e(Xi, {
        attrs: {
          content: this.date
        }
      })]]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      rn = {
    name: "SuiFeedUser",
    mixins: [j],
    description: "A feed can contain a user element",
    props: {
      content: {
        type: String,
        description: "Shorthand for primary content"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType("a");
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("user")
      }]), [this.$slots.default || this.content]);
    },
    meta: {
      parent: "SuiFeed"
    }
  },
      sn = {
    name: "SuiItem",
    mixins: [j],
    description: "An item view presents large collections of site content for display",
    props: {
      href: {
        type: String,
        description: 'Specifies a linked document, resource, or location. Only useful if the ItemGroup contains the "link" class.'
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.href ? "a" : this.getElementType();
      return e(t, {
        attrs: {
          href: this.href
        },
        class: this.classes("item")
      }, [this.$slots.default]);
    }
  },
      on = {
    name: "SuiItemGroup",
    mixins: [j],
    description: "A group of items",
    props: {
      unstackable: {
        type: Boolean,
        description: "A table can specify how it stacks items responsively"
      },
      divided: {
        type: Boolean,
        description: "Items can be divided to better distinguish between grouped content"
      },
      relaxed: H(["very"], {
        type: Boolean,
        description: "A group of items can relax its padding to provide more negative space"
      }),
      link: {
        type: Boolean,
        description: "An item can be formatted so that the entire contents link to another page"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, {
        class: this.classes("ui", this.unstackable && "unstackable", this.divided && "divided", this.relaxed, this.relaxed && "relaxed", this.link && "link", "items")
      }, [this.$slots.default]);
    },
    meta: {
      parent: "SuiItem"
    }
  },
      an = {
    name: "SuiItemContent",
    mixins: [j],
    description: "An item can contain content",
    props: {
      verticalAlign: H.VerticalAlign({
        description: "Content can specify its vertical alignment"
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, {
        class: this.classes(this.verticalAlign && "".concat(this.verticalAlign, " aligned"), "content")
      }, [this.$slots.default]);
    },
    meta: {
      parent: "SuiItem"
    }
  },
      cn = {
    name: "SuiItemImage",
    mixins: [j],
    description: "An item can contain an image",
    props: {
      src: {
        type: String,
        required: !0,
        description: "Specifies the URL of the image"
      },
      size: H(["mini", "tiny", "small", "medium", "large", "big", "huge", "massive"], {
        type: String,
        description: "An image may appear at different sizes (mini, tiny, small, medium, large, big, huge, massive)"
      }),
      href: {
        type: String,
        description: "Specifies a linked document, resource, or location"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.href ? "a" : this.getElementType();
      return e(t, {
        attrs: {
          href: this.href
        },
        class: this.classes(this.size && "ui ".concat(this.size), "image")
      }, [e("img", {
        attrs: {
          src: this.src
        }
      })]);
    },
    meta: {
      parent: "SuiItem"
    }
  },
      ln = {
    name: "SuiItemHeader",
    mixins: [j],
    description: "An item can contain a header",
    props: {
      href: {
        type: String,
        description: "Specifies a linked document, resource, or location"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.href ? "a" : this.getElementType();
      return e(t, {
        attrs: {
          href: this.href
        },
        class: this.classes("header")
      }, [this.$slots.default]);
    },
    meta: {
      parent: "SuiItem"
    }
  },
      dn = {
    name: "SuiItemMeta",
    mixins: [j],
    description: "An item can contain content metadata",
    props: {},
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, {
        class: this.classes("meta")
      }, [this.$slots.default]);
    },
    meta: {
      parent: "SuiItem"
    }
  },
      un = {
    name: "SuiItemDescription",
    mixins: [j],
    description: "An item can contain a description with a single or multiple paragraphs",
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, {
        class: this.classes("description")
      }, [this.$slots.default]);
    },
    meta: {
      parent: "SuiItem"
    }
  },
      hn = {
    name: "SuiItemExtra",
    mixins: [j],
    description: "An item can contain extra content meant to be formatted separately from the main content",
    props: {},
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, {
        class: this.classes("extra")
      }, [this.$slots.default]);
    },
    meta: {
      parent: "SuiItem"
    }
  },
      pn = {
    name: "SuiStatistic",
    mixins: [E, j],
    props: {
      horizontal: {
        type: Boolean,
        description: "Present measurement horizontally"
      },
      color: H.Color(),
      size: H.Size(),
      floated: H(["left", "right"]),
      inverted: {
        type: Boolean,
        description: "Should the colors be inverted"
      }
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.getUIClass(), "statistic", this.color, this.size, this.floated && "".concat(this.floated, " floated"), this.inverted && "inverted", this.horizontal && "horizontal")
      }]), [this.$slots.default]);
    }
  },
      mn = {
    name: "SuiStatisticValue",
    mixins: [j],
    props: {
      text: Boolean
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.text && "text", "value")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiStatistic"
    }
  },
      fn = {
    name: "SuiStatisticLabel",
    mixins: [j],
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("label")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiStatistic"
    }
  },
      gn = {
    name: "SuiStatisticsGroup",
    mixins: [j],
    props: {
      horizontal: Boolean,
      columns: H.Number()
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes(this.num(this.columns), "ui", "statistics", this.horizontal && "horizontal")
      }]), [this.$slots.default]);
    },
    meta: {
      parent: "SuiStatistic"
    }
  },
      bn = {
    name: "SuiAdvertisement",
    description: "An advertisement view presents thrif-party promotional content",
    mixins: [j],
    props: {
      centered: {
        type: Boolean,
        description: "Center the advertisement",
        default: !1
      },
      test: {
        type: [String, Number],
        description: "Text to be displayed on the advertisement."
      },
      unit: H(["medium rectangle", "large rectangle", "small rectangle", "vertical rectangle", "leaderboard", "half page", "mobile leaderboard", "mobile banner", "button", "square button", "small button", "skyscraper", "wide skyscraper", "banner", "vertical banner", "top banner", "half banner", "leaderboard", "large leaderboard", "billboard", "panorama", "netboard"], {
        description: "Define the size of the advertisement",
        type: String,
        required: !0
      })
    },
    render: function () {
      var e = arguments[0],
          t = this.getElementType();
      return e(t, l()([{}, this.getChildPropsAndListeners(), {
        class: this.classes("ui", this.centered ? "centered" : null, this.unit, this.test ? "test" : null, "ad"),
        attrs: {
          "data-text": this.test
        }
      }]), [this.$slots.default]);
    }
  };

  function yn(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, n);
    }

    return i;
  }

  function vn(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  i.d(t, "Breadcrumb", function () {
    return V;
  }), i.d(t, "BreadcrumbDivider", function () {
    return M;
  }), i.d(t, "BreadcrumbSection", function () {
    return I;
  }), i.d(t, "Form", function () {
    return G;
  }), i.d(t, "FormField", function () {
    return q;
  }), i.d(t, "FormFields", function () {
    return _;
  }), i.d(t, "Grid", function () {
    return W;
  }), i.d(t, "GridColumn", function () {
    return U;
  }), i.d(t, "GridRow", function () {
    return Q;
  }), i.d(t, "Menu", function () {
    return ee;
  }), i.d(t, "MenuHeader", function () {
    return te;
  }), i.d(t, "MenuItem", function () {
    return K;
  }), i.d(t, "MenuMenu", function () {
    return ie;
  }), i.d(t, "Message", function () {
    return ae;
  }), i.d(t, "MessageContent", function () {
    return ne;
  }), i.d(t, "MessageHeader", function () {
    return re;
  }), i.d(t, "MessageItem", function () {
    return se;
  }), i.d(t, "MessageList", function () {
    return oe;
  }), i.d(t, "Table", function () {
    return ce;
  }), i.d(t, "TableBody", function () {
    return le;
  }), i.d(t, "TableCell", function () {
    return de;
  }), i.d(t, "TableFooter", function () {
    return ue;
  }), i.d(t, "TableHeader", function () {
    return he;
  }), i.d(t, "TableHeaderCell", function () {
    return pe;
  }), i.d(t, "TableRow", function () {
    return me;
  }), i.d(t, "floated", function () {
    return fe;
  }), i.d(t, "Button", function () {
    return ge;
  }), i.d(t, "ButtonContent", function () {
    return be;
  }), i.d(t, "ButtonGroup", function () {
    return ye;
  }), i.d(t, "ButtonOr", function () {
    return Ae;
  }), i.d(t, "Container", function () {
    return Oe;
  }), i.d(t, "Divider", function () {
    return xe;
  }), i.d(t, "Flag", function () {
    return Pe;
  }), i.d(t, "Header", function () {
    return Be;
  }), i.d(t, "HeaderContent", function () {
    return Ce;
  }), i.d(t, "HeaderSubheader", function () {
    return je;
  }), i.d(t, "Icon", function () {
    return Y;
  }), i.d(t, "IconGroup", function () {
    return Ee;
  }), i.d(t, "Image", function () {
    return $e;
  }), i.d(t, "ImageGroup", function () {
    return Te;
  }), i.d(t, "Input", function () {
    return Ie;
  }), i.d(t, "Label", function () {
    return Me;
  }), i.d(t, "LabelDetail", function () {
    return Fe;
  }), i.d(t, "List", function () {
    return Ge;
  }), i.d(t, "ListContent", function () {
    return He;
  }), i.d(t, "ListDescription", function () {
    return qe;
  }), i.d(t, "ListHeader", function () {
    return _e;
  }), i.d(t, "ListIcon", function () {
    return Ne;
  }), i.d(t, "ListItem", function () {
    return Ve;
  }), i.d(t, "ListList", function () {
    return We;
  }), i.d(t, "Loader", function () {
    return Ue;
  }), i.d(t, "Rail", function () {
    return Qe;
  }), i.d(t, "Reveal", function () {
    return Ye;
  }), i.d(t, "RevealContent", function () {
    return Ke;
  }), i.d(t, "Segment", function () {
    return Xe;
  }), i.d(t, "Segments", function () {
    return Je;
  }), i.d(t, "Step", function () {
    return it;
  }), i.d(t, "StepContent", function () {
    return tt;
  }), i.d(t, "StepDescription", function () {
    return Ze;
  }), i.d(t, "StepGroup", function () {
    return ot;
  }), i.d(t, "StepTitle", function () {
    return et;
  }), i.d(t, "Accordion", function () {
    return lt;
  }), i.d(t, "AccordionContent", function () {
    return pt;
  }), i.d(t, "AccordionTitle", function () {
    return gt;
  }), i.d(t, "Checkbox", function () {
    return bt;
  }), i.d(t, "Dimmer", function () {
    return yt;
  }), i.d(t, "DimmerDimmable", function () {
    return vt;
  }), i.d(t, "Dropdown", function () {
    return zt;
  }), i.d(t, "DropdownDivider", function () {
    return Rt;
  }), i.d(t, "DropdownHeader", function () {
    return Nt;
  }), i.d(t, "DropdownItem", function () {
    return Ot;
  }), i.d(t, "DropdownMenu", function () {
    return jt;
  }), i.d(t, "Embed", function () {
    return Ht;
  }), i.d(t, "Modal", function () {
    return Yt;
  }), i.d(t, "ModalActions", function () {
    return Kt;
  }), i.d(t, "ModalContent", function () {
    return Xt;
  }), i.d(t, "ModalDescription", function () {
    return Jt;
  }), i.d(t, "ModalHeader", function () {
    return Zt;
  }), i.d(t, "Rating", function () {
    return ni;
  }), i.d(t, "Search", function () {
    return di;
  }), i.d(t, "Sidebar", function () {
    return ui;
  }), i.d(t, "SidebarPushable", function () {
    return hi;
  }), i.d(t, "SidebarPusher", function () {
    return pi;
  }), i.d(t, "Popup", function () {
    return Ai;
  }), i.d(t, "PopupContent", function () {
    return wi;
  }), i.d(t, "PopupHeader", function () {
    return Si;
  }), i.d(t, "Progress", function () {
    return Oi;
  }), i.d(t, "TabPane", function () {
    return Ei;
  }), i.d(t, "Tab", function () {
    return ji;
  }), i.d(t, "Card", function () {
    return $i;
  }), i.d(t, "CardContent", function () {
    return Ti;
  }), i.d(t, "CardDescription", function () {
    return ki;
  }), i.d(t, "CardGroup", function () {
    return Li;
  }), i.d(t, "CardHeader", function () {
    return Di;
  }), i.d(t, "CardMeta", function () {
    return Ii;
  }), i.d(t, "Comment", function () {
    return Mi;
  }), i.d(t, "CommentAction", function () {
    return Fi;
  }), i.d(t, "CommentActions", function () {
    return zi;
  }), i.d(t, "CommentAuthor", function () {
    return Ri;
  }), i.d(t, "CommentAvatar", function () {
    return Ni;
  }), i.d(t, "CommentContent", function () {
    return Hi;
  }), i.d(t, "CommentGroup", function () {
    return Vi;
  }), i.d(t, "CommentMetadata", function () {
    return Gi;
  }), i.d(t, "CommentText", function () {
    return qi;
  }), i.d(t, "Feed", function () {
    return Yi;
  }), i.d(t, "FeedContent", function () {
    return Ki;
  }), i.d(t, "FeedDate", function () {
    return Xi;
  }), i.d(t, "FeedEvent", function () {
    return _i;
  }), i.d(t, "FeedExtra", function () {
    return Ji;
  }), i.d(t, "FeedLabel", function () {
    return Zi;
  }), i.d(t, "FeedLike", function () {
    return en;
  }), i.d(t, "FeedMeta", function () {
    return tn;
  }), i.d(t, "FeedSummary", function () {
    return nn;
  }), i.d(t, "FeedUser", function () {
    return rn;
  }), i.d(t, "Item", function () {
    return sn;
  }), i.d(t, "ItemGroup", function () {
    return on;
  }), i.d(t, "ItemContent", function () {
    return an;
  }), i.d(t, "ItemImage", function () {
    return cn;
  }), i.d(t, "ItemHeader", function () {
    return ln;
  }), i.d(t, "ItemMeta", function () {
    return dn;
  }), i.d(t, "ItemDescription", function () {
    return un;
  }), i.d(t, "ItemExtra", function () {
    return hn;
  }), i.d(t, "Statistic", function () {
    return pn;
  }), i.d(t, "StatisticValue", function () {
    return mn;
  }), i.d(t, "StatisticLabel", function () {
    return fn;
  }), i.d(t, "StatisticGroup", function () {
    return gn;
  }), i.d(t, "Advertisement", function () {
    return bn;
  });

  var Sn = function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? yn(Object(i), !0).forEach(function (t) {
        vn(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : yn(Object(i)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }({}, n, {}, s, {}, o, {}, a);

  t.default = function (e) {
    Object.values(Sn).forEach(function (t) {
      return e.component(t.name, t);
    }), Object.values(r).forEach(function (t) {
      return e.directive(t.name, t);
    });
  };
}]);
},{}],"assets/style/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _semanticUiVue = _interopRequireDefault(require("semantic-ui-vue"));

require("../assets/style/style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_semanticUiVue.default);

new _vue.default({
  render: function render(h) {
    return h(_App.default);
  }
}).$mount('#app');
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./App.vue":"src/App.vue","semantic-ui-vue":"node_modules/semantic-ui-vue/dist/commonjs/semantic-ui-vue.js","../assets/style/style.css":"assets/style/style.css"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52848" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map