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
        item-key="path"
        :items="tabs"
        @d-end="onDragEnd"
    >
      <template v-slot="{item}">
        <FileEditorNavTabsContextMenu
            :visible="isShowContextMenu(item)"
            @close="onClose(item)"
            @hide="onContextMenuHide"
            @close-others="onCloseOthers(item)"
            @close-all="onCloseAll"
        >
          <div
              :class="activeTab && activeTab.path === item.path ? 'active' : ''"
              :style="{
                backgroundColor: style.backgroundColor,
              }"
              class="file-editor-nav-tab"
              @click="onClick(item)"
              @contextmenu.prevent="onContextMenuShow(item)"
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
        </FileEditorNavTabsContextMenu>
      </template>
    </DraggableList>
    <slot name="suffix"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import DraggableList from '@/components/drag/DraggableList.vue';
import AtomMaterialIcon from '@/components/icon/AtomMaterialIcon.vue';
import FileEditorNavTabsContextMenu from '@/components/file/FileEditorNavTabsContextMenu.vue';

export default defineComponent({
  name: 'FileEditorNavTabs',
  components: {FileEditorNavTabsContextMenu, AtomMaterialIcon, DraggableList},
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
    'tab-close-others',
    'tab-close-all',
    'tab-dragend',
  ],
  setup(props, {emit}) {
    const activeContextMenuItem = ref<FileNavItem>();

    const getTitle = (item: FileNavItem) => {
      return item.name;
    };

    const onClick = (item: FileNavItem) => {
      emit('tab-click', item);
    };

    const onClose = (item: FileNavItem) => {
      emit('tab-close', item);
    };

    const onCloseOthers = (item: FileNavItem) => {
      emit('tab-close-others', item);
    };

    const onCloseAll = () => {
      emit('tab-close-all');
    };

    const onDragEnd = (items: FileNavItem[]) => {
      emit('tab-dragend', items);
    };

    const onContextMenuShow = (item: FileNavItem) => {
      activeContextMenuItem.value = item;
    };

    const onContextMenuHide = () => {
      activeContextMenuItem.value = undefined;
    };

    const isShowContextMenu = (item: FileNavItem) => {
      return activeContextMenuItem.value?.path === item.path;
    };

    return {
      activeContextMenuItem,
      getTitle,
      onClick,
      onClose,
      onCloseOthers,
      onCloseAll,
      onDragEnd,
      onContextMenuShow,
      onContextMenuHide,
      isShowContextMenu,
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
