<template>
  <div class="position-relative">
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
            <div class="col-lg-6"   style="margin-bottom: 10px;">
              <h1 class="display-3 text-white">여행 후기</h1>
            </div>
            <div class="row" style="border-bottom: solid;">
              <base-button 
                style="position: absolute; 
                right: 18px" 
                v-if="userInfo" 
                class="my-4" 
                @click="shareReview"
                >여행후기  공유하기
              </base-button>
            </div>
          </div>
          <div style="margin-top:100px;">
            <router-view></router-view>
            <br/><br/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

  <script>
import { mapState, mapActions } from "vuex";
import ReviewListItem from "@/components/review/ReviewListItem";

export default {
  name: "ReviewView",
  components: {
    ReviewListItem,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    ...mapActions("reviewStore", ["getReviewList"]),
    shareReview() {
      this.$router.push({ name: "reviewShare" });
    },
  },
  mounted() {
    this.getReviewList();
  },
};
  </script>
  
  <style></style>