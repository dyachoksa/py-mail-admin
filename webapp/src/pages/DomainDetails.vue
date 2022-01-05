<template>
  <template v-if="!isLoaded">
    <p class="text-gray-700">Loading...</p>
  </template>
  <template v-else-if="!domain">
    <p class="text-gray-700">Domain not found</p>
  </template>
  <template v-else>
    <div class="flex items-center justify-between">
      <h1 class="page-title">View domain</h1>
      <div class="space-x-3">
        <x-button color="white" @click="handleDeleteDomain">Delete</x-button>
        <x-button @click="handleOpenDomainPanel">Edit</x-button>
      </div>
    </div>

    <div class="grid grid-cols-1">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Domain name</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ domain?.fqdn }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <status-label :is-active="domain?.is_active" />
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Created at</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <date-label :date="domain?.created_at" />
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Updated at</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <date-label :date="domain?.updated_at" />
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-10">
      <h2 class="page-subtitle my-2">Mailboxes</h2>
      <mailboxes-table :mailboxes="mailboxes" />
    </div>

    <div class="mt-10">
      <h2 class="page-subtitle my-2">Aliases</h2>
      <aliases-table :aliases="aliases" />
    </div>

    <domain-form-panel
      :domain="domain"
      :open="domainPanelOpen"
      @close="handleCloseDomainPanel"
    />
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { Domain } from "@/store/domains";
import { Mailbox } from "@/store/mailboxes";
import { Alias } from "@/store/aliases";
import StatusLabel from "@/components/StatusLabel.vue";
import DateLabel from "@/components/DateLabel.vue";
import XButton from "@/components/XButton.vue";
import DomainFormPanel from "@/components/panels/DomainFormPanel.vue";
import MailboxesTable from "@/components/MailboxesTable.vue";
import AliasesTable from "@/components/AliasesTable.vue";

const route = useRoute();
const store = useStore();

const domainId = parseInt(route.params.domainId as string);
const isLoaded = computed(() => store.state.domains.isLoaded);
const domain = computed<Domain | undefined>(() =>
  store.state.domains.domains.find((d) => d.id == domainId)
);
const mailboxes = computed<Mailbox[]>(() => store.state.mailboxes.mailboxes);
const aliases = computed<Alias[]>(() => store.state.aliases.aliases);
const domainPanelOpen = ref<boolean>(false);

const handleCloseDomainPanel = () => (domainPanelOpen.value = false);
const handleOpenDomainPanel = () => (domainPanelOpen.value = true);
const handleDeleteDomain = () => {
  if (confirm("Dou you really want to delete this domain and all related mailboxes?")) {
    store.dispatch("domains/removeDomain", domainId);
  }
};

if (!isLoaded.value) {
  store.dispatch("domains/loadDomains");
}

store.dispatch("mailboxes/loadMailboxes", domainId);
store.dispatch("aliases/loadAliases", domainId);
</script>
