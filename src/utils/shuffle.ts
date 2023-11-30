/**
 * 打乱数组
 * @param {Array} array 数组
 * @returns {Array} 新数组
 * @example
 *
 * shuffle([1, 2, 3, 4])
 * => [4, 1, 3, 2]
 */
export default function shuffle<T>(array: T[]): T[] {
  const length = array == null ? 0 : array.length;

  if (!length) return [];

  let index = -1;
  const lastIndex = length - 1;
  const result = [...array];

  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }

  return result;
}
