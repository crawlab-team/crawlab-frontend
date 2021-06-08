import {useStore} from 'vuex';
import useDetail from '@/layouts/detail';
import {setupGetAllList} from '@/utils/list';
import useTask from '@/components/task/task';
import {onBeforeMount, onBeforeUnmount} from 'vue';
import {isCancellable} from '@/utils/task';
import {sleep} from '@/utils/sleep';

const useTaskDetail = () => {
  // store
  const ns = 'task';
  const store = useStore();

  const {
    activeId,
  } = useDetail('task');

  const {
    form,
  } = useTask(store);

  // auto update
  let autoUpdateHandle: NodeJS.Timeout;
  const setupDetail = () => {
    if (isCancellable(form.value?.status)) {
      autoUpdateHandle = setInterval(async () => {
        const res = await store.dispatch(`${ns}/getById`, activeId.value);
        if (!isCancellable(res.data.status)) {
          clearInterval(autoUpdateHandle);
        }
      }, 5000);
    }
  };
  onBeforeMount(async () => {
    // wait until form is ready
    for (let i = 0; i < 10; i++) {
      await sleep(1000);
      if (form.value._id) {
        setupDetail();
        return;
      }
    }
  });
  onBeforeUnmount(() => clearInterval(autoUpdateHandle));

  setupGetAllList(store, [
    'node',
    'spider',
  ]);

  return {
    ...useDetail('task'),
  };
};

export default useTaskDetail;
