import http from "./http.js";

const api = http;

async function login(user, success, fail) {
    await api.post(`/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    console.log("여기까진 옴")
    await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    api.defaults.headers["refresh-token"] =
        sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
    await api.post(`/user/logout`).then(success).catch(fail);
}

async function modify(user, success, fail) {
    await api.patch(`/user`, user).then(success).catch(fail);
}

async function deleteUser(userid, success, fail) {
    await api.delete(`/user`, userid).then(success).catch(fail);
}

export {login, findById, tokenRegeneration, logout, modify, deleteUser};
