<template>
  <div ref="formItem" :style="style" class="form-item">
    <el-form-item
        :prop="prop"
        :label="label"
        :required="required || form?.required"
        :size="size || form?.size"
    >
      <template #label>
        <el-tooltip :content="labelTooltip" :disabled="!labelTooltip">
          <span>
            {{ label }}
          </span>
        </el-tooltip>
      </template>
      <div class="form-item-content">
        <slot></slot>
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, onMounted, ref} from 'vue';

export default defineComponent({
  name: 'FormItem',
  props: {
    prop: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    labelTooltip: {
      type: String,
      required: false,
    },
    labelWidth: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    span: {
      type: Number,
      required: false,
      default: 1,
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: FormItemProps, {emit}) {
    const formItem = ref<HTMLDivElement>();

    const form = inject<FormContext>('form', {} as FormContext);

    const style = computed<Partial<CSSStyleDeclaration>>(() => {
      const {span} = props;
      return {
        flexBasis: `calc(100% / ${form.grid} * ${span})`,
      };
    });

    onMounted(() => {
      if (formItem.value) {
        const {labelWidth} = form;
        const el = formItem.value?.querySelector('.el-form-item__content') as HTMLDivElement;
        if (labelWidth && el.style) {
          el.style.width = `calc(100% - ${labelWidth})`;
        }
      }
    });

    return {
      formItem,
      form,
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-item {
  .el-form-item {
    width: 100%;
    margin-right: 0;
  }
}
</style>
<style scoped>
.form-item >>> .form-item-content > .el-select,
.form-item >>> .form-item-content > .el-input {
  width: 100%;
}
</style>
