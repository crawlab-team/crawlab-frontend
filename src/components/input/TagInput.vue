<template>
  <div class="tag-input">
    <template v-for="(item, $index) in selectedValue" :key="$index">
      <TagInputItem
          v-if="item.isEdit"
          ref="inputItemRef"
          v-model="selectedValue[$index]"
          :disabled="disabled"
          placeholder="Tag Name"
          size="mini"
          @blur="onBlur($index, $event)"
          @check="onCheck($index, $event)"
          @close="onClose($index, $event)"
          @delete="onDelete($index, $event)"
          @focus="onFocus($index, $event)"
          @keyup.enter="onBlur($index, $event)"
      />
      <Tag
          v-else
          :closable="!disabled"
          :color="item.color"
          :disabled="disabled"
          :label="item.name"
          clickable
          size="small"
          type="plain"
          @click="onEdit($index, $event)"
          @close="onDelete($index, $event)"
      />
    </template>

    <el-tooltip :content="addButtonTooltip" :disabled="!addButtonTooltip">
      <Tab
          :icon="['fa', 'plus']"
          :show-close="false"
          :show-title="false"
          class="add-btn"
          :class="disabled ? 'disabled' : ''"
          @click="onAdd"
      />
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, watch} from 'vue';
import TagComp from '@/components/tag/Tag.vue';
import Tab from '@/components/tab/Tab.vue';
import TagInputItem from '@/components/input/TagInputItem.vue';
import {cloneArray} from '@/utils/object';
import colors from '@/styles/color.scss';

export const defaultTagInputValue = {
  color: '#409eff',
} as Tag;

export const predefinedColors = [
  colors.red,
  colors.magenta,
  colors.purple,
  colors.geekBlue,
  colors.blue,
  colors.cyan,
  colors.green,
  colors.limeGreen,
  colors.yellow,
  colors.gold,
  colors.orange,
];

export default defineComponent({
  name: 'TagInput',
  components: {
    TagInputItem,
    Tag: TagComp,
    Tab,
  },
  props: {
    modelValue: {
      type: Array as PropType<Tag[]>,
      default: () => {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'change',
    'update:model-value',
  ],
  setup(props: TagInputProps, {emit}) {
    const activeIndex = ref<number>(-1);
    const inputItemRef = ref<typeof TagInputItem>();

    const selectedValue = ref<TagInputOption[]>([]);

    const emitValue = () => {
      emit('change', selectedValue.value);
      emit('update:model-value', selectedValue.value.map(d => {
        return {
          _id: d._id,
          name: d.name,
          color: d.color,
        } as Tag;
      }));
    };

    const disabled = computed<boolean>(() => props.disabled);

    const addButtonTooltip = computed<string>(() => disabled.value ? '' : 'Add Tag');

    const onEdit = (index: number, ev?: Event) => {
      // check disabled
      if (disabled.value) return;

      ev?.stopPropagation();
      const item = selectedValue.value[index];
      item.isEdit = true;

      // auto focus
      setTimeout(() => inputItemRef.value?.focus(), 0);
    };

    const onDelete = (index: number, ev?: Event) => {
      // check disabled
      if (disabled.value) return;

      ev?.stopPropagation();
      selectedValue.value.splice(index, 1);

      // commit change
      emitValue();
    };

    const onFocus = (index: number, ev?: Event) => {
      ev?.stopPropagation();
      activeIndex.value = index;
    };

    const onBlur = (index: number, ev?: Event) => {
      ev?.stopPropagation();
      activeIndex.value = -1;
    };

    const onCheck = (index: number, value?: Tag, ev?: Event) => {
      ev?.stopPropagation();
      const item = selectedValue.value[index];
      if (!item) return;
      item.isEdit = false;
      if (!value) return;
      const {name, hex} = value;
      item.name = name;
      item.hex = hex;

      // commit change
      emitValue();
    };

    const onClose = (index: number, ev?: Event) => {
      ev?.stopPropagation();
      const item = selectedValue.value[index];
      if (!item) return;
      item.isEdit = false;
      if (!item.name) {
        selectedValue.value.splice(index, 1);
      }
    };

    const onAdd = () => {
      // check disabled
      if (disabled.value) return;

      // add value to array
      selectedValue.value.push({
        ...defaultTagInputValue,
        isEdit: true,
      });

      // auto focus
      setTimeout(() => inputItemRef.value?.focus(), 0);
    };

    watch(() => props.modelValue, () => {
      const modelValue = props.modelValue || [];
      selectedValue.value = cloneArray(modelValue);
    });

    return {
      inputItemRef,
      selectedValue,
      addButtonTooltip,
      onFocus,
      onBlur,
      onAdd,
      onEdit,
      onDelete,
      onCheck,
      onClose,
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
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:not(.disabled) {
      background-color: $white;
      color: $infoMediumColor;
    }
  }
}
</style>

<style scoped>
.tag-input >>> .tag {
  margin-right: 10px;
}
</style>
