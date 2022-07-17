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
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      class="fixedTable"
    >
      <template v-slot:item.no="{ item, index }">
        {{ getNo(index) }}
      </template>

      <template v-slot:item.wr_title="{ item }">
        <v-btn
          :to="`/contents/${item.wr_1}`"
          block
          plain
          class="text-none px-0 justify-start basic-title"
        >
          <div class="d-flex justify-start align-center">
            <v-icon
              v-if="item.wr_dep > 0"
              :style="{ 'padding-left': `${(item.wr_dep - 1) * 16}px` }"
              >mdi-subdirectory-arrow-right</v-icon
            >
            <div
              class="text-truncate"
              :style="{
                'max-width': `calc(100% - 20px - ${
                  item.wr_dep > 0 ? (item.wr_dep - 1) * 16 + 24 : 0
                }px)`,
              }"
            >
              {{ item.wr_title }}
            </div>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  v-on="on"
                  v-bind="attrs"
                  x-small
                  label
                  color="green"
                  class="px-1 ml-1"
                >
                  {{ item.replies }}
                </v-chip>
              </template>
              <span>댓글: {{ item.replies }}개</span>
            </v-tooltip>
          </div>
        </v-btn>
      </template>
      <template #item.cmd="{ item }">
        <tooltip-btn
          label="수정"
          icon
          color="primary"
          :to="`/board/${table}/${item.wr_id}?act=write`"
        >
          <v-icon>mdi-pencil</v-icon>
        </tooltip-btn>
        <tooltip-btn
          v-if="isSuper"
          label="삭제"
          icon
          color="error"
          :loading="deleteLoading"
          @click="deleteItem(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </tooltip-btn>
      </template>
    </v-data-table>
  </v-container>
  <!-- v-data-table -->
</template>

<script>
import qs from "qs";
import { deepCopy } from "../../../../../util/lib";
import { mapActions, mapGetters, mapState } from "vuex";
import SearchField from "../../../../components/layout/SearchField.vue";
import CateSelect from "./component/CateSelect.vue";
import DisplayTime from "./component/DisplayTime.vue";
import TooltipBtn from "../../../../components/etc/TooltipBtn.vue";

export default {
  components: { SearchField, CateSelect, DisplayTime, TooltipBtn },
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
      deleteLoading: false,
    };
  },
  computed: {
    ...mapGetters("user", ["isSuper"]),
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
        {
          text: "ID",
          value: "wr_1",
          align: "start",
          sortable: true,
          searchable: true,
          width: "160",
        },
        {
          text: "제목",
          value: "wr_title",
          align: "start",
          sortable: false,
          searchable: true,
          cellClass: "text-truncate",
        },
        {
          text: "스킨",
          value: "wr_2",
          align: "center",
          sortable: true,
          searchable: true,
          cellClass: "text-truncate",
        },
        {
          text: "CMD",
          value: "cmd",
          align: "center",
          sortable: false,
          searchable: false,
          cellClass: "text-truncate",
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
    searchItems() {
      const arr = this.headers.filter((item) => item.searchable);
      arr.push({
        text: "내용",
        value: "wr_content",
      });
      return arr;
    },
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
  },

  methods: {
    ...mapActions("board", ["getBoardList"]),
    initOptions() {
      const { query } = this.$route;
      const options = {
        page: Number(query.page) || 1,
        itemsPerPage: Number(query.itemsPerPage) || 10,
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
    async deleteItem(item) {
      this.deleteLoading = true;

      const deleteConfirm = await this.$ezNotify.confirm(
        `컨텐츠 [${item.wr_title}]을 삭제하시겠습니까?`,
        "컨텐츠 삭제",
        { icon: " mdi-alert" }
      );

      if (deleteConfirm) {
        const data = await this.$axios.delete(
          `/api/board/${this.table}/${item.wr_id}`
        );
        if (data) {
          this.$toast.info(`[${item.wr_title}]  삭제하였습니다.`);
          this.fetchData();
        }
      }

      this.deleteLoading = false;
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