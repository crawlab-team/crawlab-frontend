<template>
  <div class="filter-condition">
    <el-select
        :model-value="condition.type"
        :popper-append-to-body="false"
        class="filter-condition-type"
        size="mini"
        @change="onTypeChange"
    >
      <el-option v-for="op in conditionTypesOptions" :key="op.value" :label="op.label" :value="op.value"/>
    </el-select>
    <el-input
        :model-value="condition.value"
        class="filter-condition-value"
        size="mini"
        placeholder="Value"
        @change="onValueChange"
    />
    <el-icon class="icon" name="circle-close" @click="onDelete"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  FILTER_CONDITION_TYPE_CONTAINS,
  FILTER_CONDITION_TYPE_EQUAL_TO,
  FILTER_CONDITION_TYPE_GREATER_THAN,
  FILTER_CONDITION_TYPE_GREATER_THAN_OR_EQUAL_TO,
  FILTER_CONDITION_TYPE_LESS_THAN,
  FILTER_CONDITION_TYPE_LESS_THAN_OR_EQUAL_TO,
  FILTER_CONDITION_TYPE_NOT_CONTAINS,
  FILTER_CONDITION_TYPE_NOT_EQUAL_TO,
  FILTER_CONDITION_TYPE_NOT_SET,
  FILTER_CONDITION_TYPE_REGEX,
} from '@/constants/filter';
import {plainClone} from '@/utils/object';

export const defaultFilterCondition: FilterConditionData = {
  type: FILTER_CONDITION_TYPE_NOT_SET,
  value: '',
};

export const getDefaultFilterCondition = () => {
  return plainClone(defaultFilterCondition);
};

export const conditionTypesOptions: SelectOption[] = [
  {value: FILTER_CONDITION_TYPE_NOT_SET, label: 'Not Set'},
  {value: FILTER_CONDITION_TYPE_CONTAINS, label: 'Contains'},
  {value: FILTER_CONDITION_TYPE_NOT_CONTAINS, label: 'Not Contains'},
  {value: FILTER_CONDITION_TYPE_REGEX, label: 'Regex'},
  {value: FILTER_CONDITION_TYPE_EQUAL_TO, label: 'Equal to'},
  {value: FILTER_CONDITION_TYPE_NOT_EQUAL_TO, label: 'Not Equal to'},
  {value: FILTER_CONDITION_TYPE_GREATER_THAN, label: 'Greater than'},
  {value: FILTER_CONDITION_TYPE_LESS_THAN, label: 'Less than'},
  {value: FILTER_CONDITION_TYPE_GREATER_THAN_OR_EQUAL_TO, label: 'Greater than or Equal to'},
  {value: FILTER_CONDITION_TYPE_LESS_THAN_OR_EQUAL_TO, label: 'Less than or Equal to'},
];

export default defineComponent({
  name: 'FilterCondition',
  props: {
    condition: {
      type: Object,
      required: false,
    },
  },
  emits: [
    'change',
    'delete',
  ],
  setup(props, {emit}) {
    const onTypeChange = (conditionType: string) => {
      const {condition} = props as FilterConditionProps;
      if (condition) {
        condition.type = conditionType;
      }
      emit('change', condition);
    };

    const onTypeClose = () => {
      console.log('onTypeClose');
    };

    const onValueChange = (conditionValue: string) => {
      const {condition} = props as FilterConditionProps;
      if (condition) {
        condition.value = conditionValue;
      }
      emit('change', condition);
    };

    const onDelete = () => {
      emit('delete');
    };

    return {
      conditionTypesOptions,
      onTypeChange,
      onTypeClose,
      onValueChange,
      onDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-condition {
  display: flex;
  align-items: center;

  .filter-condition-type {
    min-width: 180px;
  }

  .filter-condition-value {
    flex: 1;
  }

  .icon {
    cursor: pointer;
    margin-left: 5px;
  }
}
</style>
<style scoped>
.filter-condition >>> .filter-condition-type.el-select .el-input__inner {
  border-color: #DCDFE6 !important;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

.filter-condition >>> .filter-condition-value.el-input .el-input__inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
