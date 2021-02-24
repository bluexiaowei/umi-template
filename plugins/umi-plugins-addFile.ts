import { IApi } from '@umijs/types';
import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';

export default function name(api: IApi) {
  api.onGenerateFiles(async () => {
    const { paths } = api;

    const enterPath = resolve(
      paths.absSrcPath,
      '../',
      'config',
      'APP_CONFIG.ts',
    );

    const file = await readFileSync(enterPath, { encoding: 'utf-8' });

    const outPath = resolve(paths.absSrcPath, '../', 'public', 'app-config.js');

    const content = `window.APP_CONFIG = ${file.replace(
      'export default ',
      '',
    )}`;

    writeFileSync(outPath, content, { encoding: 'utf-8' });
  });
}
