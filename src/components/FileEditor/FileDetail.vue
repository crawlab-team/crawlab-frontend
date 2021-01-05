<template>
  <div class="file-detail">
    <div id="file-editor">
    </div>
  </div>
</template>

<script lang="ts">
import {computed, onMounted} from 'vue';
import CodeMirror, {EditorConfiguration} from 'codemirror';

// language
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/php/php.js';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/mode/java/java.js';
import {useI18n} from 'vue-i18n';

export default {
  name: 'FileDetail',
  props: {
    fileContent: String,
    fileName: String,
  },
  setup(props: FileDetailProps) {
    const {tm} = useI18n();

    const localState: FileDetailState = {
      ...props,
      editor: undefined,
    };

    const language = computed(() => {
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
        mode: language,
        theme: 'darcula',
        smartIndent: true,
        indentUnit: 4,
        lineNumbers: true,
        readOnly: false,
      };
    });

    const computedState: FileDetailComputed = {
      options,
    };

    onMounted(() => {
      localState.editor = CodeMirror(document.querySelector('#file-editor') as HTMLDivElement, options);
    });

    return {
      ...localState,
      ...computedState,
    };
  },
};
</script>

<style scoped>
.file-content {
  border: 1px solid #eaecef;
  height: calc(100vh - 256px);
}

.file-content >>> .CodeMirror {
  min-height: 100%;
}
</style>
