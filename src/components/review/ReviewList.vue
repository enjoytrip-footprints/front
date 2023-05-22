<template>
  <section id="portfolio" class="portfolio" data-aos="fade-up" style="pb-0">
    <div class="container-fluid" style="min-height: 750px">
      <div class="section-header">
        <!-- <a
          class="btn-default"
          style="position: absolute; right: 18px"
          v-if="userInfo"
          @click="shareReview"
          >여행후기  공유하기</a
        > -->
        <div class="row" style="margin-bottom: 100px">
          <base-button 
          style="position: absolute; 
            right: 18px" 
            v-if="userInfo" 
            class="my-4" 
            @click="shareReview">
            여행후기  공유하기
          </base-button>
        </div>
      </div>
      <div class="container-fluid mt-3" data-aos="fade-up" data-aos-delay="200" style="border-top: solid; text-align: center;">
        <div class="row g-0 portfolio-container">
          <review-list-item
            v-for="review in reviews"
            :key="review.reviewid"
            :review="review"
          ></review-list-item>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex";
import ReviewListItem from "@/components/review/ReviewListItem";

export default {
  name: "ReviewList",
  components: {
    ReviewListItem,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("reviewStore", ["reviews"]),
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