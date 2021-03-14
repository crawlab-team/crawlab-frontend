<template>
  <template v-if="icon">
    <font-awesome-icon v-if="isFaIcon" :class="spinning ? 'fa-spin' : ''" :icon="icon" class="icon"/>
    <i v-else :class="[spinning ? 'fa-spin' : '', icon, 'icon']"></i>
  </template>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';

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
    const isFaIcon = computed<boolean>(() => {
      const {icon} = props;
      if (Array.isArray(icon)) {
        return icon.length > 0 && icon[0].substr(0, 2) === 'fa';
      } else {
        return icon?.substr(0, 2) === 'fa';
      }
    });

    return {
      isFaIcon,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
