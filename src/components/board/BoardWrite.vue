<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores/userPiniaStore";
import { boardStore } from "@/stores/boardPiniaStore";

const router = useRouter();
const ustore = userStore();
const bstore = boardStore();
//검색에 필요한 pgno, key, word
const article = reactive({
  subject: "",
  content: "",
  // isnotice: 0,
  // userId: ustore.userInfo.id,
});

function updateSubject(e) {
  article.subject = e.target.value;
  console.log(article);
}
function updateContent(e) {
  article.content = e.target.value;
  console.log(article);
}
//글쓰기 완료
async function write() {
  console.log(article);
  await bstore.write(article);
  router.push("/board");
}
</script>

<template>
  <v-sheet class="text-center py-16" color="primary">
    <div id="title" class="text-white text-h4 font-weight-medium">글 작성</div>
    <v-form role="form" id="contact-form" method="post" autocomplete="off" @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="6">
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
              v-model="article.userId"
              type="text"
              class="form-control"
              id="id"
              bg-color="transparent"
              flat
              hide-details
              label="작성자"
              single-line
              variant="outlined"
              :value="article.userId"
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
          text="등록하기"
          v-on:click="write"
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
