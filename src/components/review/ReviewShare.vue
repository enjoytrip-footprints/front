<template>
  <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row justify-content-center mt--400">
          <card gradient="secondary" shadow body-classes="p-lg-5">
              <h4 class="mb-1" >여행 후기 남기기</h4>
              <p class="mt-0">{{userInfo.name}} 님의 발자취를 남겨주세요.
              흩어지는 소중한 추억을 간직하고 자랑해보아요.</p>
              <div class="regist_form">
              <base-input alternative placeholder="제목" type="text" id="title" name="title" v-model="title" ref="title"> </base-input>
              <base-input class="mb-4">
                <textarea
                  class="form-control form-control-alternative"
                  rows="6"
                  cols="100"
                  id="content"
                  name="content"
                  placeholder="내용을 입력해주세요"
                  v-model="desc"
                ></textarea>
              </base-input>
              <input 
              type="file"
                accept="image/*"
                class="form-control"
                style="height: 45px"
                placeholder="이미지를 통록해주세요"
                @change="handleFileChange"/>
              <base-button class="my-4" @click="share">
                등록하기
              </base-button>
              <base-button class="my-4" @click="moveList">목록</base-button>
              </div>
            </card>
          </div>
        </div>
    </section>
  </template>
  
  <script>
  import { mapState, mapMutations, mapActions } from "vuex";
  
  export default {
    name: "ReviewShare",
    data() {
      return {
        title: null,
        desc: null,
        file: null,
      };
    },
    computed: {
      ...mapState("userStore", ["userInfo"]),
    },
    methods: {
      ...mapMutations("reviewStore", ["CLEAR_REVIEW_LIST"]),
      ...mapActions("reviewStore", ["writeReview", "getReviewList"]),
  
      handleFileChange(e) {
        this.file = e.target.files[0];
      },
      async share() {
        if (!this.title) {
          alert("제목을 입력해 주세요!!!");
          return;
        } else if (!this.desc) {
          alert("설명을 입력해 주세요!!!");
          return;
        } else if (!this.file) {
          alert("핫 플레이스 사진을 추가해주세요!!!");
          return;
        } else {
          let data = new FormData();
          data.append("userid", this.userInfo.Id);
          data.append("title", this.title);
          data.append("desc", this.desc);
          data.append("upfile", this.file);
  
          await this.writeReview(data);
          this.CLEAR_REVIEW_LIST();
          this.getReviewList();
          this.$router.push({ name: "reviewList" });
        }
      },
      moveList() {
      this.$router.push({ name: "reviewList" });
    },
    },
  };
  </script>
  
  <style></style>