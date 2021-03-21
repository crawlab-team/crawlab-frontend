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
    },
    projectForm: {},
    projectFormRef: undefined,
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
    }
    // setProjectFormRef: (state: ProjectStoreState, formRef: typeof ElForm | undefined) => {
    //   state.projectFormRef = formRef;
    // }
  },
} as ProjectStoreModule;
