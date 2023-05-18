<template>
  <div v-if="board" class="regist">
    <h1 class="underline text-white"></h1>
    <div class="regist_form">
      <hr color="black" size="50" />
      <label for="articleNo"><h3 class="text-white">글 번호</h3></label>
      <p class="view text-white">{{ board.articleNo }}</p>
      <label for="title"><h4 class="text-white">글 제목</h4></label>
      <p class="view text-white">{{ board.title }}</p>
      <label for="author"><h4 class="text-white">글쓴이</h4></label>
      <p class="view text-white">{{ board.author }}</p>
      <!-- <label for="price">가격</label>
      <div class="view">{{ board.price | numberWithCommas }}원</div> -->
      <label for="content"><h4 class="text-white">내용</h4></label>
      <div class="view text-white">{{ board.article }}</div>
      <!-- <div class="view" v-html="enterToBr"></div> -->
      <hr color="black" size="50" />
      <div style="padding-top: 15px">
        <router-link :to="{ name: 'BoardWrite', params: { articleNo: board.articleNo } }" class="btn text-white"
          >수정</router-link
        >
        <!-- <router-link :to="{ name: 'BoardWrite' }" class="btn">수정</router-link> -->
        <a href="#" class="btn text-white" @click="deleteBoard">삭제</a>
        <router-link :to="{ name: 'BoardList' }" class="btn text-white">목록</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("board", ["delBoard"]),
    async deleteBoard() {
      await this.delBoard(this.board.articleNo);
      this.$router.push({ name: "BoardList" });
    },
  },
  filters: {
    numberWithCommas(x) {
      return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  computed: {
    ...mapState("board", ["board"]),
    // enterToBr() {
    //   return String(this.board.article).replace(/(?:\r\n|\r|\n)/g, "<br />");
    // },
  },
};
</script>
