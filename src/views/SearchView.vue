<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { gugunStore } from "@/stores/gugunPiniaStore";
import { tripStore } from "@/stores/tripPiniaStore";
import { useRouter } from "vue-router";

const gstore = gugunStore();
const tstore = tripStore();
const router = useRouter();
const sidolist = ref([]);
const gugunlist = ref([]); //
const selected = reactive({
  sidoCode: "",
  gugunCode: "",
  contentTypeId: "",
});
const typelist = [
  { code: "12", name: "관광지" },
  { code: "14", name: "문화시설" },
  { code: "15", name: "축제공연행사" },
  { code: "25", name: "여행코스" },
  { code: "28", name: "레포츠" },
  { code: "32", name: "숙박" },
  { code: "38", name: "쇼핑" },
  { code: "39", name: "음식점" },
];

onMounted(() => {
  initialize();
  selected.sidoCode = 1;
});

function initialize() {
  sidolist.value = [
    { sidoCode: 1, sidoName: "서울" },
    { sidoCode: 2, sidoName: "인천" },
    { sidoCode: 3, sidoName: "대전" },
    { sidoCode: 4, sidoName: "대구" },
    { sidoCode: 5, sidoName: "광주" },
    { sidoCode: 6, sidoName: "부산" },
    { sidoCode: 7, sidoName: "울산" },
    { sidoCode: 8, sidoName: "세종특별자치시" },
    { sidoCode: 31, sidoName: "경기도" },
    { sidoCode: 32, sidoName: "강원도" },
    { sidoCode: 33, sidoName: "충청북도" },
    { sidoCode: 34, sidoName: "충청남도" },
    { sidoCode: 35, sidoName: "경상북도" },
    { sidoCode: 36, sidoName: "경상남도" },
    { sidoCode: 37, sidoName: "전라북도" },
    { sidoCode: 38, sidoName: "전라남도" },
    { sidoCode: 39, sidoName: "제주도" },
  ];
}

//구군리스트 가져오기
async function updateSido() {
  // alert(selected.sidoCode);
  console.log("Selected sidoCode : ", selected.sidoCode);
  await gstore.getGuguns(selected.sidoCode);
  gugunlist.value = gstore.checkGuguns;
  console.log("gugunlist: ", gugunlist);
}
async function updateGugun() {
  console.log("Selected gugunCode : ", selected.gugunCode);
}

async function updateType() {
  console.log("Selected contentTypeId : ", selected.contentTypeId);
}
async function selectButton() {
  console.log("sidoCode:", selected.sidoCode);
  console.log("gugunCode:", selected.gugunCode);
  console.log("contentTypeId:", selected.contentTypeId);
  await tstore.getTrips({selected});
  router.push("/search/tripList");
}

// watch(selected.sidoCode, (newValue) =>
//   console.log("new lang----------------------------", newValue)
// );
</script>

<template>
  <v-app>
    <v-sheet
      id="search"
      class="d-flex justify-center align-center text-center flex-column"
      color="primary"
      min-height="600"
    >
      <div class="text-h3 font-weight-medium mb-5">지역별 관광정보</div>

      <div class="text-h6 font-weight-light mb-5" style="max-width: 468px">
        관광정보의 통합/상세 검색 및 위치기반,지역기반 등 국내 관광에 대한 전반적인 상세정보를
        찾아보세요.
      </div>
      <v-container>
        <v-row>
          <v-col class="d-flex flex-column align-center" cols="12" md="4">
            <div class="text-h6 mt-1">시/도</div>
            <v-select
              v-model="selected.sidoCode"
              label="시/도"
              style="width: 100%"
              :items="sidolist"
              item-title="sidoName"
              item-value="sidoCode"
              @update:modelValue="updateSido"
            ></v-select>
          </v-col>
          <v-col class="d-flex flex-column align-center" cols="12" md="4">
            <div class="text-h6 mt-1">구/군</div>
            <v-select
              v-model="selected.gugunCode"
              label="구/군"
              style="width: 100%"
              :items="gugunlist"
              item-title="gugunName"
              item-value="gugunCode"
              @update:modelValue="updateGugun"
            ></v-select>
          </v-col>
          <v-col class="d-flex flex-column align-center" cols="12" md="4">
            <div class="text-h6 mt-1">관광지 유형</div>
            <v-select
              v-model="selected.contentTypeId"
              label="유형"
              style="width: 100%"
              :items="typelist"
              item-title="name"
              item-value="code"
              @update:modelValue="updateType"
            ></v-select>
          </v-col>
        </v-row>
        <div class="d-flex ga-12 justify-center mt-15">
          <v-btn
            class="text-primary text-body-2"
            flat
            height="55"
            rounded
            text="Discover Mode"
            @click="selectButton"
            width="128"
          />
        </div>
      </v-container>
    </v-sheet>
  </v-app>
</template>

<style>
#search {
  margin-top: 150px;
}
</style>
