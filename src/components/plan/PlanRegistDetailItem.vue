<template>
  <li class="timeline-item mb-4">
    <span class="timeline-icon"> {{ num }} </span>
    <h5 class="fw-bold">{{ schedule.title }}</h5>
    <p class="text-muted mb-2 fw-bold">
      <span class="me-1" style="font-size: smaller">[{{ theme(schedule.theme) }}]</span>
      {{ schedule.address }}
    </p>
    <label class="col-6"
      >출발일 <input class="form-control" type="date" id="depart_date" name="depart_date" v-model="sdate"
    /></label>
    <label class="col-6"
      >도착일 <input class="form-control" type="date" id="arrive_date" name="arrive_date" v-model="edate"
    /></label>
    <p />
    <label class="col-6"
      >예상 경비(만원)
      <input
        class="form-control"
        type="text"
        id="fee"
        name="fee"
        min="1"
        max="100000000"
        oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');"
        v-model="price"
      />
    </label>
    <label class="col-6"
      >예상 행복도(1~100)
      <input class="form-control" type="number" id="happy" name="happy" min="1" max="100" v-model="happy"
    /></label>
    <p />
    메모
    <input
      type="text"
      class="form-control"
      v-bind:id="'memo' + num"
      name="memo"
      placeholder="메모..."
      v-model="content"
    />
  </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PlanWriteDetailItem",
  props: {
    num: Number,
    schedule: Object,
  },
  data: function () {
    return {
      sdate: "",
      edate: "",
      happy: "",
      price: "",
      content: "",
    };
  },
  // watch: {
  //   price: function (val, oldVal) {
  //     console.log("new : " + val + "old : " + oldVal);
  //   },
  // },
  methods: {
    ...mapActions("planStore", ["writeScheduleSpot"]),
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

    removeComma(value) {
      const rtnValue = `${value}`;
      return String(rtnValue).replace(",", "");
    },

    // test() {
    //   console.log(this.sdate);
    //   console.log(this.edate);
    //   console.log(this.happy);
    //   console.log(this.price);
    //   console.log(this.content);
    // },

    checkBlank() {
      if (this.sdate === "" || this.edate === "" || this.happy === "" || this.price === "" || this.content === "")
        return true;
    },

    async detailShare(numb) {
      let board = {
        planId: numb,
        placeId: this.schedule.spotid,
        content: this.content,
        price: this.removeComma(this.price),
        happy: this.happy,
        departTime: this.sdate,
        arriveTime: this.edate,
      };

      console.log(numb);
      console.log(this.schedule.spotid);
      await this.writeScheduleSpot(board);
    },
  },
};
</script>

<style></style>
