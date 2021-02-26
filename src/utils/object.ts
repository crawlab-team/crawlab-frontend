export const plainClone = (obj: any) => {
  if (obj === undefined || obj === null) return obj;
  return JSON.parse(JSON.stringify(obj));
};
