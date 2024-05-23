import {defineStore} from "pinia";
import {jwtDecode} from "jwt-decode";
import router from "@/router";

import {
    login,
    findById,
    tokenRegeneration,
    logout,
    modify,
    deleteUser, registerRequest,
} from "@/api/user";
import {toast} from "vue3-toastify";
//npm i pinia-plugin-persistedstate --force
export const userStore = defineStore("userPiniaStore", {
    persist: {
        storage: sessionStorage, //쓰고싶은 스토리지(세션 또는 로컬)
    },
    state: () => ({
        isLogin: false,
        isLoginError: false,
        userInfo: null,
        isValidToken: false,
    }),
    getters: {
        checkLogin: (state) => {
            return state.isLogin;
        },
        checkUserInfo: (state) => {
            return state.userInfo;
        },
        checkToken: (state) => {
            return state.isValidToken;
        },
    },
    actions: {
        async register(user) {
            await registerRequest(
                user,
                () => {
                    console.log("회원가입 -> ");
                    toast.success("회원가입 완료", {
                        autoClose: 2000,
                    });
                    router.push(`/signin`);
                }, (error) => {
                    toast.error(error.response.data.message, {
                        autoClose: 2000,
                    });
                },
            )
        },
        async userConfirm(user) {
            await login(
                user,
                ({data}) => {
                    console.log(data)
                    console.log("성공")
                    let accessToken = data["accessToken"];
                    let refreshToken = data["refreshToken"];
                    this.userInfo = data.userInfo;
                    console.log("login success token created!!!! >> ", accessToken, refreshToken);
                    this.isLogin = true;
                    this.isLoginError = false;
                    this.isValidToken = true;
                    sessionStorage.setItem("access-token", accessToken);
                    sessionStorage.setItem("refresh-token", refreshToken);
                    console.log("저장 완료")
                },
                (error) => {
                    toast.error(error["response"].data.message);
                },
            );
        },
        async getUserInfo(token) {
            console.log("token: " + token)
            let decodeToken = jwtDecode(token);
            console.log("2. getUserInfo() decodeToken :: ", decodeToken);
            console.log("userId: " + decodeToken.userId);
            await findById(
                decodeToken.userId,
                ({data}) => {
                    console.log("data: " + data.message);
                    if (data.message === "success") {
                        this.userInfo = data.userInfo;
                        // console.log("3. getUserInfo data >> ", data);
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                async (error) => {
                    console.log(
                        "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
                        error.response.status,
                    );
                    this.isValidToken = false;
                    this.tokenRegeneration();
                },
            );
        },
        async tokenRegeneration() {
            console.log(
                "토큰 재발급 >> 기존 토큰 정보 : {}",
                sessionStorage.getItem("access-token"),
            );
            await tokenRegeneration(
                JSON.stringify(this.userInfo),
                ({data}) => {
                    if (data.message === "success") {
                        let accessToken = data["access-token"];
                        console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
                        sessionStorage.setItem("access-token", accessToken);
                        this.isValidToken = true;
                    }
                },
                async (error) => {
                    // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
                    if (error.response.status === 401) {
                        console.log("갱신 실패");
                        // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
                        await logout(
                            this.userInfo.userid,
                            ({data}) => {
                                if (data.message === "success") {
                                    console.log("리프레시 토큰 제거 성공");
                                } else {
                                    console.log("리프레시 토큰 제거 실패");
                                }
                                alert("로그인 만료! 다시 로그인해 주세요.");
                                this.isLogin = false;
                                this.userInfo = null;
                                this.isValidToken = false;
                                router.push({name: "signin-basic"});
                            },
                            (error) => {
                                console.log(error);
                                this.isLogin = false;
                                this.userInfo = null;
                            },
                        );
                    }
                },
            );
        },
        async userLogout(userid) {
            await logout(
                userid,
                ({data}) => {
                    if (data.message === "success") {
                        this.isLogin = false;
                        this.userInfo = null;
                        this.isValidToken = false;
                        sessionStorage.removeItem("access-token");
                        sessionStorage.removeItem("refresh-token");
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                (error) => {
                    console.log(error);
                },
            );
        },
        async modifyUserInfo(user) {
            // let decodeToken = jwtDecode(token);
            // console.log("회원정보수정중2");
            // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
            console.log(user);
            await modify(
                user,
                ({data}) => {
                    if (data.message === "success") {
                        this.userInfo = user;
                        // console.log("3. getUserInfo data >> ", data);
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                async (error) => {
                    console.log(
                        "modifyUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
                        error
                    );
                    this.isValidToken = false;
                    this.tokenRegeneration();
                },
            );
        },
        async deleteUser(userid) {
            // let decodeToken = jwtDecode(token);
            // console.log("회원정보수정중2");
            // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
            console.log(userid);
            await deleteUser(
                userid,
                ({data}) => {
                    if (data.message === "success") {
                        this.isLogin = false;
                        this.userInfo = null;
                        this.isValidToken = false;
                        sessionStorage.removeItem("access-token");
                        sessionStorage.removeItem("refresh-token");
                        // console.log("3. getUserInfo data >> ", data);
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                async (error) => {
                    console.log(
                        "modifyUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
                        error
                    );
                    this.isValidToken = false;
                    this.tokenRegeneration();
                },
            );
        },
    },
});
