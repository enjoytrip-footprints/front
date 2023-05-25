import http from "@/util/http-common";

const planStore = {
  namespaced: true,
  state: {
    searchSpots: [],
    schedules: [],
    boardid: null,
    plans: [],
    planSelected: null,
    deslist: [],
    planInfo: [],
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
    CLEAR_PLAN_LIST(state) {
      state.plans = [];
    },
    CLEAR_DES_LIST(state) {
      state.deslist = [];
    },
    CLEAR_PLANINFO_LIST(state) {
      state.planInfo = [];
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
    SET_PLAN_LIST(state, plans) {
      state.plans = plans;
    },
    SET_PLAN(state, planSelected) {
      state.planSelected = planSelected;
    },
    SET_DES_LIST(state, deslist) {
      state.deslist = deslist;
    },
    SET_PLANINFO_LIST(state, planInfo) {
      state.planInfo = planInfo;
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
    async writePlanInfo(context, param) {
      await http
        .post(`/plan/planInfo`, {
          memberId: param.memberId,
          planId: param.planId,
          priceSum: param.priceSum,
          happyAvg: param.happyAvg,
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getPlanList({ commit }, memberId) {
      await http
        .get(`/plan/getPlanList/${memberId}`)
        .then(({ data }) => {
          console.log(data);
          console.log("데이터는 : " + data);
          commit("SET_PLAN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getPlanInfoList({ commit }, memberId) {
      await http
        .get(`/plan/planInfo/${memberId}`)
        .then(({ data }) => {
          console.log(data);
          console.log("데이터는 : " + data);
          commit("SET_PLANINFO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getPlan({ commit }, planId) {
      await http
        .get(`/plan/${planId}`)
        .then(({ data }) => {
          console.log("getPlan 데이터는 : " + data);
          commit("SET_PLAN", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getDesList({ commit }, planId) {
      await http
        .get(`/plan/getDesList/${planId}`)
        .then(({ data }) => {
          console.log("getDesList 데이터는 : " + data);
          commit("SET_DES_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async deletePlan(context, planId) {
      await http
        .delete(`/plan/delPlan/${planId}`)
        .then(({ data }) => {
          console.log("deletePlan 데이터는 : " + data);
          console.log("삭제완료");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default planStore;
