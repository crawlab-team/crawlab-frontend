<template>
  <div class="spider-detail-tab-overview">
    <Form v-if="spiderForm" :grid="4" :model="spiderForm" label-width="150px">
      <!-- Row 1 -->
      <FormItem :span="2" label="Name" prop="name" required>
        <el-input v-model="spiderForm.name" placeholder="Name"/>
      </FormItem>
      <FormItem :span="2" label="Display Name" prop="display_name" required>
        <el-input v-model="spiderForm.display_name" placeholder="Display Name"/>
      </FormItem>

      <!-- Row 2 -->
      <FormItem :span="2" label="Command" prop="cmd" required>
        <InputWithButton
            v-model="spiderForm.cmd"
            :button-icon="['fa', 'edit']"
            button-label="Edit"
            placeholder="Command"
        />
      </FormItem>
      <FormItem :span="2" label="Param" prop="param" required>
        <InputWithButton
            v-model="spiderForm.param"
            :button-icon="['fa', 'edit']"
            button-label="Edit"
            placeholder="Params"
        />
      </FormItem>

      <!-- Row 3 -->
      <FormItem :span="2" label="Default Mode" prop="mode" required>
        <el-select v-model="spiderForm.mode">
          <el-option
              v-for="op in modeOptions"
              :key="op.value"
              :label="op.label"
              :value="op.value"
          />
        </el-select>
      </FormItem>
      <FormItem :span="2" is-placeholder/>

      <!-- Row 4 -->
      <FormItem
          v-if="spiderForm.mode === TASK_MODE_SELECTED_NODE_TAGS"
          :span="2"
          label="Selected Tags"
          prop="node_tags"
          required
      >
        <CheckTagGroup
            v-model="spiderForm.node_tags"
            :options="allNodeTags"
        />
      </FormItem>

      <!-- Row 5 -->
      <FormItem
          v-if="[TASK_MODE_SELECTED_NODES, TASK_MODE_SELECTED_NODE_TAGS].includes(spiderForm.mode)"
          :span="4"
          label="Selected Nodes"
          required
      >
        <CheckTagGroup
            v-model="spiderForm.node_ids"
            :disabled="spiderForm.mode === TASK_MODE_SELECTED_NODE_TAGS"
            :options="allNodeSelectOptions"
        />
      </FormItem>

      <FormItem :span="4" label="Description" prop="description">
        <el-input v-model="spiderForm.description" placeholder="Description" type="textarea"/>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import InputWithButton from '@/components/input/InputWithButton.vue';
import useSpider from '@/components/spider/spider';
import {useStore} from 'vuex';
import {TASK_MODE_SELECTED_NODE_TAGS, TASK_MODE_SELECTED_NODES} from '@/constants/task';
import useNode from '@/components/node/node';
import CheckTagGroup from '@/components/tag/CheckTagGroup.vue';

export default defineComponent({
  name: 'SpiderDetailTabOverview',
  components: {
    CheckTagGroup,
    InputWithButton,
    Form,
    FormItem,
  },
  setup() {
    // store
    const store = useStore();

    // use spider
    const {
      id: currentSpiderId,
      modeOptions,
      spiderForm,
      resetSpiderForm,
    } = useSpider(store);

    // use node
    const {
      allNodeSelectOptions,
      setAllNodeSelectOptions,
      allNodeTags,
      setAllNodeTags,
    } = useNode(store);

    onMounted(() => {
      resetSpiderForm();
    });

    return {
      TASK_MODE_SELECTED_NODES,
      TASK_MODE_SELECTED_NODE_TAGS,
      currentSpiderId,
      modeOptions,
      spiderForm,
      allNodeSelectOptions,
      setAllNodeSelectOptions,
      allNodeTags,
      setAllNodeTags,
    };
  },
});
</script>
<style lang="scss" scoped>
.spider-detail-tab-overview {
  margin: 20px;
}
</style>
