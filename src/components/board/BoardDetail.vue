<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { userStore } from "@/stores/userPiniaStore";
import { boardStore } from "@/stores/boardPiniaStore";

const router = useRouter();
const store = userStore();
const bstore = boardStore();
//검색에 필요한 pgno, key, word
const search = {
  type: bstore.type,
  pgno: bstore.pgno,
  key: bstore.key,
  word: bstore.word,
};

// getUsers로 받은 데이터 맵
// const map = ref("");
const navigation = computed(() => bstore.navigation);
const article = computed(() => bstore.board);

//글목록으로 가기
function list() {
  router.push("/board");
}

//글 수정
function modify() {
  router.push("/board/boardUpdate"); // 글 수정하는 페이지로 이동
}

//글 삭제
async function deleteB() {
  await bstore.deleteB(bstore.board.articleNo); // 글 삭제
  router.push("/board"); // 글 목록으로 이동
}
</script>

<template>
  <v-sheet class="text-center py-16" color="primary">
    <template v-slot:top>
      <v-toolbar flat>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <div class="col-lg-2 offset-lg-1" v-if="store.userInfo.id === article.userId">
          <button id="btn-write" class="btn btn-success" type="button" v-on:click="modify">
            수정
          </button>
          <button id="btn-write" class="btn btn-success" type="button" v-on:click="deleteB">
            삭제
          </button>
        </div>
      </v-toolbar>
    </template>
    <div id="title" class="text-white text-h4 font-weight-medium">
      <h3 class="d-inline" v-text="bstore.board.subject"></h3>
    </div>

    <v-container>
      <v-row>
        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 작성자 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="bstore.board.userId"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>
        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 조회수 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="bstore.board.hit"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>
        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 추천수 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="bstore.board.recommendation"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>

        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 작성일 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="bstore.board.date"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            bg-color="transparent"
            flat
            :label="bstore.board.content"
            variant="outlined"
            class="form-control p-2"
            rows="10"
            name="content"
            readonly="readonly"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style>
#title {
  margin-top: 100px;
}
</style>
