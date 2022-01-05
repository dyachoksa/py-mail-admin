<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        type="checkbox"
        class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
        v-bind="$attrs"
        v-model="value"
      />
    </div>
    <div class="ml-3 text-sm">
      <label
        v-if="label"
        v-html="label"
        :for="id"
        class="font-medium text-gray-700"
      ></label>
      <p v-if="description" v-html="description" class="text-gray-500"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "XCheckbox",
  inheritAttrs: false,

  props: ["modelValue", "label", "description"],

  emits: ["update:modelValue"],

  computed: {
    id() {
      return `id-${this.$attrs["name"]}`;
    },
    value: {
      get() {
        return this.$props.modelValue;
      },
      set(value: any) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>
