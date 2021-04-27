'use strict';var Vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue);function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    staticClass: "w-6 h-6",
    attrs: {
      "fill": "none",
      "stroke": "currentColor",
      "viewBox": "0 0 24 24",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_vm._ssrNode("<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path>")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-5db7e9fe";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, {}, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);var script = Vue__default['default'].extend({
  name: 'VueSimpleCheckbox',
  components: {
    IconCheck: __vue_component__$1
  },
  data: function data() {
    return {
      isChecked: false
    };
  },
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    /**
     * Default value of the checkbox
     */
    checked: {
      type: Boolean,
      default: false
    },

    /**
     * Optionnal id of the checkbox
     */
    id: {
      type: String,
      default: ''
    },

    /**
     * If the checkbox should be disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Optionnal name of the input
     */
    name: {
      type: String,
      default: ''
    },

    /**
     * Optionnal title of the input
     */
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * Generates a unique id
     */
    uid: function uid() {
      var that = this;
      return that._uid + Math.floor(Math.random() * 1000);
    },

    /**
     * Returns every Aria attributes in an object
     */
    ariaAttrs: function ariaAttrs() {
      var aria = Object.entries(this.$attrs).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return key.includes('aria') && [key, value];
      }).filter(function (value) {
        return value;
      });
      return aria.length && Object.fromEntries(aria) || {};
    }
  },
  mounted: function mounted() {
    /**
     * Sets the default value
     */
    this.isChecked = this.checked;
  }
});function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-simple-checkbox-container"
  }, [_vm._ssrNode("<input" + _vm._ssrAttr("id", _vm.id || "vue-simple-checkbox-" + _vm.uid) + _vm._ssrAttr("disabled", _vm.disabled) + _vm._ssrAttr("name", _vm.name) + _vm._ssrAttr("title", _vm.title) + " type=\"checkbox\"" + _vm._ssrAttr("checked", Array.isArray(_vm.isChecked) ? _vm._i(_vm.isChecked, null) > -1 : _vm.isChecked) + _vm._ssrAttrs(_vm.ariaAttrs) + " class=\"vue-simple-checkbox\"> "), _vm._ssrNode("<span class=\"vue-simple-check\">", "</span>", [_c('IconCheck', {
    staticClass: "vue-simple-checkbox-check-icon"
  })], 1)], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-76edf4dd_0", {
    source: ".vue-simple-checkbox-container{--input-size:2em;--border-width:.1em;--border-radius:.5em;--border-style:solid;--default-bg-color:white;--default-bg-transition:background-color .1s ease-in;--default-opacity-transition:opacity 0.3s ease-in;--font-size:62.5%;--icon-color:white;--primary:#3B82F6;--secondary:#93C5FD;--outline-width:.2em;--offset-color:white;--offset-width:.1em;--final-width:calc(var(--offset-width) + var(--outline-width));--offset-outline:0 0 0 var(--offset-width) var(--offset-color);--default-outline:0 0 0 var(--final-width) var(--secondary);position:relative;font-size:var(--font-size);height:var(--input-size);width:var(--input-size)}.vue-simple-checkbox-container .vue-simple-check{border:var(--border-width) var(--primary) var(--border-style);background-color:var(--default-bg-color);width:100%;height:100%;position:absolute;top:0;left:0;pointer-events:none;border-radius:var(--border-radius);display:block;transition:var(--default-bg-transition)}.vue-simple-checkbox-container .vue-simple-checkbox-check-icon{transition:var(--default-opacity-transition);opacity:0;width:100%;color:var(--icon-color)}.vue-simple-checkbox-container .vue-simple-checkbox:checked+.vue-simple-check{background-color:var(--primary)}.vue-simple-checkbox-container .vue-simple-checkbox:checked+.vue-simple-check .vue-simple-checkbox-check-icon{opacity:1}.vue-simple-checkbox-container .vue-simple-checkbox:focus+.vue-simple-check{box-shadow:var(--offset-outline),var(--default-outline)}.vue-simple-checkbox-container .vue-simple-checkbox{width:100%;height:100%;opacity:0;display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0}.vue-simple-checkbox-container .vue-simple-checkbox:focus{outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-76edf4dd";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueSimpleCustomCheckbox', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;