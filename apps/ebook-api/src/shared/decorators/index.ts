import { Transform } from 'class-transformer';

/**
 * 将字符串数字转换为数字的装饰器
 * @returns number
 */
export function TransformToInt() {
  return Transform(({ value }) => {
    try {
      return parseInt(value, 10);
    } catch (error) {
      console.error(`Error transforming value to number: ${error}`);
      return 0; // 返回一个默认的值
    }
  });
}
