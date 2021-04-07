<template>
  <div class="tag-input">
    <template v-for="(item, $index) in selectedValue" :key="$index">
      <div class="tag-input-item">
        <el-input
            v-if="item.isEdit"
            ref="input"
            v-model="inputValue"
            placeholder="Tag Name"
            @blur="onBlur($index, $event)"
            @focus="onFocus($index, $event)"
            @keyup.enter="onBlur($index, $event)"
        />
        <Tag
            v-else
            :label="item.value"
            clickable
            closable
            size="small"
            @click="onEdit($index, $event)"
            @close="onDelete($index, $event)"
        />
      </div>
    </template>

    <el-tooltip content="Add Tag">
      <Tab
          :icon="['fa', 'plus']"
          :show-close="false"
          :show-title="false"
          class="add-btn"
          @click="onAdd"
      />
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, watch} from 'vue';
import Tag from '@/components/tag/Tag.vue';
import Tab from '@/components/tab/Tab.vue';
import {ElInput} from 'element-plus';

export default defineComponent({
  name: 'TagInput',
  components: {Tag, Tab},
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => {
        return [];
      }
    }
  },
  emits: [
    'change',
    'update:model-value',
  ],
  setup(props: TagInputProps, {emit}) {
    const inputValue = ref<string>();
    const input = ref<typeof ElInput>();

    const selectedValue = ref<TagInputOption[]>([]);

    const value = computed<string[]>(() => {
      return selectedValue.value
          .filter(d => !!d.value)
          .map(d => d.value) as string[];
    });

    const emitValue = () => {
      emit('change', value.value);
      emit('update:model-value', value.value);
    };

    const onEdit = (index: number, ev?: Event) => {
      ev?.stopPropagation();
      const item = selectedValue.value[index];
      item.isEdit = true;
      setTimeout(() => input.value?.focus(), 0);
    };

    const onDelete = (index: number, ev?: Event) => {
      ev?.stopPropagation();
      selectedValue.value.splice(index, 1);
      emitValue();
    };

    const onFocus = (index: number, ev?: Event) => {
      ev?.stopPropagation();
      const item = selectedValue.value[index];
      inputValue.value = item?.value;
    };

    const onBlur = (index: number, ev?: Event) => {
      ev?.stopPropagation();
      const item = selectedValue.value[index];
      if (!item) return;
      if (!inputValue.value) {
        onDelete(index);
      } else {
        item.value = inputValue.value;
        item.isEdit = false;
      }
      emitValue();
    };

    const onAdd = () => {
      // add value to array
      selectedValue.value.push({
        value: '',
        color: 'blue',
        isEdit: true,
      });

      // auto focus
      setTimeout(() => input.value?.focus(), 0);
    };

    watch(() => props.modelValue, () => {
      const {modelValue} = props;
      selectedValue.value = modelValue.map(tag => {
        return {
          value: tag,
          isEdit: false,
        };
      });
    });

    return {
      inputValue,
      input,
      selectedValue,
      onFocus,
      onBlur,
      onAdd,
      onEdit,
      onDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.tag-input {
  display: flex;
  align-items: center;
  height: 28px;

  .tag-input-item {
    margin-right: 10px;
    //line-height: 24px;

    &:last-child {
      margin-right: 0;
    }

    .el-input {
      width: 100px;
    }
  }

  .add-btn {
    background-color: $white;
  }
}
</style>

<style scoped>
.tag-input >>> .add-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #909399;
}
</style>
