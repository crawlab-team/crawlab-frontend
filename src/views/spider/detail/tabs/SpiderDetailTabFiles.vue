<template>
  <FileEditor
      ref="fileEditor"
      :nav-items="navItems"
      :content="content"
  />
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useRoute} from 'vue-router';
import FileEditor from '@/components/file/FileEditor.vue';

export default defineComponent({
  name: 'SpiderDetailTabFiles',
  components: {FileEditor},
  setup() {
    const route = useRoute();

    const content = ref<string>('');

    const fileEditor = ref<typeof FileEditor>();

    const id = computed(() => route.params.id);

    const navItems = computed<FileNavItem[]>(() => {
      return [
        {
          path: 'test',
          name: 'test',
          is_dir: true,
          children: [
            {
              path: 'test/test_nested.js',
              name: 'test_nested.js',
              is_dir: false,
              extension: 'js',
            }
          ]
        },
        {
          path: 'test.js',
          name: 'test.js',
          is_dir: false,
          extension: 'js',
        },
        {
          path: 'test.py',
          name: 'test.py',
          is_dir: false,
          extension: 'py',
        },
        {
          path: 'test.php',
          name: 'test.php',
          is_dir: false,
          extension: 'php',
        },
        {
          path: 'this-is-a-script.php',
          name: 'this-is-a-script.php',
          is_dir: false,
          extension: 'php',
        },
        {
          path: 'test.sh',
          name: 'test.sh',
          is_dir: false,
          extension: 'sh',
        },
        {
          path: 'test.md',
          name: 'test.md',
          is_dir: false,
          extension: 'md',
        },
        {
          path: 'test.go',
          name: 'test.go',
          is_dir: false,
        },
        {
          path: 'test.cs',
          name: 'test.cs',
          is_dir: false,
        },
        {
          path: 'test.java',
          name: 'test.java',
          is_dir: false,
        },
        {
          path: 'Jenkinsfile',
          name: 'Jenkinsfile',
          is_dir: false,
        },
        {
          path: 'Dockerfile',
          name: 'Dockerfile',
          is_dir: false,
        },
      ];
    });

    return {
      id,
      navItems,
      content,
      fileEditor,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
