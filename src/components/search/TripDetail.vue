<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {tripStore} from "@/stores/tripPiniaStore";
import { computed } from "vue";
import kakaoInfowindow from "/public/assets/kakaoInfowindow.jpg";

const router = useRouter();
const tstore = tripStore();
const trip = computed(() => tstore.trip);
const map = ref();

onMounted(() => {
  // initialize();
  if(window.kakao && window.kakao.maps){
    loadMap();
  }
  else{
    loadScript();
  }
});

function loadScript(){
  const script = document.createElement("script");
  script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=376c18d2ee260ed41c0abe5774bfd9da&autoload=false";
  script.onload = () => window.kakao.maps.load(loadMap); //
  document.head.appendChild(script);
}

function loadMap(){
  console.log("parseFloat", trip.value.longitude);

  const container = document.getElementById("map");
  const options = {
    // center: new window.kakao.maps.LatLng(trip.value.longtitude, trip.value.latitude),
    center: new window.kakao.maps.LatLng(trip.value.latitude, trip.value.longitude),
    level: 3
  };
  map.value = new window.kakao.maps.Map(container, options);
  loadMaker();
}

function loadMaker(){
  const markerPosition = new window.kakao.maps.LatLng(
      trip.value.latitude,
      trip.value.longitude
  );
  const marker = new window.kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map.value);
}

// function initialize() {
// tripList.value = tstore.getTrips();
// }
</script>

<template>
  <v-sheet
    id="testimonials"
    class="py-16"
    color="white"
  >
    <v-container>
      <v-row id="row1" align="center">
        <v-col cols="12" md="6" class="d-flex flex-column align-items-center">
          <div class="text-h4 font-weight-medium">
            {{ trip.title }}
          </div>

          <div class="text-body-1 text-medium-emphasis mt-5">
            {{ trip.overview }}
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-img :src="trip.firstImage2" />
        </v-col>
      </v-row>
      <v-row id="row2" align="center">
        <v-col cols="12" md="6">
          <div class="d-flex flex-column align-items-center">
            <h5>위치</h5>
            <div id="map"></div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-list
              base-color="transparent"
              bg-color="transparent"
              class="px-2"
              lines="three"
              variant="flat"
          >
            <v-list-item
                class="ga-5"
            >
              <template #prepend>
                <img :src="'/public/assets/customize.png'">
              </template>
              <template #title>
                <span class="text-h6 font-weight-bold">{{ trip.title }}</span>
              </template>
            </v-list-item>
            <v-list-item
                class="ga-5"
            >
              <template #prepend>
                <img :src="'/public/assets/onboarding.png'">
              </template>
              <template #title>
                <span class="text-h6 font-weight-bold">{{ trip.addr1 }} {{ trip.addr2 }}, {{ trip.zip }}</span>
              </template>
            </v-list-item>
            <v-list-item
                v-if="trip.tel!=''"
                class="ga-5"
            >
              <template #prepend>
                <img :src="'/public/assets/retention.png'">
              </template>
              <template #title>
                <span class="text-h6 font-weight-bold">{{ trip.tel }}</span>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style>
#row1{
  margin: 50px 0px 150px 0px;
}
#map{
  width: 100%;
  height: 400px;
}
</style>