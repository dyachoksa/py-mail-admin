<template>
  <template v-if="!isLoaded">
    <p class="text-gray-600 text-sm">Loading...</p>
  </template>

  <template v-else-if="isLoaded && alias">
    <div class="flex items-center justify-between">
      <h1 class="page-title">Alias details</h1>
      <div class="flex items-center space-x-2">
        <x-button color="white" @click="handleRemove">Delete</x-button>
        <x-button @click="handleOpen">Edit</x-button>
      </div>
    </div>

    <div class="grid grid-cols-1">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Source</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ alias?.source }}@{{ alias?.domain_name }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Destination</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ alias?.destination }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <status-label :is-active="alias?.is_active" />
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Created at</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <date-label :date="alias?.created_at" />
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Updated at</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <date-label :date="alias?.updated_at" />
          </dd>
        </div>
      </dl>
    </div>

    <alias-form-panel :open="open" :alias="alias" @close="handleClose" />
  </template>

  <template v-else>
    <p class="text-gray-800 text-sm">Not found</p>
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { Alias } from "@/store/aliases";
import XButton from "@/components/XButton.vue";
import StatusLabel from "@/components/StatusLabel.vue";
import DateLabel from "@/components/DateLabel.vue";
import AliasFormPanel from "@/components/panels/AliasFormPanel.vue";

const route = useRoute();
const store = useStore();
const aliasId = parseInt(route.params.aliasId as string);
const alias = computed<Alias | null>(() => store.state.aliases.alias);
const isLoaded = ref<boolean>(false);

// Edit panel
const open = ref(false);
const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);

// Delete
const handleRemove = () => {
  if (confirm("Dou you really want to remove this alias?")) {
    store.dispatch("aliases/remove", aliasId);
  }
};

if (!store.state.domains.isLoaded) {
  store.dispatch("domains/loadDomains");
}

store.dispatch("aliases/loadAlias", aliasId).finally(() => (isLoaded.value = true));
</script>
