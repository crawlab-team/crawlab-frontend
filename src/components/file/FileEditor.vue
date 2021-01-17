<template>
  <div class="file-editor">
    <FileEditorNavMenu
        :active-item="activeFileItem"
        :items="navItems"
        @node-click="onNavItemClick"
        @node-db-click="onNavItemDbClick"
    />
    <div class="file-editor-content">
      <FileEditorNavTabs
          :active-tab="activeFileItem"
          :tabs="tabs"
      />
      <div ref="codeMirrorEditor" :class="showCodeMirrorEditor ? '' : 'hidden'" class="code-mirror-editor"/>
      <div v-show="!showCodeMirrorEditor" class="empty-content">
        You can edit or view a file by double-clicking one of the files on the left.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import {EditorConfiguration} from 'codemirror';

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
import {getCodemirrorEditor} from '@/utils/codemirror';

export default defineComponent({
  name: 'FileEditor',
  components: {
    // VueCodemirror,
    FileEditorNavTabs,
    FileEditorNavMenu,
  },
  props: {
    content: {
      type: String,
      required: true,
      default: '',
    },
    navItems: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  emits: [
    'content-change',
    'node-click',
    'node-db-click',
  ],
  setup(props, {emit}) {
    // const {tm} = useI18n();

    const codeMirrorEditor = ref<HTMLDivElement>();

    const tabs = ref<FileNavItem[]>([]);

    const activeFileItem = ref<FileNavItem>();

    const showCodeMirrorEditor = computed<boolean>(() => {
      return !!activeFileItem.value;
    });

    const language = computed<string>(() => {
      const fileName = activeFileItem.value?.name;
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
        // indentUnit: 4,
        lineNumbers: true,
        readOnly: false,
      };
    });

    const content = computed<string>(() => {
      const {content} = props as FileEditorProps;
      return content;
    });

    const onNavItemClick = (item: FileNavItem) => {
      emit('node-click', item);
    };

    const onNavItemDbClick = (item: FileNavItem) => {
      activeFileItem.value = item;
      emit('node-db-click', item);
    };

    const onContentChange = (value: string) => {
      emit('content-change', value);
    };

    const updateEditor = () => {
      const el = codeMirrorEditor.value as HTMLElement;
      const editor = getCodemirrorEditor(el, options.value);
      editor.setOption('mode', language.value);
      editor.setValue(content.value);
    };

    watch(content, () => {
      updateEditor();
    });

    onMounted(() => {
      updateEditor();
    });

    return {
      codeMirrorEditor,
      tabs,
      activeFileItem,
      showCodeMirrorEditor,
      language,
      options,
      onNavItemClick,
      onNavItemDbClick,
      onContentChange,
    };
  },
});
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

      &.hidden {
        position: fixed;
        top: -100vh;
        left: 0;
        height: 100vh;
      }
    }

    .empty-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<style scoped>
.file-editor .file-editor-content .code-mirror-editor >>> .CodeMirror {
  height: 100%;
}
</style>
