<template>
  <section class="section section-lg section-shaped overflow-hidden my-0">
    <div class="shape shape-style-1 bg-gradient-default shape-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container py-0 pb-lg">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-5 mb-5 mb-lg-0">
          <h1 class="text-white font-weight-light">발자취</h1>
          <p class="lead text-white mt-4">남겨왔던 남길 예정인 모든 발자취는 아름답습니다.</p>
          <!-- <a
            href="https://demos.creative-tim.com/argon-design-system/docs/components/alerts.html"
            class="btn btn-white mt-4"
            >여행지 검색하기</a
          > -->

          <router-link to="/toursearch" class="btn btn-white mt-4"> 여행지 검색하기 </router-link>
          <br />
          <router-link to="/tourplan" class="btn btn-white mt-4"> 여행 계획 짜기 </router-link>
        </div>
        <div class="col-lg-6 mb-lg-auto">
          <div class="rounded shadow-lg overflow-hidden transform-perspective-right">
            <b-carousel id="carousel1" controls indicators>
              <!-- Text slides with image -->
              <!-- <b-carousel-slide img-src="img/theme/img-1-1200x1000.jpg"></b-carousel-slide> -->
              <!-- <b-carousel-slide img-src="img/theme/img-2-1200x1000.jpg"></b-carousel-slide> -->
              <b-carousel-slide img-src="img/theme/img1.png"></b-carousel-slide>
              <b-carousel-slide img-src="img/theme/img2.png"></b-carousel-slide>
              <b-carousel-slide img-src="img/theme/img3.png"></b-carousel-slide>
              <b-carousel-slide img-src="img/theme/img4.png"></b-carousel-slide>
            </b-carousel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";

export default {
  components: {
    BCarousel,
    BCarouselSlide,
  },
};
</script>
<style></style>
