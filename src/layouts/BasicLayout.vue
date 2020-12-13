<template>
  <el-container class="basic-layout">
    <Sidebar></Sidebar>
    <el-container class="container">
      <Header></Header>
      <slot></slot>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

export default defineComponent({
  name: 'BasicLayout',
  components: {
    Header,
    Sidebar,
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
  .basic-layout {
    min-height: 100vh;

    .container {
      display: block;
    }
  }
</style>
