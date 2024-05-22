<template>
  <v-sheet class="text-center py-16" color="primary">
    <div id="title" class="text-white text-h4 font-weight-medium">
      <h3 class="d-inline" v-text="board.subject"></h3>
    </div>

    <v-container>
      <v-row>
        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 작성자 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="board.userId"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>
        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 조회수 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="board.hit"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>
        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 추천수 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="article.recommendation"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>

        <v-col cols="6">
          <h7 bg-color="transparent" flat single-line> 작성일 </h7>
          <v-text-field
            bg-color="transparent"
            flat
            hide-details
            :label="board.date"
            single-line
            variant="outlined"
            name="userId"
            readonly="readonly"
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            bg-color="transparent"
            flat
            :label="board.content"
            variant="outlined"
            class="form-control p-2"
            rows="10"
            name="content"
            readonly="readonly"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style>
#title {
  margin-top: 100px;
}
</style>

<script setup></script>
