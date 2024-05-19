<template>
  <v-sheet
    class="text-center py-16"
    color="primary"
  >
    <div
      id="title"
      class="text-white text-h4 font-weight-medium"
    >
      <h3 class="d-inline" v-text="article.subject"></h3>
    </div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <h5
            bg-color="transparent"
            flat
            hide-details
            single-line
            variant="outlined"
          >
          {{ article.user_id }}
          </h5>
        </v-col>

        <v-col cols="6">
          <h5
            bg-color="transparent"
            flat
            hide-details
            single-line
            variant="outlined"
          >
            {{ article.hit }}
          </h5>
        </v-col>

        <v-col cols="6">
          <h5
            bg-color="transparent"
            flat
            hide-details
            single-line
            variant="outlined"
          >
            {{ article.recommendation }}
          </h5>
        </v-col>

        <v-col cols="6">
          <h5
            bg-color="transparent"
            flat
            hide-details
            single-line
            variant="outlined"
          >
            {{ article.date }}
          </h5>
        </v-col>

        <v-col cols="12">
          <v-textarea
            bg-color="transparent"
            flat
            label="Your Message..."
            lines="4"
            variant="outlined"
            class="form-control p-2"
            rows="10"
            name="content"
            readonly="readonly"
          >
            {{ article.content }}
          </v-textarea>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      class="px-10 text-body-1"
      color="accent"
      flat
      height="55"
      text="GET IN TOUCH"
    />
  </v-sheet>
</template>


<style>
#title{
  margin-top: 100px;
}
</style>
<script setup>
</script>
