<template>
  <section id="portfolio" class="portfolio" data-aos="fade-up">
    <div class="container-fluid" style="min-height: 750px; border-bottom: solid; ">
      <div class="section-header">
      </div>
      <div class="container-fluid mt-3" data-aos="fade-up" data-aos-delay="200" style="text-align: center; ">
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
  name: "hotReviewList",
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