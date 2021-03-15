<template>
  <NavActionGroup>
    <NavActionFaIcon :icon="['fa', 'laptop-code']" tooltip="File Editor Actions"/>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'upload']" tooltip="Upload File" type="primary"/>
      <FaIconButton :icon="['fa', 'cog']" tooltip="File Editor Settings" type="info" @click="onOpenFilesSettings"/>
    </NavActionItem>
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionFaIcon from '@/components/nav/NavActionFaIcon.vue';

export default defineComponent({
  name: 'SpiderDetailActionsFiles',
  components: {
    NavActionFaIcon,
    FaIconButton,
    NavActionGroup,
    NavActionItem,
  },
  setup() {
    // store
    const storeNamespace = 'file';
    const store = useStore();

    const onOpenFilesSettings = () => {
      store.commit(`${storeNamespace}/setEditorSettingsDialogVisible`, true);
    };

    return {
      onOpenFilesSettings,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
