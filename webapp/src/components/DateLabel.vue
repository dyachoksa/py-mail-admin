<template>
  <span>{{ formattedDate }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import format from "date-fns/format";

export default defineComponent({
  name: "DateLabel",

  props: {
    date: {
      type: String,
      required: true,
    },
  },

  computed: {
    formattedDate() {
      return format(new Date(this.date), "PPpp");
    },
  },
});
</script>
