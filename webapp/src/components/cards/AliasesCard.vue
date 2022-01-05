<template>
  <div>
    <h3 class="page-subtitle">Aliases</h3>

    <div>
      <div class="flow-root mt-6">
        <ul role="list" class="-my-5 divide-y divide-gray-200">
          <li v-for="alias in aliases" :key="alias.id" class="py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="h-9 w-9 rounded-full"
                  :src="`https://eu.ui-avatars.com/api/?background=CD8CBC&color=fff&name=${alias.source}`"
                  :alt="alias.source"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ alias.source }}@{{ alias.domain_name }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ "destination: " + alias.destination }}
                </p>
              </div>
              <div>
                <router-link
                  :to="{ name: 'alias', params: { aliasId: alias.id } }"
                  class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                >
                  View
                </router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-6">
        <router-link
          :to="{ name: 'aliases' }"
          class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          View all
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { Alias } from "@/store/aliases";

const store = useStore();
const isLoaded = ref<boolean>(false);
const aliases = computed<Alias[]>(() => store.state.aliases.aliases.slice(0, 3));

store.dispatch("aliases/loadAliases").finally(() => (isLoaded.value = true));
</script>
