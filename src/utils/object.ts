export const plainClone = (obj: any) => {
  if (obj === undefined || obj === null) return obj;
  return JSON.parse(JSON.stringify(obj));
};

export const cloneArray = (arr: any[]) => {
  return Array.from(arr);
};
