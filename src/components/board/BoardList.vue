<template>
  <div>
    <div style="text-align: right">
      <hr color="black" size="50" />
      <input class="view" type="text" v-model="search" placeholder="제목을 입력하세요." />
      &nbsp;
      <button class="btn" 
        @click="searchB"
        style="height: 40px;">
        검색
      </button>
      <br /><br />
    </div>
    <div v-if="boardsLength">
      <table id="board-list">
        <colgroup>
          <col style="width: 5%" />
          <col style="width: 20%" />
          <col style="width: 40%" />
          <col style="width: 20%" />
          <col style="width: 15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <list-row v-for="(board, index) in boards"
            :key="index" 
            :num="index+1"
            v-bind="board" />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-white">
      해당 검색조건을 만족하는 게시글이 없습니다.
    </div>
    <div style="text-align: right">
      <br/>
      <button 
        v-if="userInfo" 
        variant="success" 
        @click="moveCreate">
        글쓰기
      </button>
      <br/>
      <hr color="black" size="50" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import ListRow from "@/components/board/include/ListRow.vue";
import { userInfo } from "os";

export default {
  components: {
    ListRow,
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState("board", ["boards", "searchBoards"]),
    ...mapGetters("board", ["boardsLength", "searchboardsLength"]),
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    ...mapActions("board", ["getBoards", "searchBoard"]),
    ...mapMutations("board", ["SEARCH_BOARD"]),
    moveCreate() {
      this.$router.push({ name: "BoardWrite", params: { isbn: 0 } });
    },
    searchB() {
      this.searchBoard(this.search);
    },
  },
  created() {
    this.getBoards();
    },
};
</script>

<style scoped>
  #board-list {
    border-collapse: collapse;
    width: 100%;
  }
  #board-list thead {
    background-color: #ccc;
    font-weight: bold;
  }

  #board-list th {
    text-align: center;
    border-bottom: 1px solid #ddd;
    height: 50px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
</style>
