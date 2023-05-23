<template>
  <div class="position-relative">
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
                <h1 class="display-3 text-white">
                  건의사항
                </h1>
                <span>불편한 점이 있으면 적어주세요.</span>
            </div>
          </div>
          <router-view></router-view><br /><br />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "BoardView",
};
</script>
