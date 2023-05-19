// import { sidoList, gugunList } from "@/api/item/item.js";
import http from "@/util/http-common";

const itemStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "시/도 선택" }],
    guguns: [{ value: null, text: "구/군 선택" }],
    tours: [],
  },
  getters: {},
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시/도 선택" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구/군 선택" }];
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sido_code, text: sido.sido_name });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugun_code, text: gugun.gugun_name });
      });
    },
  },
  actions: {
    getSido: ({ commit }) => {
      http
        .get("/mapapi/sido")
        .then(({ data }) => {
          commit("SET_SIDO_LIST", data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun: ({ commit }, sido_code) => {
      const params = { sido: sido_code };
      // gugunList(
      //   params,
      //   ({ data }) => {
      //     commit("SET_GUGUN_LIST", data);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );

      http
        .get("/mapapi/gugun", { params: params })
        .then(({ data }) => {
          console.log(data);
          commit("SET_GUGUN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default itemStore;
