import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import { useState } from 'react';

import logo from '../components/Logo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredPosts.map((post) => (
            <li
              key={post.filePath}
              className="transition bg-white border border-b-0 border-gray-800 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-b hover:border-b hovered-sibling:border-t-0" data-sb-object-id={`posts/${post.filePath}`}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
                className="block px-6 py-6 lg:py-10 lg:px-16 focus:outline-none focus:ring-4">
                  {/* Render Featured Image */}
              {post.data.primaryImage && (
                  <img
                    src={post.data.primaryImage}
                    alt={post.data.title}
                    className="mb-4 w-full rounded-lg object-cover"
                    style={{ height: '200px' }}
                  />
                )}
                {post.data.date && (
                  <p className="mb-3 font-bold uppercase opacity-60" data-sb-field-path="date">
                    {post.data.date}
                  </p>
                 
                )}
                <h2 className="text-2xl md:text-3xl" data-sb-field-path="title">{post.data.title}</h2>
                {post.data.description && (
                  <p className="mt-3 text-lg opacity-60" data-sb-field-path="description">
                    {post.data.description}
                  </p>
                )}
                                    {/* <img width="20px" href="/components/numberlessagaing_logo.png"></img> */}

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

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
