import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Result from "../pages/Result.vue";
import _id from "../pages/question/_id.vue";
import NotFound from "../pages/NotFound.vue";
import { store } from "../store";

const routes = [
  {
    path: "/",
    component: Home,
    redirect: () => {
      return { path: "/question/1" };
    },
  },
  {
    path: "/question/:id",
    component: _id,
  },
  {
    path: "/result",
    component: Result,
    beforeEnter: (to, from) => {
      if (!store.getters.getQuestions.length) {
        return { path: "/" };
      }

      if (
        (!store.getters.getAnsweredQuestions &&
          !store.getters.getAnsweredQuestions.length) ||
        store.getters.getAnsweredQuestions.length <
          store.getters.getQuestions.length
      ) {
        return { path: "/" };
      }

      return true;
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
