<template>
  <Form v-if="form" ref="formRef" :model="form">
    <!-- Row -->
    <FormItem :offset="2" :span="2" label="Spider" prop="spider_id">
      <el-select
          v-model="form.spider_id"
          :disabled="isFormItemDisabled('spider_id') || readonly"
      >
        <el-option
            v-for="op in allSpiderSelectOptions"
            :key="op.value"
            :label="op.label"
            :value="op.value"
        />
      </el-select>
    </FormItem>
    <!-- ./Row -->

    <!-- Row -->
    <FormItem :span="2" label="Command" prop="cmd" required>
      <InputWithButton
          v-model="form.cmd"
          :button-icon="['fa', 'edit']"
          :disabled="isFormItemDisabled('cmd') || readonly"
          button-label="Edit"
          placeholder="Command"
      />
    </FormItem>
    <FormItem :span="2" label="Param" prop="param">
      <InputWithButton
          v-model="form.param"
          :button-icon="['fa', 'edit']"
          :disabled="isFormItemDisabled('param') || readonly"
          button-label="Edit"
          placeholder="Params"
      />
    </FormItem>
    <!-- ./Row -->

    <!-- Row -->
    <FormItem :offset="2" :span="2" label="Mode" prop="mode" required>
      <el-select
          v-model="form.mode"
          :disabled="isFormItemDisabled('mode') || readonly"
      >
        <el-option
            v-for="op in modeOptions"
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
          :disabled="isFormItemDisabled('node_tags') || readonly"
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
          :disabled="(form.mode === TASK_MODE_SELECTED_NODE_TAGS && isFormItemDisabled('node_ids')) || readonly"
          :options="allNodeSelectOptions"
      />
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent, watch} from 'vue';
import {useStore} from 'vuex';
import useSpider from '@/components/spider/spider';
import useNode from '@/components/node/node';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import InputWithButton from '@/components/input/InputWithButton.vue';
import CheckTagGroup from '@/components/tag/CheckTagGroup.vue';
import {TASK_MODE_SELECTED_NODE_TAGS, TASK_MODE_SELECTED_NODES} from '@/constants/task';
import useRequest from '@/services/request';
import useTask from '@/components/task/task';

export default defineComponent({
  name: 'TaskForm',
  components: {
    Form,
    FormItem,
    InputWithButton,
    CheckTagGroup,
  },
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // store
    const store = useStore();

    // use node
    const {
      allListSelectOptions: allNodeSelectOptions,
      allTags: allNodeTags,
    } = useNode(store);

    // use spider
    const {
      allListSelectOptions: allSpiderSelectOptions,
    } = useSpider(store);

    // use task
    const {
      form,
      allSpiderDict,
      modeOptionsDict,
    } = useTask(store);

    // use request
    const {
      get,
    } = useRequest();

    // watch spider id
    watch(() => {
      const task = form.value as Task;
      return task.spider_id;
    }, async () => {
      const task = form.value as Task;
      if (!task.spider_id) return;
      const res = await get<any, Spider>(`/spiders/${task.spider_id}`);
      task.cmd = res.data.cmd;
      task.param = res.data.param;
    });

    const getSpiderName = (id: string) => {
      const spider = allSpiderDict.value.get(id) as Spider;
      return spider?.name;
    };

    const getModeName = (id: string) => {
      const op = modeOptionsDict.value.get(id) as SelectOption;
      return op?.label;
    };

    return {
      ...useTask(store),

      // custom
      TASK_MODE_SELECTED_NODES,
      TASK_MODE_SELECTED_NODE_TAGS,
      allNodeSelectOptions,
      allNodeTags,
      allSpiderSelectOptions,
      getSpiderName,
      getModeName,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
