import {RuleItem} from 'async-validator';
import {ElForm} from 'element-plus';
import {Ref} from 'vue';

declare global {
  interface FormProps {
    inline: boolean;
    labelWidth?: string;
    size?: string;
    grid: number;
    rules?: FormRuleItem | FormRuleItem[];
    formRef?: typeof ElForm;
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
  }

  type DefaultFormFunc<T> = () => T;
}
