import http from "@/api/http";

const reviewStore = {
  namespaced: true,
  state: {
    review: null,
    reviews: [],
  },
  getters: {},
  mutations: {
    CLEAR_REVIEW(state) {
      state.review = null;
    },
    CLEAR_REVIEW_LIST(state) {
      state.reviews = [];
    },
    SET_REVIEW(state, review) {
      state.review = review;
    },
    SET_REVIEW_LIST(state, reviews) {
      state.reviews = reviews;
    },
  },
  actions: {
    getReview({ commit }, reviewid) {
      http
        .get(`review/${reviewid}`)
        .then(({ data }) => {
          commit("SET_REVIEW", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getReviewList({ commit }) {
      http
        .get(`review/getReviewList`)
        .then(({ data }) => {
          commit("SET_REVIEW_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getHotReviewList({ commit }) {
      http
        .get(`review/getHotReviewList`)
        .then(({ data }) => {
          commit("SET_REVIEW_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPersonReviewList({ commit }, userId) {
      console.log(userId)
      http
        .get(`review/getReviewList/${userId}`)
        .then(({ data }) => {
          commit("SET_REVIEW_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async writeReview(context, formData) {
      await http
        .post(`review/write`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async modifyReview(context, param) {
      await http.put(`review/modify`, JSON.stringify(param)).catch((error) => {
        console.log(error);
      });
    },
    async deleteReview(context, reviewid) {
      await http.delete(`review/${reviewid}`).catch((error) => {
        console.log(error);
      });
    },
    updateLikes(context, reviewid) {
      http.put(`review/likes/${reviewid}`)
      .catch((error) => {
      console.log(error);
    });
    },
  },
};

export default reviewStore;