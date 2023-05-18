<template>
  <!-- <div class="shape shape-style-1 bg-gradient-primary">
    <div class="col-9 text-center">
      <span></span>
      <br /><br />
      <br /><br />

      <router-view></router-view>
    </div>
  </div> -->

  <div class="position-relative">
    <!-- shape Hero -->
    <section class="section-shaped my-0">
      <div class="shape shape-style-1 shape-default shape-skew">
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
            <div class="col-lg-6">
              <h1 class="display-3  text-white">
                여행 후기 공유
              </h1>
              <p class="lead  text-white">
                여러분의 발자취를 남겨주세요.
              </p>
              <p class="lead  text-white">
                흩어지는 소중한 추억을 간직하고 자랑해보아요.
              </p>
            </div>
          </div>
          <router-view></router-view><br /><br />
          <!-- <board-search></board-search> -->
        </div>
      </div>
    </section>
    <!-- 1st Hero Variation -->
  </div>
</template>

<script>
// import BoardSearch from "@/components/board/BoardSearch.vue";

export default {
  name: "BoardView",
  // components: {
  // BoardSearch,
  // },
};
</script>
