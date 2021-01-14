<template>
  <div
      ref="navActions"
      :class="collapsed ? 'collapsed' : ''"
      :style="style"
      class="nav-actions"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue';

export default defineComponent({
  name: 'NavActions',
  props: {
    collapsed: Boolean,
    minHeight: String,
  },
  setup(props) {
    const originalHeight = ref<string | null>(null);
    const height = ref<string | null>(null);

    const navActions = ref<HTMLDivElement | null>(null);

    const collapsed = computed<boolean>(() => {
      const {collapsed} = props as NavActionsProps;
      return collapsed || false;
    });

    const style = computed(() => {
      return {
        height: height.value,
      };
    });

    const updateHeight = () => {
      if (!collapsed.value) {
        if (originalHeight.value === null) {
          if (!navActions.value) return;
          originalHeight.value = `calc(${window.getComputedStyle(navActions.value).height} - 1px)`;
        }
        height.value = originalHeight.value;
      } else {
        height.value = '0';
      }
    };

    watch(collapsed, () => updateHeight());

    onMounted(() => updateHeight());

    return {
      navActions,
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.nav-actions {
  margin: 0;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  border-bottom: 1px solid $infoBorderColor;
  transition: all $navActionsCollapseTransitionDuration;
  overflow-y: hidden;
  box-sizing: border-box;

  &.collapsed {
    border-bottom: none;
  }
}
</style>
