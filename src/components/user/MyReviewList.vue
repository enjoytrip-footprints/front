<template>
  <section id="portfolio" class="portfolio" data-aos="fade-up" style="pb-0">
    <div class="container-fluid" style="min-height: 750px; border-bottom: solid; ">
      <div class="section-header">
      </div>
      <div class="container-fluid mt-3" data-aos="fade-up" data-aos-delay="200" style="text-align: center; ">
        <div class="row g-0 portfolio-container">
          <my-review-item
            v-for="review in reviews"
            :key="review.reviewid"
            :review="review"
          ></my-review-item>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { userInfo } from "os";
import { mapState, mapGetters, mapActions } from "vuex";
import MyReviewItem from "@/components/user/MyReviewItem";


export default {

  name: "MyReviewList",
  components: {
    MyReviewItem,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapState("reviewStore", ["reviews"]),
  },
  methods: {
    ...mapActions("reviewStore", ["getPersonReviewList"]),
  },
  mounted() {
    this.getPersonReviewList(this.userInfo.id);
  },
};
</script>

<style></style>
