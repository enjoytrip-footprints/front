<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default bg-gradient-orange">
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <br /><br /><br />
                <h1 class="display-2 text-white">여행 계획 등록</h1>
                <br /><br /><br />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-4 text-white">시작이 반이다</h1>
                <h1 class="display-4 text-white">여행 계획을 설계해봅시다</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->

      <section class="section section-lg pt-lg-0">
        <div class="container">
          <!-- <div class="row justify-content-center"> -->
          <!-- Map 추가하는 부분 -->
          <!-- <b-row class="mt-3">
              <select-sido @select-sido="selectSido"></select-sido>
              <select-gugun :sidoCode="sidoCode" @select-gugun="selectGugun"></select-gugun>
            </b-row>
          </div> -->

          <b-row class="mt-3">
            <b-col cols="12">
              <the-kakao-map ref="search"></the-kakao-map>
            </b-col>
          </b-row>
          <br /><br /><br />

          <plan-regist>
            v-on:upSchedule="upSchedule" v-on:downSchedule="downSchedule" v-on:deleteSchedule="deleteSchedule"
          </plan-regist>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { electricChargerStationList } from "@/api/electric.js";
import SelectSido from "@/components/item/SelectSido.vue";
import SelectGugun from "@/components/item/SelectGugun.vue";
import TheKakaoMap from "@/components/plan/TheKakaoMapSearch.vue";
import PlanRegist from "@/components/plan/PlanRegist";
export default {
  name: "TourSearch",
  components: {
    SelectSido,
    SelectGugun,
    TheKakaoMap,
    PlanRegist,
  },

  data() {
    return {
      sidoCode: null,
      chargerList: [],
    };
  },
  methods: {
    selectSido(sidoCode) {
      this.sidoCode = sidoCode;
    },
    selectGugun(gugunCode) {
      console.log("구군바꼈으니 관광지 찾으러 가자!!!", gugunCode);
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      // console.log("서비스키 : " + SERVICE_KEY);

      const params = {
        serviceKey: decodeURIComponent(SERVICE_KEY),
        pageNo: "1",
        numOfRows: "20",
        MobileOS: "ETC",
        MobileApp: "AppTest",
        _type: "json",
        listYN: "Y",
        arrange: "A",
        contentTypeId: "12",
        areaCode: this.sidoCode,
        sigunguCode: gugunCode,
      };
      // if (gugunCode) params.zscode = gugunCode;
      // else params.zcode = this.sidoCode;
      electricChargerStationList(
        params,
        ({ data }) => {
          // console.log(data);
          // console.log(data.response);
          console.log(data.response.body);
          // console.log(data.response.body.items);
          // console.log(data.response.body.items.item);
          this.chargerList = data.response.body.items.item;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    upSchedule(spotid) {
      this.$refs.search.upSchedule(spotid);
    },
    downSchedule(spotid) {
      this.$refs.search.downSchedule(spotid);
    },
    deleteSchedule(spotid) {
      this.$refs.search.deleteSchedule(spotid);
    },
  },
};
</script>
