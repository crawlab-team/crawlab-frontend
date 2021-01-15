<template>
  <div class="file-editor">
    <FileEditorNavMenu :items="navItems"/>
    <div class="file-editor-content">
      <FileEditorNavTabs/>
      <div ref="codeMirrorEditor" class="code-mirror-editor"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, ref} from 'vue';
import CodeMirror, {Editor, EditorConfiguration} from 'codemirror';
import {useI18n} from 'vue-i18n';

// codemirror
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/php/php.js';
import 'codemirror/mode/yaml/yaml.js';

// components
import FileEditorNavMenu from '@/components/file/FileEditorNavMenu.vue';
import FileEditorNavTabs from '@/components/file/FileEditorNavTabs.vue';

export default {
  name: 'FileEditor',
  components: {FileEditorNavTabs, FileEditorNavMenu},
  props: {
    fileContent: String,
    fileName: String,
    navItems: Array,
  },
  setup(props: FileDetailProps) {
    const {tm} = useI18n();

    const editor = ref<Editor>();

    const codeMirrorEditor = ref<HTMLDivElement>();

    const language = computed<string>(() => {
      const fileName = props.fileName;
      if (!fileName) return '';
      if (fileName.match(/\.js$/)) {
        return 'text/javascript';
      } else if (fileName.match(/\.py$/)) {
        return 'text/x-python';
      } else if (fileName.match(/\.go$/)) {
        return 'text/x-go';
      } else if (fileName.match(/\.sh$/)) {
        return 'text/x-shell';
      } else if (fileName.match(/\.php$/)) {
        return 'text/x-php';
      } else if (fileName.match(/\.md$/)) {
        return 'text/x-markdown';
      } else if (fileName.match('Spiderfile')) {
        return 'text/x-yaml';
      } else {
        return 'text';
      }
    });

    const options = computed<EditorConfiguration>(() => {
      return {
        mode: language.value,
        theme: 'darcula',
        smartIndent: true,
        indentUnit: 4,
        lineNumbers: true,
        readOnly: false,
      };
    });

    onMounted(() => {
      if (codeMirrorEditor.value) {
        editor.value = CodeMirror(codeMirrorEditor.value, options.value);
      }
    });

    return {
      editor,
      codeMirrorEditor,
      language,
      options,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.file-editor {
  min-height: 100%;
  height: 100%;
  display: flex;

  .file-editor-content {
    flex: 1;
    display: flex;
    flex-direction: column;

    .file-editor-nav-tabs {
      height: $fileEditorNavTabsHeight;
    }

    .code-mirror-editor {
      flex: 1;
    }
  }
}
</style>
<style scoped>
.file-editor .file-editor-content .code-mirror-editor >>> .CodeMirror {
  height: 100%;
}
</style>
