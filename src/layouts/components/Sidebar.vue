<template>
  <el-aside class="sidebar" width="240px">
    <div className="logo">
      <img :src="logo" alt="logo" className="logo-img"/>
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
      <el-menu
          :active-text-color="menuActiveText"
          :background-color="menuBg"
          :default-active="activePath"
          :text-color="menuText"
      >
        <el-menu-item
            v-for="(item, $index) in menuItems"
            :key="$index"
            :index="item.path"
            @click="onMenuItemClick(item)"
        >
          <template #title>
            <template v-if="!item.icon">
              <i class="menu-item-icon fa fa-circle-o"></i>
            </template>
            <template v-else-if="Array.isArray(item.icon)">
              <font-awesome-icon :icon="item.icon" class="menu-item-icon"/>
            </template>
            <template v-else>
              <i :class="item.icon" class="menu-item-icon"></i>
            </template>
            <span class="menu-item-title">{{ item.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';
import variables from '../../styles/variables.scss';
import logo from '../../assets/logo.svg';

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const {layout} = store.state as RootStoreState;
    const {menuItems} = layout;

    const onMenuItemClick = (item: MenuItem) => {
      router.push(item.path);
    };

    const activePath = computed<string>(() => {
      const arr = route.path.split('/');
      if (arr.length <= 1) {
        return route.path;
      } else {
        return `/${arr[1]}`;
      }
    });

    return {
      menuItems,
      logo,
      activePath,
      onMenuItemClick,
      ...variables,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.sidebar {
  .logo {
    display: inline-flex;
    align-items: center;
    height: 64px;
    padding-left: 10px;
    padding-right: 20px;
    border-right: none;
    background-color: $menuBg;

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
      color: $menuText;

      .logo-sub-title-block {
        display: flex;
        align-items: center;
        height: 12px;
        line-height: 12px;
      }
    }
  }

  .sidebar-menu {
    width: 240px;
    min-height: calc(100vh - 64px);
    margin: 0;
    padding: 0;

    .el-menu {
      border-right: none;
      min-height: calc(100vh - 64px);

      .el-menu-item {
        &.is-active {
          background-color: $menuHover !important;
        }

        .menu-item-icon {
          width: 20px;
          font-size: 16px;
        }

        .menu-item-title {
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
