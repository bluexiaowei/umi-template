import contentDisposition from 'content-disposition';
export default function (response: Response) {
  const _res = response.clone();
  const { headers } = _res;
  const content_disposition = headers.get('content-disposition');

  if (content_disposition) {
    const { parameters } = contentDisposition.parse(content_disposition);
    const filename = parameters.filename || parameters.fileName;
    _res
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
