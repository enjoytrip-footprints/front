<template>
  <li class="timeline-item mb-4">
    <span class="timeline-icon"> {{ num }} </span>
    <h5 class="fw-bold">{{ des.title }}</h5>

    <label class="col-6">출발일 <input class="form-control" type="date" id="depart_date" name="depart_date" /></label>
    <label class="col-6">도착일 <input class="form-control" type="date" id="arrive_date" name="arrive_date" /></label>
    <p />
    <label class="col-6"
      >예상 경비(원)
      <input
        class="form-control"
        type="text"
        id="fee"
        name="fee"
        min="1"
        max="100000000"
        oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');"
      />
    </label>
    <label class="col-6"
      >예상 행복도(1~100) <input class="form-control" type="number" id="happy" name="happy" min="1" max="100"
    /></label>
    <p />
    기타
    <input type="text" class="form-control" v-bind:id="'memo' + num" name="memo" placeholder="메모..." />
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
  methods: {
    ...mapActions("planStore", ["writeScheduleSpot"]),

    removeComma(value) {
      const rtnValue = `${value}`;
      return String(rtnValue).replace(",", "");
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
