<template>
  <span>ID: {{ id }}</span>
  <span>Tab Name: {{ tabName }}</span>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'SpiderDetailContent',
  setup() {
    const route = useRoute();

    const id = computed(() => route.params.id);
    const tabName = computed(() => route.params.tab);

    return {
      id,
      tabName,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
