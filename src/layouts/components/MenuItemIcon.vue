<template>
  <template v-if="!item || !item.icon">
    <i :style="{'font-size': fontSize}" class="menu-item-icon fa fa-circle-o"></i>
  </template>
  <template v-else-if="Array.isArray(item.icon)">
    <font-awesome-icon
        :icon="item.icon"
        :style="{'font-size': fontSize}"
        class="menu-item-icon"
    />
  </template>
  <template v-else>
    <i :class="item.icon" :style="{'font-size': fontSize}" class="menu-item-icon"></i>
  </template>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';

interface MenuItemIconProps {
  item?: MenuItem;
  size?: 'small' | 'normal' | 'large' | string;
}

export default defineComponent({
  name: 'MenuItemIcon',
  props: {
    item: Object,
    size: String,
  },
  setup(props) {
    const fontSize = computed(() => {
      const {size} = props as MenuItemIconProps;
      switch (size) {
        case 'large':
          return '24px';
        case 'normal':
          return '16px';
        case 'small':
          return '12px';
        default:
          return size || '16px';
      }
    });

    return {
      fontSize,
    };
  },
});
</script>
<style lang="scss" scoped>
.menu-item-icon {
  width: 20px;
}
</style>
