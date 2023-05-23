<template>
  <div>
    <carousel></carousel>
    <main-weather></main-weather>
  </div>
</template>

<script>
import Carousel from "./components/Carousel";
import MainWeather from "@/components/main/MainWeather";

export default {
  name: "components",
  components: {
    Carousel,
    MainWeather,
  },
};
</script>
