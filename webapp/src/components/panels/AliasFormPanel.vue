<template>
  <slideover-panel :open="open" :title="title" @close="$emit('close')">
    <notification v-if="error" :message="error" />

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="space-y-4">
        <x-input
          v-model="form.source"
          label="Source"
          type="text"
          name="source"
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
          v-model="form.destination"
          label="Destination"
          type="text"
          name="destination"
          required
        />
        <x-checkbox
          v-model="form.is_active"
          label="Is active?"
          description="Mark alias as active or disabled"
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
import { Alias, AliasData } from "@/store/aliases";
import SlideoverPanel from "@/components/SlideoverPanel.vue";
import XButton from "@/components/XButton.vue";
import XInput from "@/components/forms/XInput.vue";
import XCheckbox from "@/components/forms/XCheckbox.vue";
import XSelect from "@/components/forms/XSelect.vue";
import Notification from "@/components/Notification.vue";

const props = defineProps<{ open: boolean; alias?: Alias }>();
const emit = defineEmits<{
  (event: "close"): void;
}>();

const store = useStore();

const initialData: AliasData = props.alias?.id
  ? {
      source: props.alias.source,
      destination: props.alias.destination,
      domain_id: props.alias.domain_id,
      is_active: props.alias.is_active,
    }
  : { source: "", domain_id: 0, is_active: true, destination: "" };

const domains = computed(() =>
  store.state.domains.domains.map((domain) => ({
    value: domain.id,
    label: domain.fqdn,
  }))
);
const form = reactive<AliasData>(initialData);
const error = ref<string | null>(null);
const title = computed(() => (props.alias?.id ? "Edit alias" : "Create alias"));
const editMode = computed(() => !!props.alias?.id);

const handleSubmit = () => {
  const promise = editMode.value
    ? store.dispatch("aliases/update", {
        aliasId: props.alias?.id,
        data: form,
      })
    : store.dispatch("aliases/create", form);

  promise
    .then(() => {
      emit("close");

      form.source = "";
      form.destination = "";
      form.is_active = true;
    })
    .catch((err) => {
      error.value = err;
    });
};
</script>
