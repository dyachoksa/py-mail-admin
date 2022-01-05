<template>
  <div class="flex items-center justify-between">
    <h1 class="page-title">Domains</h1>
    <div>
      <x-button @click="handleOpenDomainPanel">Create</x-button>
    </div>
  </div>

  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Updated at
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(domain, domainIdx) in domains"
                :key="domain.id"
                :class="domainIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ domain.fqdn }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <status-label :is-active="domain.is_active" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <date-label :date="domain.created_at" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <date-label :date="domain.updated_at" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <router-link
                    :to="{ name: 'domain', params: { domainId: domain.id } }"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <domain-form-panel :open="domainPanelOpen" @close="handleCloseDomainPanel" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { Domain } from "@/store/domains";
import StatusLabel from "@/components/StatusLabel.vue";
import DateLabel from "@/components/DateLabel.vue";
import XButton from "@/components/XButton.vue";
import DomainFormPanel from "@/components/panels/DomainFormPanel.vue";

const store = useStore();
const domains = computed<Domain[]>(() => store.state.domains.domains);
const domainPanelOpen = ref(false);

const handleCloseDomainPanel = () => (domainPanelOpen.value = false);
const handleOpenDomainPanel = () => (domainPanelOpen.value = true);

if (!store.state.domains.isLoaded) {
  store.dispatch("domains/loadDomains");
}
</script>
