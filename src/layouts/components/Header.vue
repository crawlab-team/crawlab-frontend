<template>
  <el-header class="header" height="64px">
    <div class="left">
      <font-awesome-icon icon="arrow-to-left"/>
    </div>
    <div class="right">
    </div>
  </el-header>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
  .header {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    border-left: none;
    border-bottom: 1px solid #eaecef;

    .left {
      display: flex;
      align-items: center;
    }
  }
</style>
