<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-sheet v-if="config.bo_use_category == 1" width="150" class="ml-4">
        <cate-select :options.sync="options" />
      </v-sheet>
      <search-field :items="searchItems" :options.sync="options" />
      <v-spacer />
      <v-btn :to="`/board/${table}?act=write`" color="primary">
        <v-icon left>mdi-pencil</v-icon>
        새 글 작성
      </v-btn>
    </v-toolbar>

    <v-row>
      <v-col
        class="mt-4 gal-item"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        v-for="(item, idx) in items"
        :key="item.wr_id"
      >
        <v-card>
          <v-card-title class="px-0 mx-4 text-body-1 gal-title text-truncate">
            <span
              style="
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              "
              >{{ item.wr_title }}</span
            >
          </v-card-title>
          <v-card-subtitle class="d-flex pb-1">
            {{ item.wr_name }}
            <v-spacer />
            <display-time :time="item.wr_create_at" />
          </v-card-subtitle>
          <a
            @click="$router.push(`/board/${table}/${item.wr_id}`)"
            class="test-decoration-none"
          >
            <v-img
              :src="getImage(table, item, imgSize)"
              :aspect-ratio="16 / 9"
              class="align-end"
            >
            </v-img>
            <!-- aspect-ratio="1/1" : 정사각형 -->
          </a>
          <div class="d-flex justify-space-between align-center ml-4">
            <div>
              <v-icon small>mdi-eye</v-icon>{{ item.wr_view }} 
              <v-icon small>mdi-comment-outline</v-icon>{{ item.wr_reply }}
            </div>
            <v-spacer />
            <display-like
              :item="item"
              :table="table"
              class="d-flex justify-center"
              :btnProps="{ tile: true, small: true, elevation: 0, }"
              like-only
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination v-model="options.page" :length="pageCount"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
  <!-- v-data-table -->
</template>

<script>
import qs from "qs";
import { deepCopy, getImage } from "../../../../../util/lib";
import { mapActions, mapMutations, mapState } from "vuex";
import SearchField from "../../../../components/layout/SearchField.vue";
import CateSelect from "./component/CateSelect.vue";
import DisplayTime from "./component/DisplayTime.vue";
import DisplayLike from "./component/DisplayLike.vue";

export default {
  components: { SearchField, CateSelect, DisplayTime, DisplayLike },
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
      options: {},
      pageRouting: false,
      pageReady: false,
      imgSize: {
        w: 300,
        h: 300,
      },
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.board.list,
      totalItems: (state) => state.board.totalItems,
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
          align: "center",
          sortable: false,
          searchable: false,
          width: "20",
        },
        // {
        //   text: "GRP",
        //   value: "wr_grp",
        // },
        // {
        //   text: "ORD",
        //   value: "wr_order",
        // },
        // {
        //   text: "DEP",
        //   value: "wr_dep",
        // },
        {
          text: "제목",
          value: "wr_title",
          align: "start",
          sortable: false,
          searchable: true,
          cellClass: "text-truncate",
        },
        {
          text: "작성자",
          value: "wr_name",
          align: "center",
          sortable: false,
          searchable: true,
          width: "100",
        },
        {
          text: "작성일",
          value: "wr_create_at",
          align: "center",
          sortable: false,
          searchable: false,
          width: "143",
        },
        {
          text: "조회수",
          value: "wr_view",
          align: "center",
          sortable: false,
          searchable: false,
          width: "80",
        },
      ];
      if (this.config.bo_use_category) {
        headers.splice(1, 0, {
          text: "카테고리",
          value: "wr_category",
          align: "center",
          sortable: false,
          searchable: false,
          width: "100",
        });
      }
      return headers;
    },
    pageCount() {
      return Math.ceil(this.totalItems / this.options.itemsPerPage);
    },
    searchItems() {
      const arr = this.headers.filter((item) => item.searchable);
      arr.push({
        text: "내용",
        value: "wr_content",
      });
      return arr;
    },
    getImage: () => getImage,
  },
  watch: {
    options: {
      handler() {
        this.fetchData();
      },
      deep: true,
    },
    table() {
      this.fetchData();
    },
  },
  serverPrefetch() {
    return this.fetchData();
  },
  created() {
    this.options = this.initOptions();
  },
  mounted() {
    window.addEventListener("popstate", this.routeChange);
  },
  destroyed() {
    window.removeEventListener("popstate", this.routeChange);
    this.SET_LIST({items:[], totalItems:0});
  },

  methods: {
    ...mapMutations("board", ["SET_LIST"]),
    ...mapActions("board", ["getBoardList"]),
    initOptions() {
      const { query } = this.$route;
      const options = {
        page: Number(query.page) || 1,
        itemsPerPage: Number(query.itemsPerPage) || 4,
        stf: [query.stf || "", "wr_category"],
        stx: [query.stx || "", ""],
        stc: [query.stc || "", "eq"],
      };
      return options;
    },
    pushState() {
      console.log("pageRouting", this.pageRouting);
      if (!this.pageRouting) {
        const opt = {
          page: this.options.page,
          itemsPerPage: this.options.itemsPerPage,
          stf: this.options.stf[0] || undefined,
          stc: this.options.stc[0] || undefined,
          stx: this.options.stx[0] || undefined,
          ca: this.options.stx[1] || undefined,
        };
        const query = qs.stringify(opt);
        if (this.pageReady) {
          history.pushState(null, null, `${this.$route.path}?${query}`);
        } else {
          history.replaceState(null, null, `${this.$route.path}?${query}`);
        }
      }
    },
    routeChange() {
      this.pageRouting = true;
      this.options = this.initOptions();
    },
    getNo(index) {
      const { page, itemsPerPage } = this.options;
      const { totalItems } = this;
      return totalItems - (page - 1) * itemsPerPage - index;
    },
    getPayload() {
      const payload = deepCopy(this.options);
      console.log("payload====", payload);
      // 리플이 아닌 것만 검색
      payload.stf.push("wr_reply");
      payload.stc.push("eq");
      payload.stx.push("0");

      // TODO: 카테고리별로 검색

      return payload;
    },
    async fetchData() {
      console.log("List.vue fetchData=======");
      const payload = this.getPayload();
      const query = qs.stringify(payload);
      const headers = {};
      if (this.$ssrContext) {
        headers.token = this.$ssrContext.token;
      }
      await this.getBoardList({
        vm: this,
        query,
        headers,
      });
    },
  },
};
</script>

<style>
@media screen and (min-width: 600px) {
  .fixedTable table {
    table-layout: fixed;
  }
}

.basic-title {
  width: 100%;
}
.basic-title > span {
  display: block;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .fixedTable > div {
    overflow: hidden;
  }
  .fixedTable .v-data-table__mobile-table-row {
    max-width: calc(100vw - 42px);
  }
  .fixedTable .v-data-table__mobile-row__header {
    width: 80px;
  }
  .fixedTable .v-data-table__mobile-row__cell .basic-title > span > div {
    display: block;
    max-width: calc(100vw - 122px);
  }
}
</style>