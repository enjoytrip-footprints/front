<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-style-1 bg-gradient-gray">
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
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->

      <section class="section  " style="background-color: bisque;">
        
        <div class="container">
          <b-alert style="width:20% font-size:fit-content" variant="warning" dismissible show >키워드 검색 후 더블클릭하여
                  <p/>나만의 여행 일정을 계획해봅시다
                </b-alert>
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
          <b-card style="background-color: ivory;">
          <plan-regist
            v-on:upSchedule="upSchedule"
            v-on:downSchedule="downSchedule"
            v-on:deleteSchedule="deleteSchedule"
          >
          </plan-regist>
          </b-card>
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
import { mapState, mapActions, mapMutations } from "vuex";

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
      markers: [],
      linePath: [],
      sMarkers: [],
      sSchedules: [],
    };
  },
  computed: {
    ...mapState("planStore", ["searchSpots", "schedules"]),
  },
  methods: {
    ...mapMutations("planStore", ["CLEAR_SEARCHSPOT_LIST", "CLEAR_SCHEDULE_LIST", "SET_SCHEDULE_LIST"]),
    ...mapActions("planStore", ["searchSpot"]),
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

    // upSchedule(spotid) {
    //   console.log("clicked up2");
    //   this.$emit("upSchedule", spotid);
    // },
    // downSchedule(spotid) {
    //   console.log("clicked down2");
    //   this.$emit("downSchedule", spotid);
    // },
    // deleteSchedule(spotid) {
    //   console.log("clicked delete2");
    //   this.$emit("deleteSchedule", spotid);
    // },

    upSchedule(spotid) {
      for (var i = 1; i < this.schedules.length; i++) {
        if (this.schedules[i].spotid == spotid) {
          let temp = this.schedules[i];
          this.schedules[i] = this.schedules[i - 1];
          this.sshedules[i - 1] = temp;
          break;
        }
      }

      // this.CLEAR_SCHEDULE_LIST();
      this.SET_SCHEDULE_LIST(this.schedules);
      // this.makeLine();
    },
    downSchedule(spotid) {
      console.log("down2");
      for (var i = 0; i < this.schedules.length; i++)
        console.log("check : "+this.schedules[i].spotid)

      for (var i = 0; i < this.schedules.length - 1; i++) {
        if (this.schedules[i].spotid == spotid) {
          let temp = this.schedules[i];
          this.schedules[i] = this.schedules[i + 1];
          this.schedules[i + 1] = temp;
          break;
        }
      }

      // this.CLEAR_SCHEDULE_LIST();
      this.SET_SCHEDULE_LIST(this.schedules);
      // this.makeLine();
    },
    deleteSchedule(spotid) {
      // console.log(this.schedules.length);
      for (var i = 0; i < this.schedules.length; i++) {
        // console.log(this.schedules[i].spotid);
        if (this.schedules[i].spotid == spotid) {
          this.schedules.splice(i, 1);
          i--;
        }
      }

      // this.CLEAR_SCHEDULE_LIST();
      this.SET_SCHEDULE_LIST(this.schedules);
      this.resetMarkers();
      this.makeMarker();
      // this.makeLine();
    },
    resetMarkers() {
      for (var i = 0; i < this.sMarkers.length; i++) {
        this.sMarkers[i].setMap(null);
      }
      this.sMarkers = [];
    },
    makeMarker() {
      let vm = this;
      this.schedules.forEach((schedule) => {
        var latlang = new kakao.maps.LatLng(schedule.mapx, schedule.mapy);
        var marker = new kakao.maps.Marker({
          position: latlang,
          image: new kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            new kakao.maps.Size(29, 42)
          ),
        });
        marker.setMap(this.map);
        marker.setZIndex(50);
        // kakao.maps.event.addListener(marker, "mouseover", function () {
        //   vm.displayInfowindow(marker, schedule);
        // });
        this.sMarkers.push(marker);
      });
    },
  },
};
</script>
