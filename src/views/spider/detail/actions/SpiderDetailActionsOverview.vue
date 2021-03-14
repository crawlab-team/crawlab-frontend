<template>
  <NavActionGroup>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'save']" tooltip="Save" type="success"/>
    </NavActionItem>
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';

export default defineComponent({
  name: 'SpiderDetailActionsOverview',
  components: {
    FaIconButton,
    NavActionGroup,
    NavActionItem,
  },
  setup(props, {emit}) {
    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
