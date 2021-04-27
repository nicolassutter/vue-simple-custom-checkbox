<script lang="ts">
import Vue from 'vue';
import VueSimpleCustomCheckbox from '@/vue-simple-custom-checkbox.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueSimpleCustomCheckbox
  }
});
</script>

<template>
  <div id="app">
    <vue-simple-custom-checkbox />
  </div>
</template>
