<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :rules="projectFormRules"
      :selective="isSelectiveForm"
  >
    <FormItem :span="2" label="Name" prop="name" required>
      <el-input v-model="form.name" :disabled="isFormItemDisabled('name')" placeholder="Name"/>
    </FormItem>
    <FormItem :span="2" label="Tags" prop="tags">
      <TagInput v-model="form.tags" :disabled="isFormItemDisabled('tags')"/>
    </FormItem>
    <FormItem :span="4" label="Description" prop="description">
      <el-input
          v-model="form.description"
          :disabled="isFormItemDisabled('description')"
          placeholder="Description"
          type="textarea"
      />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount} from 'vue';
import Form from '@/components/form/Form.vue';
import {useStore} from 'vuex';
import useProject from '@/components/project/project';
import FormItem from '@/components/form/FormItem.vue';
import TagInput from '@/components/input/TagInput.vue';

export default defineComponent({
  name: 'ProjectForm',
  components: {TagInput, FormItem, Form},
  setup() {
    // store
    const store = useStore();

    const {
      activeDialogKey,
      isSelectiveForm,
      selectedFormFields,
      projectFormRules,
      form,
      formRef,
      resetForm,
      isFormItemDisabled,
    } = useProject(store);

    onBeforeMount(() => {
      resetForm();
    });

    return {
      activeDialogKey,
      isSelectiveForm,
      selectedFormFields,
      form,
      formRef,
      projectFormRules,
      isFormItemDisabled,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
