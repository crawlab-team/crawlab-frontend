<template>
  <el-form
      :inline="inline"
      :label-width="labelWidth"
      :size="size"
      :model="model"
      class="form"
  >
    <slot></slot>
  </el-form>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, provide, reactive} from 'vue';

export default defineComponent({
  name: 'Form',
  props: {
    model: {
      type: Object as PropType<FormModel>,
      default: () => {
        return {};
      }
    },
    inline: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: '150px',
    },
    size: {
      type: String,
      default: 'mini',
    },
    grid: {
      type: Number,
      default: 4,
    },
  },
  setup(props: FormProps, {emit}) {
    const form = computed<FormContext>(() => {
      const {labelWidth, size, grid} = props;
      return {labelWidth, size, grid};
    });

    provide('form', reactive<FormContext>(form.value));

    return {};
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-wrap: wrap;
}
</style>
