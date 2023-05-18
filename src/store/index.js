import Vue from "vue";
import Vuex from "vuex";
//import router from "@/router";
// import http from "@/util/http-common";
import { createVuexPersistedState } from "vue-persistedstate";
import axios from "axios";
import board from "@/store/board.js";
// import comment from "@/store/comment.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // index.js가 많아지면 복잡하니 모듈화해서 나누어서 사용
    board: board,
    // comment: comment,
  },

  plugins: [
    createVuexPersistedState({
      //key: 'vuex', //기본값 'vuex'
      storage: window.sessionStorage, //기본값 localStorage
    }),
  ],
  // state: {
  //   books: [],
  //   book: {
  //     isbn: String,
  //     title: String,
  //     author: String,
  //     price: Number,
  //     content: String,
  //   },
  //   comments: [],
  // },
  // getters: {
  //   booksLength(state) {
  //     return state.books.length;
  //   },
  // },
  // mutations: {
  //   SET_BOOKS(state, books) {
  //     state.books = books;
  //   },
  //   SET_BOOK(state, book) {
  //     state.book = book;
  //   },
  //   SET_COMMENTS(state, comments) {
  //     state.comments = comments;
  //   },
  // },
  // actions: {
  //   getBooks({ commit }) {
  //     http
  //       .get("/book")
  //       .then(({ data }) => {
  //         commit("SET_BOOKS", data);
  //       })
  //       .catch(() => {
  //         alert("도서목록: 에러발생!");
  //       });
  //   },
  //   getBook({ commit }, isbn) {
  //     http
  //       .get("/book/" + isbn)
  //       .then(({ data }) => {
  //         commit("SET_BOOK", data);
  //       })
  //       .catch(() => {
  //         alert("도서조회: 에러발생!");
  //       });
  //   },
  //   getComments({ commit }, isbn) {
  //     http
  //       .get("/comment/" + isbn)
  //       .then(({ data }) => {
  //         commit("SET_COMMENTS", data);
  //       })
  //       .catch(() => {
  //         alert("서평목록: 에러발생!");
  //       });
  //   },

  //   async regBook(context, book) {
  //     await http.post("/book", book).then(({ data }) => {
  //       let msg = "등록 처리시 문제가 발생했습니다.";
  //       if (data === "success") {
  //         msg = "등록이 완료되었습니다.";
  //       }
  //       alert(msg);
  //     });
  //   },
  //   async modBook(context, book) {
  //     await http.put(`/book`, book).then(({ data }) => {
  //       let msg = "수정 처리시 문제가 발생했습니다.";
  //       if (data === "success") {
  //         msg = "수정이 완료되었습니다.";
  //       }
  //       alert(msg);
  //     });
  //   },
  //   async delBook(context, isbn) {
  //     //if (confirm("삭제할까요?")) {
  //     await http.delete(`/book/${isbn}`).then(({ data }) => {
  //       let msg = "삭제 처리시 문제가 발생했습니다.";
  //       if (data === "success") {
  //         msg = "삭제가 완료되었습니다.";
  //       }
  //       alert(msg);
  //     });
  //     //}
  //   },

  //   async regComment(context, comment) {
  //     await http.post("/comment", comment).then(({ data }) => {
  //       let msg = "등록 처리시 문제가 발생했습니다.";
  //       if (data === "success") {
  //         msg = "등록이 완료되었습니다.";
  //       }
  //       alert(msg);
  //     });
  //   },
  //   async modComment(context, comment) {
  //     await http.put(`/comment`, comment).then(({ data }) => {
  //       let msg = "수정 처리시 문제가 발생했습니다.";
  //       if (data === "success") {
  //         msg = "수정이 완료되었습니다.";
  //       }
  //       alert(msg);
  //     });
  //   },
  //   async delComment(context, comment_no) {
  //     //if (confirm("삭제할까요?")) {
  //     await http.delete(`/comment/${comment_no}`).then(({ data }) => {
  //       let msg = "삭제 처리시 문제가 발생했습니다.";
  //       if (data === "success") {
  //         msg = "삭제가 완료되었습니다.";
  //       }
  //       alert(msg);
  //     });
  //     //}
  //   },
  // },
});
