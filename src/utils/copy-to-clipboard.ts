export default (text: string, callback: (text: string) => void) => {
  const textArea: HTMLTextAreaElement = document.createElement('textarea');

  textArea.innerHTML = text;
  textArea.style.position = 'abou';
  textArea.style.pointerEvents = ' none';
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);

  textArea.select();

  document.execCommand('Copy');

  textArea.remove();

  if (typeof callback === 'function') {
    callback(text);
  }
};
