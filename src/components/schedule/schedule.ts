import {computed, readonly, watch} from 'vue';
import {Store} from 'vuex';
import useForm from '@/components/form/form';
import useScheduleService from '@/services/schedule/scheduleService';
import {getDefaultFormComponentData} from '@/utils/form';
import {FORM_FIELD_TYPE_INPUT, FORM_FIELD_TYPE_INPUT_TEXTAREA, FORM_FIELD_TYPE_TAG_INPUT} from '@/constants/form';
import {parseExpression} from 'cron-parser';
import {getModeOptions} from '@/utils/task';

// get new schedule
export const getNewSchedule = (): Schedule => {
  return {
    enabled: true,
  };
};

// form component data
const formComponentData = getDefaultFormComponentData<Schedule>(getNewSchedule);

const useSchedule = (store: Store<RootStoreState>) => {
  // store
  const ns = 'schedule';
  const state = store.state[ns];

  // all spider dict
  const allSpiderDict = computed<Map<string, Spider>>(() => store.getters['spider/allDict']);

  // form
  const form = computed<Schedule>(() => state.form);

  // options for default mode
  const modeOptions = getModeOptions();

  // batch form fields
  const batchFormFields = computed<FormTableField[]>(() => [
    {
      prop: 'name',
      label: 'Name',
      width: '150',
      fieldType: FORM_FIELD_TYPE_INPUT,
      placeholder: 'Name',
      required: true,
    },
    {
      prop: 'tags',
      label: 'Tags',
      width: '200',
      placeholder: 'Tags',
      fieldType: FORM_FIELD_TYPE_TAG_INPUT,
    },
    {
      prop: 'description',
      label: 'Description',
      width: '800',
      placeholder: 'Description',
      fieldType: FORM_FIELD_TYPE_INPUT_TEXTAREA,
    },
  ]);

  // form rules
  const formRules = readonly<FormRules>({
    cron: {
      validator: ((_, value: string, callback) => {
        const invalidMessage = 'Invalid cron expression. [min] [hour] [day of month] [month] [day of week]';
        if (!value) return callback(invalidMessage);
        if (value.trim().split(' ').length != 5) return callback(invalidMessage);
        try {
          parseExpression(value);
          callback();
        } catch (e) {
          callback(e.message);
        }
      }),
    },
  });

  // all schedule select options
  const allScheduleSelectOptions = computed<SelectOption[]>(() => state.allList.map(d => {
    return {
      label: d.name,
      value: d._id,
    };
  }));

  watch(() => form.value?.spider_id, () => {
    if (!form.value?.spider_id) return;
    const spider = allSpiderDict.value.get(form.value?.spider_id);
    if (!spider) return;
    const payload = {...form.value} as Schedule;
    if (spider.cmd) payload.cmd = spider.cmd;
    if (spider.param) payload.param = spider.param;
    if (spider.mode) payload.mode = spider.mode;
    if (spider.node_ids?.length) payload.node_ids = spider.node_ids;
    if (spider.node_tags?.length) payload.node_tags = spider.node_tags;
    store.commit(`${ns}/setForm`, payload);
  });

  return {
    ...useForm('schedule', store, useScheduleService(store), formComponentData),
    modeOptions,
    batchFormFields,
    formRules,
    allScheduleSelectOptions,
  };
};

export default useSchedule;
