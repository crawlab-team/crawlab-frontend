import {Store} from 'vuex';
import {plainClone} from '@/utils/object';

const useFormTable = (ns: ListStoreNamespace, store: Store<RootStoreState>, services: Services<BaseModel>, data: FormComponentData<BaseModel>) => {
  const {
    form,
    formList,
  } = data;

  const getNewForm = () => {
    return {...form.value};
  };

  const onAdd = (index: number) => {
    formList.value.splice(index, 0, getNewForm());
  };

  const onClone = (index: number) => {
    const form = plainClone(formList.value[index]);
    formList.value.splice(index, 0, form);
  };

  const onDelete = (index: number) => {
    formList.value.splice(index, 1);
  };

  const onFieldChange = (rowIndex: number, prop: string, value: any) => {
    formList.value[rowIndex][prop] = value;
  };

  return {
    onAdd,
    onClone,
    onDelete,
    onFieldChange,
  };
};

export default useFormTable;
