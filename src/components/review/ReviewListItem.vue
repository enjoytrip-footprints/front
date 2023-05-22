<template>
    <div class="col-xl-3 col-lg-4 col-md-6 pl-0 pr-0 portfolio-item filter-app" style="margin: 2px; padding-right: 3px;" v-if="review">
      <img :src="'img/' + review.image" class="img-fluid" alt="" />
      <div class="portfolio-info">
        <h4>{{ review.title }}</h4>
        <p> {{ review.userId }}</p>
        <p>{{ review.desc }}</p>
        <base-button
          class="my-4"
          v-if="userInfo && userInfo.id == review.userId"
          @click="editReview"
          >수정</base-button>
        <base-button
          class="my-4"
          v-if="userInfo && userInfo.id == review.userId"
          @click="removeReview"
        >삭제
        </base-button>
      </div>
    </div>
  </template>
<script>

  // import { userInfo } from "os";
import { mapState, mapMutations, mapActions } from "vuex";
  
  export default {
    name: "ReviewListItem",
    props: {
      review: Object,
    },
    computed: {
      ...mapState("userStore", ["userInfo"]),
    },
    methods: {
      ...mapMutations("reviewStore", ["CLEAR_REVIEW_LIST"]),
      ...mapActions("reviewStore", ["getReview", "getReviewList", "deleteReview"]),
  
      editReview() {
        this.getReview(this.review.reviewId);
        this.$router.push({ name: "reviewModify" });
      },
      async removeReview() {
        if (confirm( "후기를 삭제하시겠습니까??")) {
          await this.deleteReview(this.review.reviewId);
          this.CLEAR_REVIEW_LIST();
          this.getReviewList();
          alert("후기가 삭제되었습니다!!");
          this.$router.push({ name: "reviewList" });
        }
      },
    },
  };
  </script>
  
  <style>
  </style>