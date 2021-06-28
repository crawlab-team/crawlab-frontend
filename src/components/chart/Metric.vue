<template>
  <div class="metric">
    <div class="icon">
      <font-awesome-icon :icon="icon"/>
    </div>
    <div class="info">
      <div class="title">
        {{ title }}
      </div>
      <div class="value">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'Metric',
  props: {
    title: {
      type: String,
    },
    value: {
      type: [Number, String],
    },
    icon: {
      type: [String, Array] as PropType<Icon>,
    },
  },
  setup(props: MetricProps, {emit}) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.metric {
  padding: 10px;
  margin: 20px;
  display: flex;
  border: 1px solid $infoLightColor;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 64px;
    font-size: 32px;
  }

  .info {
    margin-left: 10px;
    height: 48px;

    .title {
      height: 24px;
      line-height: 24px;
      //padding: 5px;
    }

    .value {
      height: 24px;
      line-height: 24px;
      //padding: 5px;
    }
  }
}
</style>
