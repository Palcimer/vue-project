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
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
    >
      <template v-slot:item.wr_title="{ item }">
        <v-btn
          :to="`/board/${table}/${item.wr_id}`"
          block
          plain
          class="justify-start"
        >
        <v-icon v-if="item.wr_dep > 0" :style="{'padding-left': `${(item.wr_dep - 1) * 16}px`}">mdi-subdirectory-arrow-right</v-icon>
          <div>{{ item.wr_title }}</div>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
  <!-- v-data-table -->
</template>

<script>
import qs from "qs";
import { deepCopy } from "../../../../../util/lib";
import { mapMutations, mapState } from 'vuex';
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
  data() {
    return {
      loading: false,
      items: [],
      totalItems: 0,
      options: {
        itemsPerPage: 10,
        page: 1,
        sortBy: [],
        sortDesc: [],
        stf: [""],
        stc: [""],
        stx: [""],
      },
    };
  },
  computed: {
    ...mapState({
      initData: state => state.initData,
    }),
    table() {
      return this.config.bo_table;
    },
    pageTitle() {
      return this.config.bo_subject + " 게시판";
    },
    headers() {
      const headers = [
        {
          text: "No",
          value: "no",
          align: "start",
          sortable: false,
          searchable: false,
        },
                {
          text: "GRP",
          value: "wr_grp",
        },
        {
          text: "ORD",
          value: "wr_order",
        },
        {
          text: "DEP",
          value: "wr_dep",
        },
        {
          text: "제목",
          value: "wr_title",
          align: "start",
          sortable: false,
          searchable: true,
        },
        {
          text: "작성자",
          value: "wr_name",
          align: "center",
          sortable: false,
          searchable: true,
        },
        {
          text: "작성일",
          value: "wr_create_at",
          align: "center",
          sortable: false,
          searchable: true,
        },
        {
          text: "조회수",
          value: "wr_view",
          align: "center",
          sortable: false,
          searchable: true,
        },
      ];
      if (this.config.bo_use_category) {
        headers.splice(1, 0, {
          text: "카테고리",
          value: "wr_category",
          align: "center",
          sortable: false,
          searchable: false,
        });
      }
      return headers;
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
  },
  syncData() {
    if(this.initData && this.initData.list) {
      return this.setData(this.initData.list);
    } else {
      return this.fetchData();
    }
  },
  methods: {
    ...mapMutations(['SET_INITDATA']),
    getPayload() {
      const payload = deepCopy(this.options);
      // 설정값에 있는 정렬로 정렬
      // for (const sort of this.config.bo_sort) {
      //   payload.sortBy.push(sort.by);
      //   payload.sortDesc.push(sort.desc == 1);
      // }
      console.log("payload====", payload);
      // 리플이 아닌 것만 검색
      payload.stf.push("wr_reply");
      payload.stc.push("eq");
      payload.stx.push("0");

      // TODO: 카테고리별로 검색

      return payload;
    },
    async fetchData() {
      const payload = this.getPayload();
      const query = qs.stringify(payload);
      const headers = {};
      if(this.$ssrContext) {
        headers.token = this.$ssrContext.token;
      }
      const data = await this.$axios.get(
        `/api/board/list/${this.table}?${query}`, {headers}
      );

      console.log("List.vue fetchData() payload", payload)
      console.log("List.vue fetchData() ssrContext", this.$ssrContext);
      
      if(this.$ssrContext) {
        this.SET_INITDATA({list: data});
      }
      this.setData(data);
    },
    setData(data) {
      this.items = data.items;
      this.totalItems = data.totalItems;
    },
  },
};
</script>

<style>
</style>