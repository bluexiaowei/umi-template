import { useBoolean } from 'ahooks';

export default () => {
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  return {
    visible,
    setTrue,
    setFalse,
  };
};
