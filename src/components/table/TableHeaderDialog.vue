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
      <div class="body">
        <div class="list">
          <div class="item">
            <div class="title">Sort</div>
            <TableHeaderDialogSort :value="internalSort" @change="onSortChange"/>
          </div>
          <div class="item">
            <div class="title">Filter</div>
            <TableHeaderDialogFilter/>
          </div>
        </div>
      </div>
      <div class="footer">
        <!--      <IconButton tooltip="Cancel" type="info" size="mini" icon="el-icon-close" round plain @click="onCancel"/>-->
        <!--      <IconButton tooltip="Confirm" type="primary" size="mini" icon="el-icon-check" round @click="onConfirm"/>-->
        <!--            <Button tooltip="Cancel" type="info" size="mini" icon="el-icon-close" plain>Cancel</Button>-->
        <!--      <Button tooltip="Confirm" type="primary" size="mini" icon="el-icon-check">Confirm</Button>-->
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
    'hide',
    'clear',
    'apply',
  ],
  setup(props, {emit}) {
    const internalSort = ref<string>();
    const internalFilter = ref<TableColumnFilter>();

    const onClickOutside = () => {
      emit('hide');
    };

    const onCancel = () => {
      emit('hide');
    };

    const onClear = () => {
      console.log('clear');
      emit('clear');
    };

    const onApply = () => {
      console.log('confirm');
      emit('apply');
    };

    const onSortChange = (value: string) => {
      internalSort.value = value;
    };

    const onFilterChange = (value: any) => {
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
  min-width: 100%;

  .list {
    .item {
      padding: 10px 0;
      border-bottom: 1px solid $infoBorderColor;

      &:first-child {
        padding-top: 0;
      }

      .title {
        font-size: 14px;
        font-weight: 900;
        margin-bottom: 10px;
        color: $infoMediumColor;
      }
    }
  }
}

.footer {
  margin-top: 10px;
  text-align: right;
}
</style>
<style>
.table-header-popper {
  min-width: 240px !important;
  min-height: 240px !important;
}
</style>
