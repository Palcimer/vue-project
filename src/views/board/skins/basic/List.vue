<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer />
      <v-btn :to="`/board/${table}?act=write`" color="primary">
        <v-icon left>mdi-pencil</v-icon>
        새 글 작성
      </v-btn>
    </v-toolbar>
  </v-container>
  <!-- v-data-table -->
</template>

<script>
export default {
  name: "BasicList",
  props: {
    config: Object,
    access: Object,
    id: [String, Number],
  },
  title() {
    return "ezCode " + this.pageTitle;
  },
  computed: {
    table() {
      return this.config.bo_table;
    },
    pageTitle() {
      return this.config.bo_subject + " 게시판";
    },
  },
};
</script>

<style>
</style>