<template>
  <NavActionGroup>
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';

export default defineComponent({
  name: 'SpiderDetailActionsOverview',
  components: {
    NavActionGroup,
  },
  setup(props, {emit}) {
    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
