import Vue from "vue";
import VueRouter from "vue-router";
import Board from "../views/Board.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "board",
    component: Board,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
