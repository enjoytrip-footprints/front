<template>

    <div class="position-relative">
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew bg-gradient-red">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6" style="margin-bottom: 10px;">
                <h1 class="display-3  text-white">
                  {{userInfo.name}} 님의 후기
                </h1>
              </div>
              <div class="row" style="border-bottom: solid;">
              <base-button 
                style="position: absolute; background-color: white; border-color: white; color: black;
                  right: 18px" 
                  v-if="userInfo" 
                  class="my-4" 
                  @click="shareReview">
                  여행 후기  공유하기
                </base-button>
              </div>
            </div>
            <div style="margin-top:100px;">
            <router-view></router-view><br /><br /></div>
          </div>
        </div>
        
      </section>
    </div>

</template>
  
<script>
  import { mapState, mapActions } from "vuex";
  import MyReviewItem from "@/components/user/MyReviewItem";
  
  export default {
    name: "MyReviewView",
    components: {
        MyReviewItem,
    },
    computed: {
      ...mapState("userStore", ["userInfo"]),
      ...mapState("reviewStore", ["reviews","review"]),
    },
    methods: {
      ...mapActions("reviewStore", ["getPersonReviewList"]),
  
      shareReview() {
        this.$router.push({ name: "reviewShare" });
      },
    },
    mounted() {
        this.getPersonReviewList(this.userInfo.id);
    },
  };
    </script>
    
    <style></style>