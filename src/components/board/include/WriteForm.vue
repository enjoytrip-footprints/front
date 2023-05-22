<template>
  <div class="regist">
    <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row justify-content-center mt--400">
          <div class="col-lg-8">
            <card gradient="secondary" shadow body-classes="p-lg-5">
              <h4 v-if="type == 'create'" class="mb-1">여행 후기 남기기</h4>
              <h4 v-else class="mb-1">여행 후기 수정하기</h4>
              <p class="mt-0">
                {{ userInfo.name }} 님의 발자취를 남겨주세요. 흩어지는 소중한 추억을 간직하고 자랑해보아요.
              </p>
              <div class="regist_form">
                <base-input
                  alternative
                  placeholder="제목"
                  type="text"
                  id="title"
                  name="title"
                  v-model="title"
                  ref="title"
                >
                </base-input>
                <base-input class="mb-4">
                  <textarea
                    class="form-control form-control-alternative"
                    rows="6"
                    cols="100"
                    placeholder="내용을 입력해주세요"
                    id="article"
                    name="article"
                    v-model="article"
                    ref="article"
                  ></textarea>
                </base-input>
                <base-button v-if="type == 'create'" class="my-4" @click="checkValue"> 등록하기 </base-button>
                <base-button v-else class="my-4" @click="checkValue"> 수정하기 </base-button>
                <base-button class="my-4" @click="moveList">목록</base-button>
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
    ...mapState("userStore", ["userInfo"]),
  },
  created() {
    if (this.type != "create") {
      this.getBoard(this.$route.params.articleNo);
      this.articleNo = this.board.articleNo;
      this.author = this.userInfo.Id;
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
      err && !this.article && ((msg = "내용 입력해주세요"), (err = false), this.$refs.article.focus());
      if (!err) alert(msg);
      else this.type == "create" ? this.registBoard() : this.modifyBoard();
    },
    async registBoard() {
      await this.regBoard({
        articleNo: this.articleNo,
        author: this.userInfo.id,
        title: this.title,
        article: this.article,
        cnt: this.cnt,
      });
      this.moveList();w
    },
    async modifyBoard() {
      await this.modBoard({
        articleNo: this.articleNo,
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
