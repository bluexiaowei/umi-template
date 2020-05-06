import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
export default (string: any, underline?: boolean) => {
  const str = typeof string === 'string' ? string : JSON.stringify(string);
  const format = underline
    ? str.replace(/"[^"]+?([A-Z])[^"]+?":/g, function(all) {
        return `"${snakeCase}":`;
      })
    : str.replace(/"[^"]+?_[^"]+?":/g, function(all) {
        return `"${camelCase(all)}":`;
      });

  return JSON.parse(format);
};
