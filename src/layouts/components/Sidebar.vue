<template>
  <el-aside class="sidebar" width="240px">
    <div className="logo">
      <img :src="logo" className="logo-img"/>
      <span className="logo-title">Crawlab</span>
      <span className="logo-sub-title">
        <div className="logo-sub-title-block">
          Community
        </div>
        <div className="logo-sub-title-block">
          v0.6.0
        </div>
      </span>
    </div>
    <div class="sidebar-menu">
    </div>
  </el-aside>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import logo from '../../assets/logo.svg';

export default defineComponent({
  name: 'Sidebar',
  setup() {
    return {
      logo,
    };
  },
});
</script>

<style lang="scss" scoped>
  .sidebar {
    .logo {
      display: inline-flex;
      align-items: center;
      height: 64px;
      padding-left: 10px;
      padding-right: 20px;
      border-bottom: 1px solid #eaecef;
      border-right: 1px solid white;

      .logo-img {
        height: 40px;
        width: 40px;
      }

      .logo-title {
        font-family: BlinkMacSystemFont, -apple-system, segoe ui, roboto, oxygen, ubuntu, cantarell, fira sans, droid sans, helvetica neue, helvetica, arial, sans-serif;
        font-size: 28px;
        font-weight: 600;
        margin-left: 10px;
        color: #409eff;
      }

      .logo-sub-title {
        font-family: BlinkMacSystemFont, -apple-system, segoe ui, roboto, oxygen, ubuntu, cantarell, fira sans, droid sans, helvetica neue, helvetica, arial, sans-serif;
        font-size: 10px;
        height: 24px;
        line-height: 24px;
        margin-left: 10px;
        font-weight: 500;
        color: #aaa;

        .logo-sub-title-block {
          display: flex;
          align-items: center;
          /*justify-content: center;*/
          height: 12px;
          line-height: 12px;
        }
      }
    }

    .sidebar-menu {
      min-height: calc(100vh - 64px);
      border-right: 1px solid #eaecef;
    }
  }
</style>
