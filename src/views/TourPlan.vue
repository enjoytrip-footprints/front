<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3 text-white">
                  상상만으로 설레는 여행!
                  <span>어디로 갈지 생각해 볼까요~?</span>
                </h1>

                <base-button v-if="userInfo" class="mb-3 mb-sm-0 mt-5" type="info" icon="fa fa-code" @click="moveWrite">
                  계획 세우기
                </base-button>
                <base-button v-else class="mb-3 mb-sm-0 mt-5" type="info" icon="fa fa-code" @click="moveLogin">
                  로그인이 필요한 서비스 입니다.
                </base-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="userInfo" class="container shape-container d-flex">
          <plan-list></plan-list>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <!-- <div class="row row-grid">
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-check-bold" type="primary" rounded class="mb-4"> </icon>
                  <h6 class="text-primary text-uppercase">Download Argon</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="primary" rounded>design</badge>
                    <badge type="primary" rounded>system</badge>
                    <badge type="primary" rounded>creative</badge>
                  </div>
                  <base-button tag="a" href="#" type="primary" class="mt-4"> Learn more </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-istanbul" type="success" rounded class="mb-4"> </icon>
                  <h6 class="text-success text-uppercase">Build Something</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="success" rounded>business</badge>
                    <badge type="success" rounded>vision</badge>
                    <badge type="success" rounded>success</badge>
                  </div>
                  <base-button tag="a" href="#" type="success" class="mt-4"> Learn more </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-planet" type="warning" rounded class="mb-4"> </icon>
                  <h6 class="text-warning text-uppercase">Prepare Launch</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="warning" rounded>marketing</badge>
                    <badge type="warning" rounded>product</badge>
                    <badge type="warning" rounded>launch</badge>
                  </div>
                  <base-button tag="a" href="#" type="warning" class="mt-4"> Learn more </base-button>
                </card>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PlanList from "../components/plan/PlanList.vue";

export default {
  name: "TourPlan",
  components: {
    PlanList,
  },

  computed: {
    ...mapState("userStore", ["userInfo"]),
  },

  methods: {
    moveWrite() {
      this.$router.push({ name: "PlanWrite" });
    },
    moveLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
