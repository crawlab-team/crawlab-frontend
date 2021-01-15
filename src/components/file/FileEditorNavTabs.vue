<template>
  <div class="file-editor-nav-tabs">
    <DraggableList
        :items="tabs"
    >
      <template v-slot="{item}">
        <div class="file-editor-nav-tab">
          {{ item }}
        </div>
      </template>
    </DraggableList>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DraggableList from '@/components/drag/DraggableList.vue';

export default defineComponent({
  name: 'FileEditorNavTabs',
  components: {DraggableList},
  props: {
    activeTab: {
      type: Object,
      required: false,
    },
    tabs: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
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
