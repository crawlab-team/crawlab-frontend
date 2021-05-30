<template>
  <FileEditor
      ref="fileEditor"
      :nav-items="navItems"
      :content="content"
      @content-change="onContentChange"
      @save-file="onSaveFile"
      @node-db-click="onNavItemDbClick"
      @node-drop="onNavItemDrop"
      @ctx-menu-new-file="onContextMenuNewFile"
      @ctx-menu-new-directory="onContextMenuNewDirectory"
      @ctx-menu-rename="onContextMenuRename"
      @ctx-menu-clone="onContextMenuClone"
      @ctx-menu-delete="onContextMenuDelete"
      @tab-click="onTabClick"
  />
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import FileEditor from '@/components/file/FileEditor.vue';
import {useStore} from 'vuex';
import useSpiderService from '@/services/spider/spiderService';
import {ElMessage} from 'element-plus';

export default defineComponent({
  name: 'SpiderDetailTabFiles',
  components: {FileEditor},
  setup() {
    // route
    const route = useRoute();

    // store
    const ns = 'spider';
    const store = useStore();
    const {commit} = store;
    const {spider: state} = store.state as RootStoreState;

    const {
      listRootDir,
      getFile,
      getFileInfo,
      saveFile,
      renameFile,
      deleteFile,
      copyFile,
    } = useSpiderService(store);

    // spider id
    const id = computed<string>(() => route.params.id as string);

    // file editor
    const fileEditor = ref<typeof FileEditor>();

    // file nav items
    const navItems = computed<FileNavItem[]>(() => state.fileNavItems);

    // file content
    const content = computed<string>(() => state.fileContent);

    const isRoot = (item: FileNavItem): boolean => {
      return item.path === '~';
    };

    const getDirPath = (path: string): string => {
      const arr = path?.split('/') as string[];
      arr.splice(arr.length - 1, 1);
      return arr.join('/');
    };

    const getPath = (item: FileNavItem, name: string): string => {
      let path;
      if (item.is_dir) {
        if (isRoot(item)) {
          path = `/${name}`;
        } else {
          path = `${item.path}/${name}`;
        }
      } else {
        const dirPath = getDirPath(item.path as string);
        path = `${dirPath}/${name}`;
      }
      return path;
    };

    const openFile = async (path: string) => {
      const res = await getFileInfo(id.value, path);
      if (!res.data) return;
      const item = res.data;
      await getFile(id.value, path);
      fileEditor.value?.updateEditorContent();
      fileEditor.value?.updateTabs(item);
      fileEditor.value?.updateContentCache(item, content.value);
    };

    // const onNavItemClick = (item: FileNavItem) => {
    // };

    const onSaveFile = async (item: FileNavItem) => {
      if (!item.path) return;
      await saveFile(id.value, item.path, content.value);
      ElMessage.success('Saved successfully');
    };

    const onNavItemDbClick = async (item: FileNavItem) => {
      await openFile(item.path as string);
    };

    const onNavItemDrop = (items: FileNavItem[]) => {
      // TODO: implement
      commit(`${ns}/setFileNavItems`, items);
    };

    const onContextMenuNewFile = async (item: FileNavItem, name: string) => {
      if (!item.path) return;
      const path = getPath(item, name);
      await saveFile(id.value, path, ' ');
      await listRootDir(id.value);
      await openFile(path);
    };

    const onContextMenuNewDirectory = async (item: FileNavItem, name: string) => {
      if (!item.path) return;
      const path = getPath(item, name);
      await saveFile(id.value, path, '');
      await listRootDir(id.value);
    };

    const onContextMenuRename = async (item: FileNavItem, name: string) => {
      if (!item.path) return;
      const path = getPath(item, name);
      await renameFile(id.value, item.path, path);
      await listRootDir(id.value);
    };

    const onContextMenuClone = async (item: FileNavItem, name: string) => {
      if (!item.path) return;
      const path = getPath(item, name);
      await copyFile(id.value, item.path, path);
      await listRootDir(id.value);
    };

    const onContextMenuDelete = async (item: FileNavItem) => {
      if (!item.path) return;
      await deleteFile(id.value, item.path);
      await listRootDir(id.value);
    };

    const onContentChange = (value: string) => {
      commit(`${ns}/setFileContent`, value);
    };

    const onTabClick = async (tab: FileNavItem) => {
      await getFile(id.value, tab.path as string);
    };

    onMounted(async () => {
      await listRootDir(id.value);
    });

    return {
      id,
      navItems,
      content,
      fileEditor,
      onSaveFile,
      onNavItemDbClick,
      onNavItemDrop,
      onContextMenuNewFile,
      onContextMenuNewDirectory,
      onContextMenuRename,
      onContextMenuClone,
      onContextMenuDelete,
      onContentChange,
      onTabClick,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
