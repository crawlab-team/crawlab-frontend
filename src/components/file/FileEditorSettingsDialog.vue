<template>
  <div class="file-editor-settings-dialog">
    <el-dialog
        :model-value="visible"
        title="File Editor Settings"
        @close="onClose"
    >
      <el-form class="form">
        <el-tabs active-name="general" type="card">
          <el-tab-pane label="General" name="general">
            <el-form
                :label-width="variables.fileEditorSettingsDialogLabelWidth"
                size="small"
            >
              <el-form-item
                  v-for="name in optionNames.general"
                  :key="name"
              >
                <template #label>
                  <el-tooltip :content="getDefinitionDescription(name)" popper-class="help-tooltip" trigger="click">
                    <font-awesome-icon :icon="['far', 'question-circle']" class="icon" size="sm"/>
                  </el-tooltip>
                  {{ getDefinitionTitle(name) }}
                </template>
                <FileEditorSettingsFormItem v-model="options[name]" :name="name"/>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Font" name="font">
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <template #footer>
        <el-button plain size="small" type="info" @click="onClose">Cancel</el-button>
        <el-button size="small" type="primary" @click="onConfirm">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, readonly, ref} from 'vue';
import {useStore} from 'vuex';
import {plainClone} from '@/utils/object';
import variables from '@/styles/variables.scss';
import {getOptionDefinition, getThemes} from '@/utils/codemirror';
import FileEditorSettingsFormItem from '@/components/file/FileEditorSettingsFormItem.vue';

export default defineComponent({
  name: 'FileEditorSettingsDialog',
  components: {FileEditorSettingsFormItem},
  setup() {
    const storeNamespace = 'file';
    const store = useStore();
    const {file} = store.state as RootStoreState;

    const visible = computed<boolean>(() => {
      const {editorSettingsDialogVisible} = file;
      return editorSettingsDialogVisible;
    });

    const options = ref<FileEditorConfiguration>({});

    const optionNames = readonly({
      general: [
        'theme',
        'indentUnit',
        'smartIndent',
        'tabSize',
      ],
    });

    const themes = computed<string[]>(() => {
      return getThemes();
    });

    const onClose = () => {
      store.commit(`${storeNamespace}/setEditorSettingsDialogVisible`, false);
    };

    const onConfirm = () => {
      store.commit(`${storeNamespace}/setEditorOptions`, options.value);
    };

    const getDefinitionDescription = (name: string) => {
      return getOptionDefinition(name)?.description;
    };

    const getDefinitionTitle = (name: string) => {
      return getOptionDefinition(name)?.title;
    };

    onBeforeMount(() => {
      const {editorOptions} = file;
      options.value = plainClone(editorOptions);
    });

    return {
      variables,
      visible,
      options,
      themes,
      optionNames,
      onClose,
      onConfirm,
      getDefinitionDescription,
      getDefinitionTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
.file-editor-settings-dialog {
  .form {
    margin: 0 10px;
  }
}
</style>

<style scoped>
.file-editor-settings-dialog >>> .el-form-item > .el-form-item__label .icon {
  cursor: pointer;
}

.file-editor-settings-dialog >>> .el-form-item > .el-form-item__content {
  width: 240px;
}

.file-editor-settings-dialog >>> .el-form-item > .el-form-item__content .el-input,
.file-editor-settings-dialog >>> .el-form-item > .el-form-item__content .el-select {
  width: 100%;
}
</style>
<style>
.help-tooltip {
  max-width: 240px;
}
</style>
