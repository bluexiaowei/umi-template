import _ from 'lodash';

// 转驼峰
export function toCamel(jsonStr: string): string {
  return _.replace(jsonStr, /"[^:"]+?":/g, (pattern: string) => `"${_.camelCase(pattern)}":`);
}

// 转下划线
export function toSnake(josnStr: string): string {
  return _.replace(josnStr, /"[^:"]+?":/g, (pattern: string) => `"${_.snakeCase(pattern)}":`);
}
