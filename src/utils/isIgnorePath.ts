import context from '@/utils/context';

export default function isIgnorePath(path: string = '*'): boolean {
  return context.IGNORE_PATH.some(item => path.includes(item));
}
