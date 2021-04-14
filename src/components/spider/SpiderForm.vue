<template>
  <Form v-if="form" ref="formRef" :model="form">
    <!-- Row -->
    <FormItem :span="2" label="Name" prop="name" required>
      <el-input v-model="form.name" :disabled="isFormItemDisabled('name')" placeholder="Name"/>
    </FormItem>
    <FormItem :span="2" label="Display Name" prop="display_name" required>
      <el-input v-model="form.display_name" :disabled="isFormItemDisabled('display_name')" placeholder="Display Name"/>
    </FormItem>
    <!-- ./Row -->

    <!-- Row -->
    <FormItem :span="2" label="Command" prop="cmd" required>
      <InputWithButton
          v-model="form.cmd"
          :button-icon="['fa', 'edit']"
          button-label="Edit"
          placeholder="Command"
          :disabled="isFormItemDisabled('cmd')"
      />
    </FormItem>
    <FormItem :span="2" label="Param" prop="param" required>
      <InputWithButton
          v-model="form.param"
          :button-icon="['fa', 'edit']"
          button-label="Edit"
          placeholder="Params"
          :disabled="isFormItemDisabled('param')"
      />
    </FormItem>
    <!-- ./Row -->

    <!-- Row -->
    <FormItem :span="2" label="Default Mode" prop="mode" required>
      <el-select
          v-model="form.mode"
          :disabled="isFormItemDisabled('mode')"
      >
        <el-option
            v-for="op in modeOptions"
            :key="op.value"
            :label="op.label"
            :value="op.value"
        />
      </el-select>
    </FormItem>
    <FormItem :span="2" label="Project" prop="project_id" required>
      <el-select
          v-model="form.project_id"
          :disabled="isFormItemDisabled('project_id')"
      >
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
          :disabled="isFormItemDisabled('node_tags')"
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
          :options="allNodeSelectOptions"
          :disabled="form.mode === TASK_MODE_SELECTED_NODE_TAGS && isFormItemDisabled('node_ids')"
      />
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
import useSpider from '@/components/spider/spider';
import useNode from '@/components/node/node';
import useProject from '@/components/project/project';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import InputWithButton from '@/components/input/InputWithButton.vue';
import CheckTagGroup from '@/components/tag/CheckTagGroup.vue';
import {TASK_MODE_SELECTED_NODE_TAGS, TASK_MODE_SELECTED_NODES} from '@/constants/task';

export default defineComponent({
  name: 'SpiderForm',
  components: {
    Form,
    FormItem,
    InputWithButton,
    CheckTagGroup,
  },
  setup() {
    // store
    const store = useStore();

    // use node
    const {
      allListSelectOptions: allNodeSelectOptions,
      allTags: allNodeTags,
    } = useNode(store);

    // use project
    const {
      allListSelectOptions: allProjectSelectOptions,
    } = useProject(store);

    return {
      ...useSpider(store),

      // custom
      TASK_MODE_SELECTED_NODES,
      TASK_MODE_SELECTED_NODE_TAGS,
      allNodeSelectOptions,
      allNodeTags,
      allProjectSelectOptions,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
