import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/ResetPassword.module.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.NEXT_PUBLIC_WPURL + '/wp-json/wp/v2/users/lostpassword', {
        email,
      });
      setMessage('Password reset email sent');
    } catch (err) {
      setError('Failed to send password reset email');
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h1 className={styles.title}>Reset Password</h1>
      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleResetPassword} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Reset Password</button>
      </form>
    </div>
  );
}
