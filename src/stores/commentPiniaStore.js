import { defineStore } from "pinia";
import router from "@/router";
import {
  getCommentList,
  writeComment,
  modifyComment,
  deleteComment,
} from "@/api/comment";

export const commentStore = defineStore("commentPiniaStore", {
  persist: {
    storage: sessionStorage, //쓰고싶은 스토리지(세션 또는 로컬)
  },
  state: () => ({
    comments: null,
    comment: null,
  }),
  getters: {
    checkComments: (state) => {
      return state.comments;
    },
  },
  actions: {
    async getComments(articleNo) {
      console.log(articleNo);
      await getCommentList(
        articleNo,
        ({ data }) => {
          if (data.message == "success") {
            this.comments = data.list;
          }
          console.log("3. getComments data >> ", data);
        },
        async (error) => {
          console.log(
            "getcomments() error code [] ::: ",
            error.response.status
          );
        }
      );
    },
    async write(comment) {
      // let decodeToken = jwtDecode(token);
      console.log("댓글 작성중");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(comment);
      await writeComment(
        comment,
        async ({ data }) => {
          this.getComments(comment.articleNo);
        },
        async (error) => {
          console.log(
            "writeComment() error code [] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async modify(comment) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(comment);
      await modifyComment(
        comment,
        async ({ data }) => {
          console.log(data);
          this.getComments(comment.articleNo);
        },
        async (error) => {
          console.log(
            "modifyComment() error code [] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async deleteC(param) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(param);
      await deleteComment(
        param,
        async ({ data }) => {
          this.getComments(param.articleNo); // 삭제 후 댓글 목록 다시 불러옴
        },
        async (error) => {
          console.log(
            "delete Comment () error code [] ::: ",
            error.response.status
          );
        }
      );
    },
  },
});
