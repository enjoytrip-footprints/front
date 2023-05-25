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
    CLEAR_TOURS(state) {
      state.tours = [];
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
    SET_TOURS(state, tours) {
      if (tours.first_image == "")
        tours.first_image = "https://web.yonsei.ac.kr/_ezaid/board/_skin/albumRecent/1/no_image.gif";
      state.tours.push({
        addr1: tours.addr1,
        content_id: tours.content_id,
        content_type_id: tours.content_type_id,
        first_image: tours.first_image,
        gugun_code: tours.gugun_code,
        latitude: tours.latitude,
        longitude: tours.longitude,
        sido_code: tours.sido_code,
        title: tours.title,
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

    getTours: ({ commit }, planId) => {
      http
        .get(`/mapapi/readSpot/${planId}`)
        .then(({ data }) => {
          commit("SET_TOURS", data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default itemStore;
