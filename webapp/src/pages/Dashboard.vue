<template>
  <h1 class="page-title">Dashboard</h1>

  <div class="grid grid-cols-1 gap-10">
    <totals-bar-chart />
  </div>

  <div class="mt-10 grid grid-cols-3 gap-10">
    <domains-card />
    <mailboxes-card />
    <aliases-card />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DomainsCard from "@/components/cards/DomainsCard.vue";
import MailboxesCard from "@/components/cards/MailboxesCard.vue";
import AliasesCard from "@/components/cards/AliasesCard.vue";
import TotalsBarChart from "@/components/charts/TotalsBarChart.vue";

export default defineComponent({
  name: "Dashboard",
  components: { TotalsBarChart, AliasesCard, MailboxesCard, DomainsCard },
});
</script>
