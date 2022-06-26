<template>
  <div>
    <v-divider />
    <v-list-item class="align-start">
      <div style="position: relative; top: 20px; left: -8px">
        <v-icon
          v-if="item.wr_dep > 0"
          :style="{ 'padding-left': `${(item.wr_dep - 1) * 32 + 8}px` }"
        >
          mdi-subdirectory-arrow-right
        </v-icon>
      </div>
      <v-list-item-content>
        <v-subheader class="pl-0">
          <v-avatar size="28" color="primary" class="white--text">{{
            item.wr_name[0]
          }}</v-avatar>
          <div class="ml-2">
            {{ item.wr_name }}
            <i class="ml-2">{{ item.wr_email }}</i>
            {{ item.wr_id }}
          </div>
          <v-spacer />
          <v-icon small>mdi-clock-outline</v-icon>
          <display-time :time="item.wr_create_at" />
        </v-subheader>
        <comment-form
          v-if="isModify"
          :item="item"
          :wr_parent="item.wr_parent"
          :wr_reply="item.wr_reply"
          :table="table"
          @onClose="isModify = false"
          @onUpdate="modifyComment"
        />
        <div
          v-else
          class="text-pre"
          :style="{
            'font-size': '1.1em',
            'line-height': '1.5em',
          }"
        >
          {{ item.wr_content }}
        </div>
        <display-like
          :item="item"
          :table="table"
          :btnProps="{ tile: true, small: true }"
          :icon="{ like: 'mdi-emoticon-excited-outline' }"
          style="padding-left: 4px"
          likeOnly
        />

        <div class="d-flex">
          <board-button
            v-if="access.comment && !!member"
            label="댓글"
            icon="mdi-pencil-outline"
            plain
            @click="isComment = !isComment"
          />
          <v-spacer />
          <board-button
            v-if="isModifiable"
            label="수정"
            icon="mdi-pencil-outline"
            plain
            @click="isModify = !isModify"
          />
          <board-button
            v-if="isModifiable"
            label="삭제"
            icon="mdi-trash-can-outline"
            plain
            @click="deleteComment(item)"
          />
        </div>
        <comment-form
          v-if="isComment"
          :wr_parent="item.wr_id"
          :wr_reply="item.wr_reply"
          :table="table"
          @onClose="isComment = false"
          @onUpdate="reComment"
        />
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { LV } from "../../../../../../util/level";
import BoardButton from "./BoardButton.vue";
import CommentForm from "./CommentForm.vue";
import DisplayLike from "./DisplayLike.vue";
import DisplayTime from "./DisplayTime.vue";
export default {
  components: { DisplayTime, BoardButton, CommentForm, DisplayLike },
  name: "CommentItem",
  props: {
    item: { type: Object, required: true },
    table: { type: String, required: true },
    idx: { type: Number, required: true },
    access: { type: Object, requred: true },
  },
  data() {
    return {
      isComment: false,
      isModify: false,
    };
  },
  computed: {
    ...mapState("user", ["member"]),
    ...mapGetters("user", ["GRANT"]),
    isModifiable() {
      return this.member?.mb_id == this.item.mb_id || this.GRANT >= LV.SUPER; //mb_id 없어서 에러 이걸 어떻게 하더라
      if (this.member) {
        if (this.member.mb_id == this.item.mb_id || this.GRANT >= LV.SUPER) {
          return true;
        }
      } else {
        return false;
      }
    },
  },
  created() {
    console.log("CommentItem created", this.member);
  },
  mounted() {
    console.log("CommentItem mounted", this.member);
  },
  methods: {
    reComment(child) {
      this.$emit("onReComment", this.item, child);
    },
    modifyComment(item) {
      this.$emit("onUpdate", item);
    },
    async deleteComment(item) {
      const deleteConfirm = await this.$ezNotify.confirm(
        "댓글을 삭제하시겠습니까?",
        "삭제 확인",
        { icon: " mdi-alert" }
      );

      if (!deleteConfirm) return;

      const data = await this.$axios.delete(
        `/api/board/${this.table}/${item.wr_id}`
      );
      if (data) {
        this.$toast.info(`${data} 개의 댓글을 삭제하였습니다.`);
        this.$emit('onRemove', item, data);
      }
    },
  },
};
</script>

<style>
</style>