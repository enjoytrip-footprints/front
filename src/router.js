import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/base/Landing.vue";
import Login from "@/components/user/UserLogin";
import ReviewView from "./views/ReviewView";
import HotReviewView from "./views/HotReviewView";
import Register from "@/components/user/UserRegister";
import Profile from "./views/base/Profile.vue";
import MyProfile from "@/components/user/MyProfile.vue";
import PersonReviewView from "./views/PersonReviewView";
import MyReviewView from "./views/MyReviewView";
import BoardView from "@/views/BoardView.vue";
import TourSearch from "@/views/TourSearch.vue";
import TourPlan from "@/views/TourPlan.vue";
import PlanWrite from "@/components/plan/PlanWrite";
import PlanDetail from "@/components/plan/PlanListDetail";

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
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter,
      },
    },
    {
      path: "/myProfile",
      name: "MyProfile",
      components: {
        header: AppHeader,
        default: MyProfile,
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
      // children: [
      //   { path: "write", name: "PlanWrite", component: () => import("@/components/map/PlanWrite.vue") },
      // ],
    },
    {
      path: "/tourwrite",
      name: "PlanWrite",
      components: {
        header: AppHeader,
        default: PlanWrite,
        footer: AppFooter,
      },
    },
    {
      path: "/plandetail",
      name: "PlanDetail",
      components: {
        header: AppHeader,
        default: PlanDetail,
        footer: AppFooter,
      },
    },
    {
      path: "/myReview",
      name: "myReview",
      components: {
        header: AppHeader,
        default: MyReviewView,
        footer: AppFooter,
      },
      children: [
        {
          path: "list",
          name: "MyReviewList",
          component: () => import("@/components/user/MyReviewList"),
        },
      ],
    },
    {
      path: "/personReview",
      name: "personReview",
      components: {
        header: AppHeader,
        default: PersonReviewView,
        footer: AppFooter,
      },
      children: [
        {
          path: "/:personId",
          name: "PersonReviewList",
          component: () => import("@/components/user/PersonReviewList"),
        },
      ],
    },
    {
      path: "/hotReview",
      name: "hotReview",
      components: {
        header: AppHeader,
        default: HotReviewView,
        footer: AppFooter,
      },
      children: [
        {
          path: "list",
          name: "hotReviewList",
          component: () => import("@/components/review/HotReviewList"),
        },
      ],
    },
    {
      path: "/review",
      name: "review",
      components: {
        header: AppHeader,
        default: ReviewView,
        footer: AppFooter,
      },
      children: [
        {
          path: "/:reviewId",
          name: "reviewDetail",
          component: () => import("@/components/review/ReviewDetail.vue"),
        },
        {
          path: "list",
          name: "reviewList",
          component: () => import("@/components/review/ReviewList"),
        },
        {
          path: "share",
          name: "reviewShare",
          // beforeEnter: onlyAuthUser,
          component: () => import("@/components/review/ReviewShare"),
        },
        {
          path: "modify",
          name: "reviewModify",
          component: () => import("@/components/review/ReviewModify"),
        },
      ],
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
