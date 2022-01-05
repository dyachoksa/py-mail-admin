<template>
  <div class="bg-white">
    <app-header v-if="isAuthenticated" />

    <div class="container mx-auto sm:px-6 lg:px-8 lg:mt-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import AppHeader from "@/components/AppHeader.vue";

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLayout",
});
</script>
