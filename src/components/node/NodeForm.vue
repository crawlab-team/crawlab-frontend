<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :selective="isSelectiveForm"
  >
    <FormItem :span="2" label="Name" not-editable prop="name" required>
      <el-input v-model="form.name" :disabled="isFormItemDisabled('name')" placeholder="Name"/>
    </FormItem>
    <FormItem :span="2" label="Tags" prop="tags">
      <TagInput v-model="form.tags" :disabled="isFormItemDisabled('tags')"/>
    </FormItem>
    <FormItem :span="2" label="Is Master" prop="is_master" required>
      <Switch v-model="form.is_master" :disabled="isFormItemDisabled('is_master')"/>
    </FormItem>
    <FormItem :span="2" label="IP" prop="ip" required>
      <el-input v-model="form.ip" :disabled="isFormItemDisabled('ip')" placeholder="IP"/>
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
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import useNode from '@/components/node/node';
import TagInput from '@/components/input/TagInput.vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import Switch from '@/components/switch/Switch.vue';

export default defineComponent({
  name: 'NodeForm',
  components: {
    Switch,
    Form,
    FormItem,
    TagInput,
  },
  setup(props, {emit}) {
    // store
    const store = useStore();

    return {
      ...useNode(store),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
