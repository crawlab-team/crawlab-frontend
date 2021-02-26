<template>
  <div class="table-header-dialog-filter">
    <div class="title">
      <span>Filter</span>
      <el-input
          :model-value="internalSearchString"
          class="search"
          clearable
          placeholder="Search"
          prefix-icon="el-icon-search"
          size="mini"
          @input="onSearch"
      />
      <el-tooltip content="Add Condition">
        <span class="icon" @click="onAddCondition">
          <el-icon name="circle-plus-outline"/>
        </span>
      </el-tooltip>
    </div>
    <el-form>
      <FilterConditionList :conditions="internalConditions" @change="onConditionsChange"/>
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
import {computed, defineComponent, ref, watch} from 'vue';
import Empty from '@/components/empty/Empty.vue';
import {getDefaultFilterCondition} from '@/components/filter/FilterCondition.vue';
import FilterConditionList from '@/components/filter/FilterConditionList.vue';
import {debounce} from '@/utils/debounce';

export default defineComponent({
  name: 'TableHeaderDialogFilter',
  components: {
    FilterConditionList,
    Empty,
  },
  props: {
    searchString: {
      type: String,
      required: false,
    },
    conditions: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  emits: [
    'change',
  ],
  setup(props, {emit}) {
    const items = ref<string[]>([]);
    const internalConditions = ref<FilterConditionData[]>([getDefaultFilterCondition()]);
    const internalSearchString = ref<string>();

    const filterData = computed<TableHeaderDialogFilterData>(() => {
      return {
        searchString: internalSearchString.value,
        conditions: internalConditions.value,
      };
    });

    const onAddCondition = () => {
      internalConditions.value.push(getDefaultFilterCondition());
    };

    const onConditionsChange = (newConditions: FilterConditionData[]) => {
      internalConditions.value = newConditions;
      emit('change', filterData.value);
    };

    const search = debounce(() => {
      emit('change', filterData.value);
    });

    const onSearch = (value?: string) => {
      internalSearchString.value = value;
      search();
    };

    watch(() => {
      const {searchString} = props as TableHeaderDialogFilterProps;
      return searchString;
    }, (value) => {
      internalSearchString.value = value;
    });

    watch(() => {
      const {conditions} = props as TableHeaderDialogFilterProps;
      return conditions;
    }, (value) => {
      if (value) {
        internalConditions.value = value;
      }
    });

    return {
      items,
      internalSearchString,
      internalConditions,
      onAddCondition,
      onConditionsChange,
      onSearch,
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
    display: flex;
    align-items: center;

    .search {
      margin-left: 5px;
      flex: 1;
    }

    .icon {
      cursor: pointer;
      margin-left: 5px;
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
