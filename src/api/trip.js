import http from "./http.js";

const api = http;

async function getTripList({selected}, success, fail) {
    await api
        .get(`/trip`, {
            params: {
                sidoCode: selected.sido_code,
                gugunCode: selected.gugun_code,
                contentTypeId: selected.content_type_id,
            },
        })
        .then(success)
        .catch(fail);
}

async function showTripDetail(content_id, success, fail) {
    await api.get(`/trip/${content_id}`).then(success).catch(fail);
}

export {
    getTripList,
    showTripDetail,
};
