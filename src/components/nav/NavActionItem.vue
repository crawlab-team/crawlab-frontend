<template>
  <div class="nav-action-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NavActionItem',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.nav-action-item {
  padding: 10px 0;
  height: auto;
  display: flex;
  align-items: center;

  & + .nav-action-item {
    margin-left: 10px;
  }
}
</style>
