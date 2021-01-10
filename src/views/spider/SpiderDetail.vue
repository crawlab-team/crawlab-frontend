<template>
  <el-row>
    <div class="control-panel">
    </div>
  </el-row>
  <el-row>
    <NavSidebar
        ref="navSidebar"
        :items="items"
        :active-key="activeKey"
        @select="onNavSidebarClick"
    />
    <router-view/>
  </el-row>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import NavSidebarComp from '@/components/nav/NavSidebar.vue';
import {useRoute, useRouter} from 'vue-router';

export default defineComponent({
  name: 'SpiderDetail',
  components: {
    NavSidebar: NavSidebarComp,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navSidebar = ref<NavSidebar | null>(null);

    const items = computed<NavItem[]>(() => {
      const list = [] as NavItem[];
      for (let i = 0; i < 50; i++) {
        const s: Spider = {
          _id: (i + 1).toString(),
          name: `spider-${i + 1}`,
          display_name: `Spider ${i + 1}`,
        };
        list.push({
          id: s._id,
          title: s.display_name,
          subtitle: s.name,
        });
      }
      return list;
    });

    const activeKey = computed<string>(() => {
      const {id} = route.params;
      const activeItem = items.value.find(d => d.id === id);
      return activeItem?.id || '';
    });

    const onNavSidebarClick = (id: string) => {
      router.push(`/spiders/${id}`);
    };

    onMounted(() => {
      if (!navSidebar.value) return;
      navSidebar.value.scroll(activeKey.value);
    });

    return {
      items,
      activeKey,
      navSidebar,
      onNavSidebarClick,
    };
  },
});
</script>
<style scoped lang="scss">
</style>
