import {RuleItem} from 'async-validator';
import {Ref} from 'vue';

declare global {
  interface FormProps {
    inline: boolean;
    labelWidth?: string;
    size?: string;
    grid: number;
    rules?: FormRuleItem | FormRuleItem[];
  }

  interface FormContext {
    labelWidth?: string;
    size?: string;
    grid: number;
  }

  interface FormModel {
    [key: string]: any;
  }

  interface FormRuleItem extends RuleItem {
    trigger?: string;
  }

  interface FormRules {
    [key: string]: FormRuleItem | FormRuleItem[];
  }

  type FormValidateCallback = (valid: boolean) => void;

  interface FormComponentData<T> {
    form: Ref<T>;
    formRef: Ref;
    formList: Ref<T[]>;
  }

  type DefaultFormFunc<T> = () => T;

  type FormEditType = 'single' | 'batch';
}
