<template>
  <component
    :is="skinName"
    :table="table"
    :subject="subject"
    :items="items"
    :loading="loading"
  />
</template>

<script>
import SKINS from "./skins"; // 폴더를 불러오면 index.js를 불러온다
import upperFirst from "lodash/upperFirst";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: { ...SKINS },
  name: "BoardLatest",
  props: {
    table: { type: String, required: true },
    skin: { type: String, default: "basic" },
    limit: { type: Number, default: 5 },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      latest: (state) => state.board.latest,
    }),
    items() {
      return this.latest[this.table]?.items ?? [];
    },
    subject() {
      return this.latest[this.table]?.subject ?? "";
    },
    skinName() {
      return upperFirst(this.skin) + "Latest";
    },
  },
  serverPrefetch() {
    return this.fetchData();
  },
  mounted() {
    if (!this.latest[this.table]) {
      this.fetchData();
    }
  },
  destroyed() {
    this.SET_LATEST({ table: this.table, payload: null });
  },
  methods: {
    ...mapMutations("board", ["SET_LATEST"]),
    ...mapActions("board", ["getLatest"]),
    async fetchData() {
      const { table, limit } = this;
      this.loading = true;
      await this.getLatest({ table, limit });
      this.loading = false;
      console.log(this.subject, this.items);
    },
  },
};
</script>

<style>
</style>