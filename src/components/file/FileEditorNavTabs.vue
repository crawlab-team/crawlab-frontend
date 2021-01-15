<template>
  <div class="file-editor-nav-tabs">
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'FileEditorNavTabs',
  props: {
    items: Array,
  },
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.file-editor-nav-tabs {
}
</style>
