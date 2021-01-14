<template>
  <FileEditor
      :nav-items="navItems"
  />
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useRoute} from 'vue-router';
import FileEditor from '@/components/file/FileEditor.vue';

export default defineComponent({
  name: 'SpiderDetailTabFiles',
  components: {FileEditor},
  setup() {
    const route = useRoute();

    const id = computed(() => route.params.id);

    const navItems = computed<FileNavItem[]>(() => {
      return [
        {
          name: 'test',
          is_dir: true,
          children: [
            {
              name: 'test_nested.js',
              is_dir: false,
              extension: 'js',
            }
          ]
        },
        {
          name: 'test.js',
          is_dir: false,
          extension: 'js',
        },
        {
          name: 'test.py',
          is_dir: false,
          extension: 'py',
        },
        {
          name: 'test.php',
          is_dir: false,
          extension: 'php',
        },
        {
          name: 'this-is-a-script.php',
          is_dir: false,
          extension: 'php',
        },
        {
          name: 'test.sh',
          is_dir: false,
          extension: 'sh',
        },
        {
          name: 'test.md',
          is_dir: false,
          extension: 'md',
        },
        {
          name: 'test.go',
          is_dir: false,
        },
        {
          name: 'test.cs',
          is_dir: false,
        },
        {
          name: 'test.java',
          is_dir: false,
        },
        {
          name: 'Jenkinsfile',
          is_dir: false,
        },
        {
          name: 'Dockerfile',
          is_dir: false,
        },
      ];
    });

    return {
      id,
      navItems,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
