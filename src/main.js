import { store } from "@/store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowDown,
  faArrowLeft,
  faArrowUp,
  faGlobe,
  faLaptop,
  faNetworkWired,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";

library.add([
  faGlobe,
  faNetworkWired,
  faLaptop,
  faWifi,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
]);

const app = createApp(App);

app.use(i18n);
app.use(store);
app.use(router);
app.use(VueApexCharts);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
