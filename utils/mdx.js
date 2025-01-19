import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getMDXFiles() {
  if (typeof window !== 'undefined') {
    // Ensure this code is only executed on the server side
    return [];
  }

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
  console.log('Fetched MDX files:', allPostsData); // Debugging line
  return allPostsData;
}
