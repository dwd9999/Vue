<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores/userPiniaStore";

const ustore = userStore();
//  material-input
import setMaterialInput from "/src/assets/js/material-input";

onMounted(() => {
  setMaterialInput();
});
const router = useRouter();
//사용자
const user = reactive({
  id: ustore.userInfo.id,
  name: ustore.userInfo.name,
  // password: ustore.userInfo.password,
  email: ustore.userInfo.email,
});

//에러 유형
const error = reactive({
  name: "",
  email: "",
});
//에러 메세지
// const errorMSG = {
//   name: {
//     length: "이름은 2자 이상 6자 미만이어야 합니다.",
//     type: "이름에 특수문자는 사용할 수 없습니다.",
//   },
//   email: {
//     length: "이메일을 입력해주세요.",
//     type: "이메일 양식이 잘못되었습니다.",
//   },
// };

// //특수문자 사용 여부 확인하는 함수
// function characterCheck(key) {
//   var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
//   // 허용할 특수문자는 여기서 삭제하면 됨
//   // 지금은 띄어쓰기도 특수문자 처리됨
//   if (regExp.test(user[key])) {
//     error[key] = "type";
//   }
// }
// //이름 입력받은 값을 바인딩
// function changeName(e) {
//   user["name"] = e.target.value;
// }
// function updateData(key) {
//   error[key] = "";
//   // console.log(user);
//   // console.log(key);
//   //error 여부 검사
//   if (user[key] == "") {
//     // 비어있는 경우
//     error[key] = "length";
//   }
//   if (key == "name") {
//     if (user[key].length < 2 || user[key].length >= 6) {
//       // 2자 이상 6자 미만이 아닌 경우
//       error[key] = "length";
//     }
//   }
//   if (key == "name") characterCheck(key); // 아이디, 이름 특수문자 사용여부 확인
//   if (key == "email") {
//     if (!/^[^@]+@\w+(\.\w+)+\w$/.test(user[key])) {
//       error[key] = "type";
//     }
//   }
//   // console.log(error)
//   //   console.log(user);
// }
//회원가입 유효 검사
function checkValid() {
  if (error.name == "" && error.email == "") return true;
  return false;
}

//회원 정보 수정
async function modify() {
  //양식에 맞게 작성하였는지 검사
  if (!checkValid()) {
    return;
  }
  //   let token = sessionStorage.getItem("access-token");
  console.log(user);
  await ustore.modifyUserInfo(user);
  router.push("/user/mypage");
}
</script>
<template>
  <v-sheet class="text-center py-16" color="primary">
    <div id="signupTitle" class="text-white text-h4 font-weight-medium">회원정보 수정</div>

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
        <!-- <v-row dense justify="center">
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
              :value="user.id"
              readonly="readonly"
            />
          </v-col>
        </v-row> -->
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
        <!-- <v-row dense justify="center">
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
        </v-row> -->
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
              text="수정"
              @click="modify()"
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
