<script setup>
const options = [
  {
    icon: "/assets/what/analytics.png",
    title: "수정",
    path: "/user/modifyUserInfo",
  },
  {
    icon: "/assets/what/awareness.png",
    title: "로그아웃",
    path: "/user/logout",
  },
  {
    icon: "/assets/what/design.png",
    title: "탈퇴",
    path: "/user/deleteUserInfo",
  },
];
</script>

<template>
  <v-sheet id="mypage" class="py-16 text-center" color="secondary">
    <div id="mypage-header" class="text-h4 font-weight-bold">마이 페이지</div>
    <v-container id="mypage-main">
      <v-row>
        <v-col
          v-for="item in options"
          :key="item.title"
          class="d-flex flex-column align-center"
          cols="12"
          md="4"
        >
          <img :src="item.icon" />

          <div class="text-h6 mt-1">
            {{ item.title }}
          </div>
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
