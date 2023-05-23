<template>
  <div>
    <detail-view></detail-view>
  </div>
</template>

<script>
import DetailView from "@/components/board/include/DetailView.vue";
import { mapActions } from "vuex";

export default {

  components: {
    DetailView,
  },

  data() {
    return {
      isbn: "",
      isModifyShow: false,
    };
  },

  methods: {
    ...mapActions("board", ["getBoard"]),
  },

  created() {
    this.articleNo = this.$route.params.articleNo;
    this.getBoard(this.articleNo);
  },
};
</script>
