<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
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
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3 text-white">여행지 찾기</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <!-- Map 추가하는 부분 -->

          <select-sido @select-sido="selectSido"></select-sido>
          <select-gugun :sidoCode="sidoCode" @select-gugun="selectGugun"></select-gugun>

          <div class="col-lg-12">
            <div class="row row-grid">
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-check-bold" type="primary" rounded class="mb-4"> </icon>
                  <h6 class="text-primary text-uppercase">Download Argon</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="primary" rounded>design</badge>
                    <badge type="primary" rounded>system</badge>
                    <badge type="primary" rounded>creative</badge>
                  </div>
                  <base-button tag="a" href="#" type="primary" class="mt-4"> Learn more </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-istanbul" type="success" rounded class="mb-4"> </icon>
                  <h6 class="text-success text-uppercase">Build Something</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="success" rounded>business</badge>
                    <badge type="success" rounded>vision</badge>
                    <badge type="success" rounded>success</badge>
                  </div>
                  <base-button tag="a" href="#" type="success" class="mt-4"> Learn more </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-planet" type="warning" rounded class="mb-4"> </icon>
                  <h6 class="text-warning text-uppercase">Prepare Launch</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="warning" rounded>marketing</badge>
                    <badge type="warning" rounded>product</badge>
                    <badge type="warning" rounded>launch</badge>
                  </div>
                  <base-button tag="a" href="#" type="warning" class="mt-4"> Learn more </base-button>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SelectSido from "@/components/item/SelectSido.vue";
import SelectGugun from "@/components/item/SelectGugun.vue";
import TheKakaoMap from "@/components/TheKakaoMap.vue";
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
      console.log("구군바꼈으니 충전소 찾으러 가자!!!", gugunCode);
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

      const params = {
        pageNo: 1,
        numOfRows: 30,
        zscode: gugunCode,
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      // if (gugunCode) params.zscode = gugunCode;
      // else params.zcode = this.sidoCode;

      electricChargerStationList(
        params,
        ({ data }) => {
          this.chargerList = data.items[0].item;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
