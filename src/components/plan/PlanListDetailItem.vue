<template>
  <li class="timeline-item mb-4">
    <span class="timeline-icon"> {{ num }} </span>
    <h5 class="fw-bold">{{ tours[num - 1].title }}</h5>

    <b-card
      :border-variant="color"
      hover
      shadow
      body-classes="py-5"
      style="width: 550px; height: 400px; margin-top: 40px; border: 20px solid"
    >
      <!-- <img :src="'' + image" style="width: 200px; height: 200px; margin-top: 0; margin-bottom: 10px" alt="" /> -->
      <!-- <img src="/public/img/brand/blue.png" />-->
      <img :src="tour" style="width: 300px; height: 200px; margin-top: 0; margin-bottom: 20px; margin-left: 15%;" alt="" />
      <br />
      <label class="col-6"
        >출발일 :
        <!-- <input class="form-control" type="date" id="depart_date" name="depart_date" /> -->
        {{ des.departTime }}
      </label>
      <label class="col-6"
        >도착일 :
        <!-- <input class="form-control" type="date" id="arrive_date" name="arrive_date" /> -->
        {{ des.arriveTime }}
      </label>
      <p />
      <label class="col-6"
        >예상 경비(만원) :
        {{ price }}
        <!-- <input
        class="form-control"
        type="text"
        id="fee"
        name="fee"
        min="1"
        max="100000000"
        oninput="this.value = this.value.replace(/^0+|\D+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');"
      /> -->
      </label>
      <label class="col-6"
        >예상 행복도(1~100) :
        {{ des.happy }}
        <!-- <input class="form-control" type="number" id="happy" name="happy" min="1" max="100"/> -->
      </label>
      <p />
      메모 : {{ des.content }}
      <!-- <input type="text" class="form-control" v-bind:id="'memo' + num" name="memo" placeholder="메모..." /> -->
    </b-card>
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PlanWriteDetailItem",
  props: {
    num: Number,
    des: Object,
    tour: String,
  },
  data() {
    return {
      price: this.des.price.replace(/^0+|\D+/g, "").replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
      color: "white",
      // plan: null,
    };
  },
  computed: {
    ...mapState("planStore", ["planSelected"]),
    ...mapState("itemStore", ["tours"]),
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

    changeGreen() {
      this.color = "success";
    },
    changeRed() {
      this.color = "danger";
    },
  },
  // watch: {
  //   changeGreen() {
  //     this.plan = "input-success";
  //   },
  //   changeRed() {
  //     this.plan = "input-fail";
  //   },
  // },
};
</script>

<style scoped>
/* plan {
  background-color: "#5D9C59";
} */

/* .input-success {
  box-shadow: 0 0 5px green;
}
.input-fail {
  box-shadow: 0 0 5px red;
} */
</style>
