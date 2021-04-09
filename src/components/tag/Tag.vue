<template>
  <el-tooltip :content="tooltip" :disabled="!tooltip">
    <el-tag
        :closable="closable"
        :class="cls"
        :size="size"
        :style="style"
        :type="type"
        :color="color"
        :effect="effect"
        class="tag"
        @click="onClick($event)"
        @close="onClose($event)"
        @mouseenter="$emit('mouseenter')"
        @mouseleave="$emit('mouseleave')"
    >
      <Icon :icon="icon" :spinning="spinning"/>
      <span>{{ label }}</span>
    </el-tag>
  </el-tooltip>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import Icon from '@/components/icon/Icon.vue';

export const tagProps = {
  label: {
    type: String,
  },
  tooltip: {
    type: String,
  },
  type: {
    type: String as PropType<BasicType>,
    default: 'primary',
  },
  color: {
    type: String as PropType<string>,
  },
  icon: {
    type: [String, Array] as PropType<string | string[]>,
  },
  size: {
    type: String,
    default: 'mini',
  },
  spinning: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
  },
  effect: {
    type: String as PropType<BasicEffect>,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'Tag',
  components: {Icon},
  props: tagProps,
  emits: [
    'click',
    'close',
    'mouseenter',
    'mouseleave',
  ],
  setup(props: TagProps, {emit}) {
    const style = computed<Partial<CSSStyleDeclaration>>(() => {
      const {width} = props;
      return {
        width,
      };
    });

    const onClick = (ev?: Event) => {
      ev?.stopPropagation();
      const {clickable} = props;
      if (clickable) {
        emit('click');
      }
    };

    const onClose = (ev?: Event) => {
      ev?.stopPropagation();
      const {closable} = props;
      if (closable) {
        emit('close');
      }
    };

    const cls = computed<string[]>(() => {
      const {clickable, disabled} = props;
      const cls = [] as string[];
      if (clickable) cls.push('clickable');
      if (disabled) cls.push('disabled');
      return cls;
    });

    return {
      style,
      onClick,
      onClose,
      cls,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.tag {
  cursor: default;

  &.disabled {
    cursor: not-allowed;
    background-color: $disabledBgColor;
    border-color: $disabledBorderColor;
    color: $disabledColor;
  }

  &.clickable {
    &:not(.disabled) {
      cursor: pointer;
    }
  }

  .icon {
    margin-right: 5px;
  }
}
</style>
