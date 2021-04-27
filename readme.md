# Vue Simple Custom Select

A simple Vue component for customized and customizable checkboxes.

[Demo available here](https://codepen.io/Sinuto/pen/yLgrerj)
## <a id="get-started"></a> Get started

````sh
npm i vue-simple-custom-checkbox
````

You can then use it by importing it in your chosen Vue project.

````vue
<template>
 <vue-simple-checkbox class="my-checkbox" v-model="isChecked" />
</template>

<script>
import VueSimpleCheckbox from 'vue-simple-custom-checkbox'

export default {
  name:  'Your component',
  components: {
    VueSimpleCheckbox 
  },
  data() {
    return {
      isChecked: false
    }
  }
}
</script>

<style lang="scss" scoped>
// Customizing styles
.my-checkbox {
  --input-size: 3em;
}
</style>
````

## Props

| Name | Default | Description |
|--|--|--|
| `checked` | `false` | The default checked status |
| `disabled` | `false` | If the checkbox should be disabled |
| `id` | `''` | The optionnal id of the checkbox|
| `name` | `''` | Optionnal name of the input |
| `title` | `''` | Optionnal title of the input |

## V-model

The component uses a custom model, it is binded to the `checked` prop and to the `input` event.

**Therefore** you do not have to use the prop `checked` or listen to `input`, simply bind a `v-model` like in [this example](#get-started).

## Styles

The components uses only a few styles that can be easily changed and adapted.

The values can be changed using the custom css properties listed below.

> Every class is nested inside `.vue-simple-checkbox-container`.

> The `font-size` is set to `62.5%` by default on the container, with a 16px root font-size, `1em` is then equal to 10px.

### The container

| Property | Description | Default |
|----------|---------|-------------|
| `--font-size` | The `font-size` inside the container | `62.5%`

### The input

| Property | Description | Default |
|----------|---------|-------------|
| `--input-size` | The size of the custom checkbox | `2em`

### The borders

| Property | Description | Default |
|------|-------------|-------------|
| `--border-width` | The width of the custom checkbox's border | `.1em`
| `--border-radius` | The radius of the checkbox's border | `.5em`
| `--border-style` | The style of the checkbox's border | `solid`

### The transitions

| Property | Description | Default |
|------|-------------|-------------|
| `--default-bg-transition` | The background transition between checked and unchecked | `background-color .1s ease-in`
| `--default-opacity-transition` | The icon's transition between opacity 0 and 1 | `opacity 0.3s ease-in`

### The Colors

| Property | Description | Default |
|------|-------------|-------------|
| `--icon-color` | The color of the icon | `white` |
| `--primary` | The background color of the checkbox | `#3B82F6` |
| `--secondary` | The color used for the focus state | `#93C5FD` |

### The Focus State

| Property | Description | Default |
|------|-------------|-------------|
| `--outline-width` | The desired width of the outline | `.2em` |
| `--offset-width` | The offset's width, for no offset, set to it `0` | `.1em` |
| `--offset-color` | The color of the offset | `white` |

### Side notes

The component is originally made for my personnal use and therefore may contain bugs (that can be reported on the [GitHub repo](https://github.com/nicolassutter/vue-simple-custom-checkbox)).
