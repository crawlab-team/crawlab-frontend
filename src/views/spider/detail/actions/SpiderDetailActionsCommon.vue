<template>
  <NavActionGroup>
    <NavActionFaIcon :icon="['fa', 'tools']" tooltip="Spider Actions"/>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'save']" tooltip="Save" type="primary"/>
    </NavActionItem>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'play']" tooltip="Run" type="success"/>
    </NavActionItem>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'clone']" tooltip="Clone" type="info"/>
    </NavActionItem>
    <NavActionItem>
      <FaIconButton :icon="['far', 'star']" plain tooltip="Favorite" type="warning"/>
    </NavActionItem>
  </NavActionGroup>
  <NavActionGroup>
    <NavActionFaIcon :icon="['fab', 'git-alt']" tooltip="Git"/>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'upload']" tooltip="Upload File" type="primary"/>
    </NavActionItem>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'paper-plane']" tooltip="Commit" type="success"/>
    </NavActionItem>
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import NavActionFaIcon from '@/components/nav/NavActionFaIcon.vue';

export default defineComponent({
  name: 'SpiderDetailActionsCommon',
  components: {
    NavActionFaIcon,
    FaIconButton,
    NavActionGroup,
    NavActionItem,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
