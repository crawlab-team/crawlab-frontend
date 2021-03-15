<template>
  <Tag
      :effect="computedEffect"
      :icon="computedIcon"
      :label="label"
      :spinning="spinning"
      :tooltip="tooltip"
      :type="computedType"
      :width="width"
      clickable
      @click="onClick"
  />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Tag, {tagProps} from '@/components/tag/Tag.vue';

const checkTagProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  ...tagProps,
};

export default defineComponent({
  name: 'CheckTag',
  components: {
    Tag,
  },
  props: checkTagProps,
  emits: [
    'update:model-value',
  ],
  setup(props: CheckTagProps, {emit}) {
    const computedType = computed<BasicType | undefined>(() => {
      const {modelValue, type} = props;
      return modelValue ? 'primary' : type;
    });

    const computedIcon = computed<Icon>(() => {
      const {modelValue} = props;
      return modelValue ? ['far', 'check-square'] : ['far', 'square'];
    });

    const computedEffect = computed<BasicEffect>(() => {
      const {modelValue} = props;
      return modelValue ? 'dark' : 'plain';
    });

    const onClick = () => {
      const {modelValue} = props;
      emit('update:model-value', !modelValue);
    };

    return {
      computedType,
      computedIcon,
      computedEffect,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
