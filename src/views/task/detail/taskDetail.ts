import {useStore} from 'vuex';
import useDetail from '@/layouts/detail';
import {onBeforeMount} from 'vue';

const useTaskDetail = () => {
  const ns = 'task';
  const store = useStore();
  const {
    task: state,
  } = store.state as RootStoreState;

  onBeforeMount(async () => {
    await Promise.all([
      store.dispatch(`spider/getAllList`),
      store.dispatch(`node/getAllList`),
    ]);
  });

  return {
    ...useDetail('task'),
  };
};

export default useTaskDetail;
