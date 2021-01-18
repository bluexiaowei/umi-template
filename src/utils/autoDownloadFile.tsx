export default function (response: Response) {
  const _response = response.clone();
  const { headers } = _response;
  const disposition: string = headers.get('content-disposition') || '';

  if (/filename/i.test(disposition)) {
    const match = disposition.match(/filename="([\S]+)"/i);
    const filename = match ? match[1] : '未知文件';

    _response
      .blob()
      .then((blob) => {
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, filename);
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.setAttribute('href', url);
          a.setAttribute('download', filename);
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }
      })
      .catch((err) => console.log(err));
  }

  return response;
}
