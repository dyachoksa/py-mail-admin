<template>
  <header class="py-3 border-b shadow-sm">
    <div class="container mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center space-x-4">
        <div>
          <router-link
            class="text-blue-800 text-2xl font-mono font-bold leading-relaxed"
            :to="{ name: 'dashboard' }"
          >
            Postfix Mail
          </router-link>
        </div>
        <nav class="flex-1 flex items-center space-x-2">
          <nav-link :to="{ name: 'dashboard' }">Dashboard</nav-link>
          <nav-link :to="{ name: 'domains' }">Domains</nav-link>
          <nav-link :to="{ name: 'mailboxes' }">Mailboxes</nav-link>
          <nav-link :to="{ name: 'aliases' }">Aliases</nav-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import NavLink from "@/components/NavLink.vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
});
</script>
