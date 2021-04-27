import Vue from 'vue';

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

/* script */

/* template */
var __vue_render__$1 = function () {
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
  }, [_c('path', {
    attrs: {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      "d": "M5 13l4 4L19 7"
    }
  })]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, {}, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var script = Vue.extend({
  name: 'VueSimpleCheckbox',
  components: {
    IconCheck: __vue_component__$1
  },

  data() {
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
    uid() {
      const that = this;
      return that._uid + Math.floor(Math.random() * 1000);
    },

    /**
     * Returns every Aria attributes in an object
     */
    ariaAttrs() {
      const aria = Object.entries(this.$attrs).map(([key, value]) => key.includes('aria') && [key, value]).filter(value => value);
      return aria.length && Object.fromEntries(aria) || {};
    }

  },

  mounted() {
    /**
     * Sets the default value
     */
    this.isChecked = this.checked;
  }

});

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-simple-checkbox-container"
  }, [_c('input', _vm._b({
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.isChecked,
      expression: "isChecked"
    }],
    staticClass: "vue-simple-checkbox",
    attrs: {
      "id": _vm.id || "vue-simple-checkbox-" + _vm.uid,
      "disabled": _vm.disabled,
      "name": _vm.name,
      "title": _vm.title,
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.isChecked) ? _vm._i(_vm.isChecked, null) > -1 : _vm.isChecked
    },
    on: {
      "input": function ($event) {
        return _vm.$emit('input', $event.target.checked);
      },
      "change": function ($event) {
        var $$a = _vm.isChecked,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.isChecked = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.isChecked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.isChecked = $$c;
        }
      }
    }
  }, 'input', _vm.ariaAttrs, false)), _vm._v(" "), _c('span', {
    staticClass: "vue-simple-check"
  }, [_c('IconCheck', {
    staticClass: "vue-simple-checkbox-check-icon"
  })], 1)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-76edf4dd_0", {
    source: ".vue-simple-checkbox-container{--input-size:2em;--border-width:.1em;--border-radius:.5em;--border-style:solid;--default-bg-color:white;--default-bg-transition:background-color .1s ease-in;--default-opacity-transition:opacity 0.3s ease-in;--font-size:62.5%;--icon-color:white;--primary:#3B82F6;--secondary:#93C5FD;--outline-width:.2em;--offset-color:white;--offset-width:.1em;--final-width:calc(var(--offset-width) + var(--outline-width));--offset-outline:0 0 0 var(--offset-width) var(--offset-color);--default-outline:0 0 0 var(--final-width) var(--secondary);position:relative;font-size:var(--font-size);height:var(--input-size);width:var(--input-size)}.vue-simple-checkbox-container .vue-simple-check{border:var(--border-width) var(--primary) var(--border-style);background-color:var(--default-bg-color);width:100%;height:100%;position:absolute;top:0;left:0;pointer-events:none;border-radius:var(--border-radius);display:block;transition:var(--default-bg-transition)}.vue-simple-checkbox-container .vue-simple-checkbox-check-icon{transition:var(--default-opacity-transition);opacity:0;width:100%;color:var(--icon-color)}.vue-simple-checkbox-container .vue-simple-checkbox:checked+.vue-simple-check{background-color:var(--primary)}.vue-simple-checkbox-container .vue-simple-checkbox:checked+.vue-simple-check .vue-simple-checkbox-check-icon{opacity:1}.vue-simple-checkbox-container .vue-simple-checkbox:focus+.vue-simple-check{box-shadow:var(--offset-outline),var(--default-outline)}.vue-simple-checkbox-container .vue-simple-checkbox{width:100%;height:100%;opacity:0;display:block;position:absolute;top:0;left:0;right:0;bottom:0;margin:0}.vue-simple-checkbox-container .vue-simple-checkbox:focus{outline:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueSimpleCustomCheckbox', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
