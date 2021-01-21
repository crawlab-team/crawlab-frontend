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
      <NavTabs :active-key="activeTabName" :items="tabs" @select="onNavTabsSelect">
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
      <NavActions :collapsed="actionsCollapsed">
        <NavActionGroup>
          <NavActionItem>
            <el-tooltip content="Spider Actions">
              <font-awesome-icon :icon="['fa', 'spider']" class="title"/>
            </el-tooltip>
          </NavActionItem>
          <NavActionItem>
            <el-tooltip content="Run">
              <el-button icon="fa fa-play" size="small" type="success"/>
            </el-tooltip>
          </NavActionItem>
          <NavActionItem>
            <el-tooltip content="Clone">
              <el-button icon="fa fa-clone" size="small" type="info"/>
            </el-tooltip>
          </NavActionItem>
          <NavActionItem>
            <el-tooltip content="Favourite">
              <el-button icon="fa fa-star-o" plain size="small" type="info"/>
            </el-tooltip>
          </NavActionItem>
        </NavActionGroup>
        <NavActionGroup v-if="activeTabName === 'files'">
          <NavActionItem>
            <el-tooltip content="File Editor Actions">
              <font-awesome-icon :icon="['fa', 'laptop-code']" class="title"/>
            </el-tooltip>
          </NavActionItem>
          <NavActionItem @click="onOpenFilesSettings">
            <el-tooltip content="File Editor Settings">
              <el-button size="small" type="primary">
                <font-awesome-icon :icon="['fa', 'cog']" class="icon"/>
              </el-button>
            </el-tooltip>
          </NavActionItem>
        </NavActionGroup>
        <NavActionGroup v-if="activeTabName === 'files'">
          <NavActionItem>
            <el-tooltip content="Git">
              <font-awesome-icon :icon="['fab', 'git-alt']" class="title"/>
            </el-tooltip>
          </NavActionItem>
          <NavActionItem @click="() => {}">
            <el-tooltip content="Update Project">
              <el-button size="small" type="success">
                <font-awesome-icon :icon="['fa', 'code-branch']" class="icon"/>
              </el-button>
            </el-tooltip>
          </NavActionItem>
          <NavActionItem @click="() => {}">
            <el-tooltip content="Commit">
              <el-button size="small" type="warning">
                <font-awesome-icon :icon="['fa', 'paper-plane']" class="icon"/>
              </el-button>
            </el-tooltip>
          </NavActionItem>
        </NavActionGroup>
      </NavActions>
      <div class="content-container">
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
import NavActions from '@/components/nav/NavActions.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';

export default defineComponent({
  name: 'SpiderDetail',
  components: {
    NavActionGroup,
    NavActionItem,
    NavActions,
    NavSidebar: NavSidebarComp,
    NavTabs: NavTabsComp,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const storeNamespace = 'spider';
    const storeNamespaceFile = 'file';
    const store = useStore();
    const {spider} = store.state as RootStoreState;

    const navSidebar = ref<NavSidebar | null>(null);

    const showActionsToggleTooltip = ref<boolean>(false);

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

    const onOpenFilesSettings = () => {
      store.commit(`${storeNamespaceFile}/setEditorSettingsDialogVisible`, true);
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
      showActionsToggleTooltip,
      tabs,
      activeTabName,
      sidebarCollapsed,
      actionsCollapsed,
      onNavSidebarSelect,
      onNavSidebarToggle,
      onActionsToggle,
      onNavTabsSelect,
      onOpenFilesSettings,
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
    margin: 10px;
    flex: 1;
    background-color: $containerWhiteBg;
    border: 1px solid $containerBorderColor;
    display: flex;
    flex-direction: column;
    max-width: calc(100% - #{$navSidebarWidth} - 20px - 20px);

    .content-container {
      height: 100%;
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
