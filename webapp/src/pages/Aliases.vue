<template>
  <div class="flex items-center justify-between">
    <h1 class="page-title">Aliases</h1>
    <div>
      <x-button @click="handleOpen">Create</x-button>
    </div>
  </div>

  <template v-if="!isLoaded">
    <p class="text-gray-600 text-sm">Loading...</p>
  </template>

  <template v-else>
    <aliases-table :aliases="aliases" />
  </template>

  <alias-form-panel :open="open" @close="handleClose" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { Alias } from "@/store/aliases";
import XButton from "@/components/XButton.vue";
import AliasesTable from "@/components/AliasesTable.vue";
import AliasFormPanel from "@/components/panels/AliasFormPanel.vue";

const store = useStore();
const aliases = computed<Alias[]>(() => store.state.aliases.aliases);
const isLoaded = ref(false);

// Create alias panel
const open = ref(false);
const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);

if (!store.state.domains.isLoaded) {
  store.dispatch("domains/loadDomains");
}

store.dispatch("aliases/loadAliases").finally(() => (isLoaded.value = true));
</script>
