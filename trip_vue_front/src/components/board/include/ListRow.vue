<template>
  <tr>
    <td>{{ articleNo }}</td>
    <td>
      <router-link :to="{ name: 'BoardDetail', params: { articleNo: articleNo } }">{{ title }}</router-link>
    </td>
    <td>{{ author }}</td>
    <td>{{ cnt }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    // no: Number,
    articleNo: Number,
    title: String,
    author: String,
    cnt: Number,
  },
  // filters: {
  //   numberWithCommas(x) {
  //     return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   },
  // },
};
</script>

<style scoped>
td {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}
</style>
