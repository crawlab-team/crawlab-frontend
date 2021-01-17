<template>
  <div
      :style="{
        backgroundColor: style.backgroundColorGutters,
        color: style.color,
      }"
      class="file-editor-nav-tabs"
  >
    <slot name="prefix"></slot>
    <DraggableList
        :items="tabs"
    >
      <template v-slot="{item}">
        <div
            :class="activeTab && activeTab.path === item.path ? 'active' : ''"
            :style="{
              backgroundColor: style.backgroundColor,
            }"
            class="file-editor-nav-tab"
            @click="onClick(item)"
        >
          <span class="icon">
            <atom-material-icon :is-dir="item.is_dir" :name="item.name"/>
          </span>
          <span class="title">
            {{ getTitle(item) }}
          </span>
          <span class="close-btn" @click.stop="onClose(item)">
            <i class="el-icon-close"></i>
          </span>
          <div class="background"/>
        </div>
      </template>
    </DraggableList>
    <slot name="suffix"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DraggableList from '@/components/drag/DraggableList.vue';
import AtomMaterialIcon from '@/components/icon/AtomMaterialIcon.vue';

export default defineComponent({
  name: 'FileEditorNavTabs',
  components: {AtomMaterialIcon, DraggableList},
  props: {
    activeTab: {
      type: Object,
      required: false,
    },
    tabs: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    style: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  emits: [
    'tab-click',
    'tab-close',
  ],
  setup(props, {emit}) {
    const getTitle = (item: FileNavItem) => {
      return item.name;
    };

    const onClick = (item: FileNavItem) => {
      emit('tab-click', item);
    };

    const onClose = (item: FileNavItem) => {
      emit('tab-close', item);
    };

    return {
      getTitle,
      onClick,
      onClose,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.file-editor-nav-tabs {
  display: flex;
  align-items: center;

  .file-editor-nav-tab {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $fileEditorNavTabsHeight;
    padding: 0 10px;
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
    z-index: 1;

    &:hover {
      .background {
        background-color: $fileEditorMaskBg;
      }
    }

    &.active {
      border-bottom: 2px solid $primaryColor;

      .title {
        color: $fileEditorNavTabsItemActiveColor;
      }
    }

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .icon {
      margin-right: 5px;
      z-index: 1;
    }

    .title {
      color: $fileEditorNavTabsItemColor;
      z-index: 1;
    }

    .close-btn {
      margin-left: 5px;
      z-index: 1;
    }
  }
}
</style>
