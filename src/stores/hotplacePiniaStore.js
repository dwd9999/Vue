import { defineStore } from "pinia";
import {
  gethotplaceList,
  getRecommendhotplaceList,
  showhotplaceDetail,
  writehotplace,
  writehotplaceFile,
  modifyhotplace,
  deletehotplace,
  recommendhotplace,
} from "@/api/hotplace";

export const hotplaceStore = defineStore("hotplacePiniaStore", {
  persist: {
    storage: sessionStorage, //쓰고싶은 스토리지(세션 또는 로컬)
  },
  state: () => ({
    sort: "hotplace_no",
    pgno: "1",
    key: "",
    word: "",
    hotplaces: null,
    recList: null, // 유저가 추천한 핫플 리스트
    hotplace: {
      title: "",
      content: "",
      address: "",
      userId: "",
    },
    hotTop3: null,
    navigation: null,
  }),
  getters: {
    checkhotplaces: (state) => {
      return state.hotplaces;
    },
  },
  actions: {
    async gethotplaces({ search }) {
      console.log(search);
      await gethotplaceList(
        { search },
        ({ data }) => {
          this.sort = data.sort;
          this.pgno = data.pgno;
          this.key = data.key;
          this.word = data.word;
          this.hotTop3 = data.top3;
          this.navigation = data.navigation;
          this.hotplaces = data.list;
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log("gethotplaces() error code [] ::: ", error.response);
        },
      );
    },
    async getRecommendhotplaces(userId) {
      await getRecommendhotplaceList(
        userId,
        ({ data }) => {
          this.recList = data.list;
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log("gethotplaces() error code [] ::: ", error.response);
        },
      );
    },
    async gethotplace(hotplaceNo) {
      console.log(hotplaceNo);
      await showhotplaceDetail(
        hotplaceNo,
        ({ data }) => {
          this.hotplace = data.hotplace;
          console.log("3. gethotplace data >> ", data);
        },
        async (error) => {
          console.log("gethotplaces() error code [] ::: ", error.response);
        },
      );
    },
    async write(hotplace) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(hotplace);
      await writehotplace(
        hotplace,
        async ({ data }) => {
          console.log(data);
          this.hotplace = data;
        },
        async (error) => {
          console.log(error.response);
          console.log("writehotplace() error code [] ::: ", error.response);
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        },
      );
    },
    async writeFile(formData) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(formData);
      await writehotplaceFile(
        formData,
        async ({ data }) => {
          const hotplace = {
            title: "",
            address: "",
          };
          this.hotplace = hotplace;
          const search = {
            sort: "hotplace_no",
            pgno: "1",
            key: "",
            word: "",
          };
          this.gethotplaces({ search });
        },
        async (error) => {
          console.log("writehotplaceFile() error code [] ::: ", error.response);
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        },
      );
    },
    async modify(hotplace) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(hotplace);
      await modifyhotplace(
        hotplace,
        ({ data }) => {
          if (data.message === "success") {
            this.hotplace = data.hotplace;
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "modifyhotplace() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        },
      );
    },
    async deleteH(hotplaceNo) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(hotplaceNo);
      await deletehotplace(
        hotplaceNo,
        async ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            const hotplace = {
              title: "",
              address: "",
            };
            this.hotplace = hotplace;
            //commit("SET_HOTPLACE", hotplace);
            const search = {
              sort: "hotplace_no",
              pgno: this.pgno,
              key: this.key,
              word: this.word,
            };
            this.gethotplaces({ search }); // 삭제 후 게시글 목록으로 이동
          } else {
            console.log("핫플 정보 없음!!!!");
          }
        },
        async (error) => {
          //console.log(error);
          console.log("delete hotplace() error code [] ::: ", error.response);
        },
      );
    },
    async recommend({ param }) {
      console.log(param);
      await recommendhotplace(
        { param },
        async ({ data }) => {
          const search = {
            sort: this.sort,
            pgno: this.pgno,
            key: this.key,
            word: this.word,
          };
          this.gethotplaces({ search }); // 게시글 다시 불러오기
          console.log("recommend hotplace>> ", param);
        },
        async (error) => {
          console.log("recommend hotplace error code [] ::: ", error.response);
        },
      );
    },
  },
});
