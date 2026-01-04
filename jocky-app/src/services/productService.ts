const BASE_URL = "http://localhost:5000/api/products";

export const productService = {
 
  getAll: () => fetch(`${BASE_URL}/admin/list`).then(res => res.json()),
  
  create: (data: any) => fetch(`${BASE_URL}/admin/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json()),

  update: (id: number, data: any) => fetch(`${BASE_URL}/admin/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json()),

  delete: (id: number) => fetch(`${BASE_URL}/admin/delete/${id}`, {
    method: "DELETE"
  }),

 
  getKatalog: async () => {
    try {
      // Path publik biasanya langsung /katalog atau /user/katalog
      const res = await fetch(`${BASE_URL}/katalog`); 
      if (!res.ok) throw new Error("Gagal mengambil katalog");
      return await res.json();
    } catch (error) {
      console.error("Service Error (getKatalog):", error);
      return [];
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const res = await fetch(`${BASE_URL}/katalog/${slug}`);
      if (!res.ok) throw new Error("Produk tidak ditemukan");
      return await res.json();
    } catch (error) {
      console.error("Service Error (getBySlug):", error);
      return null;
    }
  }
};