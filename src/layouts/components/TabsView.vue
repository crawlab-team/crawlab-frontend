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

export default defineComponent({
  name: 'TabsView',
  components: {
    DraggableList,
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

    const onDragDrop = (tabs: Tab[]) => {
      store.commit(`${storeNameSpace}/setTabs`, tabs);
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
