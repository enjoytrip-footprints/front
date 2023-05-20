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
            </div>
          </div>
          <router-view></router-view><br /><br />
        </div>
      </div>
    </section>
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
