<template>
  <v-sheet id="home" class="py-16">
    <v-container>
      <v-row>
        <v-col cols="12" md="5"> <v-img src="/assets/discover_bg.png" /></v-col>

        <v-col cols="12" md="7">
          <div class="text-h4">한 눈에 살펴보는 대한민국 여행 Spot</div>

          <div class="text-body-1 text-medium-emphasis my-5">
            코드조회 및 관광정보의 통합/상세 검색 및 위치기반,지역기반 등 국내 관광에 대한 전반적인
            상세정보를 국문관광정보로 제공한다.
          </div>

          <div v-for="text in discover" :key="text" class="text-medium-emphasis my-2 mb-4">
            <v-icon color="accent" icon="mdi-check-bold" start />

            {{ text }}
          </div>

          <v-btn color="primary" flat height="55" rounded :to="`/search`">
            여행 정보 조회하기
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
const discover = [
  " 지역별 관광지 정보 조회 ",
  " 관광지, 숙박, 음식점 조회 ",
  " 문화시설, 공연, 여행코스, 쇼핑 조회 ",
];
</script>

<style>
#home {
  margin-top: 100px;
}
</style>
