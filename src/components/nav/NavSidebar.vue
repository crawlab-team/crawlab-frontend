<template>
  <div class="nav-sidebar" :class="classes">
    <div class="search">
      <el-input
          v-model="searchString"
          class="search-input"
          :prefix-icon="collapsed ? '' : 'fa fa-search'"
          placeholder="Search..."
          :clearable="true"
      />
      <div class="search-suffix" @click.stop="onToggle">
        <el-tooltip
            v-model="toggleTooltipValue"
            :content="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <font-awesome-icon v-if="collapsed" class="icon" :icon="['fa', 'list']"/>
          <font-awesome-icon v-else class="icon" :icon="['fa', 'outdent']"/>
        </el-tooltip>
      </div>
    </div>
    <el-menu
        ref="navMenu"
        v-if="filteredItems && filteredItems.length > 0"
        class="nav-menu"
        :default-active="activeKey"
        @select="onSelect"
    >
      <el-menu-item v-for="item in filteredItems" :key="item.id" :index="item.id" class="nav-menu-item">
        <span class="title">{{ item.title }}</span>
        <span class="actions">
          <font-awesome-icon class="icon" :icon="['far', 'star']" @click="onStar(item.id)"/>
          <font-awesome-icon class="icon" :icon="['far', 'clone']" @click="onDuplicate(item.id)"/>
          <font-awesome-icon class="icon" :icon="['fa', 'trash-alt']" @click="onRemove(item.id)"/>
        </span>
      </el-menu-item>
    </el-menu>
    <div v-else class="nav-menu empty">
      No Items
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {ElMenu} from 'element-plus';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'NavSidebar',
  props: {
    items: Array,
    activeKey: String,
    showActions: Boolean,
  },
  setup(props, {emit}) {
    const collapsed = ref(false);
    const toggling = ref(false);
    const searchString = ref('');
    const navMenu = ref<typeof ElMenu | null>(null);
    const toggleTooltipValue = ref(false);

    const filteredItems = computed<NavItem[]>(() => {
      const items = props.items as NavItem[];
      if (!searchString.value) return items;
      return items.filter(d => d.title.toLocaleLowerCase().includes(searchString.value.toLocaleLowerCase()));
    });

    const classes = computed(() => {
      const cls = [];
      if (collapsed.value) cls.push('collapsed');
      // if (toggling.value) cls.push('toggling');
      return cls;
    });

    const onSelect = (index: string) => {
      emit('select', index);
    };

    const onStar = (index: string) => {
      emit('star', index);
    };

    const onDuplicate = (index: string) => {
      emit('duplicate', index);
    };

    const onRemove = (index: string) => {
      emit('remove', index);
    };

    const onToggle = () => {
      collapsed.value = !collapsed.value;
      toggleTooltipValue.value = false;
    };

    const scroll = (id: string) => {
      const idx = filteredItems.value.findIndex(d => d.id === id);
      if (idx === -1) return;
      const {navSidebarItemHeight} = variables;
      const navSidebarItemHeightNumber = Number(navSidebarItemHeight.replace('px', ''));
      if (!navMenu.value) return;
      const $el = navMenu.value.$el as HTMLDivElement;
      $el.scrollTo({
        top: navSidebarItemHeightNumber * idx,
      });
    };

    return {
      collapsed,
      toggling,
      searchString,
      navMenu,
      toggleTooltipValue,
      filteredItems,
      classes,
      onSelect,
      onStar,
      onDuplicate,
      onRemove,
      onToggle,
      scroll,
    };
  },
});
</script>
<style scoped lang="scss">
@import "../../styles/variables.scss";

.nav-sidebar {
  margin: 10px;
  width: $navSidebarWidth;
  border: 1px solid $navSidebarBorderColor;
  background-color: $navSidebarBg;
  height: calc(100vh - #{$headerHeight} - #{$tabsViewHeight} - 20px);
  transition: width $navSidebarCollapseTransitionDuration;

  &.collapsed {
    width: 0;
    border: none;

    .search {
      position: relative;

      .search-suffix {
        top: 0;
        left: 10px;
      }
    }
  }

  .search {
    position: relative;
    height: $navSidebarSearchHeight;
    box-sizing: content-box;
    border-bottom: 1px solid $navSidebarBorderColor;

    .search-input {
      width: calc(100% - 25px);
      border: none;
      padding: 0;
      margin: 0;
    }

    .search-suffix {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-flex;
      align-items: center;
      height: 40px;
      width: 25px;
      color: $navSidebarItemActionColor;
      cursor: pointer;
      //transition: right $navSidebarCollapseTransitionDuration;
    }
  }

  .nav-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    border: none;
    max-height: calc(100% - #{$navSidebarSearchHeight});
    overflow-y: auto;
    color: $navSidebarColor;

    &.empty {
      height: $navSidebarItemHeight;
      display: flex;
      align-items: center;
      padding-left: 20px;
      font-size: 14px;
    }

    .nav-menu-item {
      position: relative;
      height: $navSidebarItemHeight;
      line-height: $navSidebarItemHeight;

      &:hover {
        .actions {
          display: inherit;
        }
      }

      .title {
        font-size: 14px;
        margin-bottom: 3px;
      }

      .subtitle {
        font-size: 12px;
      }

      .actions {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;

        .icon {
          color: $navSidebarItemActionColor;
          margin-left: 3px;

          &:hover {
            color: $primaryColor;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.nav-sidebar > .search >>> .el-input__inner {
  border: none;
}

.nav-sidebar.collapsed > .search >>> .el-input__inner {
  padding: 0;
  width: 0;
}
</style>