<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1 border-b border-gray-300 focus-within:border-blue-600">
      <p v-if="description" v-html="description" class="py-1 text-sm text-gray-500"></p>
      <input
        :id="id"
        class="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-blue-600 focus:ring-0 sm:text-sm"
        v-bind="$attrs"
        v-model="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "XInput",
  inheritAttrs: false,

  props: {
    label: { type: String, required: false },
    description: { type: String, required: false },
    modelValue: {},
  },

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
