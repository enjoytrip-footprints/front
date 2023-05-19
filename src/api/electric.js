import axios from "axios";

const electric = electricInstance();

function electricInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_ELECTRIC_CHARGER_STATION_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function electricChargerStationList(params, success, fail) {
  electric.get(``, { params: params }).then(success).catch(fail);
}

export { electricChargerStationList };
