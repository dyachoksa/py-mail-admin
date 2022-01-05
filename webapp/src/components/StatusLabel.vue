<template>
  <span
    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
    :class="{
      'bg-green-100 text-green-800': isActive,
      'bg-gray-100 text-gray-800': !isActive,
    }"
  >
    {{ isActive ? "Active" : "Disabled" }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatusLabel",

  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
