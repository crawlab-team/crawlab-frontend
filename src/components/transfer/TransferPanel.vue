<template>
  <el-card class="transfer-panel">
    <template #header>
      <div class="transfer-panel-header">
        <div class="left">
          <el-checkbox
              v-model="isCheckedAll"
              :disabled="data.length === 0"
              :indeterminate="isIntermediate"
              class="check-all"
              @change="onCheckAll"
          />
          <span class="title">{{ title }}</span>
        </div>
        <div class="summary">
          {{ summary }}
        </div>
      </div>
    </template>
    <template #default>
      <div class="transfer-panel-body">
        <el-input
            v-model="searchString"
            class="search"
            placeholder="Search"
            prefix-icon="el-icon-search"
            size="mini"
        />
        <template v-if="items.length > 0">
          <el-checkbox-group
              :model-value="checked"
              class="check-list"
              @change="onCheck"
          >
            <el-checkbox
                v-for="item in items"
                :key="item.key"
                :label="item.key"
                class="check-item"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-else>
          <div class="empty-wrapper">
            <Empty class="empty"/>
          </div>
        </template>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import {DataItem, Key} from 'element-plus/lib/el-transfer/src/transfer';
import Empty from '@/components/empty/Empty.vue';

export default defineComponent({
  name: 'TransferPanel',
  components: {Empty},
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title',
    },
    checked: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    }
  },
  emits: [
    'check',
  ],
  setup(props, {emit}) {
    const searchString = ref<string>('');

    const isCheckedAll = ref<boolean>(false);

    const isIntermediate = ref<boolean>(false);

    const items = computed<DataItem[]>(() => {
      const {data} = props as TransferPanelProps;
      if (!searchString.value) {
        return data;
      }
      return data.filter(d => d.label.toLowerCase().includes(searchString.value.toLowerCase()));
    });

    const summary = computed<string>(() => {
      const {checked, data} = props as TransferPanelProps;
      return `${checked.length}/${data.length}`;
    });

    const onCheck = (value: Key[]) => {
      emit('check', value);
    };

    const onCheckAll = (value: boolean) => {
      const {data} = props as TransferPanelProps;
      emit('check', value ? data.map(d => d.key) : []);
    };

    watch(() => {
      const {checked} = props as TransferPanelProps;
      return checked;
    }, () => {
      const {checked, data} = props as TransferPanelProps;
      isCheckedAll.value = checked.length > 0 && checked.length === data.length;
      isIntermediate.value = checked.length > 0 && checked.length < checked.length;
    });

    return {
      searchString,
      isCheckedAll,
      isIntermediate,
      items,
      summary,
      onCheck,
      onCheckAll,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.transfer-panel {
  flex: 1;
  //width: 360px;
  padding: 0 10px;

  .transfer-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .title {
        padding-left: 10px;
        font-size: 16px;
        color: $infoColor;
      }
    }
  }

  .transfer-panel-body {
    .search {
      margin-bottom: 10px;
    }

    .check-list {
      height: 360px;
      overflow: auto;
      display: flex;
      flex-direction: column;

      .check-item {
        padding: 5px;
      }
    }

    .empty-wrapper {
      height: 360px;
    }
  }
}
</style>