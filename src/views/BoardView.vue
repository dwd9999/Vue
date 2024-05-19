<!--article_no int NOT NULL AUTO_INCREMENT,-->
<!--subject varchar(20) NOT NULL,-->
<!--user_id varchar(20) NOT NULL,-->
<!--content varchar(1000) NOT NULL,-->
<!--hit int DEFAULT 0,-->
<!--recommendation int DEFAULT 0,-->
<!--comment int DEFAULT 0,-->
<!--date DATETIME DEFAULT CURRENT_TIMESTAMP,-->
<!--isnotice int,-->
<!--PRIMARY KEY (article_no)-->

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { boardStore } from '@/stores/boardPiniaStore';
import { commentStore } from '@/stores/commentPiniaStore';

const router = useRouter();
const bstore = boardStore();
const cstore = commentStore();

const page = ref(1);
const itemsPerPage = ref(5);
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([
  {
    title: '번호',
    align: 'start',
    sortable: false,
    key: 'article_no',
  },
  { title: '작성자', key: 'user_id' },
  { title: '제목', key: 'subject' },
  { title: '조회수', key: 'hit' },
  { title: '작성일', key: 'date' },
  { title: '삭제', key: 'actions', sortable: false }, //세션 적용되면 보여주고 아니면 비워놔
]);
const boards = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  article_no: -1,
  subject: '',
  user_id: '',
  hit: 0,
  date: '',
});
const defaultItem = {
  article_no: -1,
  subject: '',
  user_id: '',
  hit: 0,
  date: '',
};

const formTitle = computed(() => (editedIndex.value === -1 ? '글쓰기' : '수정'));
const pageCount = computed(() => Math.ceil(boards.value.length / itemsPerPage.value));

watch(dialog, (val) => {
  if (!val) close();
});
watch(dialogDelete, (val) => {
  if (!val) closeDelete();
});

onMounted(() => {
  initialize();
});

function boardWrite() {
  router.push('/@/components/board/board-write');
}

async function boardDetail(article_no) {
  console.log(article_no);
  await bstore.getBoard(article_no);
  await cstore.getComments(article_no);
  router.push('/@/components/board/board-detail');
}

function initialize() {
  boards.value = [
    {
      article_no: 1,
      subject: 'Frozen Yogurt',
      user_id: 'user1',
      hit: 24,
      date: '2023-01-01',
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
    {
      article_no: 'Frozen Yogurt',
      subject: 159,
      user_id: 6.0,
      hit: 24,
      date: 4.0,
    },
  ];
}

function editItem(item) {
  editedIndex.value = boards.value.indexOf(item);
  editedItem.value = { ...item };
  dialog.value = true;
}

function deleteItem(item) {
  editedIndex.value = boards.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDelete.value = true;
}

function deleteItemConfirm() {
  boards.value.splice(editedIndex.value, 1);
  closeDelete();
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
  });
}

function save() {
  if (editedIndex.value > -1) {
    Object.assign(boards.value[editedIndex.value], editedItem.value);
  } else {
    boards.value.push(editedItem.value);
  }
  close();
}
</script>


<template>
  <v-sheet id="board" class="text-center" min-height="700">
    <div id="board_header" class="text-h4 font-weight-medium pt-15">공지사항</div>
    <v-data-table
      v-model:page="page"
      :headers="headers"
      :items="boards"
      :items-per-page="itemsPerPage"
      item-value="article_no"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <button
            id="btn-write"
            class="btn btn-success"
            type="button"
            v-on:click="boardWrite"
          >
            등록
          </button>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">게시물을 삭제하시겠습니까?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">취소</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">확인</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.article_no }}</td>
          <td>{{ item.user_id }}</td>
          <td
            @click="boardDetail(item.article_no)"
          >
            {{ item.subject }}
          </td>
          <td>{{ item.hit }}</td>
          <td>{{ item.date }}</td>
          <v-icon
            size="small"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </tr>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
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


