import http from "@/api/http";

async function login(user, success, fail) {
  await http.post(`/member/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(id, success, fail) {
  http.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await http.get(`/member/info/${id}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  http.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await http.post(`/member/refresh`, user).then(success).catch(fail);
}

async function logout(id, success, fail) {
  await http.get(`/member/logout/${id}`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout };