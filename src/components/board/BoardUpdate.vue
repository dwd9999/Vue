<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { boardStore } from "@/stores/boardPiniaStore";
import { userStore } from "@/stores/userPiniaStore";

const router = useRouter();
const bstore = boardStore();
const store = userStore();
//검색에 필요한 pgno, key, word
const article = reactive({
  articleNo: bstore.board.articleNo,
  subject: bstore.board.subject,
  content: bstore.board.content,
  // isnotice: bstore.board.isnotice,
  // userId: store.userInfo.id,
});

function updateSubject(e) {
  article.subject = e.target.value;
  console.log(article);
}
function updateContent(e) {
  article.content = e.target.value;
  console.log(article);
}
//글수정 완료
async function modify() {
  console.log(article);
  await bstore.modify(article);
  console.log("최종 로그: ", bstore.board);
  router.push("/board/boardDetail");
}
//글수정 취소
function cancel() {
  router.push("/board/boardDetail");
}
</script>

<template>
  <v-sheet class="text-center py-16" color="primary">
    <div id="title" class="text-white text-h4 font-weight-medium">글 수정</div>
    <v-form role="form" id="contact-form" method="post" autocomplete="off" @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="6">
            <h7 bg-color="transparent" flat single-line> 글 제목 </h7>
            <v-text-field
              v-model="article.subject"
              type="text"
              class="form-control"
              bg-color="transparent"
              flat
              hide-details
              label="제목"
              single-line
              variant="outlined"
              :value="article.subject"
              v-on:keyup="updateSubject"
              name="subject"
            />
          </v-col>
          <v-col cols="6">
            <h7 bg-color="transparent" flat single-line> 작성자 </h7>
            <v-text-field
              v-model="store.id"
              type="text"
              class="form-control"
              id="id"
              bg-color="transparent"
              flat
              hide-details
              label="작성자"
              single-line
              variant="outlined"
              :value="store.id"
              name="userId"
              readonly="readonly"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="article.content"
              bg-color="transparent"
              flat
              label="내용"
              variant="outlined"
              class="form-control p-2"
              rows="10"
              :value="article.content"
              @input="updateContent"
              name="content"
            />
          </v-col>
        </v-row>
        <v-btn
          class="px-10 text-body-1"
          color="accent"
          flat
          height="55"
          text="수정하기"
          v-on:click="modify"
        />
        <v-btn
          class="px-10 text-body-1"
          color="accent"
          flat
          height="55"
          text="취소"
          v-on:click="cancel"
        />
      </v-container>
    </v-form>
  </v-sheet>
</template>

<style>
#title {
  margin-top: 100px;
}
</style>
