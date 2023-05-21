<template>
    <div class="col-xl-3 col-lg-4 col-md-6 pl-0 pr-0 portfolio-item filter-app" v-if="review">
      <!-- <img :src="'http://localhost/upload/file/' + review.image" class="img-fluid" alt="" /> -->
      <div class="portfolio-info">
        <h4>{{ review.title }}</h4>
        <p>@{{ review.userid }}</p>
        <p>{{ review.desc }}</p>
        <a
          title="수정"
          class="my-4"
          v-if="userInfo && userInfo.Id == review.userid"
          @click="editReview"
          ></a>
        <a
          title="삭제"
          class="my-4"
          v-if="userInfo && userInfo.Id == review.userid"
          @click="removeReview"
        >
        </a>
      </div>
    </div>
  </template>
<script>

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
        this.getReview(this.review.reviewid);
        this.$router.push({ name: "reviewModify" });
      },
      async removeReview() {
        if (confirm("회원님의 핫 플레이스를 삭제하시겠습니까??")) {
          await this.deleteReview(this.review.reviewid);
  
          this.CLEAR_REVIEW_LIST();
          this.getReviewList();
          alert("핫 플레이스가 삭제되었습니다!!");
          this.$router.push({ name: "reviewList" });
        }
      },
    },
  };
  </script>
  
  <style>
  </style>