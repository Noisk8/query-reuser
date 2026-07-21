import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/tematica/:slug",
    name: "topic",
    component: () => import("../views/TopicView.vue"),
  },
  {
    path: "/consulta/:queryId",
    name: "query-detail",
    component: () => import("../views/QueryDetailView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
