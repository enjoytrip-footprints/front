import http from "@/util/http-common";

const planStore = {
  namespaced: true,
  state: {
    searchSpots: [],
    schedules: [],
    boardid: null,
  },
  getters: {},
  mutations: {
    CLEAR_SEARCHSPOT_LIST(state) {
      state.searchSpots = [];
    },
    CLEAR_SCHEDULE_LIST(state) {
      state.schedules = [];
    },
    CLEAR_BOARD_ID(state) {
      state.boardid = null;
    },
    SET_SEARCHSPOT_LIST(state, searchSpots) {
      state.searchSpots = searchSpots;
    },
    SET_SCHEDULE_LIST(state, schedules) {
      state.schedules = schedules;
    },
    SET_BOARD_ID(state, boardid) {
      state.boardid = boardid;
    },
  },
  actions: {
    searchSpot({ commit }, keyword) {
      http
        .get(`/mapapi/search/${keyword}`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_SEARCHSPOT_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async writeSchedule(context, param) {
      await http
        .post(`/plan/write`, {
          memberId: param.memberId,
          planTitle: param.planTitle,
          planDetail: param.planDetail,
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getBoardid({ commit }, memberId) {
      await http
        .get(`/plan/getLast/${memberId}`)
        .then(({ data }) => {
          console.log("데이터는 : " + data);
          commit("SET_BOARD_ID", data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async writeScheduleSpot(context, param) {
      await http
        .post(`/plan/writeDes`, {
          planId: param.planId,
          placeId: param.placeId,
          content: param.content,
          price: param.price,
          happy: param.happy,
          departTime: param.departTime,
          arriveTime: param.arriveTime,
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default planStore;
