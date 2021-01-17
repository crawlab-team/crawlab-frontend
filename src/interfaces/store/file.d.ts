import {Module, MutationTree} from 'vuex';

declare global {
  interface FileStoreModule extends Module<FileStoreState, RootStoreState> {
    // getters: FileStoreGetters;
    mutations: FileStoreMutations;
  }

  interface FileStoreState {
    editorTheme: string;
  }

  // interface FileStoreGetters extends GetterTree<FileStoreState, RootStoreState> {
  // }

  interface FileStoreMutations extends MutationTree<FileStoreState> {
    setEditorTheme: StoreMutation<FileStoreState, string>;
  }
}
