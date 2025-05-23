import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getMDXFiles() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      return fs.statSync(fullPath).isFile();
    })
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        title: matterResult.data?.title || 'Untitled',
        excerpt: matterResult.data?.excerpt || null,
        filePath: fileName,
        date: matterResult.data?.date || null, // Ensure date is set
        description: matterResult.data?.description || matterResult.data?.excerpt || null, // Ensure description is set
        // ...other fields
      };
    });
  return allPostsData;
}
