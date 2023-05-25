<template>
  <li class="timeline-item mb-4">
    <!-- <span class="timeline-icon">
      <font-awesome-icon
        v-if="schedule.theme == 12"
        class="fontawesom"
        icon="fa-solid fa-location-dot fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 14"
        class="fontawesom"
        icon="fa-solid fa-landmark fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 15"
        class="fontawesom"
        icon="fa-solid fa-calendar fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 28"
        class="fontawesom"
        icon="fa-solid fa-person-running fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 32"
        class="fontawesom"
        icon="fa-solid  fa-bed fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 38"
        class="fontawesom"
        icon="fa-solid fa-cart-shopping fa-lg"
      />
      <font-awesome-icon
        v-if="schedule.theme == 39"
        class="fontawesom"
        icon="fa-solid  fa-utensils fa-lg"
      />
    </span> -->

    <span class="fw-bold" style="font-size: 20px;">{{ schedule.title }}</span>
    <!-- <p class="text-muted mb-2 fw-bold">{{ schedule.addr1 }}</p> -->
    <!-- <p class="text-muted mb-2">{{ theme(schedule.content_type_id) }}</p> -->
    <button
      class="btn btn-danger btn-sm"
      style="margin-top: 10px; margin-left: 10px; margin-bottom: 10px"
      name="delete"
      @click="deleteSchedule(schedule.spotid)"
    >
      <b-icon icon="x"></b-icon>
    </button>
    <div>
    <img :src="schedule.image" style="width: 200px; height: 150px; margin-top: 0; margin-bottom: 10px" alt="" />
  </div>
    <div class="text-end mb-2">
      <!-- <button class="btn btn-circle btn-primary btn-sm mb-1 mr-1" name="up" @click="upSchedule(schedule.spotid)">
        <b-icon icon="chevron-up"></b-icon>
      </button>
      <button class="btn btn-circle btn-primary btn-sm mb-1 mr-1" name="down" @click="downSchedule(schedule.spotid)">
        <b-icon icon="chevron-down"></b-icon>
      </button> -->
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PlanWriteItem",
  props: {
    schedule: Object,
  },
  computed: {
    ...mapState("planStore", ["schedules"]),
  },
  methods: {
    theme(tCode) {
      var themes = {
        12: "관광지",
        14: "문화시설",
        15: "행사/공연/축제",
        28: "레포츠",
        32: "숙박",
        38: "쇼핑",
        39: "음식점",
      };
      return themes[tCode];
    },
    upSchedule(spotid) {
      console.log("clicked up");
      this.$emit("upSchedule", spotid);
    },
    downSchedule(spotid) {
      console.log("clicked down");
      this.$emit("downSchedule", spotid);
    },
    deleteSchedule(spotid) {
      console.log("clicked delete");
      this.$emit("deleteSchedule", spotid);
    },

    // upSchedule(spotid) {
    //   for (var i = 1; i < this.sSchedules.length; i++) {
    //     if (this.sSchedules[i].spotid == spotid) {
    //       let temp = this.sSchedules[i];
    //       this.sSchedules[i] = this.sSchedules[i - 1];
    //       this.sSchedules[i - 1] = temp;
    //       break;
    //     }
    //   }

    //   this.CLEAR_SCHEDULE_LIST();
    //   this.SET_SCHEDULE_LIST(this.sSchedules);
    //   // this.makeLine();
    // },
    // downSchedule(spotid) {
    //   for (var i = 0; i < this.sSchedules.length - 1; i++) {
    //     if (this.sSchedules[i].spotid == spotid) {
    //       let temp = this.sSchedules[i];
    //       this.sSchedules[i] = this.sSchedules[i + 1];
    //       this.sSchedules[i + 1] = temp;
    //       break;
    //     }
    //   }

    //   this.CLEAR_SCHEDULE_LIST();
    //   this.SET_SCHEDULE_LIST(this.sSchedules);
    //   // this.makeLine();
    // },
    // deleteSchedule(spotid) {
    //   for (var i = 0; i < this.sSchedules.length; i++) {
    //     if (this.sSchedules[i].spotid == spotid) {
    //       this.sSchedules.splice(i, 1);
    //       i--;
    //     }
    //   }

    //   this.CLEAR_SCHEDULE_LIST();
    //   this.SET_SCHEDULE_LIST(this.sSchedules);
    //   this.resetMarkers();
    //   this.makeMarker();
    //   // this.makeLine();
    // },
  },
};
</script>

<style scoped>
.btn-circle {
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 6px 0px;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 20px;
}
.btn-circle.btn-sm {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0px 0px;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}
.btn-circle.btn-lg {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
}
</style>
