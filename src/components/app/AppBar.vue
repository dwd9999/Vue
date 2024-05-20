<script setup>
import { userStore } from "@/stores/userPiniaStore";
import { computed } from "vue";

const menuForVisitor = [
  { path: "/", name: "home", text: "Home" },
  { path: "/search", name: "search", text: "Search" },
  { path: "/board", name: "board", text: "Board" },
  { path: "/signin", name: "signin", text: "Sign in" },
];
const menuForMember = [
  { path: "/", name: "home", text: "Home" },
  { path: "/search", name: "search", text: "Search" },
  { path: "/board", name: "board", text: "Board" },
  { path: "/user/mypage", name: "mypage", text: "My Page" },
];
const menuForAdmin = [
  { path: "/", name: "home", text: "Home" },
  { path: "/search", name: "search", text: "Search" },
  { path: "/board", name: "board", text: "Board" },
  { path: "/user/mypage", name: "mypage", text: "My Page" },
];
const store = userStore();
const isLogin = computed(() => store.isLogin);
</script>

<template>
  <v-app-bar>
    <template #title>
      <a href="/">
        <div class="d-inline-flex align-center text-h4 font-weight-bold my-5 text-primary">
          <v-icon icon="$vuetify" start />
          Enjoy Trip
        </div>
      </a>
    </template>

    <template v-if="isLogin" #append>
      <div class="hidden-sm-and-down">
        <v-btn
          v-for="item in menuForMember"
          :key="item.name"
          class="text-body-1 blue-grey-darken-4"
          :to="item.path"
          variant="text"
        >
          {{ item.text }}
        </v-btn>
      </div>
    </template>
    <template v-else #append>
      <div class="hidden-sm-and-down">
        <v-btn
          v-for="item in menuForVisitor"
          :key="item.name"
          class="text-body-1 blue-grey-darken-4"
          :to="item.path"
          variant="text"
        >
          {{ item.text }}
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>
