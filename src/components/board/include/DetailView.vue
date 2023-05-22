<template>
  <div v-if="board" class="regist">
    <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row justify-content-center mt--400">
          <div class="col-lg-8">
            <card gradient="secondary" shadow body-classes="p-lg-5">
              <h4 class="mb-1">{{board.author}} 님의 후기</h4>
                <div style="margin-top: 30px;">
                  <label for="title"><h4>글 제목</h4></label>
                  <div>{{ board.title }}</div></div>
                
                <div style="margin-top: 30px;">
                  <label><h4>내용</h4></label>
                  <div>{{ board.article }}</div></div>

                <base-button class="my-4"> <router-link :to="{ name: 'BoardWrite', params: { articleNo: board.articleNo } }"  style="color:white"
                >수정</router-link></base-button>
                <base-button class="my-4" 
                @click="deleteBoard">삭제</base-button>
                <base-button class="my-4">
                <router-link :to="{ name: 'BoardList' }" style="color:white">목록</router-link></base-button>
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
