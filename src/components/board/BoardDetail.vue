<template>
  <div>
    <detail-view></detail-view>
  </div>
</template>

<script>
import DetailView from "@/components/board/include/DetailView.vue";

import { mapState, mapActions } from "vuex";
// import CommentWrite from "@/components/board/include/comment/CommentWrite.vue";
// import CommentRow from "@/components/board/include/comment/CommentRow.vue";

export default {
  components: {
    DetailView,

    // CommentWrite,
    // CommentRow,
  },
  data() {
    return {
      isbn: "",
      isModifyShow: false,
      // modifyComment: Object,
    };
  },
  computed: {
    // ...mapState("comment", ["comments"]),
  },
  methods: {
    ...mapActions("board", ["getBoard"]),
    // ...mapActions("comment", ["getComments"]),
    // onModifyComment(comment) {
    //   this.modifyComment = comment;
    //   this.isModifyShow = true;
    // },
    // onModifyCommentCancel(isShow) {
    //   this.isModifyShow = isShow;
    // },
  },
  created() {
    this.articleNo = this.$route.params.articleNo;
    this.getBoard(this.articleNo);
    // this.getComments(this.isbn);
  },
};
</script>
