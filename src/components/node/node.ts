import {readonly} from 'vue';
import {Store} from 'vuex';
import useForm from '@/components/form/form';
import useNodeService from '@/services/node/nodeService';
import {getDefaultFormComponentData} from '@/utils/form';

type Node = CNode;

// get new node
const getNewNode = (): Node => {
  return {
    tags: [],
  };
};

// form component data
const formComponentData = getDefaultFormComponentData<Node>(getNewNode);

const useNode = (store: Store<RootStoreState>) => {
  // store
  const ns = 'node';
  const {node: state} = store.state as RootStoreState;

  // batch form fields
  const batchFormFields: FormTableField[] = [];

  // form rules
  const formRules = readonly<FormRules>({});

  return {
    ...useForm(ns, store, useNodeService(store), formComponentData),
    batchFormFields,
    formRules,
  };
};

export default useNode;
