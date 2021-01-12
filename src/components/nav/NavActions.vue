<template>
  <div
      :class="collapsed ? 'collapsed' : ''"
      :style="style"
      class="nav-actions"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'NavActions',
  props: {
    collapsed: Boolean,
    minHeight: String,
  },
  setup(props) {
    const style = computed(() => {
      const {height, minHeight} = props as NavActionsProps;
      const {navActionsDefaultHeight} = variables;
      return {
        'height': height,
        'min-height': minHeight || navActionsDefaultHeight,
      };
    });

    return {
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.nav-actions {
  margin: 0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid $infoBorderColor;

  &.collapsed {
    height: 0;
  }
}
</style>
