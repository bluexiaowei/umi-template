interface Props {
  [propsName: string]: any;
}

export default (props: Props): FormData => {
  const formData = new window.FormData();

  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      formData.append(key, props[key]);
    }
  }

  return formData;
};
