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

  const resetForm = () => {
    const {activeDialogKey} = state;
    if (activeDialogKey === 'create') {
      form.value = getNewForm() as T;
    } else if (activeDialogKey === 'edit') {
      form.value = state.form.value;
      formRef.value?.clearValidate();
    }
    formRef.value?.resetFields();
  };

  const {
    create,
    getList,
  } = services;

  // dialog create edit
  const createEditDialogVisible = computed<boolean>(() => {
    const {activeDialogKey} = state;
    if (!activeDialogKey) return false;
    return ['create', 'edit'].includes(activeDialogKey);
  });

  // dialog confirm
  const confirmLoading = computed<boolean>(() => state.confirmLoading);
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
    store.commit(`${ns}/hideDialog`);

    // request list
    await getList();
  };

  // dialog close
  const onClose = () => {
    store.commit(`${ns}/hideDialog`);
  };

  watch(() => state.activeDialogKey, () => {
    resetForm();
  });

  return {
    form,
    formRef,
    validateForm,
    resetForm,
    createEditDialogVisible,
    confirmLoading,
    setConfirmLoading,
    onConfirm,
    onClose,
  };
};

export default useForm;
