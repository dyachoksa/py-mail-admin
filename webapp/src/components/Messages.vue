<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <template v-for="message in messages">
        <transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">{{ message.message }}</p>
                  <p class="mt-1 text-sm text-gray-500" v-if="message.description">
                    {{ message.description }}
                  </p>
                  <div class="mt-3 flex space-x-7">
                    <router-link
                      v-if="message.actionLink"
                      :to="message.actionLink"
                      class="bg-white rounded-md text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View
                    </router-link>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                  <button
                    @click="handleHideMessage(message.id)"
                    class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span class="sr-only">Close</span>
                    <XIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/solid";
import { useStore } from "@/store";
import { Message } from "@/store/messages";

const store = useStore();
const messages = computed<Message[]>(() => store.state.messages.messages);

const handleHideMessage = (id: string) => store.commit("messages/removeMessage", id);
</script>
