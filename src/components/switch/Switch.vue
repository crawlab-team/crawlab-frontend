<template>
  <el-switch
      :active-color="variables.successColor"
      :inactive-color="variables.infoMediumColor"
      :value="value"
      width="40"
      @change="onChange"
  />
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'Switch',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function as PropType<SwitchChangeFunc>,
      default: () => {
        return;
      }
    }
  },
  setup(props: SwitchProps, {emit}) {
    return {
      variables,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
