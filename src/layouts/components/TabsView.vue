<template>
  <div class="tabs-view">
    <DraggableList
        :items="tabs"
        item-key="id"
        @d-end="onDragDrop"
    >
      <template v-slot="{item}">
        <Tab :tab="item"/>
      </template>
    </DraggableList>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, watch} from 'vue';
import {useStore} from 'vuex';
import TabComp from '@/layouts/components/Tab.vue';
import {useRoute} from 'vue-router';
import DraggableList from '@/components/drag/DraggableList.vue';
import {plainClone} from '@/utils/object';

export default defineComponent({
  name: 'TabsView',
  components: {
    DraggableList,
    Tab: TabComp,
  },
  setup() {
    // store
    const storeNameSpace = 'layout';
    const store = useStore<RootStoreState>();

    // route
    const route = useRoute();

    // current path
    const currentPath = computed(() => route.path);

    // tabs
    const tabs = computed<Tab[]>(() => store.getters[`${storeNameSpace}/tabs`]);

    const addTab = (tab: Tab) => {
      store.commit(`${storeNameSpace}/addTab`, tab);
    };

    const setActiveTab = (tab: Tab) => {
      store.commit(`${storeNameSpace}/setActiveTabId`, tab.id);
    };

    const onDragDrop = (tabs: Tab[]) => {
      store.commit(`${storeNameSpace}/setTabs`, tabs);
    };

    watch(currentPath, (path) => {
      console.log(path);
      // active tab
      const activeTab = store.getters[`${storeNameSpace}/activeTab`] as Tab | undefined;
      console.log(activeTab);

      // skip if active tab is undefined
      if (!activeTab) return;

      // set path to active tab
      activeTab.path = path;

      // update path of active tab
      store.commit(`${storeNameSpace}/updateTab`, plainClone(activeTab));
    });

    onMounted(() => {
      // add current page to tabs if no tab exists
      if (tabs.value.length === 0) {
        // add tab
        addTab({path: currentPath.value});

        // new tab
        const newTab = tabs.value[0];
        if (!newTab) return;

        // set active tab id
        setActiveTab(newTab);
      }
    });

    return {
      tabs,
      currentPath,
      onDragDrop,
    };
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.tabs-view {
  padding: 10px 0;
  border-bottom: 1px solid $tabsViewBorderColor;
  background-color: $tabsViewBg;
}
</style>
<style scoped>
.tabs-view >>> .draggable-item {
  margin: 0 5px;
}

.tabs-view >>> .draggable-item:first-child {
  margin-left: 10px;
}
</style>
