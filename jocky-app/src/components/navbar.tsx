"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Gunakan Link agar lebih cepat

export default function NavbarPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Token invalid");
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkToken();

    window.addEventListener("storage", checkToken);
    window.addEventListener("loginStateChange", checkToken); 

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("loginStateChange", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/register");
    window.dispatchEvent(new Event("loginStateChange"));
  };

  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-xl">
      <div className="flex-1 flex justify-between items-center">
        <Link href="/" className="text-xl text-indigo-600 font-bold md:text-4xl">
          JOCKY
        </Link>
      </div>

      <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 gap-4 font-semibold">
            <li>
              <Link className="md:p-4 py-3 px-0 block hover:text-indigo-600" href="/">
                Home
              </Link>
            </li>

            {/* Role-Based Links */}
            {user?.role === "ADMIN" && (
              <li>
                <Link className="md:p-4 py-3 px-0 block text-red-600 font-bold" href="/admin/dashboard">
                  Admin Panel
                </Link>
              </li>
            )}

            {user?.role === "USER" && (
              <li>
                <Link className="md:p-4 py-3 px-0 block text-indigo-600" href="/user">
                  My Orders
                </Link>
              </li>
            )}

            <li>
              <Link className="md:p-4 py-3 px-0 block hover:text-indigo-600" href="/user/katalog">
                List Joki
              </Link>
            </li>

            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="md:p-3 py-2 px-4 block rounded-md text-center bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  className="md:p-3 py-2 px-4 block w-24 rounded-md text-center bg-blue-500 text-white hover:bg-blue-600 transition"
                  href="/register"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}