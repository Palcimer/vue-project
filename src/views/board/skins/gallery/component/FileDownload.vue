<template>
  <div>
    <v-btn
      v-for="file in wrFiles"
      :key="file.bf_id"
      block
      :disabled="!access.download"
      :href="`/api/board/download/${table}/${file.bf_name}?src=${file.bf_src}`"
      download
      class="mt-1 text-none"
    >
      <v-icon left>mdi-download</v-icon>
      {{ file.bf_name }}
      <v-spacer />
      {{ filesize(file.bf_size) }}
    </v-btn>
  </div>
</template>

<script>
import { fileSize } from "../../../../../../util/lib";

export default {
  name: "FileDownload",
  props: ["table", "item", "access"],
  computed: {
    wrFiles() {
      return this.item.wrFiles || [];
    },
    filesize: () => fileSize,
  },
};
</script>

<style>
</style>