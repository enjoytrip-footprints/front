<template>
  <div v-show="isShow" class="comment">
    <div class="head">{{ comment.userId }}</div>
    <div class="content" v-html="enterToBr(comment.content)"></div>

    <div v-if="userInfo.id==comment.userId" class="cbtn"><label @click="modifyCommentView">수정</label> | <label @click="deleteComment">삭제</label></div>
  </div>
</template>

<script>
import { mapActions , mapState} from "vuex";

export default {
  props: {
    comment: Object,
  },
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    ...mapActions("commentStore", ["getComments", "delComment"]),
    modifyCommentView() {
      this.$emit("modify-comment", {
        id: this.comment.id,
        content: this.comment.content,
        reviewId: this.comment.reviewId,
      });
    },
    async deleteComment() {
      // await this.delComment(this.comment.id, this.comment.reviewId);
      await this.delComment(this.comment.id);
      await this.getComments(this.comment.reviewId);
    },
    enterToBr(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, "<br />");
    },
  },
};
</script>

<style scoped>
.comment {
  text-align: left;
  border-radius: 5px;
  background-color: #d6e7fa;
  padding: 10px 20px;
  margin: 10px;
}
.head {
  font-weight: bold;
  margin-bottom: 5px;
}
.content {
  padding: 5px;
}
.cbtn {
  text-align: right;
  color: steelblue;
  margin: 5px 0px;
}
label {
  width: 40px;
  text-align: center;
}
</style>
