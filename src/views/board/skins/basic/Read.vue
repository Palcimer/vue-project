<template>
  <v-card flat v-if="item">
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title>{{ item.wr_title }}</v-toolbar-title>
        <v-spacer />
        <v-btn :to="`/board/${table}`">목록</v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <ez-tiptap :editable="false" v-model="item.wr_content" />
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="isModifiable == 'MODIFY'"
        color="info"
        :to="`/board/${table}/${item.wr_id}?act=write`"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-if="access.reply"
        color="secondary"
        :to="`/board/${table}/${item.wr_id}?act=reply`"
      >
        <v-icon>mdi-subdirectory-arrow-right</v-icon>
        답글쓰기
      </v-btn>
    </v-card-actions>
  </v-card>
  <!-- <div>
    Basic View
    <v-btn :to="`/board/${table}`">목록</v-btn>
    <v-btn :to="`/board/${table}?act=write`">쓰기</v-btn>
    <v-btn :to="`/board/${table}/2`">읽기</v-btn>
  </div> -->
</template>

<script>
import { LV } from "../../../../../util/level";
import { mapGetters, mapState } from "vuex";
export default {
  name: "BasicView",
  props: {
    config: Object,
    access: Object,
    id: [String, Number],
  },
  data() {
    return {
      item: null,
    };
  },
  computed: {
    ...mapState({
      member: (state) => state.user.member,
    }),
    ...mapGetters("user", ["GRANT"]),
    table() {
      return this.config.bo_table;
    },
    isModifiable() {
      if (this.member) {
        if (this.member.mb_id == this.item.mb_id || this.GRANT >= LV.SUPER) {
          // 접근자가 작성자or최고관리자
          return "MODIFY";
        }
      } else if (this.item.mb_id == 0) {
        // 비회원
        return "NO_MEMBER";
      }
      return "";
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      console.log(this.id);
      const data = await this.$axios.get(
        `/api/board/read/${this.table}/${this.id}`
      );
      this.setData(data);
    },
    setData(data) {
      this.item = data;
    },
  },
};
</script>

<style>
</style>