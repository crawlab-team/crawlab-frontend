export default {
  namespaced: true,
  state: {
    editorTheme: 'darcula',
  },
  mutations: {
    setEditorTheme: (state: FileStoreState, value: string) => {
      state.editorTheme = value;
    }
  },
  actions: {}
} as FileStoreModule;
