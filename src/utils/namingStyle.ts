import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import replace from 'lodash/replace';

// 转驼峰
export function toCamel(jsonStr: string): string {
  return replace(jsonStr, /"[^:"]+?":/g, (pattern: string) => `"${camelCase(pattern)}":`);
}

// 转下划线
export function toSnake(josnStr: string): string {
  return replace(josnStr, /"[^:"]+?":/g, (pattern: string) => `"${snakeCase(pattern)}":`);
}
