import * as fs from 'fs';
import * as path from 'path';

export const getMDXfiles = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
};

export const readMDXFile = (filePath: fs.PathOrFileDescriptor) => {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return rawContent;
};
