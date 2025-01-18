import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css';
import Link from 'next/link';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Sending registration request:', {
      username,
      email,
      password,
    });
    try {
      console.log('Sending registration request:', {
        username,
        email,
        password,
      });
      const response = await axios.post(process.env.NEXT_PUBLIC_WPURL + '/wp-json/wp/v2/users/register', {
        username,
        email,
        password,
      });
      console.log('Registration response:', response.data);
      setIsLoggedIn(true);
      router.push('/login');
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      username,
      email,
      password,

      setError('Registration failed');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </nav>
      <h1 className={styles.title}>Register</h1>
      <p className={styles.description}>Register to gain access to our exclusive tools and resources.</p>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
}
