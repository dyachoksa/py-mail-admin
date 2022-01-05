<template>
  <template v-if="loading">
    <p class="text-gray-600 text-sm">Loading...</p>
  </template>
  <template v-else>
    <bar-chart :chart-data="chartData" :options="options" />
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { BarChart } from "vue-chart-3";
import { ChartData, ChartOptions } from "chart.js";
import { api } from "@/api";

const loading = ref(true);
const data = ref(null);

const chartData = computed<ChartData<"bar">>(() => {
  const labels: string[] = [],
    activeData: number[] = [],
    disabledData: number[] = [];

  if (data.value) {
    for (const metric of ["domains", "mailboxes", "aliases"]) {
      labels.push(metric[0].toUpperCase() + metric.slice(1));
      activeData.push(data.value[metric]["active"]);
      disabledData.push(data.value[metric]["disabled"]);
    }
  }

  return {
    labels,
    datasets: [
      {
        data: activeData,
        label: "Active",
        borderWidth: 1,
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: ["rgba(75, 192, 192)", "rgba(54, 162, 235)", "rgba(255, 159, 64)"],
        // stack: "main",
      },
      {
        data: disabledData,
        label: "Disabled",
        borderWidth: 1,
        backgroundColor: [
          "rgba(179, 181, 182, 0.5)",
          "rgba(179, 181, 182, 0.5)",
          "rgba(179, 181, 182, 0.5)",
        ],
        borderColor: [
          "rgba(179, 181, 182)",
          "rgba(179, 181, 182)",
          "rgba(179, 181, 182)",
        ],
        // stack: "main",
      },
    ],
  };
});

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    yAxis: {
      display: false,
    },
  },
};

api.metrics
  .getTotals()
  .then((result) => (data.value = result))
  .finally(() => (loading.value = false));
</script>
