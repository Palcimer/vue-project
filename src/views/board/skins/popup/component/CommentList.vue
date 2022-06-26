<template>
  <v-card-text>
    <comment-form
      :wr_reply="id"
      :table="table"
      :parent="0"
      @onUpdate="updateItem"
    />
    <v-list>
      <comment-item
        v-for="(item, i) in items"
        :key="item.wr_id"
        :item="item"
        :idx="i"
        :table="table"
        :access="access"
        @onReComment="reComment"
        @onUpdate="updateItem"
        @onRemove="deleteItem"
      />
      <v-list-item v-if="loading">
          <v-list-item-content>
              <v-progress-circular :value="20" indeterminate></v-progress-circular>
          </v-list-item-content>
      </v-list-item>
      <div v-else v-intersect="onIntersect"></div>
    </v-list>
  </v-card-text>
</template>

<script>
import CommentForm from "./CommentForm.vue";
import CommentItem from "./CommentItem.vue";

export default {
  components: { CommentForm, CommentItem },
  name: "CommentList",
  props: {
    table: {
      type: String,
      required: true,
    },
    id: {
      type: [String, Number], // string일 수도 number일 수도 있다면 배열로 처리
      required: true,
    },
    access: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      items: [],
      loading: false,
      options: {
        itemsPerPage: 5,
        limitStart: 0, // 불러오기 시작할 코멘트 위치
        sortBy: ["wr_grp", "wr_order"],
        sortDesc: [false, true],
        stf: ["wr_reply"],
        stc: ["eq"],
        stx: [this.id],
      },
      totalItems: 0,
      item: null,
    };
  },
  created() {
    console.log("CommentList created");
  },
  mounted() {
    console.log("CommentList mounted", this.access);
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;

      const data = await this.$axios.get(`/api/board/list/${this.table}`, {
        params: this.options,
      });

      if (data) {
        this.setData(data);
      }

      this.loading = false;
    },
    setData(data) {
      this.items = [...this.items, ...data.items];
      this.totalItems = data.totalItems;
      this.options.limitStart += this.options.itemsPerPage;
    },
    updateItem(item) {
      // 댓글 추가
      console.log("updateItem", item);
      const find = this.items.find((position) => position.wr_id == item.wr_id);
      if (find) {
        // 수정
        const idx = this.items.indexOf(find);
        this.items.splice(idx, 1, item);
      } else {
        // 신규
        this.items.unshift(item);
        this.totalItems++;
        this.options.limitStart++;
      }
    },
    reComment(parent, item) {
      // 댓글에 댓글 추가
      console.log("reComment", parent, item);
      const find = this.items.find((item) => item.wr_id == parent.wr_id);
      if (find) {
        const idx = this.items.indexOf(find);
        this.items.splice(idx + 1, 0, item);
        this.totalItems++;
        this.options.limitStart++;
      }
    },
    onIntersect(entries, observer) {
    if(this.items.length < this.totalItems) {
        if(entries[0].isIntersecting) {
            this.fetchData();
        }
        console.log("onIntersect=======", entries[0].isIntersecting);
    }
      // this.isIntersecting = entries[0].isIntersecting;
    },
    deleteItem(item, cnt) {
        console.log(this.totalItems, this.options.limitStart);
        const idx = this.items.indexOf(item);
        if(idx >= 0) {
            this.items.splice(idx, cnt);
            this.totalItems -= cnt;
            this.options.limitStart -= cnt;
        }
        console.log(this.totalItems, this.options.limitStart);
    }
  },
};
</script>

<style>
</style>