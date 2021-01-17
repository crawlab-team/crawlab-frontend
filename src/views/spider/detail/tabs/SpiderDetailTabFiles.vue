<template>
  <FileEditor
      ref="fileEditor"
      :nav-items="navItems"
      :content="content"
      @content-change="onContentChange"
      @node-db-click="onNavItemDbClick"
      @tab-click="onTabClick"
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
              path: 'test/nested',
              name: 'nested',
              is_dir: true,
              children: [
                {
                  path: 'test/nested/test_nested.js',
                  name: 'test_nested.js',
                  is_dir: false,
                  extension: 'js',
                },
                {
                  path: 'test/nested/test_nested.py',
                  name: 'test_nested.py',
                  is_dir: false,
                  extension: 'py',
                }
              ],
            },
            {
              path: 'test/test_nested.js',
              name: 'test_nested.js',
              is_dir: false,
              extension: 'js',
            },
            {
              path: 'test/test_nested.py',
              name: 'test_nested.py',
              is_dir: false,
              extension: 'py',
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

    // const onNavItemClick = (item: FileNavItem) => {
    // };

    const _testUpdateContent = (item: FileNavItem) => {
      // TODO: debug
      // console.log(item)
      if (item.name === 'test.py') {
        content.value = `import os
for i in range(10):
    print(i)
`;
      } else if (item.name === 'test.js') {
        content.value = `const path = require('path')
console.log('it works')
`;
      } else {
        content.value = '# no content';
      }
    };

    const onNavItemDbClick = (item: FileNavItem) => {
      // TODO: implement
      _testUpdateContent(item);
    };

    const onContentChange = (value: string) => {
      content.value = value;
    };

    const onTabClick = (tab: FileNavItem) => {
      // TODO: implement
      _testUpdateContent(tab);
    };

    return {
      id,
      navItems,
      content,
      fileEditor,
      onNavItemDbClick,
      onContentChange,
      onTabClick,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
