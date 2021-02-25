<template>
  <div class="table-header-dialog-filter">
    <div class="title">Filter</div>
    <el-form>
      <el-form-item size="mini">
        <el-input placeholder="Search" prefix-icon="el-icon-search"/>
      </el-form-item>
      <FilterCondition/>
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
import {defineComponent} from 'vue';
import Empty from '@/components/empty/Empty.vue';
import FilterCondition from '@/components/filter/FilterCondition.vue';

export default defineComponent({
  name: 'TableHeaderDialogFilter',
  components: {FilterCondition, Empty},
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    }
  },
  setup() {
    return {};
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
