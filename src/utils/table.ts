export const getDefaultTableDataWithTotal = (): TableDataWithTotal => {
  return {
    data: [],
    total: 0,
  };
};

export const getTableWidth = (): number | undefined => {
  const elTable = document.querySelector('.list-layout .table');
  if (!elTable) return;
  const style = getComputedStyle(elTable);
  const widthStr = style.width.replace('px', '');
  const width = Number(widthStr);
  if (isNaN(width)) return;
  return width;
};

export const getColumnWidth = (column: TableColumn): number | undefined => {
  let width: number;
  if (typeof column.width === 'string') {
    width = Number(column.width.replace('px', ''));
    if (isNaN(width)) return;
    return width;
  }
  {
    return column.width;
  }
};
