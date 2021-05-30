import {Store} from 'vuex';
import {getDefaultService} from '@/utils/service';
import useRequest from '@/services/request';

const useSpiderService = (store: Store<RootStoreState>): SpiderServices => {
  const ns = 'spider';

  const {dispatch} = store;

  const {
    get,
  } = useRequest();

  const listDir = (id: string, path: string) => {
    return dispatch(`${ns}/listDir`, {id, path});
  };

  const listRootDir = (id: string) => {
    return listDir(id, '/');
  };

  const getFile = (id: string, path: string) => {
    return dispatch(`${ns}/getFile`, {id, path});
  };

  const getFileInfo = async (id: string, path: string) => {
    return dispatch(`${ns}/getFileInfo`, {id, path});
  };

  const saveFile = (id: string, path: string, data: string) => {
    return dispatch(`${ns}/saveFile`, {id, path, data});
  };

  const renameFile = (id: string, path: string, new_path: string) => {
    return dispatch(`${ns}/renameFile`, {id, path, new_path});
  };

  const deleteFile = (id: string, path: string) => {
    return dispatch(`${ns}/deleteFile`, {id, path});
  };

  const copyFile = (id: string, path: string, new_path: string) => {
    return dispatch(`${ns}/copyFile`, {id, path, new_path});
  };

  return {
    ...getDefaultService<Spider>(ns, store),
    listDir,
    listRootDir,
    getFile,
    getFileInfo,
    saveFile,
    renameFile,
    deleteFile,
    copyFile,
  };
};

export default useSpiderService;
