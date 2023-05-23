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
            :review="review">
          </review-list-item>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import ReviewListItem from "@/components/review/ReviewListItem";

export default {
  name: "ReviewList",
  components: {
    ReviewListItem,
  },
  computed: {
    ...mapState("reviewStore", ["reviews"]),
  },
  mounted() {
    this.getReviewList();
  },
};
</script>

<style></style>