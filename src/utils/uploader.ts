import SparkMD5 from 'spark-md5';

interface UploaderFile {
  id: string;
  file: File;
  stop?: boolean;
  chunks: Array<{
    status: 'success' | 'error' | 'loading' | '';
    arrayBuffer: ArrayBuffer;
  }>;
}

class Uploader {
  constructor(props: { chunkSize: number }) {
    this.chunkSize = props.chunkSize || 1024 * 1024;
  }

  chunkSize = 1024 * 1024;

  files: {
    [key: string]: UploaderFile;
  } = {};

  add(file: File): Promise<UploaderFile> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      const chunkSize = this.chunkSize;
      const files = this.files;

      // 读取文件 buffer
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (fileReader.result === null || typeof fileReader.result === 'string')
          return;
        const uploaderFile: UploaderFile = { id: '', file, chunks: [] };
        const result: ArrayBuffer = fileReader.result;
        const chunks = Math.ceil(e.total / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();

        uploaderFile.chunks = Array.from({ length: chunks }).map((item, i) => {
          const arrayBuffer = result.slice(i * chunkSize, (i + 1) * chunkSize);

          if ((i + 1) % 2 !== 0) {
            spark.append(arrayBuffer);
          }

          return { arrayBuffer, status: '' };
        });

        // 计算 MD5;
        uploaderFile.id = spark.end();

        if (uploaderFile.id in files) {
          return resolve(files[uploaderFile.id]);
        }

        files[uploaderFile.id] = uploaderFile;

        resolve(uploaderFile);
      };

      fileReader.onerror = reject;
    });
  }

  getFile(fileId: string) {
    if (fileId in this.files) {
      return this.files[fileId];
    }

    return null;
  }

  getChunks(fileId: string) {
    const uploaderFile = this.getFile(fileId);
    if (uploaderFile === null) return [];
    return uploaderFile.chunks.map((item) =>
      item.status !== 'success' ? item.arrayBuffer : null,
    );
  }

  getProgress(fileId: string) {
    if (fileId in this.files) {
      const file = this.files[fileId];

      return Math.floor(
        (file.chunks.filter((item) => item.status === 'success').length /
          file.chunks.length) *
          100,
      );
    }

    return 0;
  }

  removeFile(fileId: string) {
    delete this.files[fileId];
  }

  clearFiles() {
    this.files = {};
  }

  upChunkStatus(
    fileId: string,
    index: number,
    status: 'success' | 'loading' | 'error' | '',
  ) {
    const uploaderFile = this.getFile(fileId);

    if (uploaderFile === null) return;

    uploaderFile.chunks[index].status = status;
  }

  isFinishFile(fileId: string): boolean {
    const uploaderFile = this.getFile(fileId);

    if (uploaderFile === null) return false;

    return (
      uploaderFile.chunks.filter((item) => item.status === 'success').length ===
      uploaderFile.chunks.length
    );
  }

  stopFile(fileId: string, stop?: boolean) {
    const uploaderFile = this.getFile(fileId);

    if (uploaderFile === null) return true;

    if (stop !== undefined) {
      return (uploaderFile.stop = stop);
    }
  }

  getUploaderFiles() {
    return Object.values(this.files);
  }

  SparkMD5 = SparkMD5;
}

export default Uploader;
