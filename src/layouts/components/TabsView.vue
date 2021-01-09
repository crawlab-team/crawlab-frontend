<template>
  <div class="tabs-view">
    <ul class="tabs-list">
      <li v-for="tab in tabs" :key="tab.id" class="tab-item">
        <Tab :tab="tab"/>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, watch} from 'vue';
import {useStore} from 'vuex';
import TabComp from '@/layouts/components/Tab.vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'TabsView',
  components: {
    Tab: TabComp,
  },
  setup() {
    const storeNameSpace = 'layout';
    const store = useStore<RootStoreState>();
    const {layout} = store.state as RootStoreState;
    const route = useRoute();
    const currentPath = computed(() => route.path);

    const tabs = computed<Tab[]>(() => store.getters[`${storeNameSpace}/tabs`]);

    const addTab = (tab: Tab) => {
      store.commit(`${storeNameSpace}/addTab`, tab);
    };

    watch(currentPath, (path) => {
      const {tabs} = layout;
      if (tabs.map(t => t.path).includes(path)) return;
      addTab({path});
    });

    onMounted(() => {
      const {tabs, menuItems} = layout;
      if (tabs.length === 0) {
        for (const item of menuItems) {
          addTab({
            path: item.path,
          });
        }
      }
    });

    return {
      tabs,
      currentPath,
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

  .tabs-list {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;

    .tab-item {
      margin: 0 5px;

      &:first-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
