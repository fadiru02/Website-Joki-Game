const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAdminTable = async (res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data admin", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, slug, description, image_url, base_price } = req.body;
    const newProduct = await prisma.product.create({
      data: { 
        name, 
        slug, 
        description, 
        image_url, 
        base_price: base_price 
      }
    });
    res.status(201).json({ message: "Produk berhasil dibuat", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: "Gagal buat produk", error: error.message });
  }
};

// Update produk (termasuk ganti status is_active)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image_url, base_price, is_active } = req.body;

    const updated = await prisma.product.update({
      where: { id: parseInt(id) }, // <--- WAJIB parseInt
      data: { name, slug, description, image_url, base_price, is_active }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update gagal", error: error.message });
  }
};

// Hapus permanen
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Produk dihapus permanen" });
  } catch (error) {
    res.status(400).json({ message: "Hapus gagal", error: error.message });
  }
};