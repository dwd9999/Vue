<script setup>
import {onMounted, reactive} from "vue";
import {useRouter, useRoute} from "vue-router";

import {toast} from "vue3-toastify";
import http from "@/api/http.js";
import {userStore} from "@/stores/userPiniaStore";

onMounted(() => {
});
const router = useRouter();
const ustore = userStore();
//사용자
const user = reactive({
  id: "",
  password: "",
  name: "",
  email: "",
});
//비밀번호 확인용
const current = reactive({
  password: "",
});
//아이디 사용 가능 확인
const success = reactive({
  id: "",
  password: "",
});
//에러 유형
const error = reactive({
  id: "length",
  password: "length",
  name: "length",
  email: "length",
});
//에러 메세지
const errorMSG = {
  id: {
    length: "아이디는 4자 이상 10자 미만이어야 합니다.",
    type: "아이디는 영어 또는 숫자만 사용 가능합니다.",
    duplicated: "중복된 아이디입니다.",
  },
  password: {
    length: "비밀번호는 4자 이상 20자 미만이어야 합니다.",
    type: "비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다.",
    diff: "비밀번호가 일치하지 않습니다.",
  },
  name: {
    length: "이름은 2자 이상 6자 미만이어야 합니다.",
    type: "이름에 특수문자는 사용할 수 없습니다.",
  },
  email: {
    length: "이메일을 입력해주세요.",
    type: "이메일 양식이 잘못되었습니다.",
  },
};

//특수문자 사용 여부 확인하는 함수
function characterCheck(data, key) {
  var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  // 허용할 특수문자는 여기서 삭제하면 됨
  // 지금은 띄어쓰기도 특수문자 처리됨
  if (regExp.test(data)) {
    error[key] = "type";
  }
}

//한글 사용 여부 확인하는 함수
function koreanCheck(data, key) {
  var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 아이디, 비밀번호는 한글 불가능
  if (check.test(user[key])) {
    error[key] = "type";
  }
}

//비밀번호 확인하는 함수
function checkPassword() {
  if (user.password === current.password) {
    success.password = "success";
    error.password = "";
  } else {
    if (error.password == "") error.password = "diff";
    success.password = "";
  }
}

function updateData(data, key) {
  // console.log(data, "  ", key);
  if (key == "passwordCheck") {
    current.password = data;
    checkPassword();
    return;
  }
  error[key] = "";
  user[key] = data;
  //error 여부 검사
  if (key == "id") {
    success.id = "";
  }
  if (user[key] == "") {
    // 비어있는 경우
    error[key] = "length";
  }
  if (key == "password") {
    checkPassword();
  }
  if (key == "id" || key == "password") {
    if (user[key].length < 4 || user[key].length >= 20) {
      // 4자 이상 20자 미만이 아닌 경우
      error[key] = "length";
    }
    koreanCheck(data, key);
  }
  if (key == "name") {
    if (user[key].length < 2 || user[key].length >= 6) {
      // 2자 이상 6자 미만이 아닌 경우
      error[key] = "length";
    }
  }
  if (key == "id" || key == "name") characterCheck(data, key); // 아이디, 이름 특수문자 사용여부 확인
  if (key == "email") {
    if (!/^[^@]+@\w+(\.\w+)+\w$/.test(user[key])) {
      error[key] = "type";
    }
  }
  // console.log(error)
  console.log(user);
}

//회원가입 유효 검사
function checkValid() {
  if (success.id == "") {
    alert("아이디 중복 여부를 확인해주세요.");
  }
  if (
      error.id === "" &&
      error.password === "" &&
      error.name === "" &&
      error.email === "" &&
      success.id === "success" &&
      success.password === "success"
  )
    return true;
  return false;
}

//아이디 중복 체크
function idCheck() {
  if (user.id === "") {
    alert("아이디를 입력하세요.");
    return;
  }
  http.get(`/checkId/${user.id}`).then(({data}) => {
    console.log("아이디 중복 체크 -> " + data);
    if (data === 0) {
      success.id = "success";
      // alert("사용 가능한 아이디 입니다.");
    }
    if (data === 1) {
      success.id = "failed";
      // alert("이미 존재하는 아이디 입니다.");
    }
  });
}

//회원가입
async function signUp() {
  //회원가입 양식에 맞게 작성하였는지 검사
  if (success.id !== "success") {
    toast.error("아이디 중복 검사를 통과해주세요.");
  } else {
    console.log("요청을 보내긴 하네")
    await ustore.register(user);
  }
}
</script>
<template>
  <v-sheet class="text-center py-16" color="primary">
    <div id="signupTitle" class="text-white text-h4 font-weight-medium">회원가입</div>

    <div class="text-center text-body-1 mb-15"></div>

    <v-container>
      <v-form
          class="form-signin w-100 m-auto"
          role="form"
          id="contact-form"
          method="post"
          autocomplete="off"
          @submit.prevent
      >
        <v-row dense justify="center">
          <v-col cols="7">
            <v-text-field
                bg-color="transparent"
                flat
                hide-details
                label="아이디"
                single-line
                variant="outlined"
                type="text"
                class="form-control"
                id="floatingInput"
                v-model="user.id"
            />
            <label for="floatingInput">ID</label>
            <span v-if="success.id == 'success'" class="success-message">
              사용 가능한 아이디입니다.
            </span>
            <span v-else class="error-message"> 사용 불가능한 아이디입니다. </span>
          </v-col>
        </v-row>
        <v-row dense justify="center">
          <v-col cols="3">
            <div>
              <button class="btn btn-primary w-100 py-2" @click="idCheck()">아이디체크</button>
            </div>
          </v-col>
        </v-row>
        <v-row dense justify="center">
          <v-col cols="7">
            <v-text-field
                bg-color="transparent"
                flat
                hide-details
                label="비밀번호"
                single-line
                variant="outlined"
                type="password"
                class="form-control"
                id="floatingPassword"
                v-model="user.password"
            />
          </v-col>
        </v-row>
        <v-row dense justify="center">
          <v-col cols="7">
            <v-text-field
                bg-color="transparent"
                flat
                hide-details
                label="이름"
                single-line
                variant="outlined"
                type="text"
                class="form-control"
                id="floatingName"
                v-model="user.name"
            />
          </v-col>
        </v-row>
        <v-row dense justify="center">
          <v-col cols="7">
            <v-text-field
                bg-color="transparent"
                flat
                hide-details
                label="이메일"
                single-line
                variant="outlined"
                type="email"
                class="form-control"
                id="floatingEmail"
                v-model="user.email"
            />
          </v-col>
        </v-row>
        <v-row dense justify="center">
          <v-col cols="7">
            <v-btn
                id="signupBtn"
                class="px-10 text-body-1"
                type="submit"
                color="accent"
                flat
                height="55"
                text="회원가입"
                @click="signUp()"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-sheet>
</template>
<style>
#signupTitle {
  margin-top: 70px;
}

#signupBtn {
  margin-top: 50px;
}
</style>
