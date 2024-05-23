import http from "./http.js";

const api = http;

async function getTripList({selected}, success, fail) {
    await api
        .get(`/trip`, {
            params: {
                sido_code: selected.sido_code,
                gugun_code: selected.gugun_code,
                content_type_id: selected.content_type_id,
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
