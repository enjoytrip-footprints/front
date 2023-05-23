<template>

  <div class="position-relative">
    <section class="section-shaped my-0">
      <div class="shape shape-style-1 shape-default shape-skew bg-gradient-default">
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
              <h1 class="display-3 text-white">인기 여행 후기</h1>
            </div>
            <div class="row" style="border-bottom: solid;">
            </div>
            </div>
            <div style="margin-top:100px;">
          <router-view></router-view><br /><br /></div>
        </div>
      </div>
    </section>
  </div>
</template>

  <script>
import { mapState, mapActions } from "vuex";
import ReviewListItem from "@/components/review/ReviewListItem";

export default {
  name: "HotReviewView",
  components: {
    ReviewListItem,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("reviewStore", ["reviews"]),
  },
  methods: {
    ...mapActions("reviewStore", ["getHotReviewList"]),
  },
  mounted() {
    this.getHotReviewList();
  },
};
  </script>
  
  <style></style>