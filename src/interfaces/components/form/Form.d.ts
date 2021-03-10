interface FormProps {
  inline: boolean;
  labelWidth?: string;
  size?: string;
  grid: number;
}

interface FormContext {
  labelWidth?: string;
  size?: string;
  grid: number;
}

interface FormModel {
  [key: string]: any;
}
