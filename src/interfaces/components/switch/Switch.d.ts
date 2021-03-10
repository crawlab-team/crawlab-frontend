interface SwitchProps {
  value: boolean;
  onChange: SwitchChangeFunc;
}

type SwitchChangeFunc = (value: boolean) => void;
