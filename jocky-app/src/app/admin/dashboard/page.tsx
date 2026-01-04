"use client";
import { useProductAdmin } from "@/hooks/useProductAdmin";

export default function AdminDashboard() {
  const { 
    products, isModalOpen, setIsModalOpen, editId, formData,
    handleInputChange, handleSubmit, handleDelete, openAddModal, openEditModal 
  } = useProductAdmin();

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <Header onAddClick={openAddModal} />
      <ProductTable products={products} onEdit={openEditModal} onDelete={handleDelete} />
      {isModalOpen && (
        <ProductModal 
          editId={editId} 
          formData={formData} 
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

// Sub-Komponen (Bisa dipindah ke file terpisah di folder /components)
const Header = ({ onAddClick }: any) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Kelola Produk Joki</h1>
    <button onClick={onAddClick} className="bg-blue-600 px-4 py-2 rounded-lg">+ Tambah Produk</button>
  </div>
);

const ProductTable = ({ products, onEdit, onDelete }: any) => (
  <div className="bg-gray-800 rounded-xl overflow-hidden">
    <table className="w-full text-left italic">
      <thead className="bg-gray-700 text-gray-300">
        <tr>
          <th className="p-4">Game</th>
          <th className="p-4">Harga</th>
          <th className="p-4">Status</th>
          <th className="p-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p: any) => (
          <tr key={p.id} className="border-b border-gray-700">
            <td className="p-4">{p.name}</td>
            <td className="p-4">Rp {Number(p.base_price).toLocaleString()}</td>
            <td className="p-4">
              <span className={`px-2 py-1 rounded text-xs ${p.is_active ? "bg-green-900" : "bg-red-900"}`}>
                {p.is_active ? "Aktif" : "Nonaktif"}
              </span>
            </td>
            <td className="p-4 text-center space-x-2">
              <button onClick={() => onEdit(p)} className="text-yellow-500">Edit</button>
              <button onClick={() => onDelete(p.id)} className="text-red-500">Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProductModal = ({ editId, formData, onChange, onSubmit, onClose }: any) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700">
      <h2 className="text-xl font-bold mb-4">{editId ? "Edit" : "Tambah"} Produk</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={onChange} placeholder="Nama" className="w-full p-2 bg-gray-700 rounded" required />
        <input name="slug" value={formData.slug} onChange={onChange} placeholder="Slug" className="w-full p-2 bg-gray-700 rounded" required />
        <input name="base_price" type="number" value={formData.base_price} onChange={onChange} placeholder="Harga" className="w-full p-2 bg-gray-700 rounded" required />
        <input name="image_url" value={formData.image_url} onChange={onChange} placeholder="gambar.png" className="w-full p-2 bg-gray-700 rounded" required />
        <textarea name="description" value={formData.description} onChange={onChange} placeholder="Deskripsi" className="w-full p-2 bg-gray-700 rounded" />
        
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" id="active" checked={formData.is_active} onChange={onChange} />
          <label htmlFor="active">Tampilkan di Katalog</label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onClose} className="text-gray-400">Batal</button>
          <button type="submit" className="bg-blue-600 px-6 py-2 rounded-lg font-bold">Simpan</button>
        </div>
      </form>
    </div>
  </div>
);