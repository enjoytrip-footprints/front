<template>
  <div v-show="isShow" class="comment">
    <div class="head">{{ comment.user_name }} ({{ getFormatDate(comment.comment_time) }})</div>
    <div class="content" v-html="enterToBr(comment.comment)"></div>
    <!-- 로그인 기능 구현 후 로그인한 자신의 글에만 보이게 한다. -->
    <div class="cbtn"><label @click="modifyCommentView">수정</label> | <label @click="deleteComment">삭제</label></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    comment: Object,
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    ...mapActions("comment", ["getComments", "delComment"]),
    modifyCommentView() {
      this.$emit("modify-comment", {
        comment_no: this.comment.comment_no,
        comment: this.comment.comment,
        isbn: this.comment.isbn,
      });
    },
    async deleteComment() {
      await this.delComment(this.comment.comment_no, this.comment.isbn);
      await this.getComments(this.comment.isbn);
    },
    getFormatDate(regtime) {
      // moment : 날짜 관련 라이브러리.
      return moment(new Date(regtime)).format("YYYY.MM.DD HH:mm:ss");
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
