import http from "@/util/http-common";
// index.js에 import 되어있기에 안쓰는건 다 삭제
import axios from "axios";
export default {
  namespaced: true, // 밖에서 사용하겠다 여부

  state: {
    searchBoards: [],
    boards: [],
    board: {
      articleNo: Number,
      author: String,
      title: String,
      article: String,
      cnt: Number,
    },
  },
  getters: {
    boardsLength(state) {
      return state.boards.length;
    },
    searchboardsLength(state) {
      return state.searchBoards.length > 0 ? state.searchBoards.length : null;
    },
  },
  mutations: {
    SET_BOARDS(state, boards) {
      state.boards = boards;
    },
    SET_BOARD(state, board) {
      state.board = board;
    },
    SEARCH_BOARD(state, boards) {
      // state.searchBoards = boards;
      state.boards = boards;
    },
  },
  actions: {
    getBoards({ commit }) {
      http
        .get("/board")
        .then(({ data }) => {
          commit("SET_BOARDS", data);
          // console.log("삭제해야함. data : " + data);
        })
        .catch(() => {
          alert("글목록: 에러발생!");
        });
    },
    getBoard({ commit }, articleNo) {
      http
        .get("/board/" + articleNo)
        .then(({ data }) => {
          // console.log("삭제해야함. data : " + data);
          commit("SET_BOARD", data);
        })
        .catch(() => {
          alert("글조회: 에러발생!");
        });
    },

    async regBoard(context, board) {
      await http.post("/board", board).then(({ data }) => {
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
      });
    },
    async modBoard(context, board) {
      await http.put("/board", board).then(({ data }) => {
        let msg = "수정 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "수정이 완료되었습니다.";
        }
        alert(msg);
      });
    },
    async delBoard(context, articleNo) {
      //if (confirm("삭제할까요?")) {
      await http.delete(`/board/${articleNo}`).then(({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
      });
      //}
    },

    searchBoard({ commit }, name) {
      const API_URL = `http://localhost:8080/board/search`;
      console.log("name:" + name);
      axios({
        url: API_URL,
        method: "GET",
        params: {
          key: "",
          word: name,
        },
      })
        .then((res) => {
          commit("SEARCH_BOARD", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
