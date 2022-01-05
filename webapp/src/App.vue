<template>
  <template v-if="isLoading">
    <p class="text-gray-600 text-base">Loading...</p>
  </template>
  <template v-else>
    <app-layout>
      <router-view />
    </app-layout>
  </template>

  <messages />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import AppLayout from "@/components/AppLayout.vue";
import Messages from "@/components/Messages.vue";

const store = useStore();
const isLoading = computed<boolean>(() => !store.state.auth.isLoaded);

store.dispatch("auth/load");
</script>
