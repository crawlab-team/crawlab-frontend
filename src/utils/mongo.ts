export const isZeroObjectId = (id: string): boolean => {
  return !id || id === '000000000000000000000000';
};
