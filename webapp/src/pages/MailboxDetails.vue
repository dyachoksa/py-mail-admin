<template>
  <template v-if="!isLoaded">
    <p class="text-gray-600 text-sm">Loading...</p>
  </template>

  <template v-else-if="isLoaded && mailbox">
    <div class="flex items-center justify-between">
      <h1 class="page-title">Mailbox details</h1>
      <div class="flex items-center space-x-2">
        <x-button color="white" @click="handleRemove">Delete</x-button>
        <x-button @click="handleOpen">Edit</x-button>
      </div>
    </div>

    <div class="grid grid-cols-1">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Mailbox</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ mailbox?.name }}@{{ mailbox?.domain_name }}
          </dd>
        </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <status-label :is-active="mailbox?.is_active" />
          </dd>
        </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Created at</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <date-label :date="mailbox?.created_at" />
          </dd>
        </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Updated at</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <date-label :date="mailbox?.updated_at" />
          </dd>
        </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Last login at</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <date-label v-if="mailbox?.last_login_at" :date="mailbox?.last_login_at" />
            <span v-else>-</span>
          </dd>
        </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Last login IP:</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <span v-if="mailbox?.last_login_ip">{{ mailbox?.last_login_ip }}</span>
            <span v-else>-</span>
          </dd>
        </div>
      </dl>
    </div>

    <mailbox-form-panel :open="open" :mailbox="mailbox" @close="handleClose" />
  </template>

  <template v-else>
    <p class="text-gray-800 text-sm">Not found</p>
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { Mailbox } from "@/store/mailboxes";
import XButton from "@/components/XButton.vue";
import StatusLabel from "@/components/StatusLabel.vue";
import DateLabel from "@/components/DateLabel.vue";
import MailboxFormPanel from "@/components/panels/MailboxFormPanel.vue";

const route = useRoute();
const store = useStore();
const mailboxId = parseInt(route.params.mailboxId as string);
const mailbox = computed<Mailbox | null>(() => store.state.mailboxes.mailbox);
const isLoaded = ref<boolean>(false);

// Edit panel
const open = ref(false);
const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);

// Delete
const handleRemove = () => {
  if (confirm("Dou you really want to remove this mailbox?")) {
    store.dispatch("mailboxes/remove", mailboxId);
  }
};

if (!store.state.domains.isLoaded) {
  store.dispatch("domains/loadDomains");
}

store
  .dispatch("mailboxes/loadMailbox", mailboxId)
  .finally(() => (isLoaded.value = true));
</script>
