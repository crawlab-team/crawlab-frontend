import {GetterTree, Module, MutationTree} from 'vuex';

declare global {
  interface SpiderStoreModule extends Module<SpiderStoreState, RootStoreState> {
    getters: SpiderStoreGetters;
    mutations: SpiderStoreMutations;
  }

  //
  // interface SpiderStoreState {
  // }
  //
  // interface SpiderStoreGetters extends GetterTree<SpiderStoreState, RootStoreState> {
  // }
  //
  // interface SpiderStoreMutations extends MutationTree<SpiderStoreState> {
  // }
}
