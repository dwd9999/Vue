<script setup>
//npm install jwt-decode
import { onMounted, reactive } from "vue";
import { userStore } from "@/stores/userPiniaStore";
import { useRouter } from "vue-router";
const router = useRouter();
const ustore = userStore();
//npm i vue3-toastify
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const click = reactive({
  rememeberId: false,
});
const user = reactive({
  id: "",
  password: "",
});
const error = reactive({
  message: "",
});

//쿠키에서 저장된 아이디가 있으면 가져오는 함수
async function getIDByCookie() {
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");
  console.log(cookieArray);
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].split("=");
    const key = cookie[0];
    const value = cookie[1];

    if (key === "id") {
      user.id = value;
    }
  }
}

//아이디를 쿠키에 저장하는 함수
async function storeIDByCookie(id) {
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");
  document.cookie = `id=${id}`;
}

async function signIn() {
  console.log(user);
  await ustore.userConfirm(user);
  let token = sessionStorage.getItem("access-token");
  console.log("1. confirm() token >> " + token);
  if (ustore.isLogin) {
    // 여기는 state commit 변경 사항이 잘 적용되는데..
    await ustore.getUserInfo(token);
    // await this.getUserInfo(token);
    console.log("4. confirm() userInfo :: ", ustore.userInfo);
    if (ustore.userInfo.isAdmin) {
      toast.success(ustore.userInfo.id + "관리자 님 환영합니다!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      toast.success(ustore.userInfo.id + "님 환영합니다!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      // alert(store.state.userStore.userInfo.id + "님 환영합니다!");
    }
    if (click.rememeberId) {
      // 아이디 저장 필요함
      await storeIDByCookie(user.id);
      await getIDByCookie();
    }
    router.push("/"); // 메인 페이지로 이동
  } else {
    error.message = "아이디 또는 비밀번호가 잘못되었습니다.";
  }
}

// export default {
//   data: () => ({
//     id: "",
//     idCheck: [
//       (value) => {
//         if (value) return true;

//         return "아이디를 입력하세요.";
//       },
//     ],
//     password: "",
//     pwdCheck: [
//       (value) => {
//         if (value) return true;

//         return "비밀번호를 입력하세요.";
//       },
//     ],
//   }),
// };
</script>

<template>
  <v-sheet
    id="signin"
    class="d-flex justify-center align-center text-center flex-column"
    color="primary"
    min-height="600"
  >
    <div>
      <!-- class="mx-auto form-control" -->
      <v-form @submit.prevent>
        <v-text-field
          class="mx-auto"
          width="300"
          id="floatingInput"
          v-model="user.id"
          label="아이디"
          :rules="idCheck"
          type="text"
        />
        <v-text-field
          class="mx-auto"
          width="300"
          id="floatingPassword"
          v-model="user.password"
          label="비밀번호"
          :rules="pwdCheck"
          type="password"
        />
        <v-btn
          block
          class="font-weight-bold text-h6"
          full-width
          type="submit"
          variant="gradient"
          @click="signIn()"
        >
          로그인
        </v-btn>
        <p class="mt-4 text-caption text-center">
          계정이 없으신가요?
          <router-link to="/user/signup" class="text-success font-weight-bold">
            회원가입
          </router-link>
        </p>
        <p class="mt-4 text-caption text-center">
          이메일로 비밀번호 찾기
          <router-link to="/user/findpwd" class="text-success font-weight-bold">
            비밀번호 찾기
          </router-link>
        </p>
      </v-form>
    </div>
  </v-sheet>
</template>

<style>
#signin {
  margin-top: 150px;
}
</style>
