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
          <div class="row" style="margin-top: 10%"></div>
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
