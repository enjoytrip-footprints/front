<template>
  <div v-if="userInfo" class="regist">
    <small>댓글</small>
    <div v-if="!checkComment" class="regist_form" style="margin-bottom: 50px;">
      <textarea id="comment" name="comment" v-model="comment" cols="35" rows="2" placeholder="댓글을 입력해주세요."></textarea>
      <base-button @click="registComment" style="height: 30px; font-size: small; padding: 0px 15px 0px 15px;">등록</base-button>
    </div>
  
    <div v-else class="regist_form" style="margin-bottom: 50px;">
      <textarea id="comment" name="comment" v-model="checkComment.comment" cols="35" rows="2"></textarea>
      <button class="small" @click="modifyCommentCancel">취소</button>
      <button class="small" @click="updateComment">수정</button>
    </div>
  </div>
  <div v-else class="regist">
    <small>댓글이 없습니다.</small>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    reviewId: String,
    modifyComment: Object,
  },
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
    checkComment() {
      return this.modifyComment;
    },
  },
  methods: {
    ...mapActions("commentStore", ["getComments", "regComment", "modComment"]),
    async registComment() {
      await this.regComment({
        content: this.comment,
        reviewId: this.reviewId,
        userId: this.userInfo.id,
      });
    this.comment = '';
      await this.getComments(this.reviewId);
    },
    async updateComment() {
      await this.modComment({
        id: this.modifyComment.id,
        content: this.modifyComment.comment,
      });
      await this.getComments(this.modifyComment.reviewId);
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
  font-size: small;
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
