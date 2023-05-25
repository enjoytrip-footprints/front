<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew bg-gradient-warning">
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
        <div class="container shape-container">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3 text-white">여행지 검색</h1>
              </div>
            </div>

          </div>
          <b-alert style="font-size: fit-content;background-color:#FEE8B0; color: #7C9070; float: left; margin: 20px 0 0 0;" show> 시, 도 / 군, 구 에 맞춰 관광지를 찾아보세요. </b-alert>
          
          <p />

          <!-- <b-alert style="font-size: fit-content;background-color:#FEE8B0; color: #7C9070;" show> 시, 도 / 군, 구 에 맞춰 관광지를 찾아보세요. </b-alert> -->
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <!-- Map 추가하는 부분 -->
          <b-row class="mt-3">
            <select-sido @select-sido="selectSido"></select-sido>
            <select-gugun :sidoCode="sidoCode" @select-gugun="selectGugun"></select-gugun>
          </b-row>
        </div>
        <b-row class="mt-3">
          <b-col cols="12">
            <the-kakao-map :chargers="chargerList"></the-kakao-map>
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
import { electricChargerStationList } from "@/api/electric.js";
import SelectSido from "@/components/item/SelectSido.vue";
import SelectGugun from "@/components/item/SelectGugun.vue";
import TheKakaoMap from "@/components/map/TheKakaoMap.vue";
export default {
  name: "TourSearch",
  components: {
    SelectSido,
    SelectGugun,
    TheKakaoMap,
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
  },
};
</script>
