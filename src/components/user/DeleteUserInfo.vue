<script setup>
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import MaterialButton from "@/components/MaterialButton.vue";
import { userStore } from "@/stores/userPiniaStore";

const ustore = userStore();
const router = useRouter();

async function deleteUser() {
  await ustore.deleteUser(ustore.userInfo.id);
  toast.success("탈퇴 완료", {
    autoClose: 3000,
  });
  router.push(`/`);
}
</script>

<template>
  <v-sheet id="deleteUser" class="py-16 text-center align-center" color="secondary">
    <div id="deleteUser-header" class="text-h4 font-weight-bold">탈퇴하기</div>
    <div class="text-body-1 font-weight-regular mt-3 text-medium-emphasis mb-12">
      정말 탈퇴하시겠습니까?<br />
      탈퇴하시려면 아래 버튼을 클릭하세요.
    </div>
    <v-container class="align-center justify-center" id="mypage-main">
      <v-row class="align-center justify-center">
        <div class="d-flex ga-12 align-center justify-center mt-15">
          <v-btn
            class="text-primary text-body-2"
            flat
            center
            height="55"
            rounded
            text="탈퇴하기"
            width="128"
            v-on:click="deleteUser()"
          />
        </div>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style>
#deleteUser {
  margin-top: 200px;
}
#deleteUser-header {
  margin: 50px 0px 20px 0px;
}
</style>
