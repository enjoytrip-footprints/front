<template>
  <section id="my_schedule" style="padding-top: 0">
    <div class="container" style="min-height: 750px">
      <div class="section-header">
        <h3>나의 여행 계획</h3>
        <p v-if="!schedules.length" id="notice_add_schedule">
          여행 계획에 여행지가 없습니다, 지도에서 검색 후 더블클릭해서 추가해주세요 :)
        </p>
      </div>
      <div class="schedule_list">
        <ul class="timeline-with-icons" id="planInner">
          <!-- <plan-write-item
            v-for="schedule in schedules"
            :key="schedule.spotid"
            :schedule="schedule"
            v-on:upSchedule="upSchedule"
            v-on:downSchedule="downSchedule"
            v-on:deleteSchedule="deleteSchedule"
          ></plan-write-item> -->
          
          <plan-regist-item
            v-model="schedules"
            v-for="schedule in schedules"
            :key="schedule.spotid"
            :schedule="schedule"
            v-on:upSchedule="upSchedule"
            v-on:downSchedule="downSchedule"
            v-on:deleteSchedule="deleteSchedule"
          ></plan-regist-item>
        
        </ul>
      
        <plan-regist-detail />
      
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import PlanRegistDetail from "./PlanRegistDetail.vue";
// import PlanWriteItem from "@/components/plan/PlanWriteItem";
import PlanRegistItem from "./PlanRegistItem.vue";

export default {
  name: "PlanWrite",
  components: {
    // PlanWriteItem,
    PlanRegistItem,
    PlanRegistDetail,
  },
  computed: {
    ...mapState("planStore", ["schedules"]),
  },
  watch:{
    schedules: function(val){
      console.log("changed  : " +val);
    }
  },
  methods: {
    upSchedule(spotid) {
      console.log("clicked up1");
      this.$emit("upSchedule", spotid);
    },
    downSchedule(spotid) {
      console.log("clicked down1");
      this.$emit("downSchedule", spotid);
    },
    deleteSchedule(spotid) {
      console.log("clicked delete1");
      this.$emit("deleteSchedule", spotid);
    },
  },
};
</script>

<style></style>
