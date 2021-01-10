<template>
  Tasks
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'SpiderDetailTabTasks',
  setup() {
    const route = useRoute();

    const id = computed(() => route.params.id);

    return {
      id,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
