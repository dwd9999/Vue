import http from "./http.js";

const api = http;

async function getGugunList(sido_code, success, fail) {
  console.log(sido_code);
  await api.get(`/search/gugunlist/${sido_code}`).then(success).catch(fail);
}

export {
  getGugunList,
};
