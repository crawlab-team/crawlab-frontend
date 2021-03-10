<template>
  <el-tooltip :content="tooltip" :disabled="!tooltip">
    <span class="button-wrapper">
      <el-button
          :circle="circle"
          :class="isIcon ? 'icon-button' : ''"
          :disabled="disabled"
          :plain="plain"
          :round="round"
          :size="size"
          :title="tooltip"
          :type="type"
          class="button"
          @click="() => $emit('click')"
      >
        <slot></slot>
      </el-button>
    </span>
  </el-tooltip>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export const buttonProps = {
  tooltip: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'primary',
  },
  size: {
    type: String,
    required: false,
    default: 'mini',
  },
  round: {
    type: Boolean,
    required: false,
    default: false,
  },
  circle: {
    type: Boolean,
    required: false,
    default: false,
  },
  plain: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  isIcon: {
    type: Boolean,
    required: false,
    default: false,
  }
};

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  emits: [
    'click',
  ],
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.button-wrapper {
  margin-right: 10px;
}
</style>

<style scoped>
.button-wrapper >>> .icon-button {
  padding: 7px;
}
</style>
