<template>
  <el-popover
      :show-arrow="false"
      :visible="visible"
      class="table-header-dialog"
      popper-class="table-header-popper"
      trigger="manual"
  >
    <template #reference>
      <div v-click-outside="onClickOutside">
        <slot name="reference"/>
      </div>
    </template>
    <div class="content">
      <div class="header">
        <div class="title">{{ column.label }}</div>
      </div>
      <span class="close" @click="onCancel">
        <el-icon name="close"></el-icon>
      </span>
      <div class="body">
        <div class="list">
          <div class="item sort">
            <TableHeaderDialogSort :value="internalSort" @change="onSortChange"/>
          </div>
          <div class="item filter">
            <TableHeaderDialogFilter/>
          </div>
        </div>
      </div>
      <div class="footer">
        <!--      <IconButton tooltip="Cancel" type="info" size="mini" icon="el-icon-close" round plain @click="onCancel"/>-->
        <!--      <IconButton tooltip="Confirm" type="primary" size="mini" icon="el-icon-check" round @click="onConfirm"/>-->
        <!--            <Button tooltip="Cancel" type="info" size="mini" icon="el-icon-close" plain>Cancel</Button>-->
        <!--      <Button tooltip="Confirm" type="primary" size="mini" icon="el-icon-check">Confirm</Button>-->
        <Button plain size="mini" tooltip="Cancel" type="info" @click="onCancel">Cancel</Button>
        <Button size="mini" tooltip="Clear Conditions" type="danger" @click="onClear">Clear</Button>
        <Button size="mini" tooltip="Apply Conditions" type="primary" @click="onApply">Apply</Button>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {ClickOutside} from 'element-plus/lib/directives';
import Button from '@/components/button/Button.vue';
import TableHeaderDialogFilter from '@/components/table/TableHeaderDialogFilter.vue';
import TableHeaderDialogSort from '@/components/table/TableHeaderDialogSort.vue';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'TableHeaderFilter',
  components: {
    TableHeaderDialogSort,
    TableHeaderDialogFilter,
    // IconButton,
    Button,
  },
  directives: {
    ClickOutside,
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
    column: {
      type: Object,
      required: true,
    },
    actionStatusMap: {
      type: Object,
      required: true,
    },
    sort: {
      type: String,
      required: false,
    },
    filter: {
      type: Object,
      required: false,
    },
  },
  emits: [
    'click',
    'cancel',
    'clear',
    'apply',
  ],
  setup(props, {emit}) {
    const internalSort = ref<string>();
    const internalFilter = ref<TableColumnFilter>();

    const cancel = () => {
      const {sort, filter} = props as TableHeaderDialogProps;
      internalSort.value = sort;
      internalFilter.value = filter;
      emit('cancel');
    };

    const onClickOutside = () => {
      cancel();
    };

    const onCancel = () => {
      cancel();
    };

    const onClear = () => {
      internalSort.value = undefined;
      internalFilter.value = undefined;
      emit('clear');
    };

    const onApply = () => {
      const value: TableHeaderDialogValue = {
        sort: internalSort.value,
        filter: internalFilter.value,
      };
      emit('apply', value);
    };

    const onSortChange = (value: string) => {
      internalSort.value = value;
    };

    const onFilterChange = (value: TableColumnFilter) => {
      internalFilter.value = value;
    };

    onMounted(() => {
      const {sort, filter} = props as TableHeaderDialogProps;
      internalSort.value = sort;
      internalFilter.value = filter;
    });

    return {
      variables,
      internalSort,
      internalFilter,
      onClickOutside,
      onCancel,
      onClear,
      onApply,
      onSortChange,
      onFilterChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.content {
  position: relative;
  min-width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  .close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .header {
    .title {
      font-size: 16px;
      font-weight: 900;
      color: $infoMediumColor;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid $infoBorderColor;
    }
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;

    .list {
      flex: 1;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      //justify-content: space-between;

      .item {
        padding: 10px 0;
        border-bottom: 1px solid $infoBorderColor;

        &:first-child {
          padding-top: 0;
        }

        &.sort {
          flex-basis: 100%;
        }

        &.filter {
          flex: 1;
        }
      }
    }
  }

  .footer {
    height: 30px;
    margin-top: 10px;
    text-align: right;
  }
}
</style>
<style>
.table-header-popper {
  min-width: 320px !important;
  min-height: 480px !important;
  display: flex;
  flex-direction: column;
}
</style>
