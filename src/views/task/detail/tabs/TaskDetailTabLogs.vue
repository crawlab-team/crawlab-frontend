<template>
  <div class="task-detail-tab-logs">
    <div class="pagination">
      <el-pagination
          :page="pagination.page"
          :page-size="pagination.size"
          :page-sizes="pageSizes"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @current-change="onPageChange"
          @size-change="onSizeChange"
      />
    </div>
    <div class="log-container">
      <div ref="log" class="log"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, onMounted, onUnmounted, ref, watch} from 'vue';
import {Editor, EditorConfiguration} from 'codemirror';
import {getCodemirrorEditor, initTheme} from '@/utils/codemirror';
import {useStore} from 'vuex';

// codemirror css
import 'codemirror/lib/codemirror.css';
import useTaskDetail from '@/views/task/detail/taskDetail';

export default defineComponent({
  name: 'TaskDetailTabLogs',
  setup() {
    // store
    const ns = 'task';
    const store = useStore();
    const {task: state} = store.state as RootStoreState;

    // use task
    const {
      activeId,
    } = useTaskDetail();

    // log div element
    const log = ref<HTMLDivElement>();

    // codemirror editor
    let cm: Editor | null = null;

    // codemirror options
    const options = computed<EditorConfiguration>(() => {
      return {
        mode: 'text',
        theme: 'darcula',
        readOnly: 'nocursor',
        inputStyle: 'contenteditable',
      };
    });

    // content
    const content = computed<string>(() => state.logContent);

    // pagination
    const pagination = computed<TablePagination>(() => state.logPagination);

    // total
    const total = computed<number>(() => state.logTotal);

    // id
    const id = computed<string>(() => activeId.value);

    watch(content, () => {
      cm?.setValue(content.value);
    });

    const onPageChange = (page: number) => {
      store.commit(`${ns}/setLogPagination`, {...pagination.value, page});
    };

    const onSizeChange = (size: number) => {
      store.commit(`${ns}/setLogPagination`, {...pagination.value, size});
    };

    watch(pagination, async () => {
      await store.dispatch(`${ns}/getLogs`, id.value);
    });

    const pageSizes = ref<number[]>([
      1000,
      2000,
      5000,
      10000,
      20000,
      50000,
    ]);

    onBeforeMount(async () => {
      await store.dispatch(`${ns}/getLogs`, id.value);
    });

    onMounted(async () => {
      const el = log.value as HTMLElement;
      cm = getCodemirrorEditor(el, options.value);

      await initTheme('darcula');

      if (content.value) {
        cm?.setValue(content.value);
      }
    });

    onUnmounted(() => {
      store.commit(`${ns}/resetLogPagination`);
    });

    return {
      log,
      pagination,
      total,
      pageSizes,
      onPageChange,
      onSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.task-detail-tab-logs {
  height: 100%;

  .pagination {
    text-align: right;
    height: 32px;
  }

  .log-container {
    height: calc(100% - 32px);
    position: relative;
    flex: 1;
    display: flex;
    min-width: 100%;
    flex-direction: column;

    .log {
      flex: 1;

      &.hidden {
        position: fixed;
        top: -100vh;
        left: 0;
        height: 100vh;
      }
    }
  }
}
</style>

<style scoped>
.task-detail-tab-logs .log-container .log >>> .CodeMirror {
  position: relative;
  min-height: 100%;
}
</style>
