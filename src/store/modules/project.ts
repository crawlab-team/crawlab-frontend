import {getDefaultPagination} from '@/utils/pagination';
import {getDefaultTableDataWithTotal} from '@/utils/table';

export default {
  namespaced: true,
  state: {
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
    dialogVisible: {
      create: false,
      clone: false,
      edit: false,
      delete: false,
    },
    projectForm: {},
    projectFormRef: undefined,
    projectList: [],
    projectListTotal: 0,
    projectListPagination: getDefaultPagination(),
  },
  mutations: {
    setAllProjectSelectOptions: (state: ProjectStoreState, options: SelectOption[]) => {
      state.allProjectSelectOptions = options;
    },
    setAllProjectTags: (state: ProjectStoreState, tags: string[]) => {
      state.allProjectTags = tags;
    },
    showDialog: (state: ProjectStoreState, key: DialogKey) => {
      state.dialogVisible[key] = true;
    },
    hideDialog: (state: ProjectStoreState, key: DialogKey) => {
      state.dialogVisible[key] = false;
    },
    resetDialogs: (state: ProjectStoreState) => {
      for (const key in state.dialogVisible) {
        state.dialogVisible[key as DialogKey] = false;
      }
    },
    setProjectForm: (state: ProjectStoreState, form: Project) => {
      state.projectForm = form;
    },
    // setProjectFormRef: (state: ProjectStoreState, formRef: typeof ElForm | undefined) => {
    //   state.projectFormRef = formRef;
    // }
    setProjectList: (state: ProjectStoreState, payload: TableDataWithTotal<Project>) => {
      if (!payload) payload = getDefaultTableDataWithTotal();
      state.projectList = payload.data;
      state.projectListTotal = payload.total;
    },
    resetProjectList: (state: ProjectStoreState) => {
      const payload = getDefaultTableDataWithTotal();
      state.projectList = payload.data;
      state.projectListTotal = payload.total;
    },
    setProjectPaginationData: (state: ProjectStoreState, data: TablePagination) => {
      state.projectListPagination = data;
    },
  },
} as ProjectStoreModule;
