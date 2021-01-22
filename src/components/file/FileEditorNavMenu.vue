<template>
  <div
      :style="{
        backgroundColor: style.backgroundColorGutters,
        borderRight: `1px solid ${style.backgroundColor}`
      }"
      ref="fileEditorNavMenu"
      class="file-editor-nav-menu"
  >
    <el-tree
        :render-after-expand="defaultExpandAll"
        :data="items"
        :expand-on-click-node="false"
        :highlight-current="false"
        :allow-drop="allowDrop"
        empty-text="No files available"
        icon-class="fa fa-angle-right"
        :style="{
          backgroundColor: style.backgroundColorGutters,
          color: style.color,
        }"
        node-key="path"
        :default-expanded-keys="['~']"
        draggable
        @node-drag-enter="onNodeDragEnter"
        @node-drag-leave="onNodeDragLeave"
        @node-drag-end="onNodeDragEnd"
        @node-drop="onNodeDrop"
        @node-click="onNodeClick"
        @node-contextmenu="onNodeContextMenuShow"
    >
      <template #default="{ data }">
        <FileEditorNavMenuContextMenu
            :visible="isShowContextMenu(data)"
            @hide="onNodeContextMenuHide"
        >
          <div :class="getItemClass(data)" class="nav-item-wrapper">
            <div class="background"/>
            <div class="nav-item">
              <span class="icon">
                <atom-material-icon :is-dir="data.is_dir" :name="data.name"/>
              </span>
              <span class="title">
                {{ data.name }}
              </span>
            </div>
          </div>
        </FileEditorNavMenuContextMenu>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, reactive, ref} from 'vue';
import {ClickOutside} from 'element-plus/lib/directives';
import Node from 'element-plus/lib/el-tree/src/model/node';
import {DropType} from 'element-plus/lib/el-tree/src/tree.type';
import AtomMaterialIcon from '@/components/icon/AtomMaterialIcon.vue';
import {KeyControl, KeyMeta} from '@/constants/keyboard';
import FileEditorNavMenuContextMenu from '@/components/file/FileEditorNavMenuContextMenu.vue';

export default defineComponent({
  name: 'FileEditorNavMenu',
  components: {
    FileEditorNavMenuContextMenu,
    AtomMaterialIcon
  },
  directives: {
    ClickOutside,
  },
  props: {
    activeItem: {
      type: Object,
      required: false,
    },
    items: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    defaultExpandAll: {
      type: Boolean,
      required: true,
      default: false,
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
    'node-click',
    'node-db-click',
    'node-drop',
  ],
  setup(props, ctx) {
    const {emit} = ctx;

    const fileEditorNavMenu = ref<HTMLDivElement>();

    const clickStatus = reactive<FileEditorNavMenuClickStatus>({
      clicked: false,
      item: undefined,
    });

    const selectedCache = reactive<FileEditorNavMenuCache<boolean>>({});

    const dragCache = reactive<FileEditorNavMenuCache<boolean>>({});

    const isCtrlKeyPressed = ref<boolean>(false);

    const activeContextMenuItem = ref<FileNavItem>();

    const resetClickStatus = () => {
      clickStatus.clicked = false;
      clickStatus.item = undefined;
      activeContextMenuItem.value = undefined;
    };

    const updateSelectedMap = (item: FileNavItem) => {
      const key = item.path;
      if (!key) {
        console.warn('No path specified for FileNavItem');
        return;
      }
      if (!selectedCache[key]) {
        selectedCache[key] = false;
      }
      selectedCache[key] = !selectedCache[key];

      // if Ctrl key is not pressed, clear other selection
      if (!isCtrlKeyPressed.value) {
        Object.keys(selectedCache).filter(k => k !== key).forEach(k => {
          selectedCache[k] = false;
        });
      }
    };

    const onNodeClick = (item: FileNavItem) => {
      if (clickStatus.clicked && clickStatus.item?.path === item.path) {
        emit('node-db-click', item);
        updateSelectedMap(item);
        resetClickStatus();
        return;
      }

      clickStatus.item = item;
      clickStatus.clicked = true;
      setTimeout(() => {
        if (clickStatus.clicked) {
          emit('node-click', item);
          updateSelectedMap(item);
        }
        resetClickStatus();
      }, 200);
    };

    const onNodeContextMenuShow = (ev: Event, item: FileNavItem) => {
      activeContextMenuItem.value = item;
    };

    const onNodeContextMenuHide = () => {
      activeContextMenuItem.value = undefined;
    };

    const onNodeDragEnter = (draggingNode: Node, dropNode: Node) => {
      const item = dropNode.data as FileNavItem;
      if (!item.path) return;
      dragCache[item.path] = true;
    };

    const onNodeDragLeave = (draggingNode: Node, dropNode: Node) => {
      const item = dropNode.data as FileNavItem;
      if (!item.path) return;
      dragCache[item.path] = false;
    };

    const onNodeDragEnd = () => {
      for (const key in dragCache) {
        dragCache[key] = false;
      }
    };

    const onNodeDrop = () => {
      const {items} = props as FileEditorNavMenuProps;
      emit('node-drop', items);
    };

    const isSelected = (item: FileNavItem): boolean => {
      if (!item.path) return false;
      return selectedCache[item.path] || false;
    };

    const isDroppable = (item: FileNavItem): boolean => {
      if (!item.path) return false;
      return dragCache[item.path] || false;
    };

    const isShowContextMenu = (item: FileNavItem) => {
      return activeContextMenuItem.value?.path === item.path;
    };

    const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
      if (type !== 'inner') return false;
      if (draggingNode.data?.path === dropNode.data?.path) return false;
      if (draggingNode.parent?.data?.path === dropNode.data?.path) return false;
      const item = dropNode.data as FileNavItem;
      return item.is_dir;
    };

    const getItemClass = (item: FileNavItem): string[] => {
      const cls = [];
      if (isSelected(item)) cls.push('selected');
      if (isDroppable(item)) cls.push('droppable');
      return cls;
    };

    onMounted(() => {
      // listen to keyboard events
      document.onkeydown = (ev: KeyboardEvent) => {
        if (!ev) return;
        if (ev.key === KeyControl || ev.key === KeyMeta) {
          isCtrlKeyPressed.value = true;
        }
      };
      document.onkeyup = (ev: KeyboardEvent) => {
        if (!ev) return;
        if (ev.key === KeyControl || ev.key === KeyMeta) {
          isCtrlKeyPressed.value = false;
        }
      };
    });

    onUnmounted(() => {
      // turnoff listening to keyboard events
      document.onkeydown = null;
      document.onkeyup = null;
    });

    return {
      activeContextMenuItem,
      fileEditorNavMenu,
      onNodeClick,
      onNodeContextMenuShow,
      onNodeContextMenuHide,
      onNodeDragEnter,
      onNodeDragLeave,
      onNodeDragEnd,
      onNodeDrop,
      isSelected,
      isDroppable,
      isShowContextMenu,
      allowDrop,
      getItemClass,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.file-editor-nav-menu {
  flex: 1;
  max-height: 100%;
  overflow: auto;

  .el-tree {
    height: 100%;
    width: fit-content;

    .el-tree-node {
      .nav-item-wrapper {
        &.selected {
          .background {
            background-color: $fileEditorMaskBg;
          }

          .nav-item {
            color: $fileEditorNavMenuItemSelectedColor;
          }
        }

        &.droppable {
          & * {
            pointer-events: none;
          }

          .nav-item {
            border: 1px dashed $fileEditorNavMenuItemDragTargetBorderColor;
          }
        }

        .nav-item:hover,
        .background:hover + .nav-item {
          color: $fileEditorNavMenuItemSelectedColor;
        }

        .background {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: -1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          user-select: none;

          .icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.file-editor-nav-menu >>> .el-tree .el-tree-node > .el-tree-node__content {
  background-color: inherit;
  position: relative;
  z-index: 0;
}

.file-editor-nav-menu >>> .el-tree .el-tree-node > .el-tree-node__content .el-tree-node__expand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  font-size: 16px;
  padding: 0;
  margin: 0;
}

.file-editor-nav-menu >>> .el-tree .el-tree-node * {
  transition: none;
}
</style>
