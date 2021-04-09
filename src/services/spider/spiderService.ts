import {Store} from 'vuex';
import {getDefaultService} from '@/utils/service';

const useSpiderService = (store: Store<RootStoreState>): Services<Spider> => {
  const ns = 'spider';

  return {
    ...getDefaultService<Spider>(ns, store),
  };
};

export default useSpiderService;
