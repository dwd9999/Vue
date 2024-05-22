<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";

import { computed } from "vue";
//import { useStore } from "vuex";
import { userStore } from "@/stores/userPiniaStore";
import { toast } from "vue3-toastify";
// images
import { useRouter } from "vue-router";

const router = useRouter();
const store = userStore();
const options = [
  {
    icon: "/assets/what/analytics.png",
    title: "수정",
    path: "/user/modifyUserInfo",
  },
  {
    icon: "/assets/what/awareness.png",
    title: "로그아웃",
    path: "/",
  },
  {
    icon: "/assets/what/design.png",
    title: "탈퇴",
    path: "/user/deleteUserInfo",
  },
];

async function logout() {
  console.log("로그아웃 -> " + store.userInfo.id);
  await store.userLogout(store.userInfo.id);
  toast.success("로그아웃 완료", {
    autoClose: 2000,
  });
  router.push("/"); // 메인 페이지로 이동
}
</script>

<template>
  <v-sheet id="mypage" class="py-16 text-center" color="secondary">
    <div id="mypage-header" class="text-h4 font-weight-bold">마이 페이지</div>
    <v-container id="mypage-main">
      <v-row>
        <!-- <v-col
          v-for="item in options"
          :key="item.title"
          class="d-flex flex-column align-center"
          cols="12"
          md="4"
        >
          <router-link :to="item.path">
            <img :src="item.icon" />
            <div class="text-h6 mt-1">
              {{ item.title }}
            </div>
          </router-link>
        </v-col> -->

        <v-col class="d-flex flex-column align-center" cols="12" md="4">
          <router-link :to="options[0].path">
            <img :src="options[0].icon" />
            <div class="text-h6 mt-1">
              {{ options[0].title }}
            </div>
          </router-link>
        </v-col>
        <v-col class="d-flex flex-column align-center" cols="12" md="4">
          <router-link :to="options[1].path">
            <img :src="options[1].icon" />
            <div class="text-h6 mt-1">
              {{ options[1].title }}
            </div>
          </router-link>
        </v-col>
        <v-col class="d-flex flex-column align-center" cols="12" md="4" v-on:click="logout()">
          <router-link :to="options[2].path">
            <img :src="options[2].icon" />
            <div class="text-h6 mt-1">
              {{ options[2].title }}
            </div>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style>
#mypage {
  margin-top: 200px;
}
#mypage-header {
  margin: 50px 0px 150px 0px;
}
</style>
