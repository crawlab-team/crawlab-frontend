<template>
  <div class="home">
    <el-row class="row-overview-metrics">
      <el-col
          v-for="(m, i) in metrics"
          :key="i"
          :span="24 / metrics.length"
      >
        <Metric
            :icon="m.icon"
            :title="m.name"
            :value="m.value"
        />
      </el-col>
    </el-row>
    <el-row class="row-line-chart">
      <LineChart
          :config="dailyConfig"
          is-time-series
          label-key="date"
      />
    </el-row>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import useRequest from '@/services/request';
import LineChart from '@/components/chart/LineChart.vue';
import dayjs from 'dayjs';
import {spanDateRange} from '@/utils/stats';
import Metric from '@/components/chart/Metric.vue';

const {
  get,
} = useRequest();

export default defineComponent({
  name: 'Home',
  components: {Metric, LineChart},
  setup() {
    const dateRange = ref<DateRange>({
      start: dayjs().subtract(30, 'day'),
      end: dayjs(),
    });

    const metrics = ref<MetricMeta[]>([
      {name: 'Tasks', icon: ['fa', 'tasks'], key: 'tasks', value: 0},
      {name: 'Results', icon: ['fa', 'table'], key: 'results', value: 0},
      {name: 'Spiders', icon: ['fa', 'spider'], key: 'spiders', value: 0},
      {name: 'Nodes', icon: ['fa', 'server'], key: 'nodes', value: 0},
    ]);

    const dailyConfig = ref<EChartsConfig>({
      dataMetas: [
        {
          key: 'tasks',
          name: 'Tasks',
          yAxisIndex: 0,
        },
        {
          key: 'results',
          name: 'Results',
          yAxisIndex: 1,
        },
      ],
      data: [],
      option: {
        title: {
          text: 'Daily Stats',
        },
        yAxis: [
          {name: 'Tasks', position: 'left'},
          {name: 'Results', position: 'right'},
        ],
      },
    });

    const getOverview = async () => {
      // TODO: filter by date range?
      // const {start, end} = dateRange.value;
      const res = await get(`/stats/overview`);
      metrics.value.forEach(m => {
        m.value = res.data[m.key];
      });
    };

    const getDaily = async () => {
      // TODO: filter by date range?
      const {start, end} = dateRange.value;
      const res = await get(`/stats/daily`);
      dailyConfig.value.data = spanDateRange(start, end, res.data, 'date');
    };

    const getData = async () => Promise.all([
      getOverview(),
      getDaily(),
    ]);

    onMounted(async () => {
      await getData();
    });

    return {
      metrics,
      dailyConfig,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.home {
  background: white;
  min-height: calc(100vh - #{$headerHeight} - #{$tabsViewHeight});
  padding: 20px;

  .row-line-chart {
    height: 400px;
  }
}
</style>
