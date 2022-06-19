<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="item.wr_id"
      :src="getImage(table, item, imgSize)"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { getImage } from "../../../../../util/lib";
import DisplayTime from "../../../layout/DisplayTime.vue";

export default {
  components: { DisplayTime },
  name: "Latest",
  props: {
    table: { type: String, required: true },
    subject: { type: String, required: true },
    items: { type: Array, required: true },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      imgSize: {
        w: 300,
        h: 300,
      },
    };
  },
  computed: {
    getImage: () => getImage,
  },
};
</script>

<style>
</style>