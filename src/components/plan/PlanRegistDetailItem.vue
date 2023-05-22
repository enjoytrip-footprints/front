<template>
  <li class="timeline-item mb-4">
    <span class="timeline-icon"> {{ num }} </span>
    <h5 class="fw-bold">{{ schedule.title }}</h5>
    <p class="text-muted mb-2 fw-bold">
      <span class="me-1" style="font-size: smaller">[{{ theme(schedule.theme) }}]</span>
      {{ schedule.address }}
    </p>
    <label class="col-6">출발일 <input class="form-control" type="date" id="depart_date" name="depart_date" /></label>
    <label class="col-6">도착일 <input class="form-control" type="date" id="arrive_date" name="arrive_date" /></label>
    <p />
    <label class="col-6"
      >예상 경비(원) <input class="form-control" type="number" id="fee" name="fee" min="1" max="100000000" />
    </label>
    <label class="col-6"
      >예상 행복도(1~100) <input class="form-control" type="number" id="happy" name="happy" min="1" max="100"
    /></label>
    <p />
    기타
    <input type="text" class="form-control" v-bind:id="'memo' + num" name="memo" placeholder="메모..." />
  </li>
</template>

<script>
export default {
  name: "PlanWriteDetailItem",
  props: {
    num: Number,
    schedule: Object,
  },
  methods: {
    theme(tCode) {
      var themes = {
        12: "관광지",
        14: "문화시설",
        15: "행사/공연/축제",
        28: "레포츠",
        32: "숙박",
        38: "쇼핑",
        39: "음식점",
      };
      return themes[tCode];
    },
  },
};
</script>

<style></style>
