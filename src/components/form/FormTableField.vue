<template>
  <el-input
      v-if="fieldType === FORM_FIELD_TYPE_INPUT"
      v-model="internalValue"
      size="mini"
      @change="onInputChange"
  />
  <TagInput
      v-else-if="fieldType === FORM_FIELD_TYPE_TAG_INPUT"
      v-model="internalValue"
      @change="onInputChange"
  />
  <!-- TODO: implement more field types -->
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, PropType, ref, SetupContext} from 'vue';
import {
  FORM_FIELD_TYPE_CHECK_TAG_GROUP,
  FORM_FIELD_TYPE_INPUT,
  FORM_FIELD_TYPE_INPUT_TEXTAREA,
  FORM_FIELD_TYPE_INPUT_WITH_BUTTON,
  FORM_FIELD_TYPE_TAG_INPUT,
  FORM_FIELD_TYPE_TAG_SELECT,
} from '@/constants/form';
import TagInput from '@/components/input/TagInput.vue';

export default defineComponent({
  name: 'FormTableField',
  components: {TagInput},
  props: {
    form: {
      type: Object as PropType<any>,
      required: true,
    },
    prop: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String as PropType<FormFieldType>,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: FormTableFieldProps, {emit}: SetupContext) {
    const internalValue = ref<any>();

    const onInputChange = (value: any) => emit('update:model-value', value);

    onBeforeMount(() => {
      const {form, prop} = props;
      internalValue.value = form[prop];
    });

    return {
      FORM_FIELD_TYPE_INPUT,
      FORM_FIELD_TYPE_INPUT_TEXTAREA,
      FORM_FIELD_TYPE_INPUT_WITH_BUTTON,
      FORM_FIELD_TYPE_TAG_INPUT,
      FORM_FIELD_TYPE_TAG_SELECT,
      FORM_FIELD_TYPE_CHECK_TAG_GROUP,
      internalValue,
      onInputChange,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
