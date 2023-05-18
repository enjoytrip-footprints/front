<template>
  <div class="container">
    <div class="text-center">
      <input class="view" type="text" v-model="search" placeholder="제목을 입력하세요." />
      <button class="btn" @click="searchB">검색</button>
    </div>
    <br />
    <hr />
    <div>
      <h2>검색 결과</h2>
      <div v-if="searchboardsLength">
        <table class="user-list">
          <colgroup>
            <col style="width: 5%" />
            <col style="width: 40%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 15%" />
          </colgroup>
          <thead>
            <tr>
              <th>글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(board, index) in searchBoards" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <router-link class="board-link" :to="`/${board.articleNo}`">{{ board.title }}</router-link>
              </td>
              <td>{{ board.author }}</td>
              <td>{{ board.cnt }}</td>
              <!-- <td>{{ board.age }} 세</td> -->
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>검색 결과가 없습니다.</div>
    </div>
    <br />
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "BoardSearch",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    ...mapMutations("board", ["SEARCH_BOARD"]),
    ...mapActions("board", ["searchBoard"]),
    searchB() {
      console.log(this.search);
      this.searchBoard(this.search);
    },
  },
  computed: {
    ...mapState("board", ["searchBoards"]),
    ...mapGetters("board", ["searchboardsLength"]),
  },
  created() {
    this.SEARCH_BOARD([]);
  },
};
</script>
