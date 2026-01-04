"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Tambahkan ini
import { useLogin } from '@/hooks/useLogin';

export default function Account() {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const router = useRouter();
  
  // Ambil fungsi dari useLogin hook
  const { formData, error, loading, handleChange, handleSubmit } = useLogin();

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // --- MODIFIKASI REGISTER ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password
          // Jika backend sudah mendukung fullName, tambahkan disini
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert("Register Berhasil! Silahkan Login.");
        setIsLoginTab(true); 
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Register Error:", err);
      alert("Gagal terhubung ke server");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        
        {/* Tab Switcher */}
        <div className="flex bg-gray-50 border-b border-gray-200">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`w-1/2 py-4 text-lg font-semibold transition-all ${
              isLoginTab ? 'text-red-600 border-b-4 border-red-600 bg-white' : 'text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`w-1/2 py-4 text-lg font-semibold transition-all ${
              !isLoginTab ? 'text-red-600 border-b-4 border-red-600 bg-white' : 'text-gray-400'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm">
              {error}
            </div>
          )}

          {isLoginTab ? (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition disabled:bg-gray-400"
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              {/* Input Full Name, Email, Password sama seperti kode anda sebelumnya */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}