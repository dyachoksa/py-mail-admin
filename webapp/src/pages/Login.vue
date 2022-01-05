<template>
  <main class="flex items-center justify-center bg-gray-100 h-screen">
    <div class="max-w-md w-full bg-white rounded-xl py-8 px-10">
      <h1 class="page-title">Sign in</h1>
      <p class="pt-1 text-gray-600">Please sign in to continue</p>

      <form @submit.prevent="handleSubmit" class="mt-4 space-y-6">
        <div class="space-y-4">
          <x-input
            v-model="form.email"
            label="Email"
            type="email"
            name="email"
            autocomplete="username"
            autofocus
            required
          />
          <x-input
            v-model="form.password"
            label="Password"
            type="password"
            name="password"
            autocomplete="current-password"
            required
          />
        </div>

        <div>
          <x-button class="w-32">Login</x-button>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useStore } from "@/store";
import { LoginData } from "@/store/auth";

import XInput from "@/components/forms/XInput.vue";
import XButton from "@/components/XButton.vue";

const store = useStore();
const form = reactive<LoginData>({ email: "", password: "" });

const handleSubmit = async () => {
  await store.dispatch("auth/login", form);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
});
</script>
