<template>
  <template v-if="icon">
    <font-awesome-icon v-if="isFaIcon" :class="spinning ? 'fa-spin' : ''" :icon="icon" class="icon"/>
    <i v-else :class="[spinning ? 'fa-spin' : '', icon, 'icon']"></i>
  </template>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import useIcon from '@/components/icon/icon';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: [String, Array] as PropType<Icon>,
    },
    spinning: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: IconProps, {emit}) {
    const {isFaIcon: _isFaIcon} = useIcon();
    const isFaIcon = computed<boolean>(() => {
      const {icon} = props;
      if (!icon) return false;
      return _isFaIcon(icon);
    });

    return {
      isFaIcon,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
