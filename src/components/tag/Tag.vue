<template>
  <el-tooltip :content="tooltip" :disabled="!tooltip">
    <el-tag
        :class="cls"
        :size="size"
        :style="style"
        :type="type"
        :effect="effect"
        class="tag"
        @click="onClick"
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
  clickable: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String as PropType<BasicEffect>,
  }
};

export default defineComponent({
  name: 'Tag',
  components: {Icon},
  props: tagProps,
  emits: [
    'click',
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

    const onClick = () => {
      const {clickable} = props;
      if (clickable) {
        emit('click');
      }
    };

    const cls = computed<string[]>(() => {
      const {clickable} = props;
      const cls = [] as string[];
      if (clickable) cls.push('clickable');
      return cls;
    });

    return {
      style,
      onClick,
      cls,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag {
  cursor: default;

  &.clickable {
    cursor: pointer;
  }

  .icon {
    margin-right: 5px;
  }
}
</style>
