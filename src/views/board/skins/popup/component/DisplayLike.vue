<template>
  <div v-bind="$attrs">
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="{ ...attrs, ...btnProps }"
          :color="goodColor"
          @click="likeUpdate(1)"
        >
          <v-icon left>{{ icon.like }}</v-icon>
          {{ like }}
        </v-btn>
      </template>
      <span>좋아요</span>
    </v-tooltip>

    <v-tooltip v-if="!likeOnly" top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="{ ...attrs, ...btnProps }"
          :color="badColor"
          @click="likeUpdate(2)"
        >
          <v-icon left>{{ icon.bad }}</v-icon>
          {{ bad }}
        </v-btn>
      </template>
      <span>싫어요</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DisplayLike",
  props: {
    item: { type: Object, required: true },
    table: { type: String, required: true },
    btnProps: { type: Object, default: null },
    icon: {
      type: Object,
      default: () => ({
        like: "mdi-heart",
        bad: "mdi-heart-broken",
      }),
    },
    likeOnly: { type: Boolean, default: false },
  },
  data() {
    return {
      likeFlag: this.item.likeFlag,
      like: this.item.good,
      bad: this.item.bad,
    };
  },
  computed: {
    ...mapState("user", ["member"]),
    goodColor() {
      return this.likeFlag == 1 ? "primary" : "";
    },
    badColor() {
      return this.likeFlag == 2 ? "error" : "";
    },
  },
  methods: {
    async likeUpdate(bg_flag) {
      if (!this.member) {
        this.$toast.error("회원만 사용할 수 있습니다.");
        return;
      }
      let data;
      if (bg_flag == this.likeFlag) {
        // 좋아요(싫어요) 눌렀는데 같은 걸 또 눌렀을 경우=삭제
        data = await this.$axios.delete(
          `/api/like/${this.table}/${this.item.wr_id}`
        );
      } else {
        // 변경되는 경우
        data = await this.$axios.post(
          `/api/like/${this.table}/${this.item.wr_id}`,
          { bg_flag }
        );
      }
      if (data) {
        this.likeFlag = data.likeFlag;
        this.like = data.like;
        this.bad = data.bad;
      }
    },
  },
};
</script>

<style>
</style>