<template>
  <Button
      :circle="circle"
      :disabled="disabled"
      :plain="plain"
      :round="round"
      :size="size"
      :tooltip="tooltip"
      :type="type"
      is-icon
      class="fa-icon-button"
      @click="() => $emit('click')"
  >
    <font-awesome-icon :icon="icon"/>
  </Button>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {buttonProps} from './Button.vue';
import Button from '@/components/button/Button.vue';

export const faIconButtonProps = {
  icon: {
    type: [Array, String] as PropType<Icon>,
    required: true,
  },
  ...buttonProps,
};

export default defineComponent({
  name: 'FaIconButton',
  components: {Button},
  props: faIconButtonProps,
  emits: [
    'click',
  ],
  setup(props: FaIconButtonProps) {
    return {};
  },
});
</script>

<style scoped>
.el-button,
.el-button--mini,
.fa-icon-button,
.fa-icon-button >>> .el-button,
.fa-icon-button >>> .el-button--mini,
.fa-icon-button >>> .button {
  padding: 7px;
}
</style>
