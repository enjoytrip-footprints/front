<template>
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
      <div class="section-header col-3">
        <h3>나의 여행 계획</h3>
      </div>
    </div>
    <div class="container" style="min-height: 250px">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <!-- <input type="text" class="form-control" id="subject" name="subject" placeholder="제목..." readonly /> -->
            {{ planSelected.planTitle }}
          </div>
          <div class="mb-0">
            <label for="content" class="form-label">내용 : </label>
            {{ planSelected.planDetail }}
            <!-- <textarea
              class="form-control"
              id="content"
              name="content"
              rows="7"
              style="resize: none"
              placeholder="내용..."
            ></textarea> -->
          </div>
          <div class="mb-0">
            <div class="container p-0">
              <section class="py-5 pb-5">
                <ul class="timeline-with-icons ms-3" id="planInner">
                  <plan-list-detail-item
                    v-for="(des, index) in deslist"
                    :key="des.spotid"
                    :des="des"
                    :num="index + 1"
                    ref="childCom"
                  ></plan-list-detail-item>
                </ul>
              </section>
            </div>
          </div>
          <div class="col-auto text-center">
            <button
              type="button"
              id="btn-share"
              class="btn btn-default mb-3 mr-3"
              style="background: #0ea2bd; border: none"
              @click="moveList"
            >
              목록으로
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import PlanListDetailItem from "@/components/plan/PlanListDetailItem";
export default {
  name: "PlanDetail",
  // props: {
  //   plan: Object,
  // },
  components: {
    PlanListDetailItem,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("planStore", ["planSelected", "deslist"]),
  },
  methods: {
    ...mapMutations("planStore", ["CLEAR_PLAN_LIST"]),
    ...mapActions("planStore", ["getPlan", "getPlanList"]),

    created() {
      // this.planId = this.$route.params.planId;
      // this.getPlan(this.planId);
    },
    moveList() {
      this.$router.push({ name: "TourPlan" });
    },
  },
};
</script>
<style></style>
