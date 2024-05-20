// import Vue from 'vue'
// import Router from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import BoardView from '@/views/BoardView.vue'
import BoardDetailView from '@/components/board/BoardDetail.vue'
import BoardWriteView from '@/components/board/BoardWrite.vue'
import QnaView from '@/views/QnaView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/components/user/SignUpView.vue'
import FindPwdView from '@/components/user/FindPWD.vue'
import MyPageView from '@/components/user/MyPage.vue'
import DeleteUserInfoView from '@/components/user/DeleteUserInfo.vue'
import LogOutView from '@/components/user/LogOut.vue'
import ModifyUserInfoView from '@/components/user/ModifyUserInfo.vue'

// import { userStore } from "@/stores/userPiniaStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
    },
    {
      path: '/board/board-detail',
      name: 'board-detail',
      component: BoardDetailView,
    },
    {
      path: '/board/board-write',
      name: 'board-write',
      component: BoardWriteView,
    },
    {
      path: '/qna',
      name: 'qna',
      component: QnaView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/@/components/user/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/user/mypage',
      name: 'mypage',
      component: MyPageView,
    },
    {
      path: '/user/deleteUserInfo',
      name: 'deleteUserInfo',
      component: DeleteUserInfoView,
    },
    {
      path: '/user/modifyUserInfo',
      name: 'modifyUserInfo',
      component: ModifyUserInfoView,
    },
    {
      path: '/user/logOut',
      name: 'logOut',
      component: LogOutView,
    },
    {
      path: '/@/components/user/findpwd',
      name: 'findpwd',
      component: FindPwdView,
    },
  ],
})

// router.beforeEach((to) => {
//   // ✅ This will work because the router starts its navigation after
//   // the router is installed and pinia will be installed too
//   const store = userStore()

//   if (to.meta.requiresAuth && !store.isLoggedIn) return '/signin'
// })

export default router
