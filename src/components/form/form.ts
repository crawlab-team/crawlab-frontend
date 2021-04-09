import {computed, watch} from 'vue';
import {Store} from 'vuex';
import {plainClone} from '@/utils/object';

const useForm = (ns: ListStoreNamespace, store: Store<RootStoreState>, services: Services<BaseModel>, data: FormComponentData<BaseModel>) => {
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

  // is selective form
  const isSelectiveForm = computed<boolean>(() => state.isSelectiveForm);

  // selected form fields
  const selectedFormFields = computed<string[]>(() => state.selectedFormFields);

  const validateForm = async () => {
    return await formRef.value?.validate();
  };

  const resetForm = () => {
    const {activeDialogKey} = state;
    switch (activeDialogKey) {
      case 'create':
        form.value = getNewForm();
        break;
      case 'edit':
        form.value = plainClone(state.form);
        formRef.value?.clearValidate();
        break;
    }
    formRef.value?.resetFields();
  };

  // reset form when activeDialogKey is changed
  watch(() => state.activeDialogKey, resetForm);

  // whether form item is disabled
  const isFormItemDisabled = (prop: string) => {
    if (!isSelectiveForm.value) return false;
    if (!prop) return false;
    return !selectedFormFields.value.includes(prop);
  };

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
    isSelectiveForm,
    selectedFormFields,
    validateForm,
    resetForm,
    isFormItemDisabled,
    activeDialogKey,
    createEditDialogVisible,
    confirmLoading,
    setConfirmLoading,
    onConfirm,
    onClose,
  };
};

export default useForm;
