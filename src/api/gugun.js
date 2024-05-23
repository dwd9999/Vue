import http from "./http.js";

const api = http;

async function getGugunList(sidoCode, success, fail) {
  await api.get(`/trip/gugunlist/${sidoCode}`).then(success).catch(fail);
}

export {
  getGugunList,
};
