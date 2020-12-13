<template>
  <BasicLayout>
    Home
  </BasicLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import BasicLayout from '@/layouts/BasicLayout.vue';

export default defineComponent({
  name: 'Home',
  components: {
    BasicLayout,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
