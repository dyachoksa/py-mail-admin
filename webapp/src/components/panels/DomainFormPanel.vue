<template>
  <slideover-panel :open="open" :title="title" @close="$emit('close')">
    <notification v-if="error" :message="error" />

    <form @submit.prevent="handleSubmit" class="mt-4 space-y-6">
      <div class="space-y-4">
        <x-input
          v-model="form.fqdn"
          label="Domain name"
          type="text"
          name="fqdn"
          autofocus
          required
        />
        <x-checkbox
          v-model="form.is_active"
          label="Is active?"
          description="Mark domain as active or disabled"
          name="is_active"
        />
        <template v-if="!editMode">
          <x-checkbox
            v-model="form.add_admin_mailbox"
            label="Add admin mailbox"
            description="Also add <em>admin@</em> mailbox to this domain. Password will be random."
            name="add_admin_mailbox"
          />
          <x-checkbox
            v-model="form.add_standard_mailboxes"
            label="Add standard mailboxes"
            description="Also add <em>abuse@</em>, <em>hostmaster@</em>, <em>postmaster@</em> and <em>webmaster@</em> mailboxes to this domain"
            name="add_standard_mailboxes"
          />
          <x-input
            v-model="form.redirect_to"
            label="Redirect to"
            description="Redirect standard mailboxes to this address instead of making them physical"
            type="text"
            name="redirect_to"
          />
        </template>
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
import { Domain, DomainData } from "@/store/domains";

import SlideoverPanel from "@/components/SlideoverPanel.vue";
import XButton from "@/components/XButton.vue";
import XInput from "@/components/forms/XInput.vue";
import XCheckbox from "@/components/forms/XCheckbox.vue";
import Notification from "@/components/Notification.vue";

const props = defineProps<{ open: boolean; domain?: Domain }>();
const emit = defineEmits<{
  (event: "close"): void;
}>();

const store = useStore();

const initialData: DomainData = props.domain?.id
  ? { fqdn: props.domain.fqdn, is_active: props.domain.is_active }
  : {
      fqdn: "",
      is_active: true,
      add_standard_mailboxes: true,
      redirect_to: "",
      add_admin_mailbox: true,
    };

const form = reactive<DomainData>(initialData);
const error = ref<string | null>(null);
const title = computed(() => (props.domain?.id ? "Edit domain" : "Create domain"));
const editMode = computed(() => !!props.domain?.id);

const handleSubmit = () => {
  const promise = editMode.value
    ? store.dispatch("domains/updateDomain", { domainId: props.domain?.id, data: form })
    : store.dispatch("domains/createDomain", form);

  promise
    .then(() => {
      emit("close");
    })
    .catch((err) => {
      error.value = err;
    });
};
</script>
