interface Item {
  name: string;
  hide?: boolean;
  rename?: string;
  type?: 'string' | 'number';
  format?(tempValue?: any, tempResult?: any, data?: any): any;
  defVal?: any;
  children?: Item[];
}

/**
 * 格式化数据
 * @param data 数据源
 * @param rules 格式化规则
 */
function formatData(data: any, rules: Item[], defVal?: any): any {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return handleObj(data, rules, defVal);
  } else if (Array.isArray(data)) {
    return data.map(function (item) {
      return formatData(item, rules, defVal);
    });
  }
}
function handleObj(data: any, rules: Item[], defVal?: any) {
  const tempResult: any = {};
  rules.forEach(function (item: Item) {
    if (!('name' in item)) {
      return;
    }

    let tempValue: any = data[item.name];

    if (tempValue === null) {
      tempValue = undefined;
    }

    if ('type' in item && tempValue !== undefined) {
      const translateFn = {
        string: translateStr,
        number: translateNum,
      };

      if (item.type && item.type in translateFn) {
        tempValue = translateFn[item.type](tempValue);
      }
    }

    if ('defVal' in item && tempValue === undefined) {
      tempValue = item.defVal;
    }

    if ('format' in item && typeof item.format === 'function') {
      tempValue = item.format(tempValue, tempResult, data);
    }

    if ('children' in item && Array.isArray(item.children) && tempValue) {
      tempValue = formatData(tempValue, item.children);
    }

    if (item.hide) {
      return;
    }

    if ('rename' in item && item.rename) {
      tempResult[item.rename] = tempValue;
    } else {
      tempResult[item.name] = tempValue;
    }
  });

  return tempResult;
}
/**
 * 转换会数字类型
 * @param value 需要转换的值
 */
function translateNum(value: any) {
  function strToNum(value: any) {
    return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  }
  return typeof value === 'string' ? strToNum(value) : value;
}
/**
 * 转换为字符串类型
 * @param value
 * @return 转换后的字符串
 */
function translateStr(value: any) {
  return `${value}`;
}

export default formatData;
