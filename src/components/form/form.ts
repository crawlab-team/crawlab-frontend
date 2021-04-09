import {computed, watch} from 'vue';
import {Store} from 'vuex';

const useForm = (ns: StoreListNamespace, store: Store<RootStoreState>, services: Services<BaseModel>, data: FormComponentData<BaseModel>) => {
  const {
    form,
    formRef,
  } = data;

  const getNewForm = () => {
    return {...form.value};
  };

  // store state
  const state = store.state[ns];

  // active dialog key
  const activeDialogKey = computed<DialogKey | undefined>(() => state.activeDialogKey);

  const validateForm = async () => {
    return await formRef.value?.validate();
  };

  const resetForm = () => {
    const {activeDialogKey} = state;
    if (activeDialogKey === 'create') {
      form.value = getNewForm();
    } else if (activeDialogKey === 'edit') {
      form.value = state.form;
      formRef.value?.clearValidate();
    }
    formRef.value?.resetFields();
  };

  // reset form when activeDialogKey is changed
  watch(() => state.activeDialogKey, resetForm);

  const {
    create,
    updateById,
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
      let res: HttpResponse;
      switch (activeDialogKey.value) {
        case 'create':
          res = await create(form.value);
          break;
        case 'edit':
          res = await updateById(form.value._id as string, form.value);
          break;
        default:
          console.error(`activeDialogKey "${activeDialogKey.value}" is invalid`);
          return;
      }
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
