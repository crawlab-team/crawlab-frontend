interface FormTableProps {
  data: TableData;
  fields: FormTableField[];
}

interface FormTableField {
  prop: string;
  label: string;
  width?: string;
  fieldType: FormFieldType;
}
