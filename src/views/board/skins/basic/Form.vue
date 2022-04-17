<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer />
      <v-btn @click="save" color="primary" :loading="loading">
        <v-icon left>mdi-pencil</v-icon>
        저장
      </v-btn>
    </v-toolbar>
    <v-form v-if="form" ref="form" v-model="valid" lazy-validation>
      <v-select
        v-if="config.bo_use_category"
        label="카테고리"
        v-model="form.wr_category"
        :items="config.bo_category"
        :rules="[rules.require({ label: '카테고리' })]"
        :readonly="!!parentItem"
      >
      </v-select>
      <template v-if="!member">
        <v-text-field
          label="이름"
          v-model="form.wr_name"
          :readonly="!!form.wr_id"
          :rules="rules.name()"
        />
        <v-text-field
          label="이메일"
          v-model="form.wr_email"
          :rules="rules.email()"
        />
        <input-password
          label="비밀번호"
          v-model="form.wr_password"
          :rules="rules.password()"
        />
        <input-password
          label="비밀번호 확인"
          v-model="confirmPw"
          :rules="[rules.matchValue(form.wr_password)]"
        />
      </template>

      <v-expansion-panels v-if="parentItem"> 
        <v-expansion-panel>
          <v-expansion-panel-header>
            부모글: {{parentItem.wr_title}}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ez-tiptap v-model="parentItem.wr_content" :editable="false"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-text-field
        label="제목"
        v-model="form.wr_title"
        counter="120"
        :rules="[rules.require({ label: '제목' })]"
      />

      <ez-tiptap
        :editable="true"
        v-model="form.wr_content"
        @uploadImage="uploadImage"
      />

      <v-combobox
        label="검색태그"
        v-model="form.wrTags"
        :items="tags"
        multiple
        chips
        deletable-chips
        hide-selected
      />

      <div v-for="(item, i) in config.wr_fields" :key="i">
        <v-text-field
          v-if="item.title"
          :label="item.title"
          v-model="form[`wr_${i + 1}`]"
          :rules="item.required ? [rules.require({ label: item.title })] : []"
        />
      </div>

      <div v-for="i in config.bo_upload_cnt" class="d-flex">
        <v-file-input
          :label="fileTitle(i)"
          v-model="uploadFiles[i - 1]"
          show-size
          :disabled="
            form.wrFiles && form.wrFiles[i - 1]
              ? !form.wrFiles[i - 1].remove
              : false
          "
        />
        <div v-if="form.wrFiles && form.wrFiles[i - 1]">
          <v-checkbox
            v-model="form.wrFiles[i - 1].remove"
            label="삭제"
            @change="uploadFiles[i - 1] = null"
          />
        </div>
      </div>
    </v-form>
  </v-container>
  <!-- v-data-table -->
</template>

<script>
import { mapState } from "vuex";
import InputPassword from "../../../../components/InputForms/InputPassword.vue";
import validateRules from "../../../../../util/validateRules";
export default {
  components: { InputPassword },
  name: "BasicForm",
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
      form: null,
      valid: true,
      confirmPw: "",
      uploadFiles: Array(this.config.bo_upload_cnt).fill(null),
      tags: [],
      loading: false,
      upImages: [],
      isWrite: false,
      parentItem: null,
    };
  },
  computed: {
    ...mapState({
      member: (state) => state.user.member,
    }),
    table() {
      return this.config.bo_table;
    },
    pageTitle() {
      return (
        this.config.bo_subject + (this.id ? " 게시글 수정" : " 게시글 작성")
      );
    },
    rules: () => validateRules,
    pid() {
      if (this.$route.query.act == "reply") {
        return this.id;
      }
      return 0;
    },
  },
  mounted() {
    this.init();
  },
  destroyed() {
    // 작성을 완료하지 않았는데 에디터에서 업로드한 이미지가 있다면 삭제함
    if (this.isWrite == false && this.upImages.length) {
      this.$axios.put(`/api/board/imgCancel/${this.table}`, this.upImages);
    }
  },
  methods: {
    async init() {
      if (this.id) { // 기존글에 대한 액션
        const data = await this.$axios.get(
          `/api/board/read/${this.table}/${this.id}`
        );        
        if (this.pid) {
          // 부모가 있음(답글)
          this.initForm();
          this.form.wr_category = data.wr_category; // 답글의 카테고리는 부모글의 카테고리를 따라감
          this.parentItem = data;
        } else {
          // 부모가 없음(수정)
          this.form = data;
        }
      } else { // 새 글
        this.initForm();
      }
      console.log("this.config", this.config);
      console.log("this.form", this.form);
    },
    initForm() {
      const form = {
        wr_reply: 0,
        wr_parent: this.pid, // 답글 작성일 경우에는 부모 아이디를 가져와야 함
        mb_id: this.member ? this.member.mb_id : 0, // 0=비회원 글 작성
        wr_email: this.member ? this.member.mb_email : "",
        wr_name: this.member ? this.member.mb_name : "",
        wr_password: "",
        wr_category: this.$route.query.ca || this.config.bo_category[0], // TODO: 링크할 때 카테고리 정보를 넘긴다 ???
        wr_title: "",
        wr_content: "",
        wrTags: [],
        // wrImgs: [],
        // wrFiles: [],
      };
      for (let i = 1; i <= 10; i++) {
        form[`wr_${i}`] = "";
      }
      this.form = form;
    },
    async uploadImage({ file, desc, callback }) {
      const formData = new FormData();
      formData.append("upFile", file);
      formData.append("bf_desc", desc);
      const data = await this.$axios.post(
        `/api/board/imageUpload/${this.table}`,
        formData
      );
      this.upImages.push(data);
      callback(`/upload/${this.table}/${data.bf_src}`);
    },
    fileTitle(i) {
      // TODO: 수정 시 업로드한 파일 이름을 사용하기 위함
      if (this.form.wrFiles) {
        const wrFile = this.form.wrFiles[i - 1];
        if (wrFile && !wrFile.remove) {
          return wrFile.bf_name;
        } else {
          return `첨부파일 ${i}`;
        }
      }
    },
    async save() {
      this.$refs.form.validate();
      await this.$nextTick();
      if (!this.valid) return;
      console.log(this.form);
      console.log(this.uploadFiles);

      this.loading = true;

      // 폼 데이터 작성
      const formData = new FormData();
      const keys = Object.keys(this.form);
      for (const key of keys) {
        if (typeof this.form[key] == "object") {
          formData.append(key, JSON.stringify(this.form[key]));
        } else {
          formData.append(key, this.form[key]);
        }
      }
      // 파일 업로드 처리
      let cnt = 0;
      for (let i = 0; i < this.config.bo_upload_cnt; i++) {
        if (this.uploadFiles[i] != null) {
          formData.append(`upfiles[${cnt}]`, this.uploadFiles[i]);
          cnt++;
        }
      }

      // 에디터에서 업로드한 이미지
      formData.append("upImages", JSON.stringify(this.upImages));

      let wr_id;
      if (this.id && !this.pid) {
        // 수정
        wr_id = await this.update(formData);
      } else {
        // 새 글
        wr_id = await this.insert(formData);
      }

      if (wr_id) {
        this.isWrite = true;
        this.$router.push(`/board/${this.table}/${wr_id}`);
      }

      this.loading = false;
    },
    async insert(formData) {
      const data = await this.$axios.post(
        `api/board/write/${this.table}`,
        formData
      );
      return data.wr_id;
    },
    async update(formData) {
      const data = await this.$axios.put(
        `/api/board/write/${this.table}/${this.id}`,
        formData
      );
      return data.wr_id;
    },
  },
};
</script>

<style>
</style>