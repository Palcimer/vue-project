<template>
  <span>
    <v-btn :loading="loading" v-bind="$attrs" @click="openDialog">
      <slot></slot>
    </v-btn>
    <ez-dialog
      ref="dialog"
      :label="`게시물 ${label}`"
      width="500"
      @onClose="closeDialog"
      persistent
    >
      <v-form
        @submit.prevent="checkPass"
        ref="form"
        lazy-validation
        v-model="valid"
      >
        <input-password
          v-model="password"
          label="비밀번호"
          :rules="rules.password()"
          prepend-icon="mdi-key"
          class="mt-4"
        />
        <v-btn type="submit" block color="primary" class="mt-2"
          >비밀번호 확인</v-btn
        >
      </v-form>
    </ez-dialog>
  </span>
</template>

<script>
import EzDialog from "../../../../../components/etc/EzDialog.vue";
import InputPassword from "../../../../../components/InputForms/InputPassword.vue";
import validateRules from "../../../../../../util/validateRules";

export default {
  components: { EzDialog, InputPassword },
  name: "ModifyButton",
  inheritAttrs: false,
  props: {
    table: {
      type: String,
      required: true,
    },
    wr_id: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    rules: () => validateRules,
  },
  data() {
    return {
      loading: false,
      valid: true,
      password: "",
    };
  },
  methods: {
    openDialog() {
      this.loading = true;
      this.$refs.dialog.open();
    },
    closeDialog() {
      this.loading = false;
    },
    async checkPass() {
      this.$refs.form.validate();
      await this.$nextTick();
      if (!this.valid) return;
      const data = await this.$axios.post(
        `/api/board/check/${this.table}/${this.wr_id}`,
        { password: this.password }
      );
      if(data) {
          this.$emit('onValid', data.token);
          this.$refs.dialog.close();
      }      
    },
  },
};
</script>

<style>
</style>