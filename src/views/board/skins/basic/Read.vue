<template>
  <v-container fluid>
    <v-card flat v-if="item">
      <v-card-title>
        <v-toolbar flat>
          <v-toolbar-title>{{ item.wr_title }}</v-toolbar-title>
          <v-spacer />
          <v-subheader class="text-no-wrap">
            <v-icon class="mx-2" small>mdi-account</v-icon>
            {{ item.wr_name }}
            <v-icon class="mx-2" small>mdi-clock-outline</v-icon>
            <i><display-time :time="item.wr_create_at" /></i>
            <v-icon class="mx-2" small>mdi-eye</v-icon>
            {{ item.wr_view }}
          </v-subheader>
          <v-btn :to="`/board/${table}`">목록</v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <ssr-renderer>
          <template>
            <ez-tiptap :editable="false" v-model="item.wr_content" />
          </template>
          <template v-slot:server>
            <div v-html="item.wr_content"></div>
          </template>
        </ssr-renderer>
      </v-card-text>

      <v-card-text>
        <tag-view :tags="item.wrTags" />
      </v-card-text>

      <v-card-text>
        <display-like
          :table="table"
          :item="item"
          class="d-flex justify-center"
          :btnProps="{ tile: true, small: true }"
          :icon="{ like: 'mdi-thumb-up', bad: 'mdi-thumb-down' }"
        />
      </v-card-text>

      <v-card-text>
        <file-download :table="table" :item="item" :access="access" />
      </v-card-text>

      <v-card-actions>
        <v-col cols="4" class="text-no-wrap">
          <!-- 수정 버튼 -->
          <board-button
            v-if="isModifiable == 'MODIFY'"
            :to="`/board/${table}/${item.wr_id}?act=write`"
            color="info"
            label="수정"
            icon="mdi-pencil"
          />
          <!-- 비회원 게시물 수정 버튼 -->
          <modify-button
            v-if="isModifiable == 'NO_MEMBER'"
            color="info"
            :table="table"
            :wr_id="item.wr_id"
            label="수정"
            @onValid = "modifyItem"
          >
            <v-icon left>mdi-pencil</v-icon>수정
          </modify-button>

          <!-- 수정 끝 -->

          <!-- 삭제 -->
          <board-button
            v-if="isModifiable == 'MODIFY'"
            color="error"
            class="ml-2"
            label="삭제"
            icon="mdi-delete"
            @click="deleteItem"
            :loading="deleteLoading"
          />
          <!-- TODO: 비회원 게시물 삭제 버튼 -->
          <!-- 삭제 끝 -->
        </v-col>

        <v-col cols="4" class="text-center text-no-wrap">
          <board-button
            :to="`/board/${table}`"
            color="accent"
            label="목록"
            icon="mdi-menu"
          />
        </v-col>

        <v-col cols="4" class="text-right text-no-wrap">
          <board-button
            v-if="access.reply"
            color="secondary"
            :to="`/board/${table}/${item.wr_id}?act=reply`"
            label="답글 쓰기"
            icon="mdi-subdirectory-arrow-right"
          />
          <board-button
            v-if="access.write"
            color="primary"
            class="ml-2"
            :to="`/board/${table}?act=write`"
            label="새 글 쓰기"
            icon="mdi-pencil"
          />
        </v-col>
      </v-card-actions>
    </v-card>
    <!-- <div>
    Basic View
    <v-btn :to="`/board/${table}`">목록</v-btn>
    <v-btn :to="`/board/${table}?act=write`">쓰기</v-btn>
    <v-btn :to="`/board/${table}/2`">읽기</v-btn>
  </div> -->
  </v-container>
</template>

<script>
import { LV } from "../../../../../util/level";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import SsrRenderer from "../../../../components/util/SsrRenderer.vue";
import DisplayTime from "./component/DisplayTime.vue";
import TagView from "./component/TagView.vue";
import FileDownload from "./component/FileDownload.vue";
import BoardButton from "./component/BoardButton.vue";
import DisplayLike from "./component/DisplayLike.vue";
import ModifyButton from "./component/modifyButton.vue";
export default {
  components: {
    SsrRenderer,
    DisplayTime,
    FileDownload,
    TagView,
    BoardButton,
    DisplayLike,
    ModifyButton,
  },
  name: "BasicView",
  props: {
    config: Object,
    access: Object,
    id: [String, Number],
  },
  data() {
    return {
      deleteLoading: false,
    };
  },
  computed: {
    ...mapState({
      member: (state) => state.user.member,
      item: (state) => state.board.read,
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
  watch: {
    id() {
      this.fetchData();
    },
  },
  serverPrefetch() {
    return this.fetchData();
  },
  mounted() {
    if (!this.item) {
      this.fetchData();
    }
  },
  destroyed() {
    this.SET_READ(null);
  },
  methods: {
    ...mapActions("board", ["getBoardRead"]),
    ...mapMutations("board", ["SET_READ"]),
    async fetchData() {
      console.log(this.id);

      const headers = {};
      if (this.$ssrContext) {
        headers.token = this.$ssrContext.token;
      }

      await this.getBoardRead({
        table: this.table,
        id: this.id,
        headers,
      });
    },
    async deleteItem(token) {
      this.deleteLoading = true;

      const deleteConfirm = await this.$ezNotify.confirm(
        "게시글을 삭제하시겠습니까?",
        "삭제 확인",
        { icon: " mdi-alert" }
      );

      if (deleteConfirm) {
        const data = await this.$axios.delete(
          `/api/board/${this.table}/${this.item.wr_id}?token=${token}`
        );
      }

      this.deleteLoading = false;
    },
    modifyItem(token) {
      this.$router.push(`/board/${this.table}/${this.item.wr_id}/?act=write&token=${token}`);
    },
  },
};
</script>

<style>
</style>