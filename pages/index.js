import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../components/Logo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import { getMDXFiles } from '../lib/mdx';
import { getWordPressPosts } from '../lib/wordpress';

export default function Index({ posts, globalData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, posts]);

  console.log('Combined posts:', posts); // Debugging line

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} setSearchQuery={setSearchQuery} />
      <main className="w-full">
        <h1 className="mb-12 text-3xl text-center lg:text-5xl">
          {globalData.blogTitle}
        </h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mt-4 mb-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ul className="w-full">
          {filteredPosts.map((post, index) => (
            <li
              key={index}
              className="transition bg-white border border-b-0 border-gray-800 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-b hover:border-b hovered-sibling:border-t-0" data-sb-object-id={`posts/${post.filePath || post.slug}`}
            >
              <Link
                as={`/posts/${post.filePath ? post.filePath.replace(/\.mdx?$/, '') : post.slug}`}
                href={`/posts/[slug]`}
                className="block px-6 py-6 lg:py-10 lg:px-16 focus:outline-none focus:ring-4">
                {/* Render Featured Image */}
                {post.primaryImage && (
                  <Image
                    src={post.primaryImage}
                    alt={post.title}
                    className="mb-4 w-full rounded-lg object-cover"
                    style={{ height: '200px' }}
                  />
                )}
                {post.date && (
                  <p className="mb-3 font-bold uppercase opacity-60" data-sb-field-path="date">
                    {post.date}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl" data-sb-field-path="title">{post.title}</h2>
                {post.description && (
                  <p className="mt-3 text-lg opacity-60" data-sb-field-path="description">
                    {post.description}
                  </p>
                )}
                <p>{typeof post.excerpt === 'string' ? post.excerpt.replace(/<\/?[^>]+(>|$)/g, "") : ''}</p>
                <ArrowIcon className="mt-4" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export async function getStaticProps() {
  let posts = [];

  try {
  const mdxFiles = await getMDXFiles();
  const wordpressPosts = await getWordPressPosts();
    posts = [...mdxFiles, ...wordpressPosts]
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

  console.log('MDX files:', mdxFiles); // Debugging line
  console.log('WordPress posts:', wordpressPosts); // Debugging line
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Provide fallback data if necessary
    // For example, you can fetch posts from another source or use hardcoded data
  }

  const globalData = getGlobalData();

  return {
    props: {
      posts,
      globalData,
    },
  };
}