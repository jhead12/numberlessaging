import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/api/posts';
import Link from 'next/link';
import styles from '../styles/Posts.module.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      console.log('Fetched posts:', fetchedPosts); // Log the fetched posts
      setPosts(fetchedPosts);
    };

    getPosts();
  }, []);

  return (
    <div className={styles.postsContainer}>
      <h1 className={styles.title}>Posts</h1>
      <ul className={styles.postsList}>
        {posts.length === 0 && <li>No posts found.</li>}
        {posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link href={`/posts/${post.slug}`}>
              <a className={styles.postLink}>
                <h2>{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
