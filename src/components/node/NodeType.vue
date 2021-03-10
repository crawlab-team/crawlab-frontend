<template>
  <el-tag :type="type" class="node-type" size="mini">
    <font-awesome-icon :icon="icon" class="icon"/>
    <span>{{ label }}</span>
  </el-tag>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'NodeType',
  props: {
    isMaster: {
      type: Boolean,
    },
  },
  setup(props: NodeTypeProps, {emit}) {
    const type = computed<string>(() => {
      const {isMaster} = props;
      return isMaster ? 'primary' : 'warning';
    });

    const label = computed<string>(() => {
      const {isMaster} = props;
      return isMaster ? 'Master' : 'Worker';
    });

    const icon = computed<string[]>(() => {
      const {isMaster} = props;
      return isMaster ? ['fa', 'home'] : ['fa', 'server'];
    });

    return {
      type,
      label,
      icon,
    };
  },
});
</script>

<style lang="scss" scoped>
.node-type {
  .icon {
    margin-right: 5px;
  }
}
</style>
