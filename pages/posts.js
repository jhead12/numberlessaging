import { getMDXFiles } from '../lib/mdx';
import { getWordPressPosts } from '../lib/wordpress';

export async function getStaticProps() {
  const mdxFiles = await getMDXFiles();
  const wordpressPosts = await getWordPressPosts();
  const posts = [...mdxFiles, ...wordpressPosts]
    .map(post => ({
      title: post.title || 'Untitled',
      excerpt: typeof post.excerpt === 'string' ? post.excerpt.replace(/<\/?[^>]+(>|$)/g, "") : '',
      filePath: post.filePath || null,
      slug: post.slug || null,
      primaryImage: post.primaryImage || null,
      date: post.date || null,
      description: post.description || null,
      // ...other fields
    }))
    .filter(post => post.title && post.title !== 'Untitled'); // Filter out posts with no valid title

  return {
    props: {
      posts,
    },
  };
}

export default function Posts({ posts }) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
