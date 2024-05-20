<script setup>
import { ref, computed, onMounted } from "vue";

const sido = ref([]);
const selectedSidoCode = ref(-1);

onMounted(() => {
  initialize();
  selectedSidoCode.value = 1;
});

function initialize() {
  sido.value = [
    { sido_code: 1, sido_name: "서울" },
    { sido_code: 2, sido_name: "인천" },
    { sido_code: 3, sido_name: "대전" },
    { sido_code: 4, sido_name: "대구" },
    { sido_code: 5, sido_name: "광주" },
    { sido_code: 6, sido_name: "부산" },
    { sido_code: 7, sido_name: "울산" },
    { sido_code: 8, sido_name: "세종특별자치시" },
    { sido_code: 31, sido_name: "경기도" },
    { sido_code: 32, sido_name: "강원도" },
    { sido_code: 33, sido_name: "충청북도" },
    { sido_code: 34, sido_name: "충청남도" },
    { sido_code: 35, sido_name: "경상북도" },
    { sido_code: 36, sido_name: "경상남도" },
    { sido_code: 37, sido_name: "전라북도" },
    { sido_code: 38, sido_name: "전라남도" },
    { sido_code: 39, sido_name: "제주도" },
  ];
}

const selectedSido = computed(() => {
  return sido.value.find((item) => item.sido_code === selectedSidoCode.value) || {};
});
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
              v-model="selectedSido"
              label="시/도"
              variant="solo-inverted"
              style="width: 100%"
              :items="sido"
              item-text="sido_name"
              item-value="sido_code"
            ></v-select>
          </v-col>
          <v-col class="d-flex flex-column align-center" cols="12" md="4">
            <div class="text-h6 mt-1">구/군</div>
            <v-select
              label="구/군"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              variant="solo-inverted"
              style="width: 100%"
            ></v-select>
          </v-col>
          <v-col class="d-flex flex-column align-center" cols="12" md="4">
            <div class="text-h6 mt-1">관광지 유형</div>
            <v-select
              label="유형"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              variant="solo-inverted"
              style="width: 100%"
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
