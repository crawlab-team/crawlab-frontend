import {RuleItem} from 'async-validator';

declare global {
  interface FormItemProps {
    prop?: string;
    label?: string;
    labelTooltip?: string;
    labelWidth?: string;
    size?: string;
    span: number;
    offset: number;
    required: boolean;
    isPlaceholder: boolean;
    rules?: RuleItem | RuleItem[];
    notEditable?: boolean;
  }
}
