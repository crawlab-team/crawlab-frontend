<template>
  <Tag
      :key="data"
      :icon="data.icon"
      :label="data.label"
      :size="size"
      :spinning="data.spinning"
      :type="data.type"
      class="task-status"
      @click="$emit('click')"
  >
    <template #tooltip>
      <div v-html="data.tooltip"/>
    </template>
  </Tag>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import Tag from '@/components/tag/Tag.vue';
import {parseExpression} from 'cron-parser';
import cronstrue from 'cronstrue/i18n';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';
import colors from '@/styles/color.scss';

// TODO: internalization
dayjs.extend(localizedFormat);
// dayjs.locale('zh-cn');

export default defineComponent({
  name: 'ScheduleCron',
  components: {
    Tag,
  },
  props: {
    cron: {
      type: String,
      required: false,
    },
    size: {
      type: String as PropType<BasicSize>,
      required: false,
      default: 'mini',
    },
  },
  setup(props: ScheduleCronProps, {emit}) {
    const data = computed<TagData>(() => {
      const {cron} = props;
      if (!cron) {
        return {
          label: 'Unknown',
          tooltip: 'Unknown',
          type: 'info',
        };
      }

      const interval = parseExpression(cron);
      const next = dayjs(interval.next().toDate()).format('llll');
      // TODO: internalization
      // const description = cronstrue.toString(cron, {locale: 'zh_CN'});
      const description = cronstrue.toString(cron);

      return {
        label: cron,
        tooltip: `<span class="title">Cron Expression: </span><span style="color: ${colors.blue}">${cron}</span><br>
<span class="title">Description: </span><span style="color: ${colors.orange}">${description}</span><br>
<span class="title">Next: </span><span style="color: ${colors.green}">${next}</span>`,
        type: 'primary',
      };
    });

    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
