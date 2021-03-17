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
  },
  mutations: {
    setAllProjectSelectOptions: (state: ProjectStoreState, options: SelectOption[]) => {
      state.allProjectSelectOptions = options;
    },
    setAllProjectTags: (state: ProjectStoreState, tags: string[]) => {
      state.allProjectTags = tags;
    },
  }
} as ProjectStoreModule;
