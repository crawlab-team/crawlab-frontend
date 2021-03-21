import {ActionContext, Store} from 'vuex';

declare global {
  interface RootStoreState {
    login: LoginStoreState;
    layout: LayoutStoreState;
    node: NodeStoreState;
    project: ProjectStoreState;
    spider: SpiderStoreState;
    file: FileStoreState;
  }

  type StoreGetter<S, T> = (state: S, getters: StoreGetter<S, T>, rootState: RootStoreState, rootGetters: any) => T;

  type StoreMutation<S, P> = (state: S, payload?: P) => void;

  type StoreActionHandler<S, P, T> = (this: Store<RootStoreState>, ctx: ActionContext<S, RootStoreState>, payload?: P) => T;

  interface StoreActionObject<S, P, T> {
    root?: boolean;
    handler: StoreActionHandler<S, P, T>;
  }

  type StoreAction<S, P, T> =
    StoreActionHandler<S, P, T>
    | StoreActionObject<S, P, T>;
}
