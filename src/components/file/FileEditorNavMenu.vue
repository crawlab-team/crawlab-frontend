<template>
  <div class="file-editor-nav-menu">
    <el-tree
        :data="items"
        :expand-on-click-node="false"
        :highlight-current="false"
        empty-text="No files available"
        icon-class="fa fa-angle-right"
        @node-click="onNodeClick"
    >
      <template #default="{ data }">
        <div :class="isSelected(data) ? 'selected' : ''" class="background"/>
        <div :class="isSelected(data) ? 'selected' : ''" class="nav-item">
          <span class="icon">
            <atom-material-icon :is-dir="data.is_dir" :name="data.name"/>
          </span>
          <span class="title">
            {{ data.name }}
          </span>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, reactive, ref} from 'vue';
import AtomMaterialIcon from '@/components/icon/AtomMaterialIcon.vue';
import {KeyControl, KeyMeta} from '@/constants/keyboard';

export default defineComponent({
  name: 'FileEditorNavMenu',
  components: {
    AtomMaterialIcon
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
  },
  emits: [
    'node-click',
    'node-db-click',
  ],
  setup(props, {emit}) {
    const clickStatus = reactive<FileEditorNavMenuClickStatus>({
      clicked: false,
      item: undefined,
    });

    const selectedCache = reactive<FileEditorNavMenuCache<boolean>>({});

    const isCtrlKeyPressed = ref<boolean>(false);

    const resetClickStatus = () => {
      clickStatus.clicked = false;
      clickStatus.item = undefined;
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
          console.log(k);
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

    const isSelected = (item: FileNavItem): boolean => {
      if (!item.path) return false;
      return selectedCache[item.path] || false;
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
      onNodeClick,
      isSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.file-editor-nav-menu {
  width: 200px;
  border-right: 1px solid $fileEditorNavMenuBorderColor;

  .el-tree {
    height: 100%;

    .el-tree-node {
      //&:hover {
      //  & > .el-tree-node__content > .nav-item {
      //    color: $fileEditorNavMenuItemSelectedColor;
      //  }
      //}

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

        &.selected {
          background-color: $fileEditorNavMenuItemSelectedBg;
        }
      }

      .nav-item {
        display: flex;
        align-items: center;
        font-size: 14px;

        &.selected {
          color: $fileEditorNavMenuItemSelectedColor;
        }

        .icon {
          margin-right: 5px;
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
