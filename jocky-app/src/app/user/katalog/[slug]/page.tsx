"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { productService } from "@/services/productService";

export default function DetailGamePage() {
  const params = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan pilihan user
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userId, setUserId] = useState("");
  const [server, setServer] = useState("");

  const handleOrder = () => {
    if (!selectedPackage || !userId || !server) {
      alert("Harap pilih paket dan isi data akun dengan lengkap!");
      return;
    }

    const adminNumber = "6285748184691"; // GANTI dengan nomor WhatsApp kamu (awali dengan 62)
    const message = `Halo Admin, saya mau order Joki:
  
*Game:* ${products[0].name}
*Paket:* ${selectedPackage.name}
*Harga:* Rp ${Number(selectedPackage.base_price).toLocaleString()}
*User ID:* ${userId}
*Server:* ${server}

Mohon segera diproses ya!`;

    // Encode pesan agar aman untuk URL
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${adminNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  useEffect(() => {
    if (params.slug) {
      productService.getBySlug(params.slug as string).then((data) => {
        setProducts(data || []);
        setLoading(false);
      });
    }
  }, [params.slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="p-20 text-center text-slate-600 bg-slate-50 min-h-screen">
        Game tidak ditemukan.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* KIRI: Informasi Game */}
        <div className="md:col-span-1">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm sticky top-6">
            <img
              src={
                products[0].image_url ||
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"
              }
              alt={products[0].name}
              className="w-full rounded-2xl shadow-md mb-6 object-cover aspect-video"
            />
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {products[0].name}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Terpercaya 100%
            </div>
            <p className="text-slate-500 mt-4 text-sm leading-relaxed">
              Dapatkan layanan joki profesional dengan proses cepat dan aman
              hanya di platform kami.
            </p>
          </div>
        </div>

        {/* KANAN: Pilihan Paket & Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Langkah 1: Pilih Paket */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-xl text-sm font-bold shadow-blue-200 shadow-lg">
                1
              </span>
              Pilih Paket Joki
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((item: any) => (
                <label
                  key={item.id}
                  className={`relative p-5 border rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPackage?.id === item.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="paket"
                    className="absolute right-4 top-4 w-5 h-5 accent-blue-600"
                    onChange={() => setSelectedPackage(item)} // Simpan paket yang dipilih
                  />
                  <div className="pr-8">
                    <p className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-3 leading-relaxed">
                      {item.description || "Layanan joki instan"}
                    </p>
                  </div>
                  <p className="text-blue-600 font-extrabold text-lg">
                    Rp {Number(item.base_price).toLocaleString()}
                  </p>
                </label>
              ))}
            </div>
          </div>

          {/* Langkah 2: Data Akun */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-xl text-sm font-bold shadow-blue-200 shadow-lg">
                2
              </span>
              Lengkapi Data Akun
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Input User ID */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  User ID
                </label>
                <input
                  type="text"
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                  placeholder="Contoh: 12345678"
                  className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                />
              </div>

              {/* Input Server */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Server
                </label>
                <input
                  type="text"
                  value={server} 
                  onChange={(e) => setServer(e.target.value)} 
                  placeholder="Contoh: (2001)"
                  className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Tombol Pesan Sekarang */}
            <button
              onClick={handleOrder} // Panggil fungsi kirim WhatsApp
              className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Pesan Sekarang
            </button>

            <p className="text-center text-slate-400 text-xs mt-4">
              Dengan menekan tombol, Anda akan diarahkan otomatis ke WhatsApp
              Admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
