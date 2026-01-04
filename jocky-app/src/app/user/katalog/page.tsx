"use client";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/projectCard";
import { productService } from "@/services/productService";

export default function ListJoki() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKatalog = async () => {
      try {
        const data = await productService.getKatalog();
        
        const uniqueGames = data.reduce((acc: any[], current: any) => {
          const x = acc.find(item => item.slug === current.slug);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setGames(uniqueGames);
      } catch (error) {
        console.error("Gagal mengambil data katalog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKatalog();
  }, []);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-blue-700 font-semibold tracking-wide">Menghubungkan ke server...</p>
    </div>
  );

  return (
    <div className="p-8 min-h-screen bg-slate-50"> 
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-l-4 border-blue-600 pl-6">
          <h1 className="text-slate-900 text-4xl font-extrabold tracking-tight">
            Katalog <span className="text-blue-600">Game</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Pilih game favoritmu dan tingkatkan rank sekarang juga.
          </p>
        </div>
        
        {games.length === 0 ? (
          <div className="bg-white border border-blue-100 rounded-3xl p-20 text-center shadow-sm">
            <div className="text-blue-200 mb-4 flex justify-center">
              {/* Icon placeholder sederhana */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-slate-400 text-lg font-medium">Belum ada produk aktif di database.</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {games.map((game) => (
              <ProjectCard 
                key={game.id}
                title={game.name}
                
                image={game.image_url || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"}
                buttonText="Lihat Paket"
                slug={game.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}