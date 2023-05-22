<template>
    <!-- <div class="col-xl-3 col-lg-4 col-md-6 pl-0 pr-0 portfolio-item filter-app" style="margin: 2px; padding-right: 3px;" v-if="review">
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
    </div> -->
    <section class="section section-lg pt-lg-0 mt--100" v-if="review">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid" >
              <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5" style="width: 250px; height: 400px; margin-top: 40px; ">
                  <img :src="'img/' + review.image" class="img-fluid" style="width: 200px; height: 200px; margin-top: 0; margin-bottom: 10px; " alt="" />
                  <h6 class="text-primary text-uppercase">{{ review.title }}</h6>
                  <p class="description mt-3" >
                    <span style="float: right: ;">조회수 {{review.hit}} </span><span  style="float: left;">  ❤️ {{ review.likes }}</span>
                  </p>
                  <base-button style="margin-top: 20px;" tag="a" href="#" type="primary" class="mt-4">
                    상세보기
                  </base-button>
                </card>
              </div>
              <!-- <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-istanbul" type="success" rounded class="mb-4"> </icon>
                  <h6 class="text-success text-uppercase">Build Something</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="success" rounded>business</badge>
                    <badge type="success" rounded>vision</badge>
                    <badge type="success" rounded>success</badge>
                  </div>
                  <base-button tag="a" href="#" type="success" class="mt-4">
                    Learn more
                  </base-button>
                </card>
              </div> -->
              <!-- <div class="col-lg-4">
                <card class="border-0" hover shadow body-classes="py-5">
                  <icon name="ni ni-planet" type="warning" rounded class="mb-4"> </icon>
                  <h6 class="text-warning text-uppercase">Prepare Launch</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that includes the most important components
                    and features.
                  </p>
                  <div>
                    <badge type="warning" rounded>marketing</badge>
                    <badge type="warning" rounded>product</badge>
                    <badge type="warning" rounded>launch</badge>
                  </div>
                  <base-button tag="a" href="#" type="warning" class="mt-4">
                    Learn more
                  </base-button>
                </card>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
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