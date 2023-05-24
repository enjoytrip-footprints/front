<template>
  <section class="section section-lg pt-lg-0 mt--100" v-if="review">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div class="col-lg-4">
              <card
                class="border-0"
                hover
                shadow
                body-classes="py-5"
                style="width: 250px; height: 400px; margin-top: 40px"
              >
                <img
                  :src="'img/' + review.image"
                  class="img-fluid"
                  style="width: 200px; height: 200px; margin-top: 0; margin-bottom: 10px"
                  alt=""
                />
                <h6 class="text-primary text-uppercase">{{ review.title }}</h6>
                <p class="description mt-3">
                  <span style="float: left"> ❤️ {{ review.likes }}</span>
                  <span style="float: right">조회수 {{ review.hit }} </span>
                </p>
                <base-button
                  @click="readReview"
                  style="margin-top: 20px; color: white"
                  tag="a"
                  type="default"
                  class="mt-4"
                >
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
import { mapState, mapActions } from "vuex";

export default {
  name: "ReviewListItem",
  props: {
    review: Object,
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    ...mapActions("reviewStore", ["getReview"]),
    readReview() {
      this.getReview(this.review.reviewId);
      this.$router.push({ name: "reviewDetail", params: { reviewId: this.review.reviewId } });
    },
  },
};
</script>

<style></style>
