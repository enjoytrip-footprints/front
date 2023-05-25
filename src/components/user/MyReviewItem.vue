<template>
    <section class="section section-lg pt-lg-0 mt--100" v-if="review">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid" >
              <div class="col-lg-4">
                <card class="border-0" 
                  hover shadow 
                  body-classes="py-5" 
                  style="width: 250px; height: 400px; margin-top: 40px;">
                  <img 
                    :src="'img/' + review.image" 
                    class="img-fluid" 
                    style="width: 200px; height: 200px; margin-top: 0; margin-bottom: 10px;" 
                    alt=""/>
                  <h6 class="text-uppercase" style="color: #850000;">
                    {{ review.title }}
                  </h6>
                  <p class="description mt-3" >
                    <span  style="float: left">  ❤️ {{ review.likes }}</span>
                    <span style="float: right">조회수 {{review.hit}} </span>
                  </p>
                  <base-button 
                    @click="readReview" 
                    style="margin-top: 20px; background-color: #850000; border-color: #850000; color: #FFFFFF;" 
                    tag="a" 
                    type="primary"
                    class="mt-4">
                    상세보기
                  </base-button>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
  
  export default {
    name: "MyReviewItem",
    props: {
      review: Object,
    },
    computed: {
      ...mapState("userStore", ["userInfo"]),
    },
    methods: {
      ...mapMutations("reviewStore", ["CLEAR_REVIEW_LIST"]),
      ...mapActions("reviewStore", ["getReview", "getPersonalReviewList", "deleteReview"]),

      /**
       * 리뷰 상세보기
       */
      readReview(){
        this.getReview(this.review.reviewId);
        this.$router.push({ name: "reviewDetail", params:{reviewId: this.review.reviewId} });
      },

      /**
       * 내 리뷰 수정
       */
      editReview() {
        this.getReview(this.review.reviewId);
        this.$router.push({ name: "reviewModify" });
      },

      /**
       * 리뷰 삭제
       */
      async removeReview() {
        if (confirm( "후기를 삭제하시겠습니까??")) {
          await this.deleteReview(this.review.reviewId);
          this.CLEAR_REVIEW_LIST();
          this.getPersonalReviewList(this.userInfo.id);
          alert("후기가 삭제되었습니다!!");
          this.$router.push({ name: "myReviewList" });
        }
      },
    },
  };
  </script>
  
  <style></style>
