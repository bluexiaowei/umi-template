import { useRequest } from 'umi';
import * as commonAPI from '@/services/common';

export default () => {
  const { data } = useRequest(commonAPI.getOptions, {
    defaultParams: ['gander'],
    onSuccess(data){
      console.log(data, 'data')
    }
  });
  return <div>234</div>;
};
