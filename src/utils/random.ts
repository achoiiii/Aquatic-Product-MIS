/**
 * 随机从数组中获取数据
 * @param arr 随机数组
 * @param oldIndex 上一次随机数据对应的下标
 * @returns [当前随机数据，当前随机数据对应的下标]
 */
export function random<T>(arr: T[], oldIndex?: number): [T, number] {
  if (Array.isArray(arr)) {
    const len = arr.length;
    let newIndex = Math.floor(Math.random() * len);

    // 前后两次随机去重
    if (oldIndex !== undefined && oldIndex === newIndex) {
      newIndex >= len - 1 ? newIndex-- : newIndex++;
    }

    return [arr[newIndex], newIndex];
  }

  return [{}, -1] as [T, number];
}

/** 获取随机下标 */
export function getRandomIndex(length: number) {
  if (typeof length !== 'number') return 0;

  return Math.floor(Math.random() * length);
}

/** 获取某个区间的随机数 */
export function getRandomNum(min: number, max: number) {
  if (typeof length !== 'number') return 0;

  return Math.round(Math.random() * (max - min) + min);
}
