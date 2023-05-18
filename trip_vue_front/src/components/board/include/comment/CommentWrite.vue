<template>
  <div class="regist">
    <div v-if="checkComment != null" class="regist_form">
      <textarea id="comment" name="comment" v-model="checkComment.comment" cols="35" rows="2"></textarea>
      <button class="small" @click="modifyCommentCancel">취소</button>
      <button class="small" @click="updateComment">수정</button>
    </div>
    <div v-else class="regist_form">
      <textarea id="comment" name="comment" v-model="comment" cols="35" rows="2"></textarea>
      <button @click="registComment">등록</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    isbn: String,
    modifyComment: Object,
  },
  data() {
    return {
      // 차후 작성자 이름은 로그인 구현후 로그인한 사용자로 바꾼다.
      user_name: "오싸피",
      comment: "",
    };
  },
  computed: {
    checkComment() {
      return this.modifyComment;
    },
  },
  methods: {
    ...mapActions("comment", ["getComments", "regComment", "modComment"]),
    async registComment() {
      await this.regComment({
        user_name: this.user_name,
        comment: this.comment,
        isbn: this.isbn,
      });
      this.comment = "";
      await this.getComments(this.isbn);
    },
    async updateComment() {
      await this.modComment({
        comment_no: this.modifyComment.comment_no,
        comment: this.modifyComment.comment,
      });
      await this.getComments(this.modifyComment.isbn);
      this.modifyCommentCancel();
    },
    modifyCommentCancel() {
      this.$emit("modify-comment-cancel", false);
    },
  },
};
</script>

<style scoped>
textarea {
  width: 90%;
  font-size: large;
}
button {
  float: right;
}
button.small {
  width: 60px;
  font-size: small;
  font-weight: bold;
}
</style>
