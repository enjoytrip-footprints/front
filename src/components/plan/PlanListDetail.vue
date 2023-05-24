<template>
  <section class="section-shaped my-0">
    <div class="shape shape-style-1 shape-default shape-skew bg-gradient-dark">
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
    <div class="container">
      <br /><br /><br /><br />
      <div class="section-header">
        <br /><br /><br /><br /><br /><br /><br /><br />

        <h1 style="text-align: center; color: lightgray">나의 여행 계획</h1>
      </div>
    </div>
    <div class="container" style="min-height: 250px">
      <div class="row justify-content-center">
        <card style="background-color: #eeeeee">
          <div class="col-lg-8 col-md-10 col-sm-12">
            <div class="mb-3">
              <br />

              <!-- <label for="subject" class="form-label">제목 : </label> -->
              <h3>제목 : {{ planSelected.planTitle }}</h3>
              <!-- <input type="text" class="form-control" id="subject" name="subject" placeholder="제목..." readonly /> -->
            </div>
            <div class="mb-0">
              <!-- <label for="content" class="form-label">내용 : </label> -->
              <h3>내용 : {{ planSelected.planDetail }}</h3>

              <!-- <textarea
              class="form-control"
              id="content"
              name="content"
              rows="7"
              style="resize: none"
              placeholder="내용..."
            ></textarea> -->
            </div>
            <div class="mb-0">
              <div class="container p-0">
                <section class="py-5 pb-5">
                  <ul class="timeline-with-icons ms-3" id="planInner">
                    <plan-list-detail-item
                      v-for="(des, index) in deslist"
                      :key="des.spotid"
                      :des="des"
                      :num="index + 1"
                      :tour="tours[index].first_image"
                      ref="childCom"
                    ></plan-list-detail-item>
                  </ul>
                </section>
              </div>
            </div>
            <div class="col-auto text-center" style="">
              <button
                type="button"
                id="btn-share"
                class="btn btn-default mb-3 mr-3"
                style="background: purple; border: none"
                @click="calc"
              >
                예산이 부족하다면..?
              </button>

              <button
                type="button"
                id="btn-share"
                class="btn btn-default mb-3 mr-3"
                style="background: #0ea2bd; border: none"
                @click="moveList"
              >
                목록으로
              </button>
            </div>
          </div>
        </card>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import PlanListDetailItem from "@/components/plan/PlanListDetailItem";
export default {
  name: "PlanDetail",
  // props: {
  //   plan: Object,
  // },
  components: {
    PlanListDetailItem,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("planStore", ["planSelected", "deslist"]),
    ...mapState("itemStore", ["tours"]),
  },
  methods: {
    ...mapMutations("planStore", ["CLEAR_PLAN_LIST"]),
    ...mapActions("planStore", ["getPlan", "getPlanList"]),

    created() {
      // this.planId = this.$route.params.planId;
      // this.getPlan(this.planId);
    },
    moveList() {
      this.$router.push({ name: "TourPlan" });
    },

    calc() {
      var K = prompt("예상 경비를 입력해주세요. (단위 : 만원)");
      if (K == null) return;
      const values = [];
      const weights = [];
      const N = this.deslist.length;
      for (var i = 0; i < N; i++) {
        values.push(this.deslist[i].happy);
        weights.push(this.deslist[i].price);
      }
      console.log(values);
      console.log(weights);

      // 0-1 knapsack
      var dp = new Array(N + 1).fill(0).map(() => new Array(K + 1).fill(0));

      for (var i = 0; i < dp.length; i++) {
        for (var j = 0; j < K; j++) {
          dp[i].push(0);
        }
      }

      console.log("N : " + N + "  K : " + K);
      for (let i = 1; i < N + 1; i++) {
        var W = weights[i - 1];
        var V = values[i - 1];
        for (let j = 1; j <= K; j++) {
          if (j - W >= 0) {
            dp[i][j] = Math.max(dp[i - 1][j - W] + Number(V), dp[i - 1][j]);
          } else {
            dp[i][j] = dp[i - 1][j];
          }
        }
      }

      console.log("최대 행복 : " + dp[N][K]);

      let res = dp[N][K];
      let itemsInKnapsack = [];
      let w = K;
      for (let i = N; i > 0 && res > 0; i--) {
        if (res == dp[i - 1][w]) continue;
        else {
          itemsInKnapsack.push(i - 1);
          res -= values[i - 1];
          w -= weights[i - 1];
        }
      }

      console.log(itemsInKnapsack);
      // console.log(itemsInKnapsack.includes(1));
      for (let i = 0; i < N; i++) {
        // console.log(itemsInKnapsack[i]);
        if (itemsInKnapsack.includes(i)) this.$refs.childCom[i].changeGreen();
        else this.$refs.childCom[i].changeRed();
      }

      alert("반영되었습니다.");
    },
  },
};
</script>
<style></style>
