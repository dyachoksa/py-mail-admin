<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">{{ message }}</h3>
        <div class="mt-2 text-sm text-yellow-700" v-if="description">
          <p>{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ExclamationIcon } from "@heroicons/vue/solid";

defineProps<{ message: string; description?: string }>();
</script>
