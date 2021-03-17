<template>
  <div
      :class="classes"
      :draggable="true"
      class="tab"
      @click="onClick"
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
import {useRouter} from 'vue-router';

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
    const router = useRouter();
    const storeNamespace = 'layout';
    const store = useStore();
    const {layout: state} = store.state as RootStoreState;

    const item = computed(() => {
      const {tab} = props as TabProps;
      if (!tab) return;
      const {menuItems} = state;
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
      const {activeTabId} = state;
      return tab.id === activeTabId;
    });

    const dragging = computed(() => {
      const {tab} = props as TabProps;
      return !!tab.dragging;
    });

    const isTabsDragging = computed<boolean>(() => state.isTabsDragging);

    const classes = computed(() => {
      const cls = [];
      if (active.value) cls.push('active');
      if (dragging.value) cls.push('dragging');
      if (isTabsDragging.value) cls.push('is-tabs-dragging');
      return cls;
    });

    const onClick = () => {
      const {tab} = props as TabProps;
      store.commit(`${storeNamespace}/setActiveTabId`, tab.id);
      router.push(tab.path);
    };

    const onClose = () => {
      const {tab} = props as TabProps;
      const {tabs} = state;
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

    return {
      item,
      title,
      active,
      dragging,
      isTabsDragging,
      classes,
      onClick,
      onClose,
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
  color: $tabsViewTabColor;

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
