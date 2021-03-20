<template>
  <Form v-if="projectForm" :model="projectForm">
    <FormItem :span="2" label="Name" prop="name" required>
      <el-input v-model="projectForm.name" placeholder="Name"/>
    </FormItem>
    <FormItem :span="2" label="Display Name" prop="display_name" required>
      <el-input v-model="projectForm.display_name" placeholder="Display Name"/>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import Form from '@/components/form/Form.vue';
import {useStore} from 'vuex';
import useProject from '@/components/project/project';
import FormItem from '@/components/form/FormItem.vue';

export default defineComponent({
  name: 'ProjectForm',
  components: {FormItem, Form},
  props: {
    isCreate: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, {emit}) {
    // store
    const store = useStore();

    const {
      projectForm,
      resetProjectForm,
    } = useProject(store);

    onMounted(() => {
      const {isCreate} = props;
      if (!isCreate) {
        resetProjectForm();
      }
    });

    return {
      projectForm,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
