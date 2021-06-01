<template>
  <DetailLayout store-namespace="task">
    <template #actions>
    </template>
  </DetailLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import useTaskDetail from '@/views/task/detail/taskDetail';
import DetailLayout from '@/layouts/DetailLayout.vue';

export default defineComponent({
  name: 'TaskDetail',
  components: {
    DetailLayout,
  },
  setup(props, {emit}) {
    return {
      ...useTaskDetail(),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
