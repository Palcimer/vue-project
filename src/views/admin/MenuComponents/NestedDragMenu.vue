<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    :list="items"
    class="menu-drag-container"
    handle=".handle"
  >
    <div
      v-for="(item, i) in items"
      :key="`${i}${item.title}`"
      class="menu-drag-group"
    >
      <v-expand-transition>
        <div v-show="show">
          <div class="menu-drag-zone">
            <v-sheet
              class="menu-drag-item d-flex pa-4 pt-6"
              outlined
              rounded
              elevation="2"
            >
              <!-- 하위 메뉴 단계 -->
              <div class="icon">
                <v-icon>mdi-subdirectory-arrow-right</v-icon>
              </div>
              <!-- 드래그 핸들러 -->
              <div class="handle">
                <v-icon>mdi-drag</v-icon>
              </div>
              <!-- 하위 메뉴가 없으면 아이콘 비활성화 -->
              <v-btn
                icon
                class="ml-4"
                :disabled="item.subItems.length == 0"
                small
                @click="toggleSub(item)"
              >
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <!-- 컨텐츠 내용(메뉴명) -->
              <v-icon v-if="item.isHide" color="grey">mdi-eye-off</v-icon>
              <v-icon v-else color="primary">mdi-eye</v-icon>
              <v-text-field
                label="title"
                v-model="item.title"
                hide-details
                dense
                :prepend-icon="item.icon"
                readonly
                class="ml-2"
              />
              <display-level :level="item.grant" :size="28" />
              <v-text-field
                label="link"
                v-model="item.to"
                hide-details
                dense
                class="ml-2"
                readonly
              />
              <tooltip-btn
                label="수정"
                icon
                small
                color="primary"
                childClass="ml-2"
                @click="modifyItem(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </tooltip-btn>
              <tooltip-btn
                label="삭제"
                icon
                small
                color="error"
                childClass="ml-2"
                @click="removeItem(item)"
              >
                <v-icon>mdi-delete</v-icon>
              </tooltip-btn>
            </v-sheet>
          </div>
          <!-- 중첩 메뉴 -->
          <nested-drag-menu
            :items="item.subItems"
            class="menu-drag-subitem"
            :show.sync="item.show"
          />
        </div>
      </v-expand-transition>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { findParentVm } from "../../../../util/lib";
import TooltipBtn from "../../../components/etc/TooltipBtn.vue";
import DisplayLevel from "../../../components/layout/DisplayLevel.vue";
export default {
  components: { draggable, DisplayLevel, TooltipBtn },
  name: "NestedDragMenu",
  props: {
    items: {
      type: Array,
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // v-bind에 쓰임
    // 메뉴를 상위레벨이나 하위레벨로도 옮길 수 있으려면 필요
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  created() {
    for (const item of this.items) {
      this.$set(item, "show", false);
      // item.show = false;
    }
  },
  mounted() {
    console.log("mounted: " + this.items);
  },
  methods: {
    toggleSub(item) {
      item.show = !item.show;
      this.$forceUpdate();
    },
    modifyItem(item) {
      const admMenu = findParentVm(this, "AdmMenu");
      admMenu.modifyMenu(item, this.items);
    },
    removeItem(item) {
      const idx = this.items.indexOf(item);
      this.items.splice(idx, 1);
    },
  },
};
</script>

<style>
</style>