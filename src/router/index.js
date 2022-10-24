import { createRouter, createWebHistory } from "vue-router";
import DevicesView from "../views/DevicesView.vue";
import HomeView from "../views/HomeView.vue";
import NetworkView from "../views/NetworkView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import PointsView from "../views/PointsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/network", component: NetworkView },
    { path: "/devices", component: DevicesView },
    { path: "/points", component: PointsView },
    { path: "/:pathMatch(.*)*", component: NotFoundView },
  ],
});

export default router;
