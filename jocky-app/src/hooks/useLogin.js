// File: hooks/useLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);

      if (res.data.token) {
        // 1. Simpan Token
        localStorage.setItem('token', res.data.token);

        // 2. TRIGGER NAVBAR UPDATE
        window.dispatchEvent(new Event("loginStateChange"));

        // 3. REDIRECT SESUAI ROLE
        if (res.data.role === "ADMIN") {
          router.push('/admin/dashboard');
        } else {
          router.push('/user');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Cek email/password.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, error, loading, handleChange, handleSubmit };
};