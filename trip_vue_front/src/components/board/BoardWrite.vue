<template>
  <div>
    <write-form :type="type"></write-form>
  </div>
</template>

<script>
import WriteForm from "@/components/board/include/WriteForm.vue";

export default {
  components: {
    WriteForm,
  },
  data() {
    return {
      type: "create",
    };
  },
  created() {
    if (this.$route.params.articleNo) this.type = "modify";
  },
};
</script>

<style></style>
