import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import BoardView from "@/views/BoardView.vue";
import TourSearch from "@/views/TourSearch.vue";
import TourPlan from "@/views/TourPlan.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter,
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter,
      },
    },
    {
      path: "/toursearch",
      name: "TourSearch",
      components: {
        header: AppHeader,
        default: TourSearch,
        footer: AppFooter,
      },
    },
    {
      path: "/tourplan",
      name: "TourPlan",
      components: {
        header: AppHeader,
        default: TourPlan,
        footer: AppFooter,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter,
      },
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter,
      },
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter,
      },
    },
    {
      path: "/board",
      name: "BoardView",
      // component: boardView,
      components: {
        header: AppHeader,
        default: BoardView,
        footer: AppFooter,
      },
      redirect: "/board/list",
      children: [
        { path: "list", name: "BoardList", component: () => import("@/components/board/BoardList.vue") },
        {
          path: "detail/:articleNo",
          name: "BoardDetail",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        { path: "write", name: "BoardWrite", component: () => import("@/components/board/BoardWrite.vue") },
      ],
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
