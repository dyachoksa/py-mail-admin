<template>
  <router-link
    v-bind="$props"
    class="py-2 px-3 text-gray-700 rounded-md hover:bg-gray-50"
    active-class="bg-gray-100 hover:bg-gray-100"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavLink",
});
</script>
