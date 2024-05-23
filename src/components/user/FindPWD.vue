<script setup>
import MaterialInput from "@/components/MaterialInput.vue";
import { onMounted, reactive } from "vue";
import MaterialButton from "@/components/MaterialButton.vue";
//import { useStore } from "vuex";
import { userStore } from "@/stores/userPiniaStore";
import { useRouter } from "vue-router";
import setMaterialInput from "@/assets/js/material-input";
import { toast } from "vue3-toastify";
import http from "@/api/http.js";

onMounted(() => {
  setMaterialInput();
});

const router = useRouter();
const store = userStore();

const confirm = reactive({
  password: "",
});
//사용자
const user = reactive({
  id: "",
  email: "",
});
const success = reactive({
  password: "",
});
//에러 유형
const error = reactive({
  password: "length",
});
//에러 메세지
const errorMSG = {
  password: {
    length: "아이디는 4자 이상 20자 미만이어야 합니다.",
    type: "비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다.",
  },
};

//한글 사용 여부 확인하는 함수
function koreanCheck(key) {
  var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 아이디, 비밀번호는 한글 불가능
  if (check.test(user[key])) {
    error[key] = "type";
  }
}
//비밀번호 일치 확인
function isSame() {
  // console.log(confirm.password);
  if (user.password === confirm.password) {
    success.password = "success";
    error.password = "";
  } else {
    success.password = "";
    error.password = "diff";
  }
}

function updateData(key) {
  // console.log(data, "  ", key);
  success[key] = "";
  error[key] = "";
  isSame();
  if (user[key] == "") {
    // 비어있는 경우
    error[key] = "length";
  }
  if (user[key].length < 4 || user[key].length >= 20) {
    // 4자 이상 20자 미만이 아닌 경우
    error[key] = "length";
  }
  koreanCheck(key);
}

// //유효 검사
// function checkValid() {
//   if (success.password == "success" && error.password == "") return true;
//   error.password = "diff";
//   return false;
// }
//비밀번호 변경
async function findPassword() {
  http.post(`/lost`, user).then(({ data }) => {
    if(data == 1) router.push("/signin"); // 로그인 페이지로 돌아가기
    else alert("회원 정보가 존재하지 않습니다.");
  });
}
</script>

<template>
  <v-sheet id="findpwd" class="text-center py-16" color="primary">
    <div id="signupTitle" class="text-white text-h4 font-weight-medium">
      비밀번호 찾기
    </div>

    <div class="text-center text-body-1 mb-15"></div>

    <div>
      <!-- class="mx-auto form-control" -->
      <v-form
        role="form"
        id="contact-form"
        method="post"
        autocomplete="off"
        @submit.prevent
      >
        <!-- v-on:keyup="updateData('id')" -->

        <v-text-field
          class="mx-auto"
          width="300"
          label="아이디"
          type="text"
          v-model="user.id"
          @keyup="updateData('id')"
        />
        <v-text-field
            class="mx-auto"
            width="300"
            label="이메일"
            type="text"
            v-model="user.email"
        />
        <v-btn
          block
          class="font-weight-bold text-h6"
          full-width
          type="submit"
          variant="gradient"
          @click="findPassword()"
        >
          비밀번호 찾기
        </v-btn>
        <p class="mt-4 text-caption text-center">
          로그인 페이지로 돌아가기
          <router-link to="/signin" class="text-success font-weight-bold">
            이동
          </router-link>
        </p>
      </v-form>
    </div>
  </v-sheet>
</template>
<style>
#findpwd {
  margin-top: 150px;
}
</style>
