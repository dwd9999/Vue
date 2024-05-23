import http from "./http.js";

const api = http;

async function getTripList({selected}, success, fail) {
    await api
        .get(`/trip`, {
            params: {
                sidoCode: selected.sidoCode,
                gugunCode: selected.gugunCode,
                contentTypeId: selected.contentTypeId,
            },
        })
        .then(success)
        .catch(fail);
}

async function showTripDetail(contentId, success, fail) {
    await api.get(`/trip/${contentId}`).then(success).catch(fail);
}

export {
    getTripList,
    showTripDetail,
};
