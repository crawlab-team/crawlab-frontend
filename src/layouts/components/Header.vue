<template>
  <div :class="sidebarCollapsed ? 'collapsed' : ''" class="header-container">
    <el-header :height="headerHeight" class="header">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </el-header>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'vuex';
import variables from '../../styles/variables.scss';

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore();
    const {layout} = store.state as RootStoreState;

    const sidebarCollapsed = computed(() => {
      return layout.sidebarCollapsed;
    });

    return {
      sidebarCollapsed,
      ...variables,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.header-container {
  height: $headerHeight;
  width: calc(100vw - #{$sidebarWidth});
  background-color: $headerBg;
  transition: width $sidebarCollapseTransitionDuration;

  &.collapsed {
    width: calc(100vw - #{$sidebarWidthCollapsed});
  }

  .header {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-left: none;
    border-bottom: 1px solid #eaecef;

    .left {
      display: flex;
      align-items: center;
    }

    .right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
