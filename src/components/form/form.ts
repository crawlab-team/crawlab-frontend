import {computed, watch} from 'vue';
import {Store} from 'vuex';

const useForm = <T>(ns: StoreListNamespace, store: Store<RootStoreState>, services: Services<T>, data: FormComponentData<T>) => {
  const {
    form,
    formRef,
  } = data;

  const getNewForm = () => {
    return {...form.value} as T;
  };

  // store state
  const state = store.state[ns];

  const validateForm = async () => {
    return await formRef.value?.validate();
  };

  const resetForm = (isCreate: boolean) => {
    if (isCreate) {
      form.value = getNewForm() as T;
    } else {
      form.value = state.form.value;
      formRef.value?.clearValidate();
    }
    formRef.value?.resetFields();
  };

  const {
    create,
    getList,
  } = services;

  // confirm loading
  const confirmLoading = computed(() => state.confirmLoading);
  const setConfirmLoading = (value: boolean) => store.commit(`${ns}/setConfirmLoading`, value);
  const onConfirm = async () => {
    // validate
    try {
      const valid = await validateForm();
      if (!valid) return;
    } catch (ex) {
      console.error(ex);
      return;
    }
    if (!form.value) {
      console.error(new Error('project form is undefined'));
      return;
    }

    // flag of request finished
    let isRequestFinished = false;

    // start loading
    setTimeout(() => {
      if (isRequestFinished) return;
      setConfirmLoading(true);
    }, 50);

    // request
    try {
      const res = await create(form.value as T);
      if (res.error) {
        console.error(res.error);
        return;
      }
    } finally {
      // flag request finished as true
      isRequestFinished = true;

      // stop loading
      setConfirmLoading(false);
    }

    // close
    store.commit(`${ns}/resetDialogs`);

    // request list
    await getList();
  };

  watch(() => state.dialogVisible.create, () => {
    resetForm(true);
  });

  return {
    form,
    formRef,
    validateForm,
    resetForm,
    confirmLoading,
    setConfirmLoading,
    onConfirm,
  };
};

export default useForm;
