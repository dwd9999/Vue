import http from "./http.js";

const api = http;

async function getTripList({ search }, success, fail) {
  await api
    .post(`/search/`, {
      params: {
        type: search.type,
        sort: search.sort,
        pgno: search.pgno,
        key: search.key,
        word: search.word,
      },
    })
    .then(success)
    .catch(fail);
}

// async function getGugunList(sido_code, success, fail) {
//   await api.get(`/search/gugunlist/${sido_code}`).then(success).catch(fail);
// }

async function showTripDetail(content_id, success, fail) {
  await api.get(`/board/${articleNo}`).then(success).catch(fail);
}

export {
  getGugunList,
};
