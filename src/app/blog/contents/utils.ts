import { format, formatDistanceToNow, parseISO } from 'date-fns';
import * as fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';

const getMDXfiles = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
};

const readMDXFile = (filePath: fs.PathOrFileDescriptor) => {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return matter(rawContent);
};

const getMDXData = (dir: string) => {
  const mdxFiles = getMDXfiles(dir);

  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      medadata: data,
      slug,
      content,
    };
  });
};

export const getBlogPost = () => {
  return getMDXData(path.join(process.cwd(), 'src', 'app', 'blog', 'content'));
};

export const formatDate = (date: string, includeRelative = false) => {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }

  const targetDate = parseISO(date);

  const fullDate = format(targetDate, 'MMMM d, yyyy');

  if (!includeRelative) {
    return fullDate;
  }

  const relativeDate = formatDistanceToNow(targetDate, { addSuffix: true });

  return `${fullDate} (${relativeDate})`;
};
