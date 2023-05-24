<template>
  <section id="portfolio" class="portfolio" data-aos="fade-up">
    <div class="container-fluid" style="min-height: 750px; border-bottom: solid">
      <div class="section-header"></div>
      <div class="container-fluid mt-3" data-aos="fade-up" data-aos-delay="200" style="text-align: center">
        <div class="row g-0 portfolio-container">
          <plan-list-item 
          v-for="(plan, index) in plans" 
          :key="plan.planId" 
          :plan="plan"
          :num=index+1
          :happyAvg="planInfo[index].happyAvg"
          :priceSum="planInfo[index].priceSum"
          ></plan-list-item>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PlanListItem from "@/components/plan/PlanListItem";

export default {
  name: "PlanList",
  components: {
    PlanListItem,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("planStore", ["plans", "planInfo"]),
  },
  methods: {
    ...mapActions("planStore", ["getPlanList", "getPlanInfoList"]),
    sharePlan() {
      this.$router.push({ name: "planShare" });
    },
  },
  mounted() {
    this.getPlanList(this.userInfo.id);
    this.getPlanInfoList(this.userInfo.id);
  },
};
</script>

<style></style>
