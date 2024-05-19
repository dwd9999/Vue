<template>
  <v-app-bar>
    <template #title>
      <div class="d-inline-flex align-center text-h4 font-weight-bold my-5 text-primary">
        <v-icon icon="$vuetify" start />

        Enjoy Trip
      </div>
    </template>

    <template v-if="$vuetify.display.mdAndUp" #append>
      <div class="hidden-sm-and-down">
        <v-btn
          v-for="item in menu"
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

<script setup>
  const menu = [
    { path: '/', name: 'home', text: 'Home' },
    { path: '/search', name: 'search', text: 'Search' },
    { path: '/board', name: 'board', text: 'Board' },
    { path: '/qna', name: 'qna', text: 'QnA' },
    { path: '/signin', name: 'signin', text: 'Sign in' },
  ]
</script>
