export default function (res: Response) {
  const { body, headers } = res;

  const contentType = headers.get('content-type') || '';
  const disposition = headers.get('content-disposition') || '';

  if (contentType === 'application/octet-stream' && body) {
    const filenameDis =
      disposition.split(';').filter((item) => /filename/.test(item))[0] || '';

    const filename = filenameDis ? filenameDis.split('=')[1] : '';

    res
      .clone()
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

  return res;
}
