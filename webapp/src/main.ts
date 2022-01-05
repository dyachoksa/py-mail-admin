import { createApp } from "vue";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
} from "chart.js";
import { store, storeKey } from "./store";
import { router } from "./routes";
import App from "./App.vue";

import "./main.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip
);

createApp(App).use(store, storeKey).use(router).mount("#app");
