import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { login, logout } from '../api/auth';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
      
    try {
      const token = await login(username, password);
      // Handle successful login, store token in local storage or state management
      localStorage.setItem('token', token);

      router.push('/dashboard'); // Redirect to dashboard on success
    } catch (err) {
        console.log(err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="mt-4" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;