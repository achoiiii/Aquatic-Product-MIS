// GUIDANCE: 区分 localStorage
const prefix = 'AquaticMIS';

export const setStorage = (key: string, value: any) => {
  const storageKey = `${prefix}_${key}`;
  const data = typeof value === 'object' ? JSON.stringify(value) : value;
  localStorage.setItem(storageKey, data);
};

export const getStorage = (key: string): any => {
  const storageKey = `${prefix}_${key}`;
  const result = localStorage.getItem(storageKey);

  if (result && /^{|\[/.test(result)) {
    return JSON.parse(result);
  }

  return result;
};
