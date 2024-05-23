import { defineStore } from "pinia";
import router from "@/router";
import {
  getGugunList,
} from "@/api/gugun";

export const gugunStore = defineStore("gugunPiniaStore", {
  persist: {
    storage: sessionStorage, //쓰고싶은 스토리지(세션 또는 로컬)
  },
  state: () => ({
    guguns: null,
  }),
  getters: {
    checkGuguns: (state) => {
      return state.guguns;
    },
  },
  actions: {
    async getGuguns(sido_code) {
      console.log("sido_code: ", sido_code);
      await getGugunList(
        sido_code,
        ({ data }) => {
          this.guguns = data.guguns;
          console.log("3. getGugunList data >> ", data);
        },
        async (error) => {
          console.log("getGuguns() error code [] ::: ", error.response.status);
        }
      );
    },
  },
});
