<template>
  <div class="table-header-dialog-filter">
    <div class="title">
      Filter
      <el-tooltip content="Add Condition">
        <span class="icon" @click="onAddCondition">
          <el-icon name="circle-plus-outline"/>
        </span>
      </el-tooltip>
    </div>
    <el-form>
      <el-form-item size="mini">
        <el-input placeholder="Search" prefix-icon="el-icon-search"/>
      </el-form-item>
      <FilterConditionList :conditions="conditions" @change="onConditionsChange"/>
    </el-form>
    <template v-if="items.length > 0">
      <ul class="item-list">
        <li v-for="item in items" :key="item">
          <el-checkbox/>
          <span>{{ item }}</span>
        </li>
      </ul>
    </template>
    <template v-else>
      <Empty description="No data available"></Empty>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Empty from '@/components/empty/Empty.vue';
import {getDefaultFilterCondition} from '@/components/filter/FilterCondition.vue';
import FilterConditionList from '@/components/filter/FilterConditionList.vue';

export default defineComponent({
  name: 'TableHeaderDialogFilter',
  components: {
    FilterConditionList,
    Empty,
  },
  setup() {
    const items = ref<string[]>([]);
    const conditions = ref<FilterConditionData[]>([getDefaultFilterCondition()]);

    const onAddCondition = () => {
      conditions.value.push(getDefaultFilterCondition());
    };

    const onConditionsChange = (newConditions: FilterConditionData[]) => {
      if (newConditions.length === 0) {
        newConditions.push(getDefaultFilterCondition());
      }
      conditions.value = newConditions;
    };

    return {
      items,
      conditions,
      onAddCondition,
      onConditionsChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.table-header-dialog-filter {
  .title {
    font-size: 14px;
    font-weight: 900;
    margin-bottom: 10px;
    color: $infoMediumColor;

    .icon {
      cursor: pointer;
    }
  }

  .item-list {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: auto;
  }
}
</style>
