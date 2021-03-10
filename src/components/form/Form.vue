<template>
  <el-form
      :inline="inline"
      :label-width="labelWidth"
      :size="size"
      class="form"
  >
    <slot></slot>
  </el-form>
</template>

<script lang="ts">
import {computed, defineComponent, provide, reactive} from 'vue';

export default defineComponent({
  name: 'Form',
  props: {
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
      default: 3,
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
