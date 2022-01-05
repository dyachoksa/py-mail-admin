<template>
  <div class="flex items-center justify-between">
    <h1 class="page-title">Mailboxes</h1>
    <div>
      <x-button @click="handleOpen">Create</x-button>
    </div>
  </div>

  <template v-if="!isLoaded">
    <p class="text-gray-600 text-sm">Loading...</p>
  </template>

  <template v-else>
    <mailboxes-table :mailboxes="mailboxes" />
  </template>

  <mailbox-form-panel :open="open" @close="handleClose" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store";
import XButton from "@/components/XButton.vue";
import MailboxesTable from "@/components/MailboxesTable.vue";
import MailboxFormPanel from "@/components/panels/MailboxFormPanel.vue";

const store = useStore();

const open = ref<boolean>(false);
const isLoaded = computed(() => store.state.mailboxes.isLoaded);
const mailboxes = computed(() => store.state.mailboxes.mailboxes);

const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);

if (!store.state.domains.isLoaded) {
  store.dispatch("domains/loadDomains");
}

store.dispatch("mailboxes/loadMailboxes");
</script>
