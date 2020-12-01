export default (base64: string) => {
  // base64: "data:image/png;base64,iVBORw0KGg***"
  const [header, body] = base64.split(',');
  const fileType = header.split(';')[0].split(':')[1];
  const bstr = atob(body);
  const ia = new Uint8Array(body.length);

  for (var i = 0, len = body.length; i < len; i++) {
    ia[i] = bstr.charCodeAt(i);
  }

  return new Blob([ia], { type: fileType });
};
