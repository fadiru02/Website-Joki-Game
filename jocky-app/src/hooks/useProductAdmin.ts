import { useState, useEffect } from "react";
import { productService } from "@/services/productService";

export const useProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", image_url: "", base_price: "", is_active: true,
  });

  const fetchProducts = async () => {
    const data = await productService.getAll();
    setProducts(data || []);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({ name: "", slug: "", description: "", image_url: "", base_price: "", is_active: true });
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditId(p.id);
    setFormData({ 
      name: p.name,
      slug: p.slug,
      description: p.description || "",
      image_url: p.image_url || "",
      base_price: p.base_price.toString(),
      is_active: p.is_active 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = editId 
        ? await productService.update(editId, formData)
        : await productService.create(formData);

      // Karena productService sudah melakukan .json(), kita cek datanya langsung
      if (data && !data.error && data.message !== "Gagal") {
        setIsModalOpen(false);
        fetchProducts();
        alert(editId ? "Berhasil diperbarui!" : "Berhasil ditambah!");
      } else {
        alert("Gagal: " + (data.message || "Terjadi kesalahan"));
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan pada server");
    }
  }; 

  const handleDelete = async (id: number) => {
    if (confirm("Hapus produk?")) {
      const success = await productService.delete(id);
      if (success) {
        fetchProducts();
      } else {
        alert("Gagal menghapus produk");
      }
    }
  };

  return {
    products, isModalOpen, setIsModalOpen, editId, formData,
    handleInputChange, handleSubmit, handleDelete, openAddModal, openEditModal
  };
}; 