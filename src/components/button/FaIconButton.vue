<template>
  <Button
      :circle="circle"
      :disabled="disabled"
      :plain="plain"
      :round="round"
      :size="size"
      :tooltip="tooltip"
      :type="type"
      class="fa-icon-button"
      style="padding: 7px"
      @click="() => $emit('click')"
  >
    <font-awesome-icon :icon="icon"/>
  </Button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {buttonProps} from './Button.vue';
import Button from '@/components/button/Button.vue';

export const faIconButtonProps = {
  icon: {
    type: [Array, String],
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
  setup(props) {
    return {};
  },
});
</script>

<style scoped>
</style>
