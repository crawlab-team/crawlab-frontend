import {EditorConfiguration} from 'codemirror';

const getDefaultEditorTheme = () => 'darcula';

const getDefaultEditorOptions = (): FileEditorConfiguration => {
  return {
    theme: getDefaultEditorTheme(),
    indentUnit: 2,
    smartIndent: true,
    lineNumbers: true,
    readOnly: false,
    highlightSelectionMatches: true,
    matchBrackets: true,
    matchTags: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    showHint: true,
    search: {
      bottom: true,
    },
  };
};

export default {
  namespaced: true,
  state: {
    editorOptions: getDefaultEditorOptions(),
    editorSettingsDialogVisible: false,
  },
  mutations: {
    setEditorOptions: (state: FileStoreState, options: EditorConfiguration) => {
      for (const k in options) {
        const key = k as keyof EditorConfiguration;
        state.editorOptions[key] = options[key];
      }
    },
    resetEditorOptions: (state: FileStoreState) => {
      state.editorOptions = getDefaultEditorOptions();
    },
    setEditorSettingsDialogVisible: (state: FileStoreState, value: boolean) => {
      state.editorSettingsDialogVisible = value;
    },
  },
  actions: {}
} as FileStoreModule;
