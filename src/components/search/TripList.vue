<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {tripStore} from "@/stores/tripPiniaStore";
import kakaoInfowindow from "/public/assets/kakaoInfowindow.jpg";

const router = useRouter();
const tstore = tripStore();
const tripList = ref([]);
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
}

async function GoToTripDetail(content_id) {
  console.log(content_id);
  await tstore.getTripDetail(content_id);
  router.push("/search/tripDetail");
}
</script>

<template>
  <div class = "container">
    <v-card
        v-for="info in tripList"
        :key="info.content_type_id"
        class="mx-auto"
        max-width="400"
        @click="GoToTripDetail(info.contentId)"
    >
      <v-img
          class="align-end text-white"
          height="200"
          :src="info.firstImage || kakaoInfowindow"
          cover
      >
      </v-img>
      <v-card-title>{{ info.title }}</v-card-title>
      <v-card-subtitle>
<!--        {{-->
<!--          typelist.filter((el) => el.code === info.contentTypeId)[0].name || " 여행지 "-->
<!--        }}-->
      </v-card-subtitle>

      <v-card-text>
        <div>{{ info.addr1 }}</div>

        <div>{{ info.addr2 }}</div>
      </v-card-text>

<!--      <v-card-actions>-->
<!--        <v-btn color="orange" @click="handleClick"> 여행게획 추가 </v-btn>-->
<!--      </v-card-actions>-->
    </v-card>
  </div>
</template>
<style scoped>
.container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
