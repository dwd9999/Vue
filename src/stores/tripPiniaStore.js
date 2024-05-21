import { defineStore } from "pinia";
import router from "@/router";
import {
  getGugunList,
} from "@/api/trip";

export const tripStore = defineStore("tripPiniaStore", {
  // persist: {
  //   storage: sessionStorage, //쓰고싶은 스토리지(세션 또는 로컬)
  // },
  state: () => ({
    type: "notice",
    sort: "article_no",
    sortName: "기본",
    pgno: "1",
    key: "",
    word: "",
    boards: null,
    board: null,
    now: null, // 지금 시간
    navigation: null,
  }),
  getters: {
    checkBoards: (state) => {
      return state.boards;
    },
  },
  actions: {
    async getGuguns({ search }) {
      console.log(search);
      await getGugunList(
        { search },
        ({ data }) => {
          this.type = data.type;
          this.pgno = data.pgno;
          this.key = data.key;
          this.word = data.word;
          this.boards = data.list;
          this.navigation = data.navigation;
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log("getboards() error code [] ::: ", error.response.status);
        }
      );
    },
    async getTrips({ search }) {
      console.log(search);
      await getTripList(
        { search },
        ({ data }) => {
          this.type = data.type;
          this.pgno = data.pgno;
          this.key = data.key;
          this.word = data.word;
          this.boards = data.list;
          this.navigation = data.navigation;
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log("getboards() error code [] ::: ", error.response.status);
        }
      );
    },
    async getBoard(articleNo) {
      console.log("articleNo: " + articleNo);
      await showBoardDetail(
        articleNo,
        ({ data }) => {
          this.board = data.board;
          console.log("3. getBoard data >> ", data);
        },
        async (error) => {
          console.log("getboards() error code [] ::: ", error.response.status);
        }
      );
    },
  },
});
