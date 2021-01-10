<template>
  <el-button @click="onClick">
    Spider Detail
  </el-button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'SpiderList',
  setup() {
    const router = useRouter();

    const onClick = () => {
      router.push('/spiders/1');
    };

    return {
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
