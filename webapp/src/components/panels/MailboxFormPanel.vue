<template>
  <slideover-panel :open="open" :title="title" @close="$emit('close')">
    <notification v-if="error" :message="error" />

    <form @submit.prevent="handleSubmit" class="mt-4 space-y-6">
      <div class="space-y-4">
        <x-input
          v-model="form.name"
          label="Name"
          type="text"
          name="name"
          autofocus
          required
        />
        <x-select
          v-model="form.domain_id"
          :options="domains"
          label="Domain"
          name="domain_id"
          required
        />
        <x-input
          v-model="form.password"
          label="Password"
          type="password"
          name="password"
          :required="!editMode"
          autocomplete="new-password"
        />
        <x-checkbox
          v-model="form.is_active"
          label="Is active?"
          description="Mark mailbox as active or disabled"
          name="is_active"
        />
      </div>
      <div>
        <x-button>{{ editMode ? "Save" : "Create" }}</x-button>
      </div>
    </form>
  </slideover-panel>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "@/store";
import { Mailbox, MailboxData } from "@/store/mailboxes";

import SlideoverPanel from "@/components/SlideoverPanel.vue";
import XButton from "@/components/XButton.vue";
import XInput from "@/components/forms/XInput.vue";
import XCheckbox from "@/components/forms/XCheckbox.vue";
import XSelect from "@/components/forms/XSelect.vue";
import Notification from "@/components/Notification.vue";

const props = defineProps<{ open: boolean; mailbox?: Mailbox }>();
const emit = defineEmits<{
  (event: "close"): void;
}>();

const store = useStore();

const initialData: MailboxData = props.mailbox?.id
  ? {
      name: props.mailbox.name,
      domain_id: props.mailbox.domain_id,
      is_active: props.mailbox.is_active,
      password: "",
    }
  : { name: "", domain_id: 0, is_active: true, password: "" };

const domains = computed(() =>
  store.state.domains.domains.map((domain) => ({
    value: domain.id,
    label: domain.fqdn,
  }))
);
const form = reactive<MailboxData>(initialData);
const error = ref<string | null>(null);
const title = computed(() => (props.mailbox?.id ? "Edit mailbox" : "Create mailbox"));
const editMode = computed(() => !!props.mailbox?.id);

const handleSubmit = () => {
  if (!form.password) {
    form.password = undefined;
  }

  const promise = editMode.value
    ? store.dispatch("mailboxes/update", {
        mailboxId: props.mailbox?.id,
        data: form,
      })
    : store.dispatch("mailboxes/create", form);

  promise
    .then(() => {
      emit("close");
      form.password = "";
    })
    .catch((err) => {
      error.value = err;
    });
};
</script>
