<template>
    <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row justify-content-center mt--400">
          <card gradient="secondary" shadow body-classes="p-lg-5">
              <h4 class="mb-1"> {{review.userId}} 님의 발자취</h4>
              <div class="regist_form">
                <img :src="'img/' + review.image" class="img-fluid" style="width: 500px; height: 500px; margin-top: 0; margin-bottom: 10px; " alt="" />
                <h6 class="text-primary text-uppercase">{{ review.title }}</h6>
                <p class="description mt-3" >
                    {{review.desc}}
                  </p>
                <div class="description mt-3" style="margin-bottom: 10px; " >
                    <span  style="float: left" @click="likes">  ❤️ {{ review.likes }}</span>
                    <span style="float: right">조회수 {{review.hit}} </span>
                </div>
            </div>
            <div style="margin-top: 50px; ">
            <base-button
                    class="my-4"
                    v-if="userInfo && userInfo.id == review.userId"
                    @click="editReview">
                    수정
                </base-button>
                <base-button
                    class="my-4"
                    v-if="userInfo && userInfo.id == review.userId"
                    @click="removeReview">삭제
                </base-button>
                <base-button 
                    class="my-4" 
                    @click="moveList">목록
                </base-button>
                </div>
            </card>
            
          </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
  
  export default {
    name: "ReviewDetail",
    props: {
      review: Object,
    },
    computed: {
      ...mapState("userStore", ["userInfo"]),
      ...mapState("reviewStore", ["review"]),
    },
    methods: {
      ...mapMutations("reviewStore", ["CLEAR_REVIEW_LIST"]),
      ...mapActions("reviewStore", ["getReview", "getReviewList", "deleteReview", "updateLikes"]),
  
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
      async likes(){
        this.updateLikes(this.review.reviewId);
        this.review.likes +=1;
      },
      created() {
      this.reviewId = this.$route.params.reviewId;
      this.getReview(this.reviewId);
      },
      moveList() {
      this.$router.push({ name: "reviewList" });
      },
    },
  };
  </script>
<style>
</style>