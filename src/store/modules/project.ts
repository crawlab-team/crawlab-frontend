import {useService} from '@/services';
import {getDefaultStoreMutations, getDefaultStoreState} from '@/utils/store';

const {
  get,
  create,
  update,
  del,
  getList,
  deleteList,
} = useService<Project>('/projects');

const state: ProjectStoreState = {
  ...getDefaultStoreState<Project>(),
  // TODO: dummy data
  allProjectSelectOptions: [
    {label: 'Taobao', value: '1'},
    {label: 'Tmall', value: '2'},
    {label: 'JD', value: '3'},
    {label: '163', value: '4'},
    {label: 'Sina', value: '5'},
    {label: '36kr', value: '6'},
  ],
  allProjectTags: [
    'ecommerce',
    'news',
  ],
};

const mutations = {
  ...getDefaultStoreMutations<Project>(),
  setAllProjectSelectOptions: (state: ProjectStoreState, options: SelectOption[]) => {
    state.allProjectSelectOptions = options;
  },
  setAllProjectTags: (state: ProjectStoreState, tags: string[]) => {
    state.allProjectTags = tags;
  },
} as ProjectStoreMutations;

const actions = {
  getAllProjectSelectOptions: async (state: ProjectStoreState) => {
    // TODO: implement
  },
  getAllProjectTags: async (state: ProjectStoreState) => {
    // TODO: implement
  },
  getById: async ({commit}: StoreActionContext<ProjectStoreState>, id: string) => {
    const res = await get(id);
    commit('setForm', res.data);
    return res;
  },
  create: async ({commit}: StoreActionContext<ProjectStoreState>, form: Project) => {
    const res = await create(form);
    return res;
  },
  updateById: async ({commit}: StoreActionContext<ProjectStoreState>, {id, form}: { id: string; form: Project }) => {
    const res = await update(id, form);
    return res;
  },
  deleteById: async ({commit}: StoreActionContext<ProjectStoreState>, id: string) => {
    const res = await del(id);
    return res;
  },
  getList: async ({state, commit}: StoreActionContext<ProjectStoreState>) => {
    // TODO: filter
    const res = await getList(state.tablePagination);
    commit('setTableData', {data: res.data || [], total: res.total});
    return res;
  },
  deleteList: async ({commit}: StoreActionContext<ProjectStoreState>, ids: string[]) => {
    return await deleteList(ids);
  },
} as ProjectStoreActions;

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as ProjectStoreModule;
