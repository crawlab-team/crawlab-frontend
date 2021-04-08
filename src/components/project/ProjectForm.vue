<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :rules="projectFormRules"
  >
    <FormItem :span="2" label="Name" prop="name" required>
      <el-input v-model="form.name" placeholder="Name"/>
    </FormItem>
    <FormItem :span="2" label="Tags" prop="tags">
      <TagInput v-model="form.tags"/>
    </FormItem>
    <FormItem :span="4" label="Description" prop="description">
      <el-input v-model="form.description" placeholder="Description" type="textarea"/>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import Form from '@/components/form/Form.vue';
import {useStore} from 'vuex';
import useProject from '@/components/project/project';
import FormItem from '@/components/form/FormItem.vue';
import TagInput from '@/components/input/TagInput.vue';

export default defineComponent({
  name: 'ProjectForm',
  components: {TagInput, FormItem, Form},
  props: {
    isCreate: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: ProjectFormProps) {
    // store
    const store = useStore();

    const {
      projectFormRules,
      form,
      formRef,
      resetForm,
    } = useProject(store);

    onMounted(() => {
      const {isCreate} = props;
      resetForm(isCreate);
    });

    return {
      form,
      formRef,
      projectFormRules,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
