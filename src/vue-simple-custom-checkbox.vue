<template>
  <div class="vue-simple-checkbox-container">
    <input
      :id="id || `vue-simple-checkbox-${uid}`"
      :disabled="disabled"
      :name="name"
      :title="title"
      class="vue-simple-checkbox"
      type="checkbox"
      v-bind="ariaAttrs"
      v-model="isChecked"
      @input="$emit('input', $event.target.checked)"
    >
    <span class="vue-simple-check">
      <IconCheck class="vue-simple-checkbox-check-icon" />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconCheck from './icons/check.vue'

export default Vue.extend({
  name: 'VueSimpleCheckbox',

  components: {
    IconCheck
  },

  data () {
    return {
      isChecked: false
    }
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
    uid () {
      const that = this as any
      return that._uid + Math.floor(Math.random() * 1000)
    },

    /**
     * Returns every Aria attributes in an object
     */
    ariaAttrs () {
      type Aria = [string, string]
      const aria = Object
        .entries(this.$attrs)
        .map(([key, value]) => key.includes('aria') && [key, value])
        .filter(value => value) as Array<Aria>
      return (aria.length && Object.fromEntries(aria)) || {}
    }
  },

  mounted () {
    /**
     * Sets the default value
     */
    this.isChecked = this.checked
  }
})
</script>

<style lang="scss" scoped>
.vue-simple-checkbox-container {
  --input-size: 2em;
  --border-width: .1em;
  --border-radius: .5em;
  --border-style: solid;
  --default-bg-color: white;

  --default-bg-transition: background-color .1s ease-in;
  --default-opacity-transition: opacity 0.3s ease-in;

  --font-size: 62.5%;

  --icon-color: white;
  --primary: #3B82F6;
  --secondary: #93C5FD;

  --outline-width: .2em;
  --offset-color: white;
  --offset-width: .1em;
  --final-width: calc(var(--offset-width) + var(--outline-width));
  --offset-outline: 0 0 0 var(--offset-width) var(--offset-color);
  --default-outline: 0 0 0 var(--final-width) var(--secondary);

  position: relative;
  font-size: var(--font-size);
  height: var(--input-size);
  width: var(--input-size);

  .vue-simple-check {
    border: var(--border-width) var(--primary) var(--border-style);
    background-color: var(--default-bg-color);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    border-radius: var(--border-radius);
    display: block;
    transition: var(--default-bg-transition);
  }

  .vue-simple-checkbox-check-icon {
    transition: var(--default-opacity-transition);
    opacity: 0;
    width: 100%;
    color: var(--icon-color);
  }

  .vue-simple-checkbox:checked + .vue-simple-check {
    background-color: var(--primary);

    .vue-simple-checkbox-check-icon {
      opacity: 1;
    }
  }

  .vue-simple-checkbox:focus + .vue-simple-check {
    box-shadow: var(--offset-outline), var(--default-outline);
  }

  .vue-simple-checkbox {
    width: 100%;
    height: 100%;
    opacity: 0;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;

    &:focus {
      outline: none;
    }
  }
}
</style>
