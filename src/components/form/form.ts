import {Ref, ref, UnwrapRef, watch} from 'vue';
import {Store} from 'vuex';

const useForm = <T>(defaultForm: T, ns: StoreListNamespace, store: Store<RootStoreState>, services: Services<T>, formRef: Ref) => {
  const getNewForm = () => {
    return {...defaultForm} as T;
  };

  // store state
  const state = store.state[ns];

  // form
  const form = ref<T>(getNewForm());

  const validateForm = async () => {
    console.log(1);
    return await formRef.value?.validate();
  };

  const resetForm = (isCreate: boolean) => {
    if (isCreate) {
      form.value = getNewForm() as UnwrapRef<T>;
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

  const confirmLoading = ref<boolean>(false);

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

    // start loading
    confirmLoading.value = true;

    // request
    const res = await create(form.value as T);

    // stop loading
    confirmLoading.value = false;

    // hide
    if (!res.error) {
      close();
    }

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
    onConfirm,
  };
};

export default useForm;
