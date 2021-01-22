<template>
  <ul class="context-menu-list">
    <li
        v-for="(item, $index) in items"
        :key="$index"
        class="context-menu-item"
    >
      <span class="prefix">
        <font-awesome-icon v-if="item.icon" :icon="item.icon"/>
      </span>
      <span class="title">
        {{ item.title }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ContextMenuList',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.context-menu-list {
  list-style: none;
  margin: 0;
  padding: 0;

  .context-menu-item {
    height: $contextMenuItemHeight;
    max-width: $contextMenuItemMaxWidth;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: $primaryPlainColor;
    }

    .prefix {
      width: 24px;
    }
  }
}
</style>
