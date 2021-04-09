import {ref} from 'vue';

export const getDefaultFormComponentData = <T>(defaultFn: DefaultFormFunc<T>) => {
  return {
    form: ref<T>(defaultFn()),
    formList: ref<T[]>([]),
    formRef: ref(),
  } as FormComponentData<T>;
};
