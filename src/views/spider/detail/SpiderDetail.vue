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
      <NavTabs :active-key="activeTabName" :items="tabs" class="nav-tabs" @select="onNavTabsSelect">
        <template v-slot:extra>
          <el-tooltip
              v-model="showActionsToggleTooltip"
              :content="actionsCollapsed ? 'Expand actions bar' : 'Collapse actions bar'"
          >
            <div :class="actionsCollapsed ? 'collapsed' : ''" class="actions-toggle" @click="onActionsToggle">
              <font-awesome-icon :icon="['fa', 'angle-up']" class="icon"/>
            </div>
          </el-tooltip>
        </template>
      </NavTabs>
      <NavActions ref="navActions" :collapsed="actionsCollapsed" class="nav-actions">
        <SpiderDetailActionsCommon/>
        <SpiderDetailActionsOverview v-if="activeTabName === 'overview'"/>
        <SpiderDetailActionsFiles v-if="activeTabName === 'files'"/>
      </NavActions>
      <div :style="contentContainerStyle" class="content-container">
        <router-view/>
      </div>
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
import NavActionsComp from '@/components/nav/NavActions.vue';
import SpiderDetailActionsFiles from '@/views/spider/detail/actions/SpiderDetailActionsFiles.vue';
import SpiderDetailActionsCommon from '@/views/spider/detail/actions/SpiderDetailActionsCommon.vue';
import SpiderDetailActionsOverview from '@/views/spider/detail/actions/SpiderDetailActionsOverview.vue';

export default defineComponent({
  name: 'SpiderDetail',
  components: {
    SpiderDetailActionsOverview,
    SpiderDetailActionsCommon,
    SpiderDetailActionsFiles,
    NavActions: NavActionsComp,
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

    const navActions = ref<NavActions | null>(null);

    const showActionsToggleTooltip = ref<boolean>(false);

    const spiderNavItems = computed<NavItem[]>(() => {
      // TODO: implement with real data
      const list = [] as NavItem[];
      for (let i = 0; i < 50; i++) {
        const s: Spider = {
          _id: (i + 1).toString(),
          name: `spider-${i + 1}`,
          display_name: `Spider ${i + 1}`,
        };
        list.push({
          id: s._id || '',
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

    const activeTabName = computed<SpiderTabName>(() => store.getters[`${storeNamespace}/tabName`]);

    const sidebarCollapsed = computed<boolean>(() => spider.sidebarCollapsed);

    const actionsCollapsed = computed<boolean>(() => spider.actionsCollapsed);

    const tabs = computed(() => {
      const {infoBorderColor} = variables;
      const tabs = plainClone(spider.tabs) as NavItem[];
      if (sidebarCollapsed.value) {
        tabs.splice(0, 0, {
          id: 'toggle',
          icon: ['fa', 'indent'],
          tooltip: 'Expand sidebar',
          emphasis: true,
          style: {
            'border-right': `1px solid ${infoBorderColor}`,
          }
        });
      }
      return tabs;
    });

    const contentContainerStyle = computed(() => {
      return {
        height: `calc(100% - ${variables.navTabsHeight} - 1px${navActions.value ? ' - ' + navActions.value.getHeight() : ''})`,
      };
    });

    const onNavSidebarSelect = (id: string) => {
      router.push(`/spiders/${id}`);
    };

    const onNavSidebarToggle = (value: boolean) => {
      store.commit(`${storeNamespace}/setSidebarCollapsed`, value);
    };

    const onActionsToggle = () => {
      showActionsToggleTooltip.value = false;
      store.commit(`${storeNamespace}/setActionsCollapsed`, !actionsCollapsed.value);
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
      variables,
      spiderNavItems,
      activeSpiderId,
      navSidebar,
      navActions,
      showActionsToggleTooltip,
      tabs,
      activeTabName,
      sidebarCollapsed,
      actionsCollapsed,
      contentContainerStyle,
      onNavSidebarSelect,
      onNavSidebarToggle,
      onActionsToggle,
      onNavTabsSelect,
    };
  },
});
</script>
<style scoped lang="scss">
@import "../../../styles/variables.scss";

.spider-detail {
  display: flex;
  height: 100%;

  &.collapsed {
    .sidebar {
      flex-basis: 0;
      width: 0;
    }

    .content {
      flex: 1;
      max-width: 100%;
    }
  }

  .sidebar {
    flex-basis: $navSidebarWidth;
    transition: all $navSidebarCollapseTransitionDuration;
  }

  .content {
    //margin: 10px;
    flex: 1;
    background-color: $containerWhiteBg;
    display: flex;
    flex-direction: column;
    max-width: calc(100% - #{$navSidebarWidth});

    .nav-tabs {
      height: calc(#{$navTabsHeight} + 1px);
    }

    .nav-actions {
      height: fit-content;
    }

    .content-container {
      flex: 1;
    }
  }

  .actions-toggle {
    height: $navTabsHeight;
    color: $infoColor;
    cursor: pointer;
    padding: 0 20px;
    border-left: 1px solid $containerBorderColor;

    .icon {
      transition: all $defaultTransitionDuration;
    }

    &.collapsed {
      .icon {
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>
