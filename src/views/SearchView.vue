<script setup>
import {ref, onMounted, reactive, watch} from "vue";
import {gugunStore} from "@/stores/gugunPiniaStore";
import {tripStore} from "@/stores/tripPiniaStore";
import {useRouter} from "vue-router";

const gstore = gugunStore();
const tstore = tripStore();
const router = useRouter();
const sidolist = ref([]);
const gugunlist = ref([]); //
const selected = reactive({
  sido_code: "",
  gugun_code: "",
  content_type_id: "",
});
const typelist = [
  {code: "12", name: "관광지"},
  {code: "14", name: "문화시설"},
  {code: "15", name: "축제공연행사"},
  {code: "25", name: "여행코스"},
  {code: "28", name: "레포츠"},
  {code: "32", name: "숙박"},
  {code: "38", name: "쇼핑"},
  {code: "39", name: "음식점"},
];

onMounted(() => {
  initialize();
  selected.sido_code = 1;
});

function initialize() {
  sidolist.value = [
    {sido_code: 1, sido_name: "서울"},
    {sido_code: 2, sido_name: "인천"},
    {sido_code: 3, sido_name: "대전"},
    {sido_code: 4, sido_name: "대구"},
    {sido_code: 5, sido_name: "광주"},
    {sido_code: 6, sido_name: "부산"},
    {sido_code: 7, sido_name: "울산"},
    {sido_code: 8, sido_name: "세종특별자치시"},
    {sido_code: 31, sido_name: "경기도"},
    {sido_code: 32, sido_name: "강원도"},
    {sido_code: 33, sido_name: "충청북도"},
    {sido_code: 34, sido_name: "충청남도"},
    {sido_code: 35, sido_name: "경상북도"},
    {sido_code: 36, sido_name: "경상남도"},
    {sido_code: 37, sido_name: "전라북도"},
    {sido_code: 38, sido_name: "전라남도"},
    {sido_code: 39, sido_name: "제주도"},
  ];
}

//구군리스트 가져오기
async function updateSido() {
  // alert(selected.sido_code);
  console.log("Selected sido_code : ", selected.sido_code);
  await gstore.getGuguns(selected.sido_code);
  gugunlist.value = gstore.checkGuguns;
  console.log("gugunlist: ", gugunlist);
}

async function updateGugun() {
  console.log("Selected gugun_code : ", selected.gugun_code);
}

async function updateType() {
  console.log("Selected content_type_id : ", selected.content_type_id);
}

async function selectButton() {
  console.log("sido_code:", selected.sido_code);
  console.log("gugun_code:", selected.gugun_code);
  console.log("content_type_id:", selected.content_type_id);
  await tstore.getTrips({selected});
  router.push("/search/tripList");
}

// watch(selected.sido_code, (newValue) =>
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
                v-model="selected.sido_code"
                label="시/도"
                style="width: 100%"
                :items="sidolist"
                item-title="sido_name"
                item-value="sido_code"
                @update:modelValue="updateSido"
            ></v-select>
          </v-col>
          <v-col class="d-flex flex-column align-center" cols="12" md="4">
            <div class="text-h6 mt-1">구/군</div>
            <v-select
                v-model="selected.gugun_code"
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
                v-model="selected.content_type_id"
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
