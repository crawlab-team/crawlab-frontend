import {Ref} from 'vue';

declare global {
  interface FormTableFieldProps {
    form: any;
    prop: string;
    fieldType: FormFieldType;
    required?: boolean;
    placeholder?: string;
    onChange?: (value: any) => void;
    onRegister?: (formRef: Ref) => void;
  }
}
