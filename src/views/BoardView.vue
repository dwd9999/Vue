<script setup>
import {ref, computed, watch, onMounted, nextTick} from "vue";
import {useRouter} from "vue-router";
import {boardStore} from "@/stores/boardPiniaStore";
import {userStore} from "@/stores/userPiniaStore";

const router = useRouter();
const bstore = boardStore();
const store = userStore();

const page = ref(1);
const itemsPerPage = ref(5);
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([
  {
    title: "번호",
    align: "start",
    sortable: false,
    key: "article_no",
  },
  {title: "작성자", key: "user_id"},
  {title: "제목", key: "subject"},
  {title: "조회수", key: "hit"},
  {title: "작성일", key: "date"},
  {title: "삭제", key: "actions", sortable: false}, //세션 적용되면 보여주고 아니면 비워놔
]);
const editedIndex = ref(-1);
const editedItem = ref({
  article_no: -1,
  subject: "",
  user_id: "",
  hit: 0,
  date: "",
});
const defaultItem = {
  article_no: -1,
  subject: "",
  user_id: "",
  hit: 0,
  date: "",
};

const boardList = ref([]);
const formTitle = computed(() => (editedIndex.value === -1 ? "글쓰기" : "수정"));
const pageCount = computed(() => Math.ceil(boardList.length / itemsPerPage.value));

watch(dialog, (val) => {
  if (!val) close();
});
watch(dialogDelete, (val) => {
  if (!val) closeDelete();
});

onMounted(() => {
  initialize();
});

function initialize() {
  boardList.value = bstore.getBoardsCopy();
}

function boardWrite() {
  router.push("/board/boardWrite");
}

async function boardDetail(article_no) {
  console.log(article_no);
  await bstore.getBoard(article_no);
  // await cstore.getComments(article_no);
  router.push("/board/boardDetail");
}

function editItem(item) {
  editedIndex.value = boards.value.indexOf(item);
  editedItem.value = {...item};
  dialog.value = true;
}

function deleteItem(articleNo) {
  bstore.deleteB(articleNo);
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = {...defaultItem};
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = {...defaultItem};
    editedIndex.value = -1;
  });
}

</script>

<template>
  <v-sheet id="board" class="text-center" min-height="700">
    <div id="board_header" class="text-h4 font-weight-medium pt-15">공지사항</div>
    <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="bstore.boards"
        :items-per-page="itemsPerPage"
        item-value="article_no"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <div class="col-lg-2 offset-lg-1" v-if="store.isLogin">
            <button id="btn-write" class="btn btn-success" type="button" v-on:click="boardWrite">
              등록
            </button>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.articleNo }}</td>
          <td>{{ item.userId }}</td>
          <td @click="boardDetail(item.articleNo)">
            {{ item.subject }}
          </td>
          <td>{{ item.hit }}</td>
          <td>{{ item.date }}</td>
          <div v-if="store.userInfo.id === item.userId">
            <v-icon size="small" @click="deleteItem(item.articleNo)"> mdi-delete</v-icon>
          </div>
        </tr>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<style>
#board {
  margin-top: 100px;
}

#board_header {
  margin-bottom: 50px;
}
</style>
