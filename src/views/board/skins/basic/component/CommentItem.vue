<template>
  <div>
    <v-divider />
    <v-list-item>
      <div>
        <v-icon
          v-if="item.wr_dep > 0"
          :style="{ 'padding-left': `${(item.wr_dep - 1) * 32 + 8}px` }"
        >
          mdi-subdirectory-arrow-right
        </v-icon>
      </div>
      <v-list-item-content>
        <v-subheader>
          <v-avatar size="28" color="primary">{{ item.wr_name[0] }}</v-avatar>
          <div>
            {{ item.wr_name }}
            <i>{{ item.wr_email }}</i>
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
        <div v-else class="text-pre">{{ item.wr_content }}</div>
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
import DisplayTime from "./DisplayTime.vue";
export default {
  components: { DisplayTime, BoardButton, CommentForm },
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
  },
};
</script>

<style>
</style>