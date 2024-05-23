import {defineStore} from "pinia";
import router from "@/router";
import {
    getBoardListCopy,
    showBoardDetail,
    writeBoard,
    modifyBoard,
    deleteBoard,
    recommendBoard,
    decreaseCommentCnt,
} from "@/api/board";

export const boardStore = defineStore("boardPiniaStore", {
    persist: {
        storage: sessionStorage, //쓰고싶은 스토리지(세션 또는 로컬)
    },
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
        async getBoardsCopy() {

            await getBoardListCopy(
                ({data}) => {
                    console.log("log test")
                    this.boards = data.list;
                    console.log("3. getUsersInfo data >> ", data);
                },
                async (error) => {
                    console.log("getboardsCopy() error code [] ::: ", error.response.status);
                }
            );
        },
        async getBoards({search}) {
            console.log(search);
            await getBoardList(
                {search},
                ({data}) => {
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
            console.log("articleNo: ", articleNo);
            await showBoardDetail(
                articleNo,
                ({data}) => {
                    this.board = data.board;
                    console.log("3. getBoard data >> ", data);
                },
                async (error) => {
                    console.log("getboards() error code [] ::: ", error.response.status);
                }
            );
        },
        async write(board) {
            // let decodeToken = jwtDecode(token);
            // console.log("회원정보수정중2");
            // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
            console.log(board);
            await writeBoard(
                board,
                async ({data}) => {
                    if (data.message === "success") {
                        this.getBoardsCopy();
                        // commit("SET_USER_INFO", data.userInfo);
                        // console.log("3. getUserInfo data >> ", data);
                    } else {
                        console.log("게시판 글쓰기 불가능!!!!");
                    }
                },
                async (error) => {
                    console.log(
                        "writeBoard() error code [토큰 만료되어 사용 불가능.] ::: ",
                        error.response.status
                    );
                    //   commit("SET_IS_VALID_TOKEN", false);
                    //   await dispatch("tokenRegeneration");
                }
            );
        },
        async modify(board) {
            // let decodeToken = jwtDecode(token);
            // console.log("회원정보수정중2");
            // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
            console.log(board);
            await modifyBoard(
                board,
                ({data}) => {
                    if (data.message === "success") {
                        this.board = data.board;
                        // console.log("3. getUserInfo data >> ", data);
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                async (error) => {
                    console.log(
                        "modifyBoard() error code [토큰 만료되어 사용 불가능.] ::: ",
                        error.response.status
                    );
                    //   commit("SET_IS_VALID_TOKEN", false);
                    //   await dispatch("tokenRegeneration");
                }
            );
        },
        async deleteB(articleNo) {
            // let decodeToken = jwtDecode(token);
            // console.log("회원정보수정중2");
            // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
            console.log(articleNo);
            await deleteBoard(
                articleNo,
                async ({data}) => {
                    console.log(data);
                    if (data.message === "success") {
                        this.board = null;
                        const search = {
                            type: this.type,
                            pgno: this.pgno,
                            key: this.key,
                            word: this.word,
                        };
                        this.getBoardsCopy({search}); // 삭제 후 게시글 목록으로 이동
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                async (error) => {
                    console.log(error);
                    console.log(
                        "delete Board() error code [] ::: "
                        // error.response.status
                    );
                }
            );
        },
        async recommend({param}) {
            console.log(param);
            await recommendBoard(
                {param},
                async ({data}) => {
                    this.getBoard(param.articleNo); // 게시글 다시 불러오기
                    console.log("recommend Board>> ", param);
                },
                async (error) => {
                    console.log(
                        "recommend Board error code [] ::: ",
                        error.response.status
                    );
                }
            );
        },
        async decreaseComments(articleNo) {
            console.log(articleNo);
            await decreaseCommentCnt(
                articleNo,
                async ({data}) => {
                    this.getBoard(articleNo); // 게시글 다시 불러오기
                    console.log("decrease comment >> ", articleNo);
                },
                async (error) => {
                    console.log(
                        "decrease comment error code [] ::: ",
                        error.response.status
                    );
                }
            );
        },
    },
});
