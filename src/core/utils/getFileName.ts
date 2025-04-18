import * as path from 'path';

export const getFileName = (url: string) => {
  const urlObj = new URL(url);
  return path.basename(urlObj.pathname);
}
