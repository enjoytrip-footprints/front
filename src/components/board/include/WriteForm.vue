<template>
  <div class="regist">
    <hr color="black" size="50" />
    <h1 v-if="type == 'create'" class="underline text-white">글 등록</h1>
    <h1 v-else class="underline text-white">글 수정</h1>

    <div class="regist_form">
      <label for="author">글쓴이</label>
      <input type="text" id="author" name="author" v-model="author" ref="author" /><br />
      <label for="title">제목</label>
      <input type="text" id="title" name="title" v-model="title" ref="title" /><br />
      <label for="article">글 내용</label><br />
      <textarea id="article" name="article" v-model="article" ref="article" cols="35" rows="5"></textarea><br />

      <button v-if="type == 'create'" @click="checkValue">등록</button>
      <button v-else @click="checkValue">수정</button>

      <button @click="moveList">목록</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    type: String,
  },
  data() {
    return {
      articleNo: "",
      author: "",
      title: "",
      article: "",
      cnt: "",
    };
  },
  computed: {
    ...mapState("board", ["board"]),
  },
  created() {
    if (this.type != "create") {
      this.getBoard(this.$route.params.articleNo);

      this.articleNo = this.board.articleNo;
      this.author = this.board.author;
      this.title = this.board.title;
      this.article = this.board.article;
      this.cnt = this.board.cnt;
    }
  },
  methods: {
    ...mapActions("board", ["getBoard", "regBoard", "modBoard"]),
    checkValue() {
      let err = true;
      let msg = "";
      !this.title && ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err && !this.author && ((msg = "저자 입력해주세요"), (err = false), this.$refs.author.focus());
      err && !this.article && ((msg = "내용 입력해주세요"), (err = false), this.$refs.article.focus());

      if (!err) alert(msg);
      else this.type == "create" ? this.registBoard() : this.modifyBoard();
    },
    async registBoard() {
      await this.regBoard({
        articleNo: this.articleNo,
        author: this.author,
        title: this.title,
        article: this.article,
        cnt: this.cnt,
      });
      this.moveList();
    },
    async modifyBoard() {
      await this.modBoard({
        articleNo: this.articleNo,
        author: this.author,
        title: this.title,
        article: this.article,
        cnt: this.cnt,
      });
      this.moveList();
    },
    moveList() {
      this.$router.push({ name: "BoardList" });
    },
  },
};
</script>

<style></style>
