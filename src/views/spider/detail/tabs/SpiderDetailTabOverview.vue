<template>
  <div class="spider-detail-tab-overview">
    <Form :grid="4" label-width="150px">
      <FormItem :span="2" label="Name" required>
        <el-input placeholder="Name"/>
      </FormItem>
      <FormItem :span="2" label="Display Name" required>
        <el-input placeholder="Display Name"/>
      </FormItem>
      <FormItem :span="2" label="Command" required>
        <el-input placeholder="Command"/>
      </FormItem>
      <FormItem :span="4" label="Remark">
        <el-input placeholder="Remark" type="textarea"/>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useRoute} from 'vue-router';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';

export default defineComponent({
  name: 'SpiderDetailTabOverview',
  components: {
    Form,
    FormItem,
  },
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
.spider-detail-tab-overview {
  margin: 20px;
}
</style>
