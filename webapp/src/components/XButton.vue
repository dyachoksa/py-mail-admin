<template>
  <Component
    :is="is"
    class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="{
      'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500':
        color === 'primary',
      'text-gray-800 hover:bg-gray-50 focus:ring-gray-100': color === 'white',
    }"
  >
    <slot />
  </Component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "XButton",

  props: {
    is: {
      required: false,
      default: "button",
    },
    color: {
      required: false,
      default: "primary",
    },
  },
});
</script>
