<template>
  <div class="file-editor-nav-menu">
    <el-tree
        :data="items"
    >
      <template #default="{ data }">
        <div class="nav-item">
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
import {defineComponent} from 'vue';
import AtomMaterialIcon from '@/components/icon/AtomMaterialIcon.vue';

export default defineComponent({
  name: 'FileEditorNavMenu',
  components: {
    AtomMaterialIcon
  },
  props: {
    items: Array,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.file-editor-nav-menu {
  width: 200px;

  .el-tree {
    height: 100%;

    .nav-item {
      display: flex;
      align-items: center;
      font-size: 14px;

      .icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
