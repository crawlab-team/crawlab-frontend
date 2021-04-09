<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :rules="projectFormRules"
      :selective="isSelectiveForm"
  >
    <FormItem :span="2" label="Name" not-editable prop="name" required>
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
      // default
      activeDialogKey,
      isSelectiveForm,
      selectedFormFields,
      form,
      formRef,
      resetForm,
      isFormItemDisabled,

      // custom
      projectFormRules,
    } = useProject(store);

    onBeforeMount(() => {
      resetForm();
    });

    return {
      // default
      activeDialogKey,
      isSelectiveForm,
      selectedFormFields,
      form,
      formRef,
      isFormItemDisabled,

      // custom
      projectFormRules,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
