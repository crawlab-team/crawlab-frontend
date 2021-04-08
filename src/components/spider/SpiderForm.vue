<template>
  <Form v-if="form" ref="formRef" :model="form">
    <!-- Row -->
    <FormItem :span="2" label="Name" prop="name" required>
      <el-input v-model="form.name" placeholder="Name"/>
    </FormItem>
    <FormItem :span="2" label="Display Name" prop="display_name" required>
      <el-input v-model="form.display_name" placeholder="Display Name"/>
    </FormItem>
    <!-- ./Row -->

    <!-- Row -->
    <FormItem :span="2" label="Command" prop="cmd" required>
      <InputWithButton
          v-model="form.cmd"
          :button-icon="['fa', 'edit']"
          button-label="Edit"
          placeholder="Command"
      />
    </FormItem>
    <FormItem :span="2" label="Param" prop="param" required>
      <InputWithButton
          v-model="form.param"
          :button-icon="['fa', 'edit']"
          button-label="Edit"
          placeholder="Params"
      />
    </FormItem>
    <!-- ./Row -->

    <!-- Row -->
    <FormItem :span="2" label="Default Mode" prop="mode" required>
      <el-select v-model="form.mode">
        <el-option
            v-for="op in modeOptions"
            :key="op.value"
            :label="op.label"
            :value="op.value"
        />
      </el-select>
    </FormItem>
    <FormItem :span="2" label="Project" prop="project_id" required>
      <el-select v-model="form.project_id">
        <el-option
            v-for="op in allProjectSelectOptions"
            :key="op.value"
            :label="op.label"
            :value="op.value"
        />
      </el-select>
    </FormItem>
    <!-- ./Row -->

    <FormItem
        v-if="form.mode === TASK_MODE_SELECTED_NODE_TAGS"
        :span="4"
        label="Selected Tags"
        prop="node_tags"
        required
    >
      <CheckTagGroup
          v-model="form.node_tags"
          :options="allNodeTags"
      />
    </FormItem>

    <FormItem
        v-if="[TASK_MODE_SELECTED_NODES, TASK_MODE_SELECTED_NODE_TAGS].includes(form.mode)"
        :span="4"
        label="Selected Nodes"
        required
    >
      <CheckTagGroup
          v-model="form.node_ids"
          :disabled="form.mode === TASK_MODE_SELECTED_NODE_TAGS"
          :options="allNodeSelectOptions"
      />
    </FormItem>

    <FormItem :span="4" label="Description" prop="description">
      <el-input v-model="form.description" placeholder="Description" type="textarea"/>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {TASK_MODE_SELECTED_NODE_TAGS, TASK_MODE_SELECTED_NODES} from '@/constants/task';
import {useStore} from 'vuex';
import useSpider from '@/components/spider/spider';
import useNode from '@/components/node/node';
import useProject from '@/components/project/project';
import InputWithButton from '@/components/input/InputWithButton.vue';
import CheckTagGroup from '@/components/tag/CheckTagGroup.vue';

export default defineComponent({
  name: 'SpiderForm',
  components: {
    Form,
    FormItem,
    InputWithButton,
    CheckTagGroup,
  },
  props: {
    isCreate: {
      type: Boolean,
      default: false,
    }
  },
  setup(props: SpiderFormProps, {emit}) {
    // store
    const store = useStore();

    // use spider
    const {
      id: currentSpiderId,
      modeOptions,
      form,
      formRef,
      resetForm,
    } = useSpider(store);

    // use node
    const {
      allNodeSelectOptions,
      allNodeTags,
    } = useNode(store);

    // use project
    const {
      allProjectSelectOptions,
    } = useProject(store);

    onMounted(() => {
      const {isCreate} = props;
      resetForm(isCreate);
    });

    return {
      TASK_MODE_SELECTED_NODES,
      TASK_MODE_SELECTED_NODE_TAGS,
      currentSpiderId,
      modeOptions,
      form,
      formRef,
      allNodeSelectOptions,
      allNodeTags,
      allProjectSelectOptions,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
