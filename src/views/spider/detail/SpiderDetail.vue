<template>
  <div :class="sidebarCollapsed ? 'collapsed' : ''" class="spider-detail">
    <div class="sidebar">
      <NavSidebar
          ref="navSidebar"
          :active-key="activeSpiderId"
          :collapsed="sidebarCollapsed"
          :items="spiderNavItems"
          @select="onNavSidebarSelect"
          @toggle="onNavSidebarToggle"
      />
    </div>
    <div class="content">
      <NavTabs :active-key="activeTabName" :items="tabs" @select="onNavTabsSelect"/>
      <NavActions :collapsed="actionsCollapsed">
        <NavActionItem>
          <el-button icon="fa fa-play" size="small" type="success">Run</el-button>
          <el-button icon="fa fa-edit" size="small" type="warning">Edit</el-button>
          <el-button icon="fa fa-clone" size="small" type="info">Clone</el-button>
          <el-button icon="fa fa-star-o" plain size="small" type="info">Fav</el-button>
        </NavActionItem>
      </NavActions>
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import NavSidebarComp from '@/components/nav/NavSidebar.vue';
import NavTabsComp from '@/components/nav/NavTabs.vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {plainClone} from '@/utils/object';
import variables from '@/styles/variables.scss';
import NavActions from '@/components/nav/NavActions.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';

export default defineComponent({
  name: 'SpiderDetail',
  components: {
    NavActionItem,
    NavActions,
    NavSidebar: NavSidebarComp,
    NavTabs: NavTabsComp,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const storeNamespace = 'spider';
    const store = useStore();
    const {spider} = store.state as RootStoreState;

    const navSidebar = ref<NavSidebar | null>(null);

    const spiderNavItems = computed<NavItem[]>(() => {
      const list = [] as NavItem[];
      for (let i = 0; i < 50; i++) {
        const s: Spider = {
          _id: (i + 1).toString(),
          name: `spider-${i + 1}`,
          display_name: `Spider ${i + 1}`,
        };
        list.push({
          id: s._id,
          title: s.display_name,
          subtitle: s.name,
        });
      }
      return list;
    });

    const activeSpiderId = computed<string>(() => {
      const {id} = route.params;
      const activeItem = spiderNavItems.value.find(d => d.id === id);
      return activeItem?.id || '';
    });

    const activeTabName = computed<SpiderTabName>(() => spider.tabName);

    const sidebarCollapsed = computed<boolean>(() => spider.sidebarCollapsed);

    const actionsCollapsed = computed<boolean>(() => spider.actionsCollapsed);

    const tabs = computed(() => {
      const {infoBorderColor} = variables;
      const tabs = plainClone(spider.tabs) as NavItem[];
      if (!sidebarCollapsed.value) {
        return tabs;
      }
      tabs.splice(0, 0, {
        id: 'toggle',
        icon: ['fa', 'indent'],
        tooltip: 'Expand sidebar',
        emphasis: true,
        style: {
          'border-right': `1px solid ${infoBorderColor}`,
        }
      });
      return tabs;
    });

    const onNavSidebarSelect = (id: string) => {
      router.push(`/spiders/${id}`);
    };

    const onNavSidebarToggle = (value: boolean) => {
      store.commit(`${storeNamespace}/setSidebarCollapsed`, value);
    };

    const onNavTabsSelect = (tabName: string) => {
      if (tabName === 'toggle') {
        store.commit(`${storeNamespace}/setSidebarCollapsed`, false);
        return;
      }
      router.push(`/spiders/${activeSpiderId.value}/${tabName}`);
    };

    onMounted(() => {
      if (!navSidebar.value) return;
      navSidebar.value.scroll(activeSpiderId.value);
    });

    return {
      spiderNavItems,
      activeSpiderId,
      navSidebar,
      tabs,
      activeTabName,
      sidebarCollapsed,
      actionsCollapsed,
      onNavSidebarSelect,
      onNavSidebarToggle,
      onNavTabsSelect,
    };
  },
});
</script>
<style scoped lang="scss">
@import "../../../styles/variables.scss";

.spider-detail {
  display: flex;

  &.collapsed {
    .sidebar {
      flex-basis: 0;
    }

    .content {
      flex-basis: 100%;
    }
  }

  .sidebar {
    flex-basis: calc(#{$navSidebarWidth} + 20px);
    transition: all $navSidebarCollapseTransitionDuration;
  }

  .content {
    margin: 10px;
    flex-basis: calc(100% - #{$navSidebarWidth} - 20px);
    background-color: $containerWhiteBg;
    border: 1px solid $containerBorderColor;
  }
}
</style>
