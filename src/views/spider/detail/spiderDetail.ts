import useDetail from '@/layouts/detail';
import {onBeforeMount} from 'vue';
import {useStore} from 'vuex';

const useSpiderDetail = () => {
  const store = useStore();

  onBeforeMount(async () => {
    await Promise.all([
      store.dispatch(`project/getAllList`),
    ]);
  });

  return {
    ...useDetail('spider'),
  };
};

export default useSpiderDetail;
