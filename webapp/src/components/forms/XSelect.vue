<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <div class="mt-1 border-b border-gray-300 focus-within:border-blue-600">
      <select
        :id="id"
        class="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-blue-600 focus:ring-0 sm:text-sm"
        v-bind="$attrs"
        v-model="value"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  options: Array<{ label: string; value: any }>;
  modelValue: any;
  label?: string;
}>();
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "XSelect",
  inheritAttrs: false,

  emits: ["update:modelValue"],

  props: ["modelValue"],

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
