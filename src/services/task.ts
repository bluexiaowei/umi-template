import format from '@/utils/format';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import { request } from 'umi';

export function addTask(params: {
  name: string;
  keys: Array<{
    key: string;
    file_name: string;
    file_type: string;
    current_page: number;
    total_page: number;
  }>;
}) {
  const data = format(params, [
    { name: 'name' },
    { name: 'service_id', type: 'string' },
    { name: 'service_name' },
    {
      name: 'images',
      rename: 'keys',
      format(val: any[] = []) {
        const data = val.map((item) => get(item, 'response.data'));

        return flatten(data).filter((item) => item);
      },
    },
  ]);
  return request('/task/crud', { method: 'post', data });
}
