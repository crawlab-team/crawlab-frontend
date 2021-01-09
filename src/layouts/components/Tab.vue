<template>
  <div
      :class="classes"
      :draggable="true"
      class="tab"
      @click="onClick"
      @dragend="onTabDragEnd"
      @dragenter="onTabDragEnter"
      @dragleave="onTabDragLeave"
      @dragstart="onTabDragStart"
  >
    <span class="icon">
      <MenuItemIcon :item="item" size="10px"/>
    </span>
    <span class="title">
      {{ title }}
    </span>
    <span class="close-btn" @click.stop="onClose">
      <i class="el-icon-close"></i>
    </span>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import MenuItemIcon from '@/layouts/components/MenuItemIcon.vue';
import {useStore} from 'vuex';
import {getPrimaryPath} from '@/utils/path';
import {useI18n} from 'vue-i18n';
import {useRoute, useRouter} from 'vue-router';
import {plainClone} from '@/utils/object';

interface TabProps {
  tab: Tab;
}

export default defineComponent({
  name: 'Tab',
  components: {
    MenuItemIcon,
  },
  props: {
    tab: Object,
  },
  setup(props) {
    const {tm} = useI18n();
    const route = useRoute();
    const router = useRouter();
    const storeNamespace = 'layout';
    const store = useStore();
    const {layout} = store.state as RootStoreState;

    const item = computed(() => {
      const {tab} = props as TabProps;
      if (!tab) return;
      const {menuItems} = layout;
      for (const _item of menuItems) {
        const primaryPath = getPrimaryPath(tab.path);
        if (primaryPath === _item.path) {
          return _item;
        }
      }
      return null;
    });

    const title = computed(() => {
      // TODO: detailed title
      return item.value?.title || tm('No Title');
    });

    const active = computed(() => {
      const {tab} = props as TabProps;
      return route.path === tab.path;
    });

    const dragging = computed(() => {
      const {tab} = props as TabProps;
      return !!tab.dragging;
    });

    const isTabsDragging = computed<boolean>(() => layout.isTabsDragging);

    const classes = computed(() => {
      const cls = [];
      if (active.value) cls.push('active');
      if (dragging.value) cls.push('dragging');
      if (isTabsDragging.value) cls.push('is-tabs-dragging');
      return cls;
    });

    const onClick = () => {
      const {tab} = props as TabProps;
      router.push(tab.path);
    };

    const onClose = () => {
      const {tab} = props as TabProps;
      const {tabs} = layout;
      const idx = tabs.map(t => t.id).indexOf(tab.id);
      store.commit(`${storeNamespace}/removeTab`, tab);
      if (active.value) {
        if (tabs.length === 0) {
          const newTab: Tab = {path: '/'};
          store.commit(`${storeNamespace}/addTab`, newTab);
          router.push(newTab.path);
        } else if (idx === 0) {
          router.push(tabs[0].path);
        } else {
          router.push(tabs[idx - 1].path);
        }
      }
    };

    const onTabDragStart = () => {
      const {tab} = props as TabProps;
      const draggingTab = plainClone(tab) as Tab;
      draggingTab.dragging = true;
      // console.log('start', tab.id);
      store.commit(`${storeNamespace}/setIsTabsDragging`, true);
      store.commit(`${storeNamespace}/setDraggingTab`, draggingTab);
    };

    const onTabDragEnd = () => {
      // const {tab} = props as TabProps;
      const tabs = store.getters[`${storeNamespace}/tabs`] as Tab[];
      store.commit(`${storeNamespace}/setIsTabsDragging`, false);
      store.commit(`${storeNamespace}/resetDraggingTab`);
      store.commit(`${storeNamespace}/resetTargetTab`);
      store.commit(`${storeNamespace}/setTabs`, tabs.map(t => {
        t.dragging = false;
        return t;
      }));
    };

    const onTabDragEnter = () => {
      const {tab} = props as TabProps;
      const {draggingTab} = layout;
      if (!draggingTab || draggingTab.id === tab.id) return;
      const targetTab = plainClone(tab) as Tab;
      targetTab.dragging = true;
      store.commit(`${storeNamespace}/setTargetTab`, targetTab);
    };

    const onTabDragLeave = () => {
      const {tab} = props as TabProps;
      const {draggingTab, targetTab} = layout;
      if (!!targetTab || !draggingTab || draggingTab.id === tab.id) return;
      store.commit(`${storeNamespace}/resetTargetTab`);
    };

    return {
      item,
      title,
      active,
      dragging,
      isTabsDragging,
      classes,
      onClick,
      onClose,
      onTabDragStart,
      onTabDragEnd,
      onTabDragEnter,
      onTabDragLeave,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.tab {
  display: flex;
  align-items: center;
  padding: 3px 5px;
  max-width: $tabsViewTabMaxWidth;
  border: 1px solid $tabsViewTabBorderColor;
  cursor: pointer;
  background-color: $tabsViewTabBg;
  user-select: none;

  &:focus {
    color: inherit;
  }

  &:hover {
    &.dragging {
      .title,
      .icon {
        color: inherit;
      }
    }

    .title,
    .icon {
      color: $tabsViewActiveTabColor;
    }
  }

  &.active {
    color: $tabsViewActiveTabColor;
    border-color: $tabsViewActiveTabColor;
    background-color: $tabsViewActiveTabPlainColor;
  }

  &.dragging {
    border-style: dashed;
    opacity: 0.5;
  }

  &.is-tabs-dragging * {
    pointer-events: none;
  }

  .close-btn,
  .icon {
    font-weight: 100;
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  .title {
    display: flex;
    align-items: center;
    margin: 0 3px;
    font-size: 12px;
    height: $tabsViewTabHeight;
  }
}
</style>
