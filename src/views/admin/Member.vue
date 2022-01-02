<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>회원 관리</v-toolbar-title>
      <search-field :items="searchItems" :options.sync="options" />
      <v-spacer></v-spacer>
      <v-sheet width="100" class="mt-2">
        <v-select
          :items="mTypeItems"
          v-model="options.mType"
          label="회원유형"
          hide-details
          @change="options.page = 1"
          dense
        />
      </v-sheet>
      <v-sheet width="100" class="mt-2 ml-4">
        <v-select
          :items="pageItems"
          v-model="options.itemsPerPage"
          label="페이지 당 행 수"
          hide-details
          dense
        />
      </v-sheet>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      hide-default-footer
    >
      <template v-slot:item.cmd="{ item }">
        <tooltip-btn icon label="수정" @click="openDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </tooltip-btn>
      </template>
    </v-data-table>

    <v-pagination
        v-model="options.page"
        :length="pageCount"
        class="mt-4"
      ></v-pagination>

    <ez-dialog
      label="회원 수정"
      ref="dialog"
      width="500"
      persistent
      @onClose="dialogClose"
    >
      <user-update-form
        v-if="currMember"
        :member="currMember"
        :isLoading="loading"
        :admMode="true"
        @onSave="saveMember"
        @onLeave="leaveMember"
      />
    </ez-dialog>
  </v-container>
</template>

<script>
import qs from "qs";
import SearchField from "../../components/layout/SearchField.vue";
import TooltipBtn from "../../components/etc/TooltipBtn.vue";
import axios from "axios";
import EzDialog from "../../components/etc/EzDialog.vue";
import UserUpdateForm from "../../components/Auth/UserUpdateForm.vue";
import { deepCopy } from '../../../util/lib';
export default {
  components: { SearchField, TooltipBtn, EzDialog, UserUpdateForm },
  name: "admMember",
  data() {
    return {
      headersOrigin: [
        {
          text: "아이디",
          value: "mb_id",
          align: "start",
          searchable: true,
        },
        {
          text: "이메일",
          value: "mb_email",
          align: "start",
          searchable: true,
        },
        {
          text: "연락처",
          value: "mb_phone",
          align: "start",
          searchable: true,
        },
        {
          text: "레벨",
          value: "mb_level",
          align: "start",
          searchable: true,
        },
        {
          text: "가입일",
          value: "mb_create_at",
          align: "start",
        },
        {
          text: "수정일",
          value: "mb_update_at",
          align: "start",
        },
        {
          text: "탈퇴일",
          value: "mb_leave_at",
          align: "start",
        },
        {
          text: "CMD",
          value: "cmd",
          sortable: false,
        },
      ],
      items: [],
      options: {},
      totalItems: 0,
      loading: false,
      pageReady: false,
      pageRouting: false,
      axiosSource: null,
      currMember: null,
      mTypeItems: [
        {
          text: "회원",
          value: "member",
        },
        {
          text: "탈퇴회원",
          value: "left",
        },
      ],
      pageItems: [2, 5, 10, 20, 50, 100],
    };
  },
  computed: {
    searchItems() {
      return this.headers.filter((item) => item.searchable);
    },
    //회원일 때는 수정일, 탈퇴회원일 때는 탈퇴일이 보이게 함
    headers() {
      if(this.options.mType == 'member') {
        return this.headersOrigin.filter(item => item.value != 'mb_leave_at')
      } else {
        return this.headersOrigin.filter(item => item.value != 'mb_update_at')
      }
    },
    pageCount() {
      return Math.ceil(this.totalItems / this.options.itemsPerPage);
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchData();
      },
      deep: true, // options의 주소가 아닌 멤버 데이터의 일부가 바뀌어도 감지하고 동작하게 하는 설정
    },
    // "$route.query": {
    //   handler() {
    //     this.routeChange();
    //   },
    //   deep: true,
    // },
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
    initOptions() {
      const { query } = this.$route;
      // 기본적으로 가입일 내림차순으로 보이도록 함
      const options = {
        page: Number(query.page) || 1,
        itemsPerPage: Number(query.itemsPerPage) || 10,
        sortBy: [query.sortBy || "mb_create_at"],
        sortDesc: [query.sortDesc ? query.sortDesc == "true" : false],
        stf: [query.stf || ""],
        stx: [query.stx || ""],
        stc: [query.stc || ""],
        mType: query.mType || "member",
      };
      return options;
    },
    routeChange() {
      this.pageRouting = true;
      this.options = this.initOptions();
    },
    async fetchData() {
      console.log("fetchData call...");
      if (this.axiosSource) {
        this.axiosSource.cancel("fetchData 취소");
      }
      this.loading = true;
      const payload = deepCopy(this.options);
      if(this.options.mType == 'member') {
        payload.stf.push('mb_leave_at');
        payload.stx.push('n');
        payload.stc.push('null');
      } else {
        payload.stf.push('mb_leave_at');
        payload.stx.push('n');
        payload.stc.push('not');
      }
      delete payload.mType;

      const query = qs.stringify(payload);
      this.axiosSource = axios.CancelToken.source();
      try {
        const data = await this.$axios.get(`/api/member?${query}`, {
          cancelToken: this.axiosSource.token,
        });
        this.pushState();
        this.loading = false;
        this.pageReady = true;
        this.pageRouting = false;
        if (data) {
          this.items = data.items;
          this.totalItems = data.totalItems;
        }
      } catch (e) {
        console.log("요청 취소", e.message);
      }
    },
    pushState() {
      console.log("pageRouting", this.pageRouting);
      if (!this.pageRouting) {
        const opt = {
          page: this.options.page,
          itemsPerPage: this.options.itemsPerPage,
          sortBy: this.options.sortBy[0],
          sortDesc: this.options.sortDesc[0],
          stf: this.options.stf[0] || undefined,
          stc: this.options.stc[0] || undefined,
          stx: this.options.stx[0] || undefined,
          mType: this.options.mType,
        };
        const query = qs.stringify(opt);
        if (this.pageReady) {
          history.pushState(null, null, `${this.$route.path}?${query}`);
        } else {
          history.replaceState(null, null, `${this.$route.path}?${query}`);
        }
      }
    },
    openDialog(member) {
      this.currMember = member;
      this.$refs.dialog.open();
    },
    dialogClose() {
      this.currMember = null;
    },
    async saveMember(form) {
      // axios 요청
      this.loading = true;
      const data = await this.$axios.patch("/api/member", form);
      this.loading = false;
      if (data) {
        const idx = this.items.indexOf(this.currMember);
        console.log(data);
        this.items.splice(idx, 1, data);
        this.$toast.info(`${data.mb_name}님의 정보가 수정되었습니다.`);
      }
    },
    async leaveMember() {
      const result = await this.$ezNotify.confirm(
        `${this.currMember.mb_name}님 회원 탈퇴 처리를 하시겠습니까?`,
        "회원탈퇴",
        {
          icon: "mdi-alert",
        }
      );

      if (!result) return;

      this.isLoading = true;

      const form = {
        mb_id: this.currMember.mb_id,
        mb_leave_at: this.$moment().format("LT"),
      };
      const data = await this.$axios.patch("/api/member", form);
      if (data) {
        this.$toast.info(`${this.currMember.mb_name}님을 탈퇴 처리하였습니다.`);
        this.$refs.dialog.close();
        this.pageRouting = true;
        this.fetchData();
      }
    },
  },
};
</script>

<style>
</style>