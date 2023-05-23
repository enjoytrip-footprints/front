<template>
    <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <card gradient="secondary" shadow body-classes="p-lg-5">
          <div class="row justify-content-center mt--400">
              <div class="col-lg-8">
                  <h2>
                    여행 후기 수정하기
                  </h2>
                  <p class="mt-0">
                    {{userInfo.name}} 님의 발자취를 남겨주세요.
                  </p>
              </div>
          </div>
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10 col-sm-12">
            <div class="mb-3">
              <label for="title" class="form-label">제목</label>
              <base-input
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력해주세요"
                v-model="review.title">
              </base-input>
              <base-input class="mb-3">
                <label for="content" class="form-label">내용</label>
                <textarea
                  class="form-control"
                  id="content"
                  name="content"
                  rows="5"
                  style="resize: none"
                  placeholder="내용을 입력해주세요."
                  v-model="review.desc">
                </textarea>
            </base-input>
            </div>
            <div class="col-auto text-center">
              <base-button
                class="my-4"
                @click="modify">
                후기 수정하기
              </base-button>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </template>
  
  <script>
  import { mapState, mapMutations, mapActions } from "vuex";
  
  export default {
    name: "ReviewModify",
    computed: {
      ...mapState("reviewStore", ["review"]),
      ...mapState("userStore", ["userInfo"]),
    },
    methods: {
      ...mapMutations("reviewStore", ["CLEAR_REVIEW_LIST"]),
      ...mapActions("reviewStore", ["modifyReview", "getReviewList"]),
      async modify() {
        await this.modifyReview(this.review);
        alert("여행 후기가 수정되었습니다!!");
        this.CLEAR_REVIEW_LIST();
        this.getReviewList();
        this.$router.push({ name: "reviewList" });
      },
    },
  };
  </script>
  
  <style></style>