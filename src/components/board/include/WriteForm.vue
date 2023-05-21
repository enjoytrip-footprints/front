<template>
  <!-- <div class="regist">
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
  </div> -->
  <div class="regist">
  <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row justify-content-center mt--400">
          <div class="col-lg-8">
            <card gradient="secondary" shadow body-classes="p-lg-5">
              <h4 v-if="type == 'create'" class="mb-1" >여행 후기 남기기</h4>
              <h4 v-else class="mb-1" >여행 후기 수정하기</h4>
              <p class="mt-0">여러분의 발자취를 남겨주세요.
              흩어지는 소중한 추억을 간직하고 자랑해보아요.</p>
              <div class="regist_form">
              <base-input class="mt-5" alternative placeholder="글쓴이" addon-left-icon="ni ni-user-run" type="text" id="author" name="author" v-model="author" ref="author" >
              </base-input>
              <base-input alternative placeholder="제목" addon-left-icon="ni ni-email-83" type="text" id="title" name="title" v-model="title" ref="title"> </base-input>
              <base-input class="mb-4">
                <textarea
                  class="form-control form-control-alternative"
                  rows="4"
                  cols="80"
                  placeholder="내용을 입력해주세요"
                  id="article" name="article" v-model="article" ref="article"
                ></textarea>
              </base-input>
              <base-button v-if="type == 'create'" round block size="lg"  @click="checkValue">
                등록하기
              </base-button>
              <base-button v-else round block size="lg" @click="checkValue">
                수정하기
              </base-button>
              <button @click="moveList">목록</button>
              </div>
            </card>
          </div>
        </div>
      </div>
    </section>
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
