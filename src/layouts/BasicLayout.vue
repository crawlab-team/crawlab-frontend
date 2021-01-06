<template>
  <el-container class="basic-layout">
    <Sidebar></Sidebar>
    <el-container :class="sidebarCollapsed ? 'collapsed' : ''" class="container">
      <Header></Header>
      <slot></slot>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'BasicLayout',
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const store = useStore();
    const {layout} = store.state as RootStoreState;

    const sidebarCollapsed = computed<boolean>(() => layout.sidebarCollapsed);

    return {
      sidebarCollapsed,
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.basic-layout {
  min-height: 100vh;

  .container {
    position: fixed;
    top: 0;
    left: $sidebarWidth;
    display: block;
    width: calc(100vw - #{$sidebarWidth});
    min-height: 100vh;
    transition: left $sidebarCollapseTransitionDuration;
    z-index: 2;

    &.collapsed {
      left: $sidebarWidthCollapsed;
      width: calc(100vw - #{$sidebarWidthCollapsed});
    }
  }
}
</style>
