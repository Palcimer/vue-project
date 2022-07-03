<template>
  <div class="pop-wrap elevation-4" :style="wrapStyle">
    <v-btn v-bind="linkAttrs" text block height="auto" style="padding: 0px">
      <img :src="popImg" :alt="item.title" :width="width" :height="height" :style="imgStyle" />
    </v-btn>
    <div class="d-flex px-2">
      <v-checkbox
        v-model="isCheck"
        :label="`${expired}일간 보지 않기`"
        dense
        dark
        hide-details
        style="position: relative; top: -4px"
      ></v-checkbox>
      <v-spacer />
      <v-btn
        x-small
        icon
        color="white"
        @click="close"
        style="position: relative; top: 5px"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { getImage } from "../../../../../../util/lib";
import VueCookies from "vue-cookies";

export default {
  name: "PopupView",
  props: {
    item: { type: Object, required: true },
    table: { type: String, required: true },
    idx: { type: Number, default: 0 },
  },
  data() {
    return {
      isCheck: false,
    };
  },
  computed: {
    top() {
      return parseInt(this.item.wr_4);
    },
    left() {
      return parseInt(this.item.wr_5);
    },
    width() {
      return parseInt(this.item.wr_6);
    },
    height() {
      return parseInt(this.item.wr_7);
    },
    link() {
      return this.item.wr_8;
    },
    expired() {
      return this.item.wr_1;
    },
    wrapStyle() {
      let st;
      if (this.$vuetify.breakpoint.xs) {
        st = {
          left: "0px",
          top: "0px",
          width: "90%",
          height: "auto",
          marginLeft: "5%",
        };
      } else {
        st = {
          left: this.left + "px",
          top: this.top + "px",
          width: this.width + "px",
          height: this.height + 30 + "px",
        };
      }
      st = {
        ...st,
        position: "fixed",
        background: "#aaa",
        overflow: "hidden",
        zIndex: 3000,
      };
      return st;
    },
    popImg() {
      return getImage(this.table, this.item, { w: this.width, h: this.height });
    },
    imgStyle() {
      if (this.$vuetify.breakpoint.xs) {
        return {
          width: "100%",
          height: "auto",
        };
      }
    },
    linkAttrs() {
      if (this.link.startsWith("http")) {
        return {
          href: this.link,
          target: "_blank",
        };
      } else {
        return {
          to: this.link,
        };
      }
    },
  },
  mounted() {
    console.log("PopupView.vue mounted==================", this.item);
    console.log(this.popImg);
  },
  methods: {
    close() {
      if (this.isCheck) {
        const expire = this.expired * 24 * 60 * 60;
        VueCookies.set(`pop-${this.item.wr_id}`, this.item.wr_id, expire);
      }
      this.$emit("onClose", this.item);
    },
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  /* .pop-wrap {
    left: 0px !important;
    top: 60px !important;
    width: 90% !important;
    height: auto !important;
    margin-left: 5%;
  }
  .pop-wrap a {
      padding: 0px !important;
  }
  .pop-wrap img {
      height: auto;
  } */
}
</style>