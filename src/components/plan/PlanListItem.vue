<template>
  <section class="section section-lg pt-lg-0 mt--100" v-if="plan">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div class="col-lg-4">
              <card
                class="border-0"
                hover
                shadow
                body-classes="py-5"
                style="width: 250px; height: 200px; margin-top: 40px"
              >
                <!-- <img
                  :src="'img/' + review.image"
                  class="img-fluid"
                  style="width: 200px; height: 200px; margin-top: 0; margin-bottom: 10px"
                  alt=""
                /> -->
                <h4 class="text-primary text-uppercase">{{ plan.planTitle }}</h4>
                <div style="margin-bottom: 30px">
                  <p class="description mt-3">
                    <span style="float: left"> 총 경비 : {{ priceSum }} 만원</span>
                    <span style="float: right">❤️ {{ happyAvg }} </span>
                  </p>
                </div>
                <base-button
                  @click="readPlan"
                  style="margin-top: 20px; color: white; margin-right: 7px"
                  tag="a"
                  type="dark"
                  class="mt-4"
                >
                  상세보기
                </base-button>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import { userInfo } from "os";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "PlanListItem",
  props: {
    plan: Object,
    priceSum: String,
    happyAvg: String,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("planStore", ["deslist"]),
    ...mapState("itemStore", ["tours"]),
  },
  methods: {
    ...mapMutations("planStore", ["CLEAR_PLAN_LIST"]),
    ...mapMutations("itemStore", ["CLEAR_TOURS"]),
    ...mapActions("planStore", [
      "getPlan",
      "getPlanList",
      "getDesList",
      // , "deletePlan"
    ]),
    ...mapActions("itemStore", [
      "getTours",
      // , "deletePlan"
    ]),
    async readPlan() {
      // plan 찾아오기
      await this.getPlan(this.plan.id);
      // 해당 plan에 소속된 description 찾아오기
      await this.getDesList(this.plan.id);
      // 각 description 에 해당하는 상세 관광지 정보 갱신하기
      this.CLEAR_TOURS();
      for (var i = 0; i < this.deslist.length; i++) {
        await this.getTours(this.deslist[i].placeId);
      }

      this.$router.push({ name: "PlanDetail" });
    },
    // editPlan() {
    //   this.getPlan(this.plan.planId);
    //   this.$router.push({ name: "planModify" });
    // },
    // async removePlan() {
    //   if (confirm("계획을 삭제하시겠습니까??")) {
    //     await this.deletePlan(this.plan.planId);
    //     this.CLEAR_PLAN_LIST();
    //     this.getPlanList();
    //     alert("계획이 삭제되었습니다!!");
    //     this.$router.push({ name: "planList" });
    //   }
    // },
  },
};
</script>

<style></style>
