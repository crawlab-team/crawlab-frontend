import {useStore} from 'vuex';
import useDetail from '@/layouts/detail';
import {setupGetAllList} from '@/utils/list';
import useTask from '@/components/task/task';
import {onBeforeMount} from 'vue';
import {isCancellable} from '@/utils/task';
import {sleep} from '@/utils/sleep';

const useTaskDetail = () => {
  // store
  const ns = 'task';
  const store = useStore();

  const {
    form,
  } = useTask(store);

  const setupDetail = () => {
    if (isCancellable(form.value?.status)) {
      const handle = setInterval(async () => {
        const res = await store.dispatch(`${ns}/getById`, form.value._id);
        if (!isCancellable(res.data.status)) {
          clearInterval(handle);
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

  setupGetAllList(store, [
    'node',
    'spider',
  ]);

  return {
    ...useDetail('task'),
  };
};

export default useTaskDetail;
