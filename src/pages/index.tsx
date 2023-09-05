import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (token) {
      // If token exists, redirect to the dashboard page
      router.push('/dashboard');
    } else {
      // If token doesn't exist, redirect to the login page
      router.push('/login');
    }
  }, []);

  return (
     <></>
  )
}
