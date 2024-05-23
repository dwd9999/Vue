<script setup>
import {ref, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {tripStore} from "@/stores/tripPiniaStore";
import kakaoInfowindow from "/public/assets/kakaoInfowindow.jpg";

const router = useRouter();
const tstore = tripStore();
const tripList = ref([]);
// const selected = ref([]);

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
});

function initialize() {
  tstore.getTrips();
  tripList.value = tstore.checkTrips;
  // selected.value = tstore.checkSelected;
}

async function GoToTripDetail(contentId) {
  console.log(contentId);
  await tstore.getTripDetail(contentId);
  router.push("/search/tripDetail");
}
</script>

<template>
  <div id="tripList" class="d-flex flex-wrap justify-center">
    <v-card
        v-for="info in tripList"
        :key="info.contentTypeId"
        class="mx-auto my-2"
        max-width="400"
        style="width: 100%; height: 300px; overflow: hidden;"
        @click="GoToTripDetail(info.contentId)"
    >
      <v-img
          class="align-end text-white"
          height="200"
          :src="info.firstImage || kakaoInfowindow"
          cover
      ></v-img>
      <v-card-title>{{ info.title }}</v-card-title>
      <v-card-text class="overflow-hidden" style="max-height: 100px;">
        <div>{{ info.addr1 }}</div>
        <div>{{ info.addr2 }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
.container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
#tripList{
  margin-top: 150px;
}
</style>
